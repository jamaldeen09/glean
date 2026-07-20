import { saveToMemory } from './tools/save-to-memory';
import { createAgent } from "langchain";
import { leanPrompt } from "@/lib/utils";
import { systemPrompt } from "./system-prompt";
import { searchExhibit } from "./tools/search-exhibit";
import { listExhibits } from "./tools/list-exhibits";
import { searchExhibits } from "./tools/search-exhibits";
import { searchPartyNotes } from "./tools/search-party-notes";
import { searchAllPartyNotes } from "./tools/search-all-party-notes";
import { listParties } from "./tools/list-parties";
import { retrieveFromMemory } from './tools/retrieve-from-memory';
import { createPageCitation } from './tools/create-page-citation';
import { createNoteCitation } from './tools/create-note-citation';
import { HumanMessage, AIMessage, ToolMessage } from "@langchain/core/messages";
import { prisma } from '@/prisma';
import { ChatGoogle } from "@langchain/google/node";

// !Note: This was commented because local ollama model
// !!!: was used for testing, it will eventually be removed.
// import { ChatOllama } from "@langchain/ollama"

// const model = new ChatOllama({
//     model: "llama3.2:3b",
//     temperature: 0.6,
// });

// TODO: Switch from google to anthropic in prod
const model = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_AI_API_KEY
});

const agent = createAgent({
    model,
    tools: [
        // Exhibit Related
        searchExhibit,
        listExhibits,
        searchExhibits,

        // Party & Note related
        searchPartyNotes,
        searchAllPartyNotes,
        listParties,

        // Memory related
        saveToMemory,
        retrieveFromMemory,

        // Citation related
        createPageCitation,
        createNoteCitation,
    ],
    systemPrompt: leanPrompt(systemPrompt)
});


// TODO: Change this to stream answers
export async function runAgent({
    caseId,
    chatSessionId,
    userMessage,
}: {
    docketId: string;
    chatSessionId: string;
    userMessage: string;
}) {
    // Load the previous conversation history
    const priorMessages = await prisma.message.findMany({
        where: { chatSessionId },
        orderBy: { createdAt: "asc" },
        include: { agentOutput: true },
    });
    const history = priorMessages.flatMap((m) => [
        new HumanMessage(m.userInput),
        ...(m.agentOutput ? [new AIMessage(m.agentOutput.text)] : []),
    ]);

    let result;
    try {
        // Invoke the agent and attach it's result to the result
        // variable
        result = await agent.invoke(
            { messages: [...history, new HumanMessage(userMessage)] },
            { configurable: { docketId } }
        );
    } catch (err) {
        console.error("[runAgent] Agent execution failed:", err);

        // IF an agent output failed to generate still create
        // the message just without a connected output
        await prisma.message.create({
            data: { chatSessionId, userInput: userMessage },
            select: { id: true },
        });

        return {
            success: false,
            answer: null,
            citations: [],
            error: "Something went wrong answering that. Please try again.",
        };
    }

    // Extract the final answer from the result
    const finalMessage = result.messages[result.messages.length - 1];
    const finalAnswer = typeof finalMessage.content === "string" ? finalMessage.content : "";

    // Create an array to store the id's of any
    // citations that were created mid-run
    const citationIds: string[] = [];

    // Loop through ever message in the result
    for (const msg of result.messages) {

        // Find any message related to a tool
        if (msg instanceof ToolMessage) {
            const toolName = (msg as any).name;

            // If the agent created any page_citation or note_citation record
            // previously add the id of the citation to the array
            if (toolName === "create_page_citation" || toolName === "create_note_citation") {
                try {
                    const parsed = typeof msg.content === "string" ? JSON.parse(msg.content) : msg.content;
                    if (parsed?.success && parsed?.data?.citationId)
                        citationIds.push(parsed.data.citationId);
                } catch (err) {
                    console.warn(`[runAgent] Malformed tool output: `, err);
                }
            }
        }
    }

    // Create a brand new message with a brand new
    // agentOutput connected to it
    const message = await prisma.message.create({
        data: {
            chatSessionId,
            userInput: userMessage,
            agentOutput: { create: { text: finalAnswer } },
        },
        include: { agentOutput: true },
    });

    // Create an array to store metadata of each
    // citation the agent created mid-run
    let citations: Array<{ 
        id: string; 
        highlightedText: string; 
        type: "page" | "note" 
    }> = [];

    if (citationIds.length > 0) {
        const [, , pageCitations, noteCitations] = await prisma.$transaction([
            // Now that we have an agentOutput we connect the previously
            // created citations to the agent's output
            prisma.pageCitation.updateMany({
                where: { id: { in: citationIds } },
                data: { agentOutputId: message.agentOutput!.id },
            }),

            // Same thing for note citations
            prisma.noteCitation.updateMany({
                where: { id: { in: citationIds } },
                data: { agentOutputId: message.agentOutput!.id },
            }),

            // Refetch the page citation exclusively for the ui
            prisma.pageCitation.findMany({
                where: { agentOutputId: message.agentOutput!.id },
                select: {
                    id: true,
                    highlightedText: true,
                    pageChunk: {
                        select: {
                            exhibitPage: {
                                select: { 
                                    id: true, 
                                    pageNumber: true, 
                                    exhibit: { select: { title: true } } 
                                },
                            },
                        },
                    },
                },
            }),

            // Same thing for notes
            prisma.noteCitation.findMany({
                where: { agentOutputId: message.agentOutput!.id },
                select: {
                    id: true,
                    highlightedText: true,
                    noteChunk: {
                        select: { note: { select: { id: true, party: { select: { name: true } } } } },
                    },
                },
            }),
        ]);

        // Finally merge both results in the array
        citations = [
            ...pageCitations.map((c) => ({
                id: c.id,
                highlightedText: c.highlightedText,
                type: "page" as const,
                exhibitTitle: c.pageChunk.exhibitPage.exhibit.title,
                pageNumber: c.pageChunk.exhibitPage.pageNumber,
            })),
            ...noteCitations.map((c) => ({
                id: c.id,
                highlightedText: c.highlightedText,
                type: "note" as const,
                partyName: c.noteChunk.note.party.name,
            })),
        ];
    }

    return {
        success: true,
        answer: finalAnswer,
        messageId: message.id,
        citations,
    };
}