import { tool } from "langchain"
import { prisma } from "@/prisma";
import * as z from "zod";

export const listParties = tool(
  async ({ limit }, runtime) => {
    try {
      const caseId = runtime?.configurable?.caseId;
      if (!caseId) throw new Error("Missing case scope in tool context.");

      const finalLimit = limit ?? 20;

      const parties = await prisma.party.findMany({
        where: { caseId },
        select: {
          id: true,
          name: true,
          role: true,
        },
        take: finalLimit,
      });

      return {
        success: true,
        data: parties,
        message:
          parties.length > 0
            ? `Found ${parties.length} part${parties.length === 1 ? "y" : "ies"} in this case.`
            : "No parties have been added to this case yet.",
      };
    } catch (err) {
      console.error("[list_parties] Tool execution error:", err);
      return {
        success: false,
        data: null,
        error: "Could not retrieve parties for this case. Please try again later.",
        retryable: true,
      };
    }
  },
  {
    name: "list_parties",
    description:
      "Lists all parties (defendants, witnesses, victims, persons of interest) in the current case, returning each party's id, name, and role. Use this to look up a party's id before calling search_party_notes, or when the user asks a general question about a named person (e.g. 'find anything related to John') — find their id here first, then search both their notes and the exhibits for mentions of them.",
    schema: z.object({
      limit: z
        .number()
        .optional()
        .describe("Maximum number of parties to return. Defaults to 20 if not specified."),
    }),
  }
);