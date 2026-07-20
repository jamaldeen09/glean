"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Exhibit, ExhibitPage } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ExhibitViewerClientProps {
  caseId: string;
  exhibit: Exhibit;
}

export default function ExhibitViewerClient({ caseId, exhibit }: ExhibitViewerClientProps) {
  const [activeId, setActiveId] = useState(exhibit.pages[0]?.id);
  const activeIndex = exhibit.pages.findIndex((p: ExhibitPage) => p.id === activeId);
  const active = exhibit.pages[activeIndex];

  const prev = exhibit.pages[activeIndex - 1];
  const next = exhibit.pages[activeIndex + 1];

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link
          href={`/case/${caseId}/exhibits`}
          className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> All exhibits
        </Link>
      </div>

      <div className="mb-6">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
          {exhibit.label} · {exhibit.kind}
        </div>
        <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight">{exhibit.title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{exhibit.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Page index */}
        <aside className="order-2 lg:order-1">
          <div className="rounded-md border border-border bg-card">
            <div className="border-b border-border px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              Pages · {exhibit.pages.length}
            </div>
            <div className="p-2">
              <div className="relative mb-2">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Jump to page" className="h-8 pl-7 text-xs" />
              </div>
              <ScrollArea className="h-[420px] pr-1">
                <ul className="space-y-0.5">
                  {exhibit.pages.map((p: ExhibitPage) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(p.id)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs transition-colors",
                          p.id === activeId
                            ? "bg-manila/60 text-foreground"
                            : "text-muted-foreground hover:bg-manila/30 hover:text-foreground",
                        )}
                      >
                        <span className="w-6 shrink-0 font-mono text-[10.5px]">
                          {String(p.number).padStart(3, "0")}
                        </span>
                        <span className="truncate">{p.title ?? `Page ${p.number}`}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </aside>

        {/* Page canvas */}
        <div className="order-1 lg:order-2">
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>
              Page {active?.number} / {exhibit.pages.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={!prev}
                onClick={() => prev && setActiveId(prev.id)}
                className="inline-flex items-center gap-1 rounded-sm border border-border bg-background px-2 py-1 disabled:opacity-40 hover:bg-manila/30"
              >
                <ChevronLeft className="h-3 w-3" /> Prev
              </button>
              <button
                type="button"
                disabled={!next}
                onClick={() => next && setActiveId(next.id)}
                className="inline-flex items-center gap-1 rounded-sm border border-border bg-background px-2 py-1 disabled:opacity-40 hover:bg-manila/30"
              >
                Next <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {active && (
            <article
              id={`page-${active.number}`}
              className="relative rounded-sm border border-paper-edge bg-paper shadow-[0_1px_2px_oklch(0_0_0_/_0.04),_0_20px_60px_-30px_oklch(0_0_0_/_0.25)]"
            >
              <div className="border-b border-dashed border-border/70 px-8 pb-4 pt-6 sm:px-12">
                <div className="flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{exhibit.label}</span>
                  <span>Page {active.number}</span>
                </div>
                {active.title && (
                  <h3 className="mt-2 font-heading text-xl font-semibold">{active.title}</h3>
                )}
              </div>
              <div className="redline-margin px-8 py-8 sm:px-12 sm:py-10">
                <div className="mx-auto max-w-[62ch] whitespace-pre-line font-serif text-[15.5px] leading-[1.85] text-foreground">
                  {active.body}
                </div>
              </div>
              <div className="border-t border-dashed border-border/70 px-8 py-3 text-center font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground sm:px-12">
                — {String(active.number).padStart(3, "0")} —
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}