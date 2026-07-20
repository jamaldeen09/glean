"use client"
import { fetchDockets } from "@/app/workspace/_actions"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useDockets(search?: string) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isFetching
    } = useInfiniteQuery({
        queryKey: ["dockets", search],
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
        isFetchingNextPage, 
        fetchNextPage 
    }
}