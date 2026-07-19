import { createId } from "@paralleldrive/cuid2";
import { splitIntoChunks } from "../utils";
import { prisma } from "@/prisma";
import embed from "../embed";

export async function createPageChunks(pageId: string, content: string) {
  const texts = splitIntoChunks(content);
  if (texts.length === 0) return [];
  const embeddings = (await Promise.all(texts.map(embed))).map((r) => r.data?.vector ?? []);

  return Promise.all(
    texts.map((text, i) => {
      const vectorStr = `[${embeddings[i].join(",")}]`;
      return prisma.$executeRaw`
      INSERT INTO "PageChunk" (id, "exhibit_page_id", text, embedding, "createdAt")
      VALUES (${createId()},${pageId}, ${text}, ${vectorStr}::vector, now())
    `;
    })
  );
}