import useDockets from "@/hooks/docket/use-dockets";
import OpenCaseButton from "./OpenCaseButton";

export default async function CasesGrid() {
    const { isPending } = useDockets();
    const skeletons = Array.from({ length: 6 }).map((_, i) => (<CaseCardSkeleton key={i} />
    ))
    return (
        <ul className="grid gap-x-5 gap-y-9 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            <OpenCaseButton />
            {isPending ? ()}
        </ul>
    )
}