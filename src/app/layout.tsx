import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { siteConfig } from "@/config/site";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const safeAppUrl = appUrl.startsWith("http://") || appUrl.startsWith("https://")
  ? appUrl
  : `https://${appUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(safeAppUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.titleSuffix}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/images/favicon.ico?v=1`,
    shortcut: `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/images/favicon.ico?v=1`,
    apple: `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/images/favicon.ico?v=1`,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: safeAppUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/images/favicon.ico?v=1`,
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/images/favicon.ico?v=1`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      </body>
    </html>
  );
}
