"use client"
import useDockets from "@/hooks/docket/use-dockets";
import OpenCaseButton from "./OpenCaseButton";
import { CaseCard, CaseCardSkeleton } from "./CaseCard";

export default function CasesGrid() {
    const { isPending, data } = useDockets();
    const skeletons = Array.from({ length: 12 }).map((_, i) => (<CaseCardSkeleton key={i} />));
    const dockets = data?.pages.flatMap((page) => page?.items ?? []) ?? [];
    return (
        <ul className="grid gap-x-5 gap-y-9 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            <OpenCaseButton />
            {isPending ? skeletons : (dockets.map((d) => <CaseCard case={d} />))}
            {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
        </ul>
    )
}