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

export function getTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  // Define time units in seconds
  const intervals: { [unit: string]: number } = {
    year: 31536000,
    month: 2592000, // 30 * 24 * 60 * 60
    week: 604800,   // 7 * 24 * 60 * 60
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // Determine the largest applicable unit
  let unit: keyof typeof intervals | 'second' = 'second';
  let value = diffSec;

  if (diffSec < 10) {
    return 'just now';
  }

  for (const [name, seconds] of Object.entries(intervals)) {
    if (diffSec >= seconds) {
      unit = name as keyof typeof intervals;
      value = Math.floor(diffSec / seconds);
      break;
    }
  }

  // Handle singular/plural
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  // We pass negative value for "ago" (past)
  return rtf.format(-value, unit);
}