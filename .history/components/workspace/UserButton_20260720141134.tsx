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
  className="group flex w-full items-center gap-3 rounded-lg border border-border/50 bg-background p-3 transition-colors hover:bg-muted/50"
>
  {/* Avatar Section */}
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground shadow-sm">
    {getInitials(session?.user?.name ?? "User")}
  </div>

  {/* Info Section */}
  <div className="flex min-w-0 flex-col justify-center">
    <span className="truncate text-sm font-medium leading-none">
      {session?.user?.name ?? "User"}
    </span>
    
    <div className="mt-1.5 flex items-center gap-2">
      <Badge variant="secondary" className="h-5 rounded-sm px-1.5 text-[10px] font-normal">
        Free
      </Badge>
      <span className="truncate text-[11px] text-muted-foreground font-mono">
        0/3 cases
      </span>
    </div>
  </div>
</Link>
    )
}