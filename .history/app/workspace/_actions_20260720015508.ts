"use server"
import { auth } from "@/auth";
import { Docket } from "@/generated/prisma/client";
import { docketSchema } from "@/lib/schemas/docket-schema";
import { getPrismaErrorMessage, prisma } from "@/prisma";
import * as z from "zod";

export type CreateDocketArg = Omit<Docket, "createdAt" | "updatedAt" | "userId" | "id" | "status">;
export const createDocket = async (arg: CreateDocketArg) => {
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
        
        const result = docketSchema.safeParse(arg);
        
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