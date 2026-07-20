import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CaseNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-3xl font-semibold">Case not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This matter isn't in your workspace.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" /> Back to workspace
        </Link>
      </div>
    </div>
  );
}