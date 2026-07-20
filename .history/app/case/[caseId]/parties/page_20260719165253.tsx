import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, StickyNote } from "lucide-react";
import { findCase, type Party } from "@/lib/data";

interface PageProps {
  params: {
    caseId: string;
  };
}

function initials(name: string) {
  return name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();
}

export default async function PartiesListPage({ params }: PageProps) {
  const { caseId } = params;
  const c = findCase(caseId);
  if (!c) notFound();

  const parties = c.parties;

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">Section 03</div>
          <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight">Parties</h2>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {parties.length} on record
        </div>
      </div>

      <ul className="divide-y divide-border rounded-md border border-border bg-card">
        {parties.map((p: Party) => (
          <li key={p.id}>
            <Link
              href={`/case/${caseId}/parties/${p.id}`}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4 px-4 py-4 transition-colors hover:bg-manila/30 focus:outline-none focus-visible:bg-manila/30 sm:px-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-xs font-medium text-foreground">
                {initials(p.name)}
              </span>
              <div className="min-w-0">
                <div className="truncate font-heading text-base font-semibold">{p.name}</div>
                <div className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <StickyNote className="h-3 w-3" />
                  {p.notes.length} {p.notes.length === 1 ? "note" : "notes"}
                </div>
              </div>
              <RoleBadge role={p.role} />
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}