import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

import { FloatingBotanicals } from "@/components/layout/floating-botanicals";
import { HangingVines } from "@/components/layout/hanging-vines";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { CookieBanner } from "@/components/layout/cookie-banner";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ren -Tsundosika | Artist Portfolio",
  description:
    "Portfolio of Ren, aka Tsundosika -watercolor, ink, and digital art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} h-full`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <FloatingBotanicals />
          <HangingVines />
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
