import { notFound } from "next/navigation";
import { findCase } from "@/lib/data";
import ExhibitViewerClient from "./ExhibitViewerClient";

interface PageProps {
  params: {
    caseId: string;
    exhibitId: string;
  };
}

export default async function ExhibitPage({ params }: PageProps) {
  const { caseId, exhibitId } = params;
  const c = findCase(caseId);
  if (!c) notFound();

  const exhibit = c.exhibits.find((x) => x.id === exhibitId);
  if (!exhibit) notFound();

  return <ExhibitViewerClient caseId={caseId} exhibit={exhibit} />;
}