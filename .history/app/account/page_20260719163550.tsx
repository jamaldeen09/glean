import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account — DocketMind",
  description: "Manage your DocketMind profile, firm details, and preferences.",
};

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 py-6 md:grid-cols-[220px_minmax(0,1fr)]">{children}</div>;
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-3.5 w-3.5" /> Workspace
          </Link>
          <div className="mt-4">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">Administration</div>
            <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight">Account</h1>
          </div>
        </div>
      </header>
      {/* ... rest of the component matches your original JSX ... */}
    </div>
  );
}