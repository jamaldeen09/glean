"use client"
import QueryProvider from "@/providers/QueryProvider"
import { QueryClientProvider } from "@tanstack/react-query"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}