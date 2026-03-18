import { Metadata } from "next"
import TaxSavingsCalculator from "@/components/TaxSavingsCalculator"

export const metadata: Metadata = {
  title: "Tax Savings Calculator India 2025 — Save Up to ₹1 Lakh in Tax Legally",
  description: "Free tax savings calculator for India. Find exactly how much tax you can save legally under 80C, 80D, NPS, HRA. Compare old vs new tax regime.",
  keywords: [
    "tax savings calculator",
    "income tax calculator India",
    "80C deduction",
    "80D health insurance",
    "NPS tax benefit",
    "HRA exemption calculator",
    "tax planning India 2025"
  ],
  openGraph: {
    title: "Tax Savings Calculator — Save Up to ₹1 Lakh Legally",
    description: "Calculate your exact tax savings with our free tool. Optimize 80C, 80D, NPS, HRA and more.",
    type: "website",
  },
}

export default function TaxSavingsPage() {
  return <TaxSavingsCalculator />
}
