"use client"
import { QueryClientProvider } from "@tanstack/react-query"

export default function P () {
    
    return (
        <QueryClientProvider client={queryClient}>
            
        </QueryClientProvider>
    )
}