import { splitIntoChunks } from "../utils";
import { prisma } from "@/prisma";
import { createId } from "@paralleldrive/cuid2";
import embed from "../embed";

export async function createNoteChunks(noteId: string, content: string) {
  const texts = splitIntoChunks(content);
  if (texts.length === 0) return [];
  const embeddings = (await Promise.all(texts.map(embed))).map((r) => r.data?.vector ?? []);

  return Promise.all(
    texts.map((text, i) => {
      const vectorStr = `[${embeddings[i].join(",")}]`;
      return prisma.$executeRaw`
      INSERT INTO "NoteChunk" (id, "noteId", text, embedding, "createdAt")
      VALUES (${createId()} ${noteId}, ${text}, ${vectorStr}::vector, now())
    `;
    })
  );
}