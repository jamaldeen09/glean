import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { title: "DocketMind — Case discovery assistant" },
            { name: "description", content: "Discovery-native case workspace for solo attorneys and small firms. Search, cite, and read every document, page by page." },
            { name: "author", content: "DocketMind" },
            { property: "og:title", content: "DocketMind — Case discovery assistant" },
            { property: "og:description", content: "Discovery-native case workspace for solo attorneys and small firms." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
            },
        ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}


export default function WorkspacePage({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            
        </QueryClientProvider>
    )
}
