import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MRizkyP Blog",
  description: "Quality Assurance Engineer portfolio showcasing test automation, bug reports, case studies, and QA expertise. 5+ years of experience in manual testing and test automation.",
  keywords: ["QA Engineer", "Quality Assurance", "Test Automation", "Portfolio", "Selenium", "Cypress", "Playwright"],
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
      </body>
    </html>
  );
}
