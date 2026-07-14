import { Pencil, Square } from 'lucide-react';

type ProfileChipProps = {
    profile: string;
    isActive: boolean;
    onReset: () => void;
    onStop: () => void;
};

export function ProfileChip({ profile, isActive, onReset, onStop }: ProfileChipProps) {
    const truncated = profile.length > 120 ? profile.slice(0, 120) + '…' : profile;

    return (
        <div className="chip-in flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3.5 py-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <span className="font-mono-tight text-[10px] uppercase tracking-wider text-primary/60 shrink-0">
                    profile
                </span>
                <span className="text-[13px] leading-snug text-foreground/80 truncate">
                    {truncated}
                </span>
            </div>
            {isActive ? (
                <button
                    onClick={onStop}
                    className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shrink-0"
                >
                    <Square className="h-3 w-3 fill-current" />
                    Stop
                </button>
            ) : (
                <button
                    onClick={onReset}
                    className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shrink-0"
                >
                    <Pencil className="h-3 w-3" />
                    New search
                </button>
            )}
        </div>
    );
}
