import { tool } from "langchain"
import { prisma } from "@/prisma";
import { PartyNotesSearchResult } from "./search-party-notes";
import * as z from "zod";
import embed from "@/lib/embed";
import { noteChunksApplyRFF } from "@/lib/agent/applyRFF";

export const searchAllPartyNotes = tool(
    async ({ queryText, limit }, runtime) => {
      try {
        const caseId = runtime?.configurable?.caseId;
        if (!caseId) throw new Error("Missing case scope in tool context.");
  
        const result = await embed(queryText);
        const isSuccess = result.success && !result.error && result.data?.vector;
        if (!isSuccess) throw result.error;
        const queryEmbedding = result.data?.vector ?? [];
        const finalLimit = limit ?? 5;
  
        const cleanQuery = queryText
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .join(" | ");
  
        const vectorSearch = prisma.$queryRaw<PartyNotesSearchResult[]>`
          SELECT
            nc.id,
            nc.text,
            n.id as "noteId",
            p.id as "partyId",
            p.name as "partyName",
            p.role as "partyRole",
            (1 - (nc.embedding <=> ${JSON.stringify(queryEmbedding)}::vector)) as score
          FROM "NoteChunk" nc
          JOIN "Note" n ON nc.note_id = n.id
          JOIN "Party" p ON n.party_id = p.id
          WHERE p.case_id = ${caseId}
          ORDER BY score DESC
          LIMIT ${finalLimit};
        `;
  
        const keywordSearch = cleanQuery
          ? prisma.$queryRaw<PartyNotesSearchResult[]>`
              SELECT
                nc.id,
                nc.text,
                n.id as "noteId",
                p.id as "partyId",
                p.name as "partyName",
                p.role as "partyRole",
                ts_rank(to_tsvector('english', nc.text), to_tsquery('english', ${cleanQuery})) as score
              FROM "NoteChunk" nc
              JOIN "Note" n ON nc.note_id = n.id
              JOIN "Party" p ON n.party_id = p.id
              WHERE p.docket_id = ${caseId}
                AND to_tsvector('english', nc.text) @@ to_tsquery('english', ${cleanQuery})
              ORDER BY score DESC
              LIMIT ${finalLimit};
            `
          : Promise.resolve([]);
  
        const [vectorResults, keywordResults] = await Promise.all([vectorSearch, keywordSearch]);
  
        const data = noteChunksApplyRFF({
          vectorDocs: vectorResults,
          keywordDocs: keywordResults,
          finalLimit,
        });
  
        return {
          success: true,
          data,
          message: data.length > 0 ? `Found ${data.length} note chunk(s).` : "No matching notes found across any party.",
        };
      } catch (err) {
        console.error("[search_all_party_notes] Tool execution error:", err);
        return {
          success: false,
          data: null,
          error: "The search system is currently unreachable. Please try again later.",
          retryable: true,
        };
      }
    },
    {
      name: "search_all_party_notes",
      description:
        "Searches across ALL parties' notes in the current case for text relevant to a query, using combined semantic and keyword search. Returns matching note chunks along with which party (name, role, id) and which note each one came from. Use this for general questions like 'who has notes mentioning X' when the user hasn't named a specific party — for searching one named party's notes, use search_party_notes instead.",
      schema: z.object({
        queryText: z.string().describe("The natural-language question or topic to search for across all parties' notes in this case."),
        limit: z
          .number()
          .optional()
          .describe("Maximum number of matching note chunks to return. Defaults to 5 if not specified."),
      }),
    }
  );