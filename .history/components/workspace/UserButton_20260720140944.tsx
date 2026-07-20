import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { auth } from "@/auth";
import { Badge } from "../ui/badge";
import { getInitials } from "@/lib/utils";

export default async function UserButton() {
    const session = await auth();
    return (
        <div className="flex flex-col items-start gap-1">
            <Link
                href="/account"
                className={buttonVariants({ variant: "ghost", size: "lg", className: "py-5" })}
            >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                    {getInitials(session?.user?.name ?? "User")}
                </span>
                <span className="hidden sm:inline">{session?.user?.name ?? "User"}</span>
                
                <Badge variant="outline" className="ml-2 text-xs">
                    Free Plan · <span className="font-mono">0/3 cases</span>
                </Badge>
            </Link>
        </div>
    )
}