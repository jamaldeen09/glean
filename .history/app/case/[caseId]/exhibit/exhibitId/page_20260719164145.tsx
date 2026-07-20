import { notFound } from "next/navigation";
import { findCase } from "@/lib/data";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function ExhibitPage({ params }: { params: Promise<{ caseId: string, exhibitId: string }> }) {
    const { caseId, exhibitId } = await params;
    const c = findCase(caseId);
    const exhibit = c?.exhibits.find((x) => x.id === exhibitId);

    if (!c || !exhibit) notFound();

    // Note: To retain the interactive page switching (useState), 
    // you must define a "use client" component (e.g., ExhibitViewerClient) 
    // and import it here, passing 'exhibit' as a prop.
    return <ExhibitViewerClient exhibit={exhibit} caseId={caseId} />;
}