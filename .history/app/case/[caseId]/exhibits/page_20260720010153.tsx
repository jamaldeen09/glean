import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { findCase, type Exhibit } from "@/lib/data";

interface PageProps {
  params: {
    caseId: string;
  };
}

export default async function ExhibitsListPage({ params }: PageProps) {
  const { caseId } = params;
  const c = findCase(caseId);
  console.log("Case:", c);


  if (!c) 
    notFound();

  const exhibits = c.exhibits;
  const totalPages = exhibits.reduce((n: number, e: Exhibit) => n + e.pages.length, 0);
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">Section 02</div>
          <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight">Exhibits</h2>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {exhibits.length} exhibits · {totalPages} pages
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {exhibits.map((e: Exhibit) => (
          <li key={e.id}>
            <Link
              href={`/case/${caseId}/exhibits/${e.id}`}
              className="group grid grid-cols-[64px_minmax(0,1fr)_auto] gap-4 rounded-md border border-border bg-card p-4 shadow-[0_1px_0_oklch(1_0_0_/_0.6)_inset,_0_1px_2px_oklch(0_0_0_/_0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_1px_0_oklch(1_0_0_/_0.6)_inset,_0_10px_28px_-14px_oklch(0_0_0_/_0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Cover thumbnail */}
              <div className="relative flex h-20 w-16 items-end justify-center overflow-hidden rounded-sm border border-paper-edge bg-paper redline-margin">
                <div className="absolute inset-0 ruled opacity-70" />
                <div className="relative z-10 pb-1.5 font-heading text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {e.label.replace("Exhibit ", "")}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  {e.label}
                  <span className="text-border">·</span>
                  {e.kind}
                </div>
                <h3 className="mt-1 truncate font-heading text-lg font-semibold leading-snug">{e.title}</h3>
                <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">{e.description}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  {e.pages.length} pages
                </div>
              </div>

              <ChevronRight className="mt-1 h-4 w-4 self-start text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}