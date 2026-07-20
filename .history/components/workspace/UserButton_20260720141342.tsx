import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { auth } from "@/auth";
import { Badge } from "../ui/badge";
import { getInitials } from "@/lib/utils";

export default async function UserButton() {
    const session = await auth();
    return (
        <Link
        href="/account"
        className="flex items-center gap-3 rounded-lg border border-border/50 bg-paper p-2 pr-4 transition-all hover:bg-muted/50"
      >
        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
          {getInitials(session?.user?.name ?? "User")}
        </div>
        
        {/* Info Stack */}
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium leading-none">
            {session?.user?.name ?? "User"}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Free Plan
          </span>
        </div>
      </Link>
    )
}