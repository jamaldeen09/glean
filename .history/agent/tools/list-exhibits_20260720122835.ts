import { tool } from "@langchain/core/tools";
import { prisma } from "@/prisma";
import * as z from "zod"

export const listExhibits = tool(
    async ({ limit }, runtime) => {
        try {
            const caseId = runtime?.configurable?.caseId;
            if (!caseId) throw new Error("Missing case scope in tool context.");

            const finalLimit = limit ?? 5;
            const case = await prisma.case.findUnique({
                where: { id: caseId },
                select: {
                    exhibits: {
                        select: { id: true, title: true, description: true },
                        take: finalLimit,
                    },
                },
            });

            if (!docket) {
                console.error(`[retrieve_exhibits] No docket found for id ${docketId}`);
                return { success: false, data: null, error: "This case could not be found." };
            }

            const exhibits = docket.exhibits;
            return {
                success: true,
                data: exhibits,
                message:
                    exhibits.length > 0
                        ? `Found ${exhibits.length} exhibit(s) in this case.`
                        : "No exhibits have been added to this case yet.",
            };
        } catch (err) {
            console.error("[retrieve_exhibits] Tool execution error:", err);
            return {
                success: false,
                data: null,
                error: "Could not retrieve exhibits for this case. Please try again later.",
                retryable: true,
            };
        }
    },
    {
        name: "retrieve_exhibits",
        description:
            "Lists all exhibits in the current case, returning each exhibit's id, title, and description. Use this to see what exhibits exist and compare titles/descriptions when the user refers to a specific exhibit by name.",
        schema: z.object({
            limit: z
                .number()
                .optional()
                .describe("Maximum number of exhibits to return. Defaults to 5 if not specified."),
        }),
    }
);