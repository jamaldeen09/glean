import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub],
    callbacks: {
        authorized: ({ request, auth }) => {
            const pathname = request.nextUrl.pathname;
            const isAuthenticated = !!auth?.user;

            // If it's the home page anyone has access to it
            if (pathname === "/") return true;
            return isAuthenticated;
        }
    },

    debug: true,
})