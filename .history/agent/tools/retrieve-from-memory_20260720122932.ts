import { tool } from "langchain"
import { prisma } from "@/prisma";
import * as z from "zod";
import embed from "@/lib/embed";

export const retrieveFromMemory = tool(
    async ({ queryText, limit }, runtime) => {
      try {
        const caseId = runtime?.configurable?.caseId;
        if (!caseId) throw new Error("Missing case scope in tool context.");
  
        const result = await embed(queryText);
        const isSuccess = result.success && !result.error && result.data?.vector;

        if (!isSuccess) throw result.error;
        const queryEmbedding = result.data?.vector ?? [];
        const finalLimit = limit ?? 5;
  
        const fragments = await prisma.$queryRaw<
          { id: string; content: string; score: number }[]
        >`
          SELECT
            id,
            content,
            (1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector))
              + (LEAST(access_count, 20) * 0.01)
              + (GREATEST(0, 1 - (EXTRACT(EPOCH FROM (now() - last_used_at)) / 604800)) * 0.05)
              AS score
          FROM "MemoryFragment"
          WHERE docket_id = ${caseId}
          ORDER BY score DESC
          LIMIT ${finalLimit};
        `;
  
        if (fragments.length > 0) {
          const ids = fragments.map((f) => f.id);
          await prisma.memoryFragment.updateMany({
            where: { id: { in: ids } },
            data: { accessCount: { increment: 1 }, lastUsedAt: new Date() },
          });
        }
  
        return {
          success: true,
          data: fragments.map(({ id, content }) => ({ id, content })),
          message:
            fragments.length > 0
              ? `Found ${fragments.length} relevant memory item(s).`
              : "No relevant memories found for this case.",
        };
      } catch (err) {
        console.error("[retrieve_from_memory] Tool execution error:", err);
        return {
          success: false,
          data: null,
          error: "Could not retrieve memory. Please try again later.",
          retryable: true,
        };
      }
    },
    {
      name: "retrieve_from_memory",
      description:
        "Searches previously-saved facts about this case for anything relevant to a query. Use this early in a turn — a question may already have a known answer from earlier in this case's history, saving you from re-searching documents from scratch.",
      schema: z.object({
        queryText: z.string().describe("The topic or question to search saved memory for."),
        limit: z
          .number()
          .optional()
          .describe("Maximum number of memory items to return. Defaults to 5 if not specified."),
      }),
    }
  );