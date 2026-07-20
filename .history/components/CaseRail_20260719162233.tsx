
import { MessageSquare, FileText, Users, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
    caseId: string;
}

export function CaseRail({ caseId }: Props) {
    const pathname = usePathname()
    const isExhibits = pathname.includes("/exhibits");
    const isParties = pathname.includes("/parties");

    return (
        <>
            {/* Desktop / tablet: vertical rail on left edge */}
            <nav
                aria-label="Case sections"
                className="hidden md:flex fixed left-0 top-0 bottom-0 z-20 w-14 flex-col items-center gap-1 border-r border-border bg-sidebar py-4"
            >
                <Link
                    to="/"
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-manila/50"
                    aria-label="Back to workspace"
                >
                    <span className="font-heading text-lg font-semibold">DM</span>
                </Link>

                <button
                    type="button"
                    disabled
                    aria-label="Chat (coming soon)"
                    title="Chat — coming soon"
                    className="binder-tab cursor-not-allowed opacity-45"
                >
                    <MessageSquare className="h-4 w-4" />
                    <Lock className="absolute right-1 top-1 h-2.5 w-2.5" />
                </button>

                <Link
                    href="/case/$caseId/exhibits"
                    className={cn("binder-tab")}
                    data-active={isExhibits}
                    aria-label="Exhibits"
                    aria-current={isExhibits ? "page" : undefined}
                >
                    <FileText className="h-4 w-4" />
                </Link>

                <Link
                    href="/case/$caseId/parties"
                    className={cn("binder-tab")}
                    data-active={isParties}
                    aria-label="Parties"
                    aria-current={isParties ? "page" : undefined}
                >
                    <Users className="h-4 w-4" />
                </Link>

                <div className="mt-auto">
                    <Link
                        href="/account"
                        className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-manila/50 hover:text-foreground"
                        aria-label="Account"
                    >
                        <span className="font-mono text-[10px] uppercase tracking-wider">Acct</span>
                    </Link>
                </div>
            </nav>

            {/* Mobile: bottom bar */}
            <nav
                aria-label="Case sections"
                className="md:hidden fixed inset-x-0 bottom-0 z-20 flex items-stretch border-t border-border bg-sidebar/95 backdrop-blur"
            >
                <Link href="/" className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="font-heading text-base text-primary">DM</span>
                </Link>
                <button
                    type="button"
                    disabled
                    className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] uppercase tracking-wider text-muted-foreground opacity-45"
                >
                    <MessageSquare className="h-4 w-4" />
                    Chat
                </button>
                <Link
                    to="/case/$caseId/exhibits"
                    params={{ caseId }}
                    className={cn(
                        "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] uppercase tracking-wider",
                        isExhibits ? "text-foreground bg-manila/40" : "text-muted-foreground",
                    )}
                >
                    <FileText className="h-4 w-4" />
                    Exhibits
                </Link>
                <Link
                    to="/case/$caseId/parties"
                    params={{ caseId }}
                    className={cn(
                        "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] uppercase tracking-wider",
                        isParties ? "text-foreground bg-manila/40" : "text-muted-foreground",
                    )}
                >
                    <Users className="h-4 w-4" />
                    Parties
                </Link>
                <Link to="/account" className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="font-mono text-[10px]">Acct</span>
                </Link>
            </nav>
        </>
    );
}
