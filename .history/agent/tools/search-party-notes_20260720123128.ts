import embed from "@/lib/embed";
import { tool } from "langchain";
import * as z from "zod";
import { prisma } from "@/prisma";
import { noteChunksApplyRFF } from "@/lib/agent/applyRFF";

export interface PartyNotesSearchResult {
  id: string;
  text: string;
  partyName: string;
  partyRole: string;
  score: number;
}

export const searchPartyNotes = tool(
  async ({ partyId, limit, queryText }, runtime) => {
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
            p.name as "partyName",
            p.role as "partyRole",
            (1 - (nc.embedding <=> ${JSON.stringify(queryEmbedding)}::vector)) as score
          FROM "NoteChunk" nc
          JOIN "Note" n ON nc.note_id = n.id
          JOIN "Party" p ON n.party_id = p.id
          WHERE p.case_id = ${caseId}
            AND n.party_id = ${partyId}
          ORDER BY score DESC
          LIMIT ${finalLimit};
        `;

      const keywordSearch = cleanQuery
        ? prisma.$queryRaw<PartyNotesSearchResult[]>`
              SELECT
                nc.id,
                nc.text,
                n.id as "noteId",
                p.name as "partyName",
                p.role as "partyRole",
                ts_rank(to_tsvector('english', nc.text), to_tsquery('english', ${cleanQuery})) as score
              FROM "NoteChunk" nc
              JOIN "Note" n ON nc.note_id = n.id
              JOIN "Party" p ON n.party_id = p.id
              WHERE p.docket_id = ${docketId}
                AND n.party_id = ${partyId}
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
        message: data.length > 0 ? `Found ${data.length} note chunk(s).` : "No matching notes found for this party.",
      };
    } catch (err) {
      console.error("[search_party_notes] Tool execution error:", err);
      return {
        success: false,
        data: null,
        error: "The search system is currently unreachable. Please try again later.",
        retryable: true,
      };
    }
  },
  {
    name: "search_party_notes",
    description:
      "Searches a specific party's notes for text relevant to a query, using combined semantic and keyword search. Returns matching note chunks along with the party's name and role, and the id of the note each chunk belongs to. Use this when a question is specifically about one named party's background or recorded notes — look up the partyId first if you don't already have it.",
    schema: z.object({
      partyId: z.string().describe("The ID of the party whose notes should be searched."),
      queryText: z.string().describe("The natural-language question or topic to search for within this party's notes."),
      limit: z
        .number()
        .optional()
        .describe("Maximum number of matching note chunks to return. Defaults to 5 if not specified."),
    }),
  }
);