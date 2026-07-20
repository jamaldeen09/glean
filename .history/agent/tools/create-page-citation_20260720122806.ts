import { tool } from "langchain"
import { prisma } from "@/prisma"
import * as z from "zod";

export const createPageCitation = tool(
    async ({ pageChunkId, highlightedText }, runtime) => {
      try {
        const caseId = runtime?.configurable?.caseId;
        if (!caseId) throw new Error("Missing case scope in tool context.");
  
        const chunk = await prisma.pageChunk.findFirst({
          where: { id: pageChunkId, exhibitPage: { exhibit: { caseId } } },
          select: { id: true, text: true },
        });
        if (!chunk) {
          return { success: false, data: null, error: "That page chunk was not found in this case." };
        }
        if (!chunk.text.includes(highlightedText)) {
          return { success: false, data: null, error: "The highlighted text must be an exact excerpt from the chunk's text." };
        }
  
        const citation = await prisma.pageCitation.create({
          data: { pageChunkId, highlightedText },
          select: { id: true },
        });
  
        return { success: true, data: { citationId: citation.id }, message: "Citation recorded." };
      } catch (err) {
        console.error("[create_page_citation] Tool execution error:", err);
        return { success: false, data: null, error: "Could not record citation. Please try again later.", retryable: true };
      }
    },
    {
      name: "create_page_citation",
      description:
        "Records that a claim in your answer is supported by a specific exhibit page chunk you retrieved via search. Call immediately after identifying the exact supporting text. highlightedText must be an exact, verbatim excerpt from the chunk — never a paraphrase.",
      schema: z.object({
        pageChunkId: z.string().describe("The id of the PageChunk (from a prior search_exhibit or search_exhibits result) that supports this claim."),
        highlightedText: z.string().describe("The exact, verbatim substring of the chunk's text that supports the claim."),
      }),
    }
  );