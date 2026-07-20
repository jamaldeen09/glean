import Link from "next/link";
import { Plus, Search, Files, Users } from "lucide-react";
import { CASES } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import CaseCard from "@/components/workspace/CaseCard";

export const metadata = {
    title: "Workspace — DocketMind",
    description: "All your open cases, one folder per matter.",
};

const statusTone: Record<string, string> = {
    active: "text-primary",
    closed: "text-muted-foreground",
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
                            className={buttonVariants({ variant: "ghost", size: "lg", className: "py-5" })}
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

                    <li>
                        <Button
                            className="min-h-[220px] w-full flex-col gap-3 border-dashed px-4"
                            variant="ghost"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
                                <Plus className="h-5 w-5" />
                            </span>
                            <span className="font-heading text-lg">Open a new case</span>
                            <span className="max-w-[85%] whitespace-normal break-words text-center text-xs leading-relaxed text-muted-foreground">
                                Start a folder, drop in discovery, and DocketMind indexes every page.
                            </span>
                        </Button>
                    </li>

                    {[].map((case) => <CaseCard case={case}/>)}
                </ul>
            </main>
        </div>
    );
}