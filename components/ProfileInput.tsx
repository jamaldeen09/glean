import { useState, useRef, type KeyboardEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProfileInputProps = {
  onSearch: (profile: string) => void;
  isRunning: boolean;
  onStop: () => void;
};

const EXAMPLES = [
  'B2B SaaS platform for healthcare clinics — HIPAA-compliant patient intake and scheduling automation',
  'Supply chain consulting firm specializing in cold chain logistics for pharmaceutical distributors',
  'Industrial IoT sensors for predictive maintenance in manufacturing plants',
  'Renewable energy project finance advisory for offshore wind developers',
];

export function ProfileInput({ onSearch, isRunning, onStop }: ProfileInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!isRunning && value.trim().length > 10) {
      onSearch(value.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = value.trim().length > 10 && !isRunning;

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          'group relative rounded-xl border bg-card transition-colors',
          isRunning ? 'border-primary/30' : 'border-border focus-within:border-primary/40',
        )}
      >
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isRunning}
          placeholder="Describe your service or business profile…"
          className={cn(
            'min-h-[88px] resize-none border-0 bg-transparent px-4 py-3.5 text-sm leading-relaxed shadow-none',
            'placeholder:text-muted-foreground/70',
            'focus-visible:ring-0',
          )}
        />
        <div className="flex items-center justify-between px-3 pb-3 pt-0">
          <span className="font-mono-tight text-[11px] text-muted-foreground/60">
            {value.trim().length > 0 ? `${value.trim().length} chars` : '⌘ + Enter to search'}
          </span>
          {isRunning ? (
            <Button
              size="sm"
              variant="outline"
              onClick={onStop}
              className="gap-1.5 text-xs"
            >
              <Square className="h-3 w-3 fill-current" />
              Stop
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="gap-1.5 text-xs"
            >
              <Search className="h-3.5 w-3.5" />
              Find leads
            </Button>
          )}
        </div>
      </div>

      {!isRunning && value.trim().length === 0 && (
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => setValue(ex)}
              className="rounded-md border border-border bg-background/50 px-2.5 py-1.5 text-left text-[11px] leading-snug text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {ex.length > 64 ? ex.slice(0, 64) + '…' : ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
