import { Geist_Mono, Raleway } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";

const raleway = Raleway({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
