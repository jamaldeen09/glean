import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { auth } from "@/auth";
import { getInitials } from "@/lib/utils";

export default async function UserButton() {
    const session = await auth();
    return (
        <Link
            href="/account"
            className={buttonVariants({ variant: "ghost", size: "lg", className: "py-6 gap-2" })}
        >
            {/* Avatar: Visible always */}
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {getInitials(session?.user?.name ?? "User")}
            </span>

            {/* Info: Hidden on mobile, Stacked on desktop */}
            <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-medium">
                    {session?.user?.name ?? "User"}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.14em]e tracking-wide">
                    Free Plan
                </span>
            </div>
        </Link>
    )
}