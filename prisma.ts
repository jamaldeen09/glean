import { PrismaClient } from "./generated/prisma/client"
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