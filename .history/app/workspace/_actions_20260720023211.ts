"use server"
import { auth } from "@/auth";
import { Docket } from "@/generated/prisma/client";
import { docketSchema } from "@/lib/schemas/docket-schema";
import { getPrismaErrorMessage, prisma } from "@/prisma";

export type CreateDocketArg = Omit<Docket, "createdAt" | "updatedAt" | "userId" | "id" | "status" | "description" | "number"> & {
    description?: string;
    number?: string;
};

export const createDocket = async (arg: CreateDocketArg) => {
    try {
        const session = await auth();
        if (!session || !session?.user || !session.user?.id) return {
            success: false,
            message: "Unauthorized. Please sign in and try again"
        }

        // Extract the user's id
        const userId = session.user.id;
    
        // Validate the data passed in
        const result = docketSchema.safeParse(arg);

        if (!result.success) return {
            success: false,
            data: null,
            message: "Validation failed",
            error: { validationErrors: result.error.flatten() }
        };

        try {
            const docket = await prisma.docket.create({
                data: { ...arg, userId },
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
            return { 
                success: false, 
                data: null, 
                message: msg
            }
        }
    } catch (err) {
        console.error("[Server Action (createDocket)] Error: ", err);
        return { 
            success: false, 
            data: null, 
            message: "Something went wrong. Please try again later" 
        }
    }
}
export interface DocketMetadata {
    id: string;
    number: string | null;
    title: string;
    client: string;
    court: string;
    status: DocketStatus;
    totalExhibits: number;
    totalParties: number;
    updatedAt: string;
};

export const fetchDockets = async () => {
    try {
        const session = await auth();
        if (!session || !session?.user || !session.user?.id) return {
            success: false,
            message: "Unauthorized. Please sign in and try again"
        }

        const userId = session.user.id;

        try {} catch (err) {
            console.log("[Server Action (fetchDockets)] Database error during docket creation: ", err);
            const msg = getPrismaErrorMessage(err);
            return { 
                success: false, 
                data: null, 
                message: msg
            }
        } 
    } catch (err) {
        console.error("[Server Action (fetchDockets)] Error: ", err);
        return { 
            success: false, 
            data: null, 
            message: "Something went wrong. Please try again later" 
        }
    }
}