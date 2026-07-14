import { useEffect, useState } from 'react';
import { MapPin, TrendingUp, Building2, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

type LeadCardProps = {
  lead: any
  index: number;
  saved?: boolean;
  onToggleSave?: (leadId: string) => void;
};

function scoreTier(score: number): 'high' | 'mid' | 'low' {
  if (score >= 75) return 'high';
  if (score >= 55) return 'mid';
  return 'low';
}

const tierStyles = {
  high: { bar: 'bg-signal-high', text: 'text-signal-high', label: 'Strong match' },
  mid: { bar: 'bg-signal-mid', text: 'text-signal-mid', label: 'Moderate match' },
  low: { bar: 'bg-signal-low', text: 'text-signal-low', label: 'Adjacent prospect' },
};

export function LeadCard({ lead, index, saved = false, onToggleSave }: LeadCardProps) {
  const [reasoningVisible, setReasoningVisible] = useState(false);
  const [popAnim, setPopAnim] = useState(false);
  const tier = scoreTier(lead.relevanceScore);
  const styles = tierStyles[tier];

  useEffect(() => {
    const timer = setTimeout(() => setReasoningVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    setPopAnim(true);
    setTimeout(() => setPopAnim(false), 400);
    onToggleSave?.(lead.id);
  };

  return (
    <article
      className="lead-materialize group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/25"
      style={{ animationDelay: `${index === 0 ? 0 : 0.05}s` }}
    >
      {/* Left accent line — tier-colored */}
      <div
        className={cn('absolute left-0 top-0 h-full w-[3px]', styles.bar)}
        aria-hidden
      />

      <div className="flex flex-col gap-4 pl-2">
        {/* Header: name + score + save */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground truncate">
                {lead.name}
              </h3>
              {saved && (
                <Bookmark className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />
              )}
            </div>
            <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3 opacity-60" />
                {lead.industry}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 opacity-60" />
                {lead.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Score */}
            <div className="flex flex-col items-end">
              <span className={cn('font-mono-tight text-2xl font-semibold tabular-nums leading-none', styles.text)}>
                {lead.relevanceScore}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mt-1">
                relevance
              </span>
            </div>

            {/* Save button */}
            {onToggleSave && (
              <button
                onClick={handleSave}
                aria-label={saved ? 'Remove from saved' : 'Save lead'}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  saved
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground/50 hover:border-primary/30 hover:text-foreground',
                  popAnim && 'save-pop',
                )}
              >
                <Bookmark className={cn('h-3.5 w-3.5', saved && 'fill-current')} />
              </button>
            )}
          </div>
        </div>

        {/* Relevance bar */}
        <div className="flex items-center gap-3">
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={cn('bar-grow absolute left-0 top-0 h-full rounded-full', styles.bar)}
              style={{ width: `${lead.relevanceScore}%` }}
            />
          </div>
          <span className={cn('flex items-center gap-1 text-[11px] font-medium', styles.text)}>
            <TrendingUp className="h-3 w-3" />
            {styles.label}
          </span>
        </div>

        {/* Reasoning — the emotional center */}
        {reasoningVisible && (
          <div className="text-reveal border-l-2 border-primary/20 pl-3">
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/80">Why this lead: </span>
              {lead.reasoning}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
