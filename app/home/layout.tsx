import Header from "@/components/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex flex-col px-6 py-6 max-w-3xl w-full mx-auto min-h-0">
                {children}
            </main>

            {/* Footer */}
            <footer className="px-6 py-3 border-t border-border/60">
                <div className="flex items-center justify-between max-w-3xl mx-auto">
                    <span className="font-mono-tight text-[10px] text-muted-foreground/40">
                        Glean searches, reasons, and surfaces — one lead at a time.
                    </span>
                    <span className="font-mono-tight text-[10px] text-muted-foreground/40">
                        memory persists across sessions
                    </span>
                </div>
            </footer>
        </div>
    )
}