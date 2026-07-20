import Link from "next/link";
import { Files, TrashIcon, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DocketStatus } from "@/generated/prisma/client";
import { timeAgo } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export interface DocketMetadata {
    id: string;
    number: string | null;
    title: string;
    client: string;
    court: string;
    status: DocketStatus;
    totalExhibits: number;
    totalParties: number;
    updatedAt: string;
};

export function CaseCardSkeleton() {
    return (
        <div className="block">
            <Card className="transition-shadow duration-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    {/* Case number placeholder */}
                    <Skeleton className="h-4 w-16" />
                    {/* Status badge placeholder */}
                    <Skeleton className="h-5 w-16 rounded-full" />
                </CardHeader>

                <CardContent>
                    {/* Title placeholder */}
                    <Skeleton className="h-6 w-3/4" />
                    <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                            <dt className="shrink-0">
                                <Skeleton className="h-4 w-14" /> {/* "Client" */}
                            </dt>
                            <dd className="truncate text-foreground/80">
                                <Skeleton className="h-4 w-24" />
                            </dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="shrink-0">
                                <Skeleton className="h-4 w-14" /> {/* "Court" */}
                            </dt>
                            <dd className="truncate text-foreground/80">
                                <Skeleton className="h-4 w-32" />
                            </dd>
                        </div>
                    </dl>
                </CardContent>

                <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground bg-transparent">
                    {/* Exhibit count placeholder */}
                    <span className="inline-flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4 rounded-sm" />
                        <Skeleton className="h-4 w-6" />
                    </span>
                    {/* Party count placeholder */}
                    <span className="inline-flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4 rounded-sm" />
                        <Skeleton className="h-4 w-6" />
                    </span>
                    {/* Timestamp placeholder */}
                    <span className="ml-auto">
                        <Skeleton className="h-4 w-16" />
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
}

export function CaseCard({ case: c }: { case: DocketMetadata }) {
    const status = (c.status ?? "")?.charAt(0).toUpperCase() + (c.status ?? "").slice(1);
    return (
        <Link
            href={`/case/${c.id}/exhibits`}
            className="group block"
        >
            <Card className="group-hover:shadow-sm transition-shadow duration-100 h-full!">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    {c?.number && (
                        <span className="text-xs font-medium text-muted-foreground">
                            {c.number}
                        </span>
                    )}
                    <div className="flex items-center gap-2">
                       
                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium ${c.status === "active" ? "text-primary" : "text-muted-foreground"}`}>
                        {status}
                    </span>
                    <Button variant="ghost" size="icon-xs" className="text-primary hover:text-primary bg-muted hover:brigh">
                            <TrashIcon />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <CardTitle className="text-lg font-semibold leading-snug tracking-tight">
                        {c.title}
                    </CardTitle>

                    <dl className="mt-3 space-y-1 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                            <dt className="shrink-0">Client</dt>
                            <dt>|</dt>
                            <dd className="truncate text-foreground/80">{c.client}</dd>
                        </div>
                        <div className="flex gap-2">
                            <dt className="shrink-0">Court</dt>
                            <dt>|</dt>
                            <dd className="truncate text-foreground/80">{c.court}</dd>
                        </div>
                    </dl>
                </CardContent>

                <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground bg-transparent">
                    <span className="inline-flex items-center gap-1.5">
                        <Files className="h-4 w-4" />
                        {c.totalExhibits}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {c.totalParties}
                    </span>
                    <span className="ml-auto text-xs">{timeAgo(c.updatedAt)}</span>
                </CardFooter>
            </Card>
        </Link>
    )
}