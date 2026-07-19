import { runAgent } from "@/agent/main";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session?.user || !session?.user?.id) return NextResponse.json({
            success: false,
            message: "You must be signed in to do that."
        }, { status: 401 });

        const userId = session?.user.id;
        const body = await req.json();
        const userMessage = body?.message;
        const docketId = body?.docketId;
        const chatSessionId = body?.chatSessionId;

        if (typeof docketId !== "string" || typeof chatSessionId !== "string") {
            return NextResponse.json(
                { success: false, message: "docketId and chatSessionId are required." },
                { status: 400 }
            );
        }

        if (typeof userMessage !== "string" || userMessage.trim().length === 0) {
            return NextResponse.json(
                { success: false, message: "A message is required." },
                { status: 400 }
            );
        }

        const trimmedMessage = userMessage.trim();
        const docket = await prisma.docket.findFirst({
            where: { id: docketId, userId },
            select: { id: true },
        });

        if (!docket) {
            return NextResponse.json(
                { success: false, message: "Case not found." },
                { status: 404 }
            );
        }

        const result = await runAgent({ docketId, chatSessionId, userMessage: trimmedMessage });

        if (!result.success) {
            return NextResponse.json(
                { success: false, message: "Could not get a response. Please try again.", error: result.error },
                { status: 502 } 
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Response generated.",
                data: { answer: result.answer, messageId: result.messageId },
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("[POST /api/agent] Unhandled error:", err);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}