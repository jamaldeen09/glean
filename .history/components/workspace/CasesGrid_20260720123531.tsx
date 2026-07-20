"use client"
import useDockets from "@/hooks/case/use-dockets";
import OpenCaseButton from "./OpenCaseButton";
import { CaseCard, CaseCardSkeleton } from "./CaseCard";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Card } from "../ui/card";
import { AlertCircle } from "lucide-react";

export default function CasesGrid() {
    const {
        isPending,
        dockets,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetchNextPageError,
    } = useDockets();
    const skeletons = Array.from({ length: 2 }).map((_, i) => (<CaseCardSkeleton key={i} />));
    return (
        <ul className="grid gap-x-5 gap-y-9 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            <OpenCaseButton />
            {isPending ? skeletons : (dockets.map((d) => <CaseCard key={d.id} case={d} />))}

            {isFetchNextPageError && (
                <Card
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 px-6"
                    role="button"
                    tabIndex={0}
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
                        <AlertCircle className="h-5 w-5" />
                    </span>
                    <span className="font-heading text-lg">Couldn't load more</span>
                    <span className="max-w-[85%] whitespace-normal break-words text-center text-xs leading-relaxed text-muted-foreground">
                        Something went wrong fetching the next set of cases.
                    </span>
                    <Button
                        disabled={isFetchingNextPage}
                        variant="destructive"
                        onClick={() => fetchNextPage()}
                    >
                        {isFetchingNextPage ? (<Spinner />) : "Retry"}
                    </Button>
                </Card>
            )}

            {/* Load more button */}
            {hasNextPage && (
                <div className="mt-8 flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading..." : "Load more"}
                        {isFetchingNextPage && <Spinner />}
                    </Button>
                </div>
            )}
        </ul>
    )
}