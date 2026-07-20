import { tool } from "langchain"
import { prisma } from "@/prisma";
import * as z from "zod";
import embed from "@/lib/embed";
import { exhibitPageChunksApplyRFF } from "@/lib/agent/applyRFF";

export interface SearchExhibitResult {
    id: string;
    text: string;
    pageNumber: number;
    exhibitTitle: string;
    exhibitDescription: string;
    score: number;
}

export const searchExhibit = tool(
    async ({ queryText, exhibitId, limit }, runtime) => {
        try {
            const caseId = runtime?.configurable?.caseId;
            if (!caseId) throw new Error("Missing case scope in tool context.");

            // Verify the exhibit actually belongs to this case before searching it.
            const exhibit = await prisma.exhibit.findFirst({
                where: { id: exhibitId, caseId },
                select: { id: true },
            });
            
            if (!exhibit) {
                return {
                    success: false,
                    data: null,
                    error: "That exhibit was not found in this case.",
                    retryable: false,
                };
            }

            // Generate embeddings
            const result = await embed(queryText);
            const isSuccess = result.success && !result.error && result.data?.vector;
            if (!isSuccess) throw result.error;

            const queryEmbedding = result.data?.vector ?? [];
            const finalLimit = limit ?? 5;

            // Clean the query text for keyword (tsquery) search
            const cleanQuery = queryText
                .replace(/[^a-zA-Z0-9\s]/g, "")
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .join(" | ");

            const vectorSearch = prisma.$queryRaw<SearchExhibitResult[]>`
          SELECT
            pc.id,
            pc.text,
            p.page_number as "pageNumber",
            e.title as "exhibitTitle",
            e.description as "exhibitDescription",
            (1 - (pc.embedding <=> ${JSON.stringify(queryEmbedding)}::vector)) as score
          FROM "PageChunk" pc
          JOIN "Page" p ON pc.exhibit_page_id = p.id
          JOIN "Exhibit" e ON p.exhibit_id = e.id
          WHERE p.exhibit_id = ${exhibitId}
          ORDER BY score DESC
          LIMIT ${finalLimit};
        `;

            // Skip keyword search entirely if nothing usable remains after cleaning —
            // avoids a to_tsquery syntax error on an empty pattern.
            const keywordSearch = cleanQuery
                ? prisma.$queryRaw<SearchExhibitResult[]>`
              SELECT
                pc.id,
                pc.text,
                p.page_number as "pageNumber",
                e.title as "exhibitTitle",
                e.description as "exhibitDescription",
                ts_rank(to_tsvector('english', pc.text), to_tsquery('english', ${cleanQuery})) as score
              FROM "PageChunk" pc
              JOIN "Page" p ON pc.exhibit_page_id = p.id
              JOIN "Exhibit" e ON p.exhibit_id = e.id
              WHERE p.exhibit_id = ${exhibitId}
                AND to_tsvector('english', pc.text) @@ to_tsquery('english', ${cleanQuery})
              ORDER BY score DESC
              LIMIT ${finalLimit};
            `
                : Promise.resolve([]);

            const [vectorResults, keywordResults] = await Promise.all([vectorSearch, keywordSearch]);

            const data = exhibitPageChunksApplyRFF({
                vectorDocs: vectorResults,
                keywordDocs: keywordResults,
                finalLimit,
            });

            return {
                success: true,
                data,
                message: data.length > 0 ? `Found ${data.length} chunks.` : "No results matched your query.",
            };
        } catch (err) {
            console.error(`[search_exhibit] Tool execution failed: ${err}`);
            return {
                success: false,
                data: null,
                error: "The search system is currently unreachable. Please try again later.",
                retryable: true,
            };
        }
    },
    {
        name: "search_exhibit",
        description:
            "Searches the pages of ONE specific exhibit for text relevant to a query, using combined semantic and keyword search. Use this only when the user has specified (or a prior tool call has identified) a particular exhibit by name or ID to search within — for searching across all exhibits in the case, use the general exhibit search tool instead. Returns the most relevant page chunks from that exhibit, ranked by relevance.",
        schema: z.object({
            queryText: z
                .string()
                .describe("The natural-language question or topic to search for within this exhibit's pages, e.g. 'mentions of fingerprints' or 'the property line dispute'."),
            exhibitId: z
                .string()
                .describe("The ID of the specific exhibit to search within. Must be an exhibit already known to belong to the current case — look it up via the exhibit-listing tool first if you don't already have it."),
            limit: z
                .number()
                .optional()
                .describe("Maximum number of matching page chunks to return. Defaults to 5 if not specified."),
        }),
    }
);