"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import OpenCase from "../dialogs/OpenCase";

export default function OpenCaseButton() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li>
            <Button
            onClick={() => }
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

        <OpenCase open={isOpen} onOpenChange={(val) => setIsOpen(val)}/>
        </li>
    )
}