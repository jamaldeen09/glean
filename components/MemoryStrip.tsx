import { useState, useEffect, useRef } from 'react';
import { Brain, ChevronUp, ChevronDown, Search, SkipForward, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type MemoryStripProps = {
  events: any;
  isActive: boolean;
};

function eventIcon(type: any) {
  switch (type) {
    case 'recall': return <Brain className="h-3 w-3" />;
    case 'skip': return <SkipForward className="h-3 w-3" />;
    case 'search': return <Search className="h-3 w-3" />;
    case 'match': return <Sparkles className="h-3 w-3" />;
  }
}

function eventColor(type: any) {
  switch (type) {
    case 'recall': return 'text-primary';
    case 'skip': return 'text-muted-foreground';
    case 'search': return 'text-muted-foreground/70';
    case 'match': return 'text-signal-high';
  }
}

export function MemoryStrip({ events, isActive }: MemoryStripProps) {
  const [expanded, setExpanded] = useState(false);
  const memoryEndRef = useRef<HTMLDivElement>(null);
  const latestEvent = events[events.length - 1];

  useEffect(() => {
    if (expanded) {
      memoryEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [events.length, expanded]);

  // Auto-expand briefly when a new event arrives during active search
  useEffect(() => {
    if (isActive && events.length > 0) {
      setExpanded(true);
    }
  }, [events.length, isActive]);

  if (events.length === 0) return null;

  return (
    <div className="shrink-0">
      {/* Collapsed strip — always visible when events exist */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          'w-full flex items-center gap-2.5 rounded-lg border border-border bg-card/60 px-3.5 py-2.5 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          isActive && 'border-primary/20',
        )}
      >
        <Brain className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-primary agent-pulse' : 'text-primary/60')} />
        <span className="font-mono-tight text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
          agent memory
        </span>
        <span className="h-3 w-px bg-border shrink-0" />
        <span className="text-[12px] text-muted-foreground/70 truncate flex-1 text-left">
          {latestEvent?.message || ''}
        </span>
        <span className="font-mono-tight text-[10px] text-muted-foreground/40 shrink-0">
          {events.length}
        </span>
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
        ) : (
          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
        )}
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div className="strip-expand mt-2 rounded-lg border border-border bg-card/50 p-3 max-h-48 overflow-y-auto">
          <div className="flex flex-col gap-2.5">
            {events.map((evt: any, i: any) => (
              <div key={i} className="trace-in flex gap-2.5">
                <span className={cn('mt-0.5 shrink-0', eventColor(evt.type))}>
                  {eventIcon(evt.type)}
                </span>
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  {evt.message}
                </p>
              </div>
            ))}
            <div ref={memoryEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}
