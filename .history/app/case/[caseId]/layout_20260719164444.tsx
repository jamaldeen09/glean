import CaseRail from "@/components/CaseRail";

export default async function CaseLayout({ params }: { params: Promise<{ caseId: string; }> }) {
    const { caseId } = await params;
    return (
      <div className="min-h-screen bg-background">
        <CaseRail caseId={caseId} />
  
        <div className="md:pl-14 pb-24 md:pb-0">
          {/* Case masthead */}
          <header className="border-b border-border/70 bg-paper">
            <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Workspace
              </Link>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
                    {data.caseNumber} · {data.court}
                  </div>
                  <h1 className="mt-1.5 truncate font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {data.caseTitle}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Counsel of record for <span className="text-foreground">{data.client}</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-sm border border-border bg-manila/40 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground">
                  {data.status}
                </span>
              </div>
            </div>
          </header>
  
          <Outlet />
        </div>
      </div>
    );
  }