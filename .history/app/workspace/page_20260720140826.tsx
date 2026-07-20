import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import CasesGrid from "@/components/workspace/CasesGrid";
import TotalCasesLabel from "@/components/workspace/TotalCasesLabel";
import CaseSearchInput from "@/components/workspace/CaseSearchInput";
import UserButton from "@/components/workspace/UserButton";

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
                        <UserButton />
                    </div>
                    <CaseSearchInput />
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
                <div className="mb-6 flex items-baseline justify-between">
                    <TotalCasesLabel />
                    <span className="text-[11px] uppercase text-muted-foreground">
                        Updated Jul 19, 2026
                    </span>
                </div>

                <CasesGrid />
            </main>
        </div>
    );
}