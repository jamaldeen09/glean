"use server"
import { auth } from "@/auth";
import { Docket } from "@/generated/prisma/client";
import { getPrismaErrorMessage, prisma } from "@/prisma";
import * as z from "zod";

export type CreateDocketArgs = Omit<Docket, "createdAt" | "updatedAt" | "userId" | "id" | "status">;
export const createDocket = async ({ title, }: CreateDocketArgs) => {
    try {
        const session = await auth();
        if (!session || !session?.user || !session.user?.id) return {
            success: false,
            message: "Unauthorized. Please sign in and try again"
        }

        // Extract the user's id
        const userId = session.user.id;

        // Validate
        const title = formData.get("title");
        const description = formData.get("description");
        const client = formData.get("client");
        const court = formData.get("court");
        const 

        const result = z.object({
            client: z.string()
                .trim()
                .min(2, { error: "Client name must be at least 2 characters" })
                .max(200, { error: "Client name cannot exceed 200 characters" }),

            court: z.string()
                .trim()
                .min(2, { error: "Court must be at least 2 characters" })
                .max(200, { error: "Court cannot exceed 200 characters" }),

            title: z.string()
                .trim()
                .min(3, { error: "Title must be at least 3 characters" })
                .max(200, { error: "Title cannot exceed 200 characters" }),

            description: z.string()
                .trim()
                .max(1000, { error: "Description cannot exceed 1000 characters" })
                .optional(),
        }).safeParse({ title, description, client, court });

        if (!result.success) return {
            success: false,
            message: "Validation failed",
            error: { validationErrors: result.error.flatten() }
        }

        try {
            const docket = await prisma.docket.create({
                data: {
                    title: title as string,
                    description: description as string | null,
                    client: client as string,
                    court: court as string,
                    userId,
                },
                select: { id: true }
            });

            return {
                success: true,
                message: "You have successfully opened a new case",
                data: { docketId: docket.id }
            }
        } catch (err) {
            console.log("[Server Action (createDocket)] Database error during docket creation: ", err);
            const fallback = "An unexpected error occured while attempting to create a new docket."
            const msg = getPrismaErrorMessage(err, fallback);
            return { success: false, message: msg }
        }
    } catch (err) {
        console.error("[Server Action (createDocket)] Error: ", err);
        return { success: false, message: "Something went wrong. Please try again later" }
    }
}