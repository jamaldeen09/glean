import { tool } from "langchain"
import { prisma } from "@/prisma";
import * as z from "zod";
import embed from "@/lib/embed";
import { SearchExhibitResult } from "./search-exhibit";
import { exhibitPageChunksApplyRFF } from "@/lib/agent/applyRFF";

export const searchExhibits = tool(
    async ({ queryText, limit }, runtime) => {
      try {
        const caseId = runtime?.configurable?.caseId;
        if (!caseId) throw new Error("Missing case scope in tool context.");
  
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
          WHERE e.case_id = ${caseId}
          ORDER BY score DESC
          LIMIT ${finalLimit};
        `;
  
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
              WHERE e.case_id = ${docketId}
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
        console.error(`[search_exhibits] Tool execution failed: ${err}`);
        return {
          success: false,
          data: null,
          error: "The search system is currently unreachable. Please try again later.",
          retryable: true,
        };
      }
    },
    {
      name: "search_exhibits",
      description:
        "Searches across ALL exhibits in the current case for text relevant to a query, using combined semantic and keyword search over every exhibit's pages. Use this for general questions like 'find where X is mentioned' when the user hasn't specified a particular exhibit — for searching within one named exhibit, use search_exhibit instead. Returns the most relevant page chunks, ranked by relevance, from any exhibit in the case.",
      schema: z.object({
        queryText: z
          .string()
          .describe("The natural-language question or topic to search for across all exhibits in this case, e.g. 'mentions of fingerprints' or 'the property line dispute'."),
        limit: z
          .number()
          .optional()
          .describe("Maximum number of matching page chunks to return. Defaults to 5 if not specified."),
      }),
    }
  );