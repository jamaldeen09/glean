"use client"
import QueryProvider from "@/providers/QueryProvider"
import { ThemeProvider } from "./theme-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryProvider>
    )
}