import Link from "next/link";
import { Plus, Search, Files, Users } from "lucide-react";
import { CASES } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            <header className="border-b border-border/70 bg-paper">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-8 pt-10 sm:pt-14">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
                        <div className="min-w-0">
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
                    <h2 className="text-[11px] text-muted-foreground">
                        {CASES.length} open matters
                    </h2>
                    <span className="text-[11px] uppercase text-muted-foreground">
                        Updated Jul 19, 2026
                    </span>
                </div>

                <ul className="grid gap-x-5 gap-y-9 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {CASES.map((c) => (
                        <li key={c.id}>
                            <Link
                                href={`/case/${c.id}/exhibits`}
                                className="group block"
                            >
                                <Card className="">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {c.number}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                            <span className={`h-1.5 w-1.5 rounded-full ${statusTone[c.status]}`} />
                                            {c.status}
                                        </span>
                                    </CardHeader>

                                    <CardContent>
                                        <CardTitle className="text-lg font-semibold leading-snug tracking-tight">
                                            {c.title}
                                        </CardTitle>

                                        <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                                            <div className="flex gap-2">
                                                <dt className="shrink-0">Client</dt>
                                                <dd className="truncate text-foreground/80">{c.client}</dd>
                                            </div>
                                            <div className="flex gap-2">
                                                <dt className="shrink-0">Court</dt>
                                                <dd className="truncate text-foreground/80">{c.court}</dd>
                                            </div>
                                        </dl>
                                    </CardContent>

                                    <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Files className="h-4 w-4" />
                                            {c.exhibits.length}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Users className="h-4 w-4" />
                                            {c.parties.length}
                                        </span>
                                        <span className="ml-auto text-xs">{c.updatedAt}</span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </li>
                    ))}

                    <li>
                    <Button 
  className="min-h-[220px] w-full flex-col gap-3 border-dashed px-4" 
  variant="ghost"
>
  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
    <Plus className="h-5 w-5" />
  </span>
  <span className="font-heading text-lg">Open a new case</span>
  <span className="max-w-[150px] text-center text-xs text-muted-foreground leading-relaxed break-words">
    Start a folder, drop in discovery, and DocketMind indexes every page.
  </span>
</Button>
                    </li>
                </ul>
            </main>
        </div>
    );
}