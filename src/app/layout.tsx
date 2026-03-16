import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  other: {
    "google-site-verification": "hGurCvQN8zbR1v7wX_pT2q5Fb1qO3RJvsW-thuLrCQI",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
