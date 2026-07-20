import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-sm border border-border bg-manila/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Case File · Not Found
        </div>
        <h1 className="font-heading text-6xl font-semibold text-foreground">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This document isn't in the record. It may have been sealed or misfiled.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to workspace
          </Link>
        </div>
      </div>
    </div>
  );
}