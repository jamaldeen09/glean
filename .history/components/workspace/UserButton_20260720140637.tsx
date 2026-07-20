import Link from "next/link";

export default async function UserButton () {
    return (
        <Link
        href="/account"
        className={buttonVariants({ variant: "ghost", size: "lg", className: "py-5" })}
    >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">EC</span>
        <span className="hidden sm:inline">Elena Cardoza</span>
    </Link>
    )
}