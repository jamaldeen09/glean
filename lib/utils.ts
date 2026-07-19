import { Prisma } from "@/generated/prisma/client";
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

export function getPrismaErrorMessage(error: unknown, fallbackMessage?: string): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        const field = (error.meta?.target as string[])?.[0];
        return field
          ? `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. Please use a different value.`
          : 'A record with this value already exists.';

      case 'P2003':
        return 'This record is referenced by other data and cannot be deleted.';

      case 'P2001':
      case 'P2025':
        return 'The requested record was not found.';

      case 'P2011':
        const fieldName = error.meta?.field_name as string;
        return fieldName
          ? `${fieldName} is required.`
          : 'A required field is missing.';

      case 'P2006':
        return 'Invalid data type provided. Please check your input.';

      case 'P2024':
        return 'Database is busy. Please try again in a moment.';

      case 'P2030':
        return 'Too many requests. Please try again later.';

      case 'P1000':
      case 'P1001':
      case 'P1002':
        return 'Database connection failed. Please try again later.';

      case 'P2023':
        return 'Query took too long. Please try a simpler request.';

      default:
        return `Database error: ${error.message}`;
    }
  }

  // Handle Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return 'Invalid data provided. Please check your input.';
  }

  // Handle Prisma initialization errors
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return 'Failed to connect to database. Please check your connection.';
  }

  // Handle Prisma Rust panic
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return 'A critical database error occurred. Please try again.';
  }

  // Fallback
  return fallbackMessage ?? 'An unexpected error occurred.';
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