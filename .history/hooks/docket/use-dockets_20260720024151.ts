"use client"
import { fetchDockets } from "@/app/workspace/_actions"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useDockets() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfiniteQuery({
        queryKey: ["dockets"],
        queryFn: async ({ pageParam }) => {
            const result = await fetchDockets({ cursor: pageParam, limit: 12 })
            if (!result.success) throw new Error(result.message)
            return result.data
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    });

    return { 
        isPending, 
        hasNextPage, 
        data, 
        isFetchingNextPage, fetchNextPage }
}