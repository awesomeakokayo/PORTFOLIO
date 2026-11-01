import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteContent } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  metadataBase: new URL(siteContent.metadata.url),
  applicationName: siteContent.metadata.applicationName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    url: siteContent.metadata.url,
    siteName: siteContent.metadata.applicationName,
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">{siteContent.nav.skipToContent}</a>
        <SiteNav />
        <CustomCursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
