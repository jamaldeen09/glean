"use server"
import { auth } from "@/auth";
import { getPrismaErrorMessage, prisma } from "@/prisma";
import * as z from "zod";

export const createDocket = async (formData: FormData) => {
    try {
        const session = await auth();
        if (!session || !session?.user) return {
            success: false,
            message: "Unauthorized. Please sign in and try again"
        }

        // Validate the title and description
        const title = formData.get("title");
        const description = formData.get("description");

        const result = (z.object({
            title: z.string().min(3, {
                error: "Title must be at least 3 characters"
            }).max(200, {
                error: "Title cannot exceed 200 characters"
            }),

            description: z.string().max(1000, {
                error: "Description cannot exceed 1000 characters"
            })
        })).safeParse({ title, description });

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
                    userId: session.user.id!,
                },
                select: { id: true }
            });

            return {
                success: true,
                message: "Docket has been successfully created",
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
        return { success: false, message: "Something went wrong. " }
    }
}