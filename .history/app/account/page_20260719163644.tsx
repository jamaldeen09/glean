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
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Workspace
        </Link>
        <div className="mt-4">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
            Administration
          </div>
          <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight">Account</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Your profile, firm details, and how DocketMind behaves across your cases.
          </p>
        </div>
      </div>
    </header>

    <main className="mx-auto max-w-3xl px-6 py-8">
      <section>
        <h2 className="font-heading text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">How you appear on filings and shared work product.</p>
        <div className="mt-2 divide-y divide-border rounded-md border border-border bg-card px-5">
          <Row>
            <Label className="pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Photo
            </Label>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                EC
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </Row>
          <Row>
            <Label htmlFor="fullName" className="pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Full name
            </Label>
            <Input id="fullName" defaultValue="Elena Cardoza, Esq." />
          </Row>
          <Row>
            <Label htmlFor="barNumber" className="pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Bar number
            </Label>
            <Input id="barNumber" defaultValue="CA #284117" />
          </Row>
          <Row>
            <Label htmlFor="email" className="pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Email
            </Label>
            <Input id="email" type="email" defaultValue="elena@cardozalaw.com" />
          </Row>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-lg font-semibold">Firm</h2>
        <p className="text-sm text-muted-foreground">Applies to letterhead, exports, and case metadata.</p>
        <div className="mt-2 divide-y divide-border rounded-md border border-border bg-card px-5">
          <Row>
            <Label htmlFor="firm" className="pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Firm name
            </Label>
            <Input id="firm" defaultValue="Cardoza Law, PC" />
          </Row>
          <Row>
            <Label htmlFor="address" className="pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Address
            </Label>
            <Input id="address" defaultValue="410 Grand Ave, Suite 3B" />
          </Row>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-lg font-semibold">Preferences</h2>
        <p className="text-sm text-muted-foreground">Behavior across your workspace.</p>
        <div className="mt-2 divide-y divide-border rounded-md border border-border bg-card px-5">
          <Row>
            <div>
              <Label className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Citation autolink</Label>
              <p className="mt-1 text-xs text-muted-foreground">Automatically link answers to exact document pages.</p>
            </div>
            <div className="flex items-center"><Switch defaultChecked /></div>
          </Row>
          <Row>
            <div>
              <Label className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Redact on export</Label>
              <p className="mt-1 text-xs text-muted-foreground">Strip client PII from any exported bundle by default.</p>
            </div>
            <div className="flex items-center"><Switch defaultChecked /></div>
          </Row>
          <Row>
            <div>
              <Label className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Weekly digest</Label>
              <p className="mt-1 text-xs text-muted-foreground">Email summary of case activity every Monday.</p>
            </div>
            <div className="flex items-center"><Switch /></div>
          </Row>
        </div>
      </section>

      <Separator className="my-10" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" className="text-destructive hover:text-destructive">
          Sign out of DocketMind
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </main>
  </div>
  );
}