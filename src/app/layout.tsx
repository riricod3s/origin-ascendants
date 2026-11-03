import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cinzel, JetBrains_Mono, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { MobileNav } from "@/components/layout/MobileNav";
import { MouseLight } from "@/components/layout/MouseLight";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Providers } from "@/components/layout/Providers";
import { ScrollTopButton } from "@/components/layout/ScrollTopButton";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const sans = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Community`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Origin Ascendants",
    "Minecraft community",
    "community forum",
    "community wiki",
    "community forum",
    "member-written wiki",
    "Discord community",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Community`,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Community`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
  colorScheme: "dark",
};

const noscriptCss =
  '.oa-loader{display:none!important}.enter,[style*="opacity:0;"],[style$="opacity:0"]{opacity:1!important;transform:none!important;animation:none!important}';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noscriptCss }} />
        </noscript>
        <Providers>
          <LoadingScreen />
          <SkipLink />
          <Suspense fallback={<div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] bg-night/60" />}>
            <Navbar />
          </Suspense>
          <Suspense fallback={null}>
            <MobileNav />
          </Suspense>
          <MouseLight />
          <div className="flex min-h-dvh flex-col">
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              <Suspense fallback={<div aria-hidden="true" className="min-h-[65vh] bg-night" />}>
                <PageTransition>{children}</PageTransition>
              </Suspense>
            </main>
            <Footer />
          </div>
          <ScrollTopButton />
        </Providers>
      </body>
    </html>
  );
}
