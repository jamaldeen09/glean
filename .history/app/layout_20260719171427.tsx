import { Geist_Mono, Raleway } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Providers from "@/components/Providers";
const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DocketMind — Case discovery assistant",
  description: "Discovery-native case workspace for solo attorneys and small firms. Search, cite, and read every document, page by page.",
  authors: [{ name: "DocketMind" }],
  openGraph: {
    title: "DocketMind — Case discovery assistant",
    description: "Discovery-native case workspace for solo attorneys and small firms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", raleway.variable)}
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
