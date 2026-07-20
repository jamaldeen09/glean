import Link from "next/link";
import { Plus, Search, Files, Users } from "lucide-react";
import { CASES } from "@/lib/data";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Workspace — DocketMind",
  description: "All your open cases, one folder per matter.",
};

const statusTone: Record<string, string> = {
  Active: "text-primary",
  Discovery: "text-foreground",
  Pretrial: "text-[color-mix(in_oklab,var(--color-redline)_70%,var(--color-foreground))]",
  Closed: "text-muted-foreground",
};

export default function Workspace() {
  return (
    <div className="min-h-screen bg-background">
      {/* Masthead */}
      <header className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-8 pt-10 sm:pt-14">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                Docket · No. 001
              </div>
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Workspace
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Every open matter on your desk. Each folder holds the full discovery record — exhibits, parties, and every cited page.
              </p>
            </div>
            <Link
              href="/account"
              className="shrink-0 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm hover:bg-manila/40"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">EC</span>
              <span className="hidden sm:inline">Elena Cardoza</span>
            </Link>
          </div>

          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cases, case numbers, or clients…"
              className="pl-9 bg-background/60"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {CASES.length} open matters
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Updated Jul 19, 2026
          </span>
        </div>

        <ul className="grid gap-x-5 gap-y-9 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <li key={c.id}>
              <Link
                href={`/case/${c.id}/exhibits`}
                className="folder-card folder-card-hover block p-5 pt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="folder-tab">
                  <span className={statusTone[c.status]}>●</span>
                  {c.status}
                </span>

                <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.number}
                </div>
                <h3 className="mt-2 font-heading text-[22px] font-semibold leading-tight tracking-tight text-foreground">
                  {c.title}
                </h3>

                <dl className="mt-4 space-y-1.5 text-[13px]">
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-muted-foreground">Client</dt>
                    <dd className="truncate text-foreground">{c.client}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-muted-foreground">Court</dt>
                    <dd className="truncate text-foreground">{c.court}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center justify-between border-t border-dashed border-border pt-3 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Files className="h-3.5 w-3.5" />
                    {c.exhibits.length} exhibits
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {c.parties.length} parties
                  </span>
                  <span>{c.updatedAt}</span>
                </div>
              </Link>
            </li>
          ))}

          <li>
            <button
              type="button"
              className="folder-card folder-card-hover flex min-h-[220px] w-full flex-col items-center justify-center gap-3 border-dashed p-5 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ background: "transparent" }}
            >
              <span className="folder-tab" style={{ background: "transparent", borderStyle: "dashed" }}>
                New
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
                <Plus className="h-5 w-5" />
              </span>
              <span className="font-heading text-lg">Open a new case</span>
              <span className="max-w-[220px] text-center text-xs text-muted-foreground">
                Start a folder, drop in discovery, and DocketMind indexes every page.
              </span>
            </button>
          </li>
        </ul>
      </main>
    </div>
  );
}