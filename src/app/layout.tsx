import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallBanner from "@/components/InstallBanner";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Indian Salary Calculator 2025 — Exact In-Hand After Tax & PF | SalaryTruth.in",
  description: "Free Indian salary calculator. Know your exact monthly in-hand salary after income tax, PF deduction and professional tax. Compare salaries across cities. Are you underpaid?",
  keywords: ["salary calculator", "in-hand salary", "Indian salary", "tax calculator", "CTC calculator", "take home salary"],
  authors: [{ name: "SalaryTruth.in" }],
  metadataBase: new URL('https://salarytruth.vercel.app'),
  manifest: '/manifest.json',
  themeColor: '#1a56db',
  other: {
    "google-site-verification": "hGurCvQN8zbR1v7wX_pT2q5Fb1qO3RJvsW-thuLrCQI",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "SalaryTruth",
  },
  openGraph: {
    title: "Indian Salary Calculator 2025 — Exact In-Hand After Tax & PF",
    description: "Free Indian salary calculator. Know your exact monthly in-hand salary after income tax, PF deduction and professional tax.",
    type: "website",
    locale: "en_IN",
    siteName: "SalaryTruth.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Salary Calculator 2025",
    description: "Free Indian salary calculator. Calculate your exact in-hand salary after tax and deductions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a56db" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4594147660385258"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(reg => console.log('SW registered'))
                  .catch(err => console.log('SW failed', err))
              })
            }
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <InstallBanner />
        <MobileNav />
      </body>
    </html>
  );
}
