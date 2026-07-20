"use client"
import { QueryClientProvider } from "@tanstack/react-query"

export default function Providers () {
    return (
        <QueryClientProvider client={queryClient}>
            
        </QueryClientProvider>
    )
}