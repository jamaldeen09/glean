import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, StickyNote } from "lucide-react";
import { findCase, type Party } from "@/lib/data";
import { RoleBadge } from "@/components/RoleBadge";

interface PageProps {
  params: {
    caseId: string;
    partyId: string;
  };
}

export default async function PartyDetailPage({ params }: PageProps) {
  const { caseId, partyId } = params;
  const c = findCase(caseId);
  if (!c) notFound();

  const party = c.parties.find((x) => x.id === partyId);
  if (!party) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <Link
        href={`/case/${caseId}/parties`}
        className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> All parties
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-6">
        <div className="min-w-0">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
            Party of record
          </div>
          <h2 className="mt-1 font-heading text-3xl font-semibold tracking-tight">{party.name}</h2>
        </div>
        <RoleBadge role={party.role} />
      </header>

      <section className="mt-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Attorney notes
          </h3>
          <button
            type="button"
            className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-foreground hover:bg-manila/40"
          >
            + Add note
          </button>
        </div>

        {party.notes.length === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-card/40 p-8 text-center">
            <StickyNote className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No notes on this party yet.</p>
          </div>
        ) : (
          <ol className="space-y-4">
            {party.notes.map((n: Party["notes"][number]) => (
              <li key={n.id} className="relative rounded-sm border border-paper-edge bg-paper p-5 shadow-[0_1px_0_oklch(1_0_0_/_0.5)_inset,_0_1px_2px_oklch(0_0_0_/_0.03)]">
                <div className="redline-margin -mx-5 -my-5 px-5 py-5">
                  <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>Note · {n.id.toUpperCase()}</span>
                    <span>{n.createdAt}</span>
                  </div>
                  <p className="font-serif text-[15px] leading-[1.75] text-foreground">{n.body}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}