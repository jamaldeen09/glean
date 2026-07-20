import { Prisma, PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is missing in environment variables");

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Create the Pool
const pool = new Pool({ connectionString });

// Pass the pool to the adapter
const adapter = new PrismaPg(pool);

// Initialize the client with the adapter
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma

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