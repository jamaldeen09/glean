"use server"
import { auth } from "@/auth";
import { CaseFile, CaseStatus } from "@/generated/prisma/client";
import { caseSchema } from "@/lib/schemas/case-schema";
import { getPrismaErrorMessage, prisma } from "@/prisma";

export type CreateCaseArgs = Omit<CaseFile, "createdAt" | "updatedAt" | "userId" | "id" | "status" | "description" | "number"> & {
    description?: string;
    number?: string;
};

export const createCase = async (args: CreateCaseArgs) => {
    try {
        const session = await auth();
        if (!session?.user?.id) return {
            success: false,
            message: "Unauthorized. Please sign in and try again"
        }

        // Extract the user's id
        const userId = session.user.id;

        // Validate the data passed in
        const result = caseSchema.safeParse(args);

        if (!result.success) return {
            success: false,
            data: null,
            message: "Validation failed",
            error: { validationErrors: result.error.flatten() }
        };

        try {
            const caseRecord = await prisma.caseFile.create({
                data: { ...args, userId },
                select: { id: true }
            });

            return {
                success: true,
                message: "You have successfully opened a new case",
                data: { caseId: caseRecord.id }
            }
        } catch (err) {
            console.log("[Server Action (createCase)] Database error during case creation: ", err);
            const fallback = "An unexpected error occured while attempting to create a new case."
            const msg = getPrismaErrorMessage(err, fallback);
            return {
                success: false,
                data: null,
                message: msg
            }
        }
    } catch (err) {
        console.error("[Server Action (createCase)] Error: ", err);
        return {
            success: false,
            data: null,
            message: "Something went wrong. Please try again later"
        }
    }
}
export interface CaseMetadata {
    id: string;
    number: string | null;
    title: string;
    client: string;
    court: string;
    status: CaseStatus;
    totalExhibits: number;
    totalParties: number;
    updatedAt: string;
};

export const fetchCases = async (args: {
    cursor?: string;
    limit?: number;
    search?: string
}) => {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, data: null, message: "Unauthorized. Please sign in and try again" };
        }
        const userId = session.user.id;
        const limit = args.limit ?? 12;
        const search = args.search?.trim();

        try {
            const cases = await prisma.caseFile.findMany({
                where: {
                    userId,
                    ...(search
                        ? {
                            OR: [
                                { title: { contains: search, mode: "insensitive" } },
                                { number: { contains: search, mode: "insensitive" } },
                                { client: { contains: search, mode: "insensitive" } },
                            ],
                        }
                        : {}),
                },
                orderBy: { createdAt: "desc" },
                take: limit + 1,
                ...(args.cursor ? { cursor: { id: args.cursor }, skip: 1 } : {}),
                select: {
                    id: true,
                    number: true,
                    title: true,
                    client: true,
                    court: true,
                    status: true,
                    updatedAt: true,
                    _count: {
                        select: { exhibits: true, parties: true },
                    }
                }
            });

            const formattedCases = cases.map((d): CaseMetadata => ({
                id: d.id,
                title: d.title,
                number: d.number,
                client: d.client,
                court: d.court,
                status: d.status,
                updatedAt: d.updatedAt.toISOString(),
                totalExhibits: d._count.exhibits,
                totalParties: d._count.parties,
            }));

            const hasMore = formattedCases.length > limit;
            const items = hasMore ? formattedCases.slice(0, limit) : formattedCases;
            const nextCursor = hasMore ? items[items.length - 1].id : null;
            return {
                success: true,
                data: { items, nextCursor }
            };
        } catch (err) {
            console.error("[Server Action (fetchCases)] Database error:", err);
            return {
                success: false,
                data: null,
                message: getPrismaErrorMessage(err)
            };
        }
    } catch (err) {
        console.error("[Server Action (fetchCases)] Error:", err);
        return { success: false, data: null, message: "Something went wrong. Please try again later" };
    }
};

export const editCase = async (args: Partial<Omit<CaseMetadata, "totalExhibits" | "totalParties" | "updatedAt">>) => {
    try {

    } catch (err) {
        console.error("[Server Action (editCase)] Error:", err);
        return { success: false, data: null, message: "Something went wrong. Please try again later" };
    }
}
