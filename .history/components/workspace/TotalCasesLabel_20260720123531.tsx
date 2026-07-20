"use client"
import useDockets from "@/hooks/case/use-dockets"

export default function TotalCasesLabel() {
    const { dockets } = useDockets();
    return (
        <h2 className="text-[11px] text-muted-foreground">
            {dockets.length} open matters
        </h2>
    )
}