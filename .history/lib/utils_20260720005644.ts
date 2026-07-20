import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function leanPrompt(prompt: string) {
  return prompt.replace(/\s+/g, ' ').trim();
}


export function splitIntoChunks(text: string): string[] {
  if (!text?.trim()) return [];
  const MAX_CHUNK_CHARS = 800; 
  const CHUNK_OVERLAP = 100;

  // Split on paragraph boundaries first, so related sentences stay together
  // rather than getting cut mid-thought.
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const chunks: string[] = [];
  let current = "";

  for (const para of paragraphs) {
    if ((current + " " + para).length <= MAX_CHUNK_CHARS) {
      current = current ? `${current} ${para}` : para;
      continue;
    }
    if (current) chunks.push(current);

    if (para.length > MAX_CHUNK_CHARS) {
      // A single paragraph too long on its own — hard-split with overlap.
      let start = 0;
      while (start < para.length) {
        const end = Math.min(start + MAX_CHUNK_CHARS, para.length);
        chunks.push(para.slice(start, end));
        start = end - CHUNK_OVERLAP;
      }
      current = "";
    } else {
      current = para;
    }
  }
  if (current) chunks.push(current);

  return chunks;
}