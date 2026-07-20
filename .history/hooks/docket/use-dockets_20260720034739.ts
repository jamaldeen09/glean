"use client"
import { fetchDockets } from "@/app/workspace/_actions"
import { useInfiniteQuery } from "@tanstack/react-query"
import useDocketSearch from "./use-dockets-search";

export default function useDockets() {
    const search = useDocketSearch()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isFetchNextPageError,
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

    const dockets = data?.pages.flatMap((page) => page?.items ?? []) ?? [];
    return { 
        isPending, 
        hasNextPage, 
        dockets, 
        isFetchingNextPage, 
        isFetchNextPageError,
        fetchNextPage 
    }
}