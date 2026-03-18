import { Metadata } from "next"
import SalaryComparison from "@/components/SalaryComparison"

export const metadata: Metadata = {
  title: "Salary Comparison Tool India 2025 — Compare Your Salary with Others",
  description: "Compare two salaries side by side. See who earns more and what percentile you are among professionals in India. Free salary comparison tool.",
  keywords: [
    "salary comparison",
    "compare salaries India",
    "salary percentile calculator",
    "market salary rate",
    "salary difference calculator"
  ],
  openGraph: {
    title: "Salary Comparison Tool — Compare & See Who Earns More",
    description: "Side-by-side salary comparison with percentile analysis for Indian professionals.",
    type: "website",
  },
}

export default function ComparePage() {
  return <SalaryComparison />
}
