import { tool } from "langchain"
import { prisma } from "@/prisma";
import * as z from "zod";
import { createId } from "@paralleldrive/cuid2";
import embed from "@/lib/embed";

export const saveToMemory = tool(
    async ({ content }, runtime) => {
        try {
            const caseId = runtime?.configurable?.caseId;
            if (!caseId) throw new Error("Missing case scope in tool context.");

            const result = await embed(content);
            const isSuccess = result.success && !result.error && result.data?.vector;
            if (!isSuccess) throw result.error;
            const embedding = result.data?.vector ?? [];

            await prisma.$executeRaw`
          INSERT INTO "MemoryFragment"
            (id, case_id, content, embedding, access_count, last_used_at, created_at, updated_at)
          VALUES
            (${createId()}, ${caseId}, ${content}, ${JSON.stringify(embedding)}::vector, 0, now(), now(), now());
        `;

            return {
                success: true,
                data: null,
                message: "Saved to memory.",
            };
        } catch (err) {
            console.error("[save_to_memory] Tool execution error:", err);
            return {
                success: false,
                data: null,
                error: "Could not save to memory. Please try again later.",
                retryable: true,
            };
        }
    },
    {
        name: "save_to_memory",
        description:
            "Saves a short, standalone fact about this case for future recall — e.g. a conclusion you reached, a fact the user confirmed, or a detail worth not re-deriving next time. Use sparingly: only for durable facts likely to be useful again, not for details already fully covered by a document you can re-search anytime.",
        schema: z.object({
            content: z
                .string()
                .describe("The fact to remember, written as a short, self-contained statement (e.g. 'The lawyer confirmed John Smith is the primary defendant')."),
        }),
    }
);