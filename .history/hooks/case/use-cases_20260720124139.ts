"use client"
import { fetchCases, fetchDockets } from "@/app/workspace/_actions"
import { useInfiniteQuery } from "@tanstack/react-query"
import useDocketSearch from "./use-case-search";
import useCaseSearch from "./use-case-search";

export default function useCases() {
    const search = useCaseSearch()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isFetchNextPageError,
    } = useInfiniteQuery({
        queryKey: ["cases", search],
        queryFn: async ({ pageParam }) => {
            const result = await fetchCases({ cursor: pageParam, limit: 12, search })
            if (!result.success) throw new Error(result.message)
            return result.data
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    });

    const cases = data?.pages.flatMap((page) => page?.items ?? []) ?? [];
    return { 
        isPending, 
        hasNextPage, 
       cases, 
        isFetchingNextPage, 
        isFetchNextPageError,
        fetchNextPage 
    }
}