"use client"

import { cn } from "@/lib/utils";
import { Bookmark, Radar } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Swap this out for real session data once/if auth exists.
// For the demo, this can just be a hardcoded placeholder.
const currentUser = {
    name: "Jamal",
    email: "jamal@glean.dev",
    imageUrl: undefined, // e.g. session?.user?.image
};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function Header() {
    const pathname = usePathname();
    const { push } = useRouter();
    const savedCount = 0;

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <Radar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold tracking-tight text-foreground">Glean</span>
                    <span className="text-[11px] text-muted-foreground/60 font-mono-tight">v0.1</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    size="lg"
                    onClick={() => push("/home/leads")}
                >
                    <Bookmark className={cn(pathname === "/home/leads" && "fill-current")} />
                    Saved
                    {savedCount > 0 && (
                        <span className="text-[10px] text-muted-foreground/50">{savedCount}</span>
                    )}
                </Button>

                <div className="flex items-center gap-2 pl-3 border-l border-border/60">
                    <Avatar className="h-7 w-7">
                        <AvatarImage src={currentUser.imageUrl} alt={currentUser.name} />
                        <AvatarFallback className="text-[11px] bg-primary/10 text-primary">
                            {getInitials(currentUser.name)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground hidden sm:inline">
                        {currentUser.name}
                    </span>
                </div>
            </div>
        </header>
    );
}