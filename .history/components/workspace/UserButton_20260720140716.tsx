import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { auth } from "@/auth";

export default async function UserButton() {
    const session = await auth();
    return (
        

<div className="flex flex-col items-start gap-1">
<Link href="/account" className={buttonVariants({ variant: "ghost", size: "lg", className: "py-5" })}>
  {/* ... avatar + name ... */}
</Link>
<Badge variant="outline" className="ml-2 text-xs">
  Free Plan · <span className="font-mono">0/3 cases</span>
</Badge>
</div>
    )
}