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
        queryFn: ({ pageParam }) => fetchDockets({ cursor: pageParam, limit: 12 }),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
    });

    return { isPending, hasNextPage, data }
}