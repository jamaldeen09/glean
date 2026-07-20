"use client"
import useDockets from "@/hooks/docket/use-dockets";
import OpenCaseButton from "./OpenCaseButton";
import { CaseCard, CaseCardSkeleton } from "./CaseCard";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

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
            {!isPending ? skeletons : (dockets.map((d) => <CaseCard case={d} />))}

            {isFetchNextPageError && (
                <p className="mt-4 text-center text-sm text-destructive">
                    Couldn't load more cases. Please try again.
                </p>
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