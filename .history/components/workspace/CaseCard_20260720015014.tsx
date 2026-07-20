import Link from "next/link";
import { Files, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Docket } from "@/generated/prisma/client";


export default function CaseCard({ case }: { case: Omit<Docket, "createdAt" | "updatedAt" | "userId"> }) {
    return (
        <Link
            href={`/case/${c.id}/exhibits`}
            className="group block"
        >
            <Card className="group-hover:shadow-sm transition-shadow duration-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <span className="text-xs font-medium text-muted-foreground">
                        {c.number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {c.status}
                    </span>
                </CardHeader>

                <CardContent>
                    <CardTitle className="text-lg font-semibold leading-snug tracking-tight">
                        {c.title}
                    </CardTitle>

                    <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                            <dt className="shrink-0">Client</dt>
                            <dd className="truncate text-foreground/80">{c.client}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="shrink-0">Court</dt>
                            <dd className="truncate text-foreground/80">{c.court}</dd>
                        </div>
                    </dl>
                </CardContent>

                <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground bg-transparent">
                    <span className="inline-flex items-center gap-1.5">
                        <Files className="h-4 w-4" />
                        {c.exhibits.length}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {c.parties.length}
                    </span>
                    <span className="ml-auto text-xs">{c.updatedAt}</span>
                </CardFooter>
            </Card>
        </Link>
    )
}