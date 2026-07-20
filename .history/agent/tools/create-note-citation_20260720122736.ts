import { tool } from "langchain"
import { prisma } from "@/prisma";
import * as z from "zod";

export const createNoteCitation = tool(
    async ({ noteChunkId, highlightedText }, runtime) => {
        try {
            const caseId = runtime?.configurable?.caseId;
            if (!caseId) throw new Error("Missing docket scope in tool context.");

            const chunk = await prisma.noteChunk.findFirst({
                where: { id: noteChunkId, note: { party: { docketId } } },
                select: { id: true, text: true },
            });
            if (!chunk) {
                return { success: false, data: null, error: "That note chunk was not found in this case." };
            }

            if (!chunk.text.includes(highlightedText)) {
                return { success: false, data: null, error: "The highlighted text must be an exact excerpt from the chunk's text." };
            }

            const citation = await prisma.noteCitation.create({
                data: { noteChunkId, highlightedText },
                select: { id: true },
            });

            return { success: true, data: { citationId: citation.id }, message: "Citation recorded." };
        } catch (err) {
            console.error("[create_note_citation] Tool execution error:", err);
            return { success: false, data: null, error: "Could not record citation. Please try again later.", retryable: true };
        }
    },
    {
        name: "create_note_citation",
        description:
            "Records that part of your answer came from a specific party note chunk you retrieved via search. Call this once for each distinct note-sourced claim, right after identifying the exact supporting text. highlightedText must be an exact, verbatim excerpt from the chunk — never a paraphrase.",
        schema: z.object({
            noteChunkId: z.string().describe("The id of the NoteChunk (from a prior search_party_notes or search_all_party_notes result) that supports this claim."),
            highlightedText: z.string().describe("The exact, verbatim substring of the chunk's text that supports the claim."),
        }),
    }
);