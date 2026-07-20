import * as z from "zod";

export const docketSchema = z.object({
  client: z
    .string()
    .trim()
    .min(2, { error: "Client name must be at least 2 characters" })
    .max(200, { error: "Client name cannot exceed 200 characters" }),

  court: z
    .string()
    .trim()
    .min(2, { error: "Court must be at least 2 characters" })
    .max(200, { error: "Court cannot exceed 200 characters" }),

  title: z
    .string()
    .trim()
    .min(3, { error: "Title must be at least 3 characters" })
    .max(200, { error: "Title cannot exceed 200 characters" }),

  description: z
    .string()
    .trim()
    .max(1000, { error: "Description cannot exceed 1000 characters" })
    .optional(),
})