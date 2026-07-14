"use client"
import { useState } from 'react';
import { LeadCard } from '@/components/LeadCard';
import { Bookmark, ArrowLeft, Search } from 'lucide-react';

export default function SavedLeadsPage () {
    const [savedLeads, setSavedLeads] = useState<any[]>([]);
    const loading = false;
    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to search
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <Bookmark className="h-3.5 w-3.5 text-primary/70" />
                    <span className="font-mono-tight text-[11px] uppercase tracking-wider text-muted-foreground">
                        Saved leads
                    </span>
                    {!loading && savedLeads.length > 0 && (
                        <span className="font-mono-tight text-[11px] text-muted-foreground/50">
                            {savedLeads.length}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-1 -mr-1">
                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-32 rounded-xl border border-border bg-card animate-pulse" />
                        ))}
                    </div>
                ) : savedLeads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-3 text-center">
                        <div className="h-12 w-12 rounded-full border border-border bg-card flex items-center justify-center">
                            <Bookmark className="h-5 w-5 text-muted-foreground/40" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-muted-foreground">No saved leads yet</p>
                            <p className="text-[12px] text-muted-foreground/60 max-w-xs">
                                Bookmark leads from a search to keep them here. Their relevance score and reasoning stay attached.
                            </p>
                        </div>
                        <button
                            className="mt-1 flex items-center gap-1.5 text-[12px] text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md"
                        >
                            <Search className="h-3.5 w-3.5" />
                            Start a search
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {savedLeads.map((lead, i) => (
                            <LeadCard key={lead.id} lead={lead} index={i} saved onToggleSave={() => { }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}