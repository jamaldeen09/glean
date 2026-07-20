"use client"
import useCases from "@/hooks/case/use-cases";
import useDockets from "@/hooks/case/use-cases"

export default function TotalCasesLabel() {
    const { cases } = useCases();
    return (
        <h2 className="text-[11px] text-muted-foreground">
            {dockets.length} open matters
        </h2>
    )
}