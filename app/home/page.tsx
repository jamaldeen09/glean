"use client"
import { ProfileInput } from '@/components/ProfileInput';
import { ProfileChip } from '@/components/ProfileChip';
import { LeadStream } from '@/components/LeadStream';
import { MemoryStrip } from '@/components/MemoryStrip';

export default function HomePage() {
    const hasSearched = false
    return (
        !hasSearched ? (
            /* Idle state — input is the hero, centered and large */
            <div className="flex-1 flex flex-col justify-center max-w-2xl w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-tight mb-2">
                        Find leads that fit.
                    </h1>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">
                        Describe your service or business. The agent will search, reason through each prospect, and surface leads one at a time — with its reasoning attached.
                    </p>
                </div>
                <ProfileInput onSearch={() => { }} isRunning={false} onStop={() => { }} />
            </div>
        ) : (
            /* Active/done state — chip at top, leads center, memory strip at bottom */
            <div className="flex flex-col h-full min-h-0 gap-4">
                {/* Profile chip — collapsed input */}
                <div className="shrink-0">
                    <ProfileChip
                        profile={""}
                        isActive={false}
                        onReset={() => { }}
                        onStop={() => { }}
                    />
                </div>

                {/* Lead stream — full center stage */}
                <div className="flex-1 min-h-0">
                    <LeadStream
                        leads={[]}
                        phase={"idle"}
                        leadsFound={0}
                        leadsSkipped={0}
                        savedLeadIds={[] as any}
                        onToggleSave={() => { }}
                    />
                </div>

                {/* Memory strip — collapsed at bottom, expands on demand */}
                <div className="shrink-0">
                    <MemoryStrip events={[]} isActive={false} />
                </div>
            </div>
        )
    );
}
