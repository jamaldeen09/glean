"use client"
import QueryProvider from "@/providers/QueryProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}