import type { PartyRole } from "@/lib/data";
import { cn } from "@/lib/utils";

const styles: Record<PartyRole, string> = {
  Defendant: "border-[color-mix(in_oklab,var(--color-redline)_45%,var(--color-border))] text-[color-mix(in_oklab,var(--color-redline)_70%,var(--color-foreground))]",
  Witness: "border-border text-muted-foreground",
  Victim: "border-primary/40 text-primary",
  "Person of Interest": "border-manila-edge text-[color-mix(in_oklab,var(--color-manila-edge)_80%,var(--color-foreground))]",
};

const glyph: Record<PartyRole, string> = {
  Defendant: "D",
  Witness: "W",
  Victim: "V",
  "Person of Interest": "P",
};

export function RoleBadge({ role, className }: { role: PartyRole; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border bg-background/60 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em]",
        styles[role],
        className,
      )}
    >
      <span aria-hidden className="font-mono text-[10px] opacity-70">{glyph[role]}</span>
      {role}
    </span>
  );
}
