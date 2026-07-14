import { useEffect, useRef } from 'react';
import { LeadCard } from './LeadCard';
import { Search, SkipForward, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type LeadStreamProps = {
  leads: any
  phase: any
  leadsFound: number;
  leadsSkipped: number;
  savedLeadIds: Set<string>;
  onToggleSave: (leadId: string) => void;
};

const phaseLabels: Record<any, string> = {
  idle: 'Idle',
  validating: 'Reading profile',
  recalling: 'Recalling memory',
  searching: 'Scanning sources',
  surfacing: 'Surfacing leads',
  done: 'Complete',
};

export function LeadStream({ leads, phase, leadsFound, leadsSkipped, savedLeadIds, onToggleSave }: LeadStreamProps) {
  const leadsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    leadsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [leads.length]);

  const isActive = phase !== 'idle' && phase !== 'done';

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              'inline-block h-2 w-2 rounded-full',
              isActive ? 'bg-primary agent-pulse' : phase === 'done' ? 'bg-signal-high' : 'bg-muted-foreground/30',
            )}
          />
          <span className="font-mono-tight text-[11px] uppercase tracking-wider text-muted-foreground">
            {phaseLabels[phase]}
          </span>
        </div>
        {(leadsFound > 0 || leadsSkipped > 0) && (
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono-tight">
            {leadsFound > 0 && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-signal-high" />
                {leadsFound} surfaced
              </span>
            )}
            {leadsSkipped > 0 && (
              <span className="flex items-center gap-1">
                <SkipForward className="h-3 w-3" />
                {leadsSkipped} skipped
              </span>
            )}
          </div>
        )}
      </div>

      {/* Leads list — full center stage */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-1 -mr-1">
        {leads.length === 0 && phase === 'idle' ? (
          <EmptyState />
        ) : leads.length === 0 && phase === 'validating' ? (
          <ValidatingState />
        ) : (
          <div className="flex flex-col gap-3">
            {leads.map((lead: any, i: any) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                index={i}
                saved={savedLeadIds.has(lead.id)}
                onToggleSave={onToggleSave}
              />
            ))}
            {isActive && phase !== 'validating' && (
              <SearchingIndicator phase={phase} />
            )}
            <div ref={leadsEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-3 text-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border border-border bg-card flex items-center justify-center">
          <Search className="h-5 w-5 text-muted-foreground/40" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">No leads yet</p>
        <p className="text-[12px] text-muted-foreground/60 max-w-xs">
          Enter your service profile above and the agent will search, reason, and surface leads here in real time.
        </p>
      </div>
    </div>
  );
}

function ValidatingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-4">
      <div className="relative w-48 h-px bg-border overflow-hidden rounded-full">
        <div className="scan-line absolute inset-0 bg-primary/40" />
      </div>
      <p className="font-mono-tight text-[12px] text-muted-foreground/70">
        Reading profile…
      </p>
    </div>
  );
}

function SearchingIndicator({ phase }: { phase: any }) {
  const label = phase === 'surfacing' ? 'Preparing next lead…' : phase === 'searching' ? 'Scanning candidate sources…' : 'Recalling memory…';
  return (
    <div className="flex items-center gap-3 py-2 px-1">
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60 agent-pulse" style={{ animationDelay: '0s' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/40 agent-pulse" style={{ animationDelay: '0.2s' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/20 agent-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
      <span className="font-mono-tight text-[11px] text-muted-foreground/60">{label}</span>
    </div>
  );
}
