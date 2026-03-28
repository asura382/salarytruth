import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getSalaryBreakdown, getAllSalarySlugs, commonSalaries } from "@/lib/salaryBreakdowns"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  // Extract LPA number from slug like "4-lpa-in-hand"
  const lpaMatch = slug.match(/^(\d+)-lpa/)
  const lpa = lpaMatch ? parseInt(lpaMatch[1]) : 0
  const annualCTC = lpa * 100000
  
  // Calculate approximate in-hand for meta tags
  const monthlyGross = annualCTC / 12
  const pf = Math.round(annualCTC * 0.4 * 0.12 / 12)
  const pt = 200
  
  // Simple tax calculation (New Regime 2025)
  let annualTax = 0
  const taxableIncome = annualCTC - 75000 // standard deduction
  if (taxableIncome > 1500000) {
    annualTax = (taxableIncome - 1500000) * 0.30 + 
      150000 * 0.20 + 50000 * 0.15 + 
      200000 * 0.10 + 400000 * 0.05
  } else if (taxableIncome > 1200000) {
    annualTax = (taxableIncome - 1200000) * 0.20 + 
      50000 * 0.15 + 200000 * 0.10 + 400000 * 0.05
  } else if (taxableIncome > 1000000) {
    annualTax = (taxableIncome - 1000000) * 0.15 + 
      200000 * 0.10 + 400000 * 0.05
  } else if (taxableIncome > 700000) {
    annualTax = (taxableIncome - 700000) * 0.10 + 
      400000 * 0.05
  } else if (taxableIncome > 300000) {
    annualTax = (taxableIncome - 300000) * 0.05
  }
  
  // Apply 87A rebate
  if (taxableIncome <= 1200000) annualTax = 0
  
  // Add cess
  annualTax = Math.round(annualTax * 1.04)
  const monthlyTax = Math.round(annualTax / 12)
  
  const inHandMonthly = Math.round(
    monthlyGross - pf - pt - monthlyTax
  )
  
  const inHandFormatted = inHandMonthly >= 100000
    ? `₹${(inHandMonthly/100000).toFixed(1)}L`
    : `₹${Math.round(inHandMonthly/1000)}K`

  return {
    title: `${lpa} LPA In-Hand Salary 2025 — ${inHandFormatted}/Month After Tax & PF`,
    description: `${lpa} LPA CTC = ${inHandFormatted} per month in-hand after PF deduction of ₹${pf.toLocaleString()}/month and income tax. See city-wise breakdown for Bangalore, Mumbai, Delhi. New vs old tax regime comparison. Free instant calculator.`,
    keywords: [
      `${lpa} lpa in hand salary`,
      `${lpa} lpa means how much per month`,
      `${lpa} lpa salary per month`,
      `${lpa} lpa take home salary india`,
      `${lpa} lpa in hand`,
      `${lpa} lakhs salary`,
      `in-hand salary calculator`,
      `salary calculation India`
    ],
    openGraph: {
      title: `${lpa} LPA = ${inHandFormatted}/month In-Hand Salary India 2025`,
      description: `Exact in-hand salary for ${lpa} LPA CTC after all deductions. Free calculator.`,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  return getAllSalarySlugs().map(slug => ({ slug }))
}

export default async function SalaryPage({ params }: PageProps) {
  const { slug } = await params
  const amount = parseInt(slug.split('-')[0])
  const breakdown = getSalaryBreakdown(amount)

  if (!breakdown) {
    notFound()
  }

  const otherSalaries = commonSalaries
    .filter(s => s !== amount)
    .slice(0, 6)

  // Calculate hero section values
  const annualCTC = amount * 100000
  const monthlyGross = annualCTC / 12
  const pf = Math.round(annualCTC * 0.4 * 0.12 / 12)
  const pt = 200
  
  let annualTax = 0
  const taxableIncome = annualCTC - 75000
  if (taxableIncome > 1500000) {
    annualTax = (taxableIncome - 1500000) * 0.30 + 
      150000 * 0.20 + 50000 * 0.15 + 
      200000 * 0.10 + 400000 * 0.05
  } else if (taxableIncome > 1200000) {
    annualTax = (taxableIncome - 1200000) * 0.20 + 
      50000 * 0.15 + 200000 * 0.10 + 400000 * 0.05
  } else if (taxableIncome > 1000000) {
    annualTax = (taxableIncome - 1000000) * 0.15 + 
      200000 * 0.10 + 400000 * 0.05
  } else if (taxableIncome > 700000) {
    annualTax = (taxableIncome - 700000) * 0.10 + 
      400000 * 0.05
  } else if (taxableIncome > 300000) {
    annualTax = (taxableIncome - 300000) * 0.05
  }
  
  if (taxableIncome <= 1200000) annualTax = 0
  annualTax = Math.round(annualTax * 1.04)
  const monthlyTax = Math.round(annualTax / 12)
  
  const inHandMonthly = Math.round(monthlyGross - pf - pt - monthlyTax)
  const inHandFormatted = inHandMonthly >= 100000
    ? `₹${(inHandMonthly/100000).toFixed(1)}L`
    : `₹${Math.round(inHandMonthly/1000)}K`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Answer Box */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 mb-8 text-center">
          <div className="text-lg text-blue-100 mb-2">
            {amount} LPA CTC =
          </div>
          <div className="text-5xl font-bold mb-2">
            {inHandFormatted}/month
          </div>
          <div className="text-blue-100 text-sm mb-4">
            In-hand salary after PF + Tax (New Regime 2025)
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">₹{pf.toLocaleString()}</div>
              <div className="text-xs text-blue-200">PF/month</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹{monthlyTax.toLocaleString()}</div>
              <div className="text-xs text-blue-200">Tax/month</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{amount < 7 ? "₹0" : `₹${Math.round(annualTax/amount/1000)}K`}</div>
              <div className="text-xs text-blue-200">Effective rate</div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            {amount} LPA In-Hand Salary Breakdown
          </h1>
          <p className="text-xl text-gray-600">
            Exact monthly and annual take-home pay calculation
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-sm mb-2">Your Monthly In-Hand Salary</p>
            <p className="text-6xl md:text-7xl font-extrabold text-green-600 mb-2">
              ₹{breakdown.monthlyInHand.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-500">per month</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Annual In-Hand</p>
              <p className="text-3xl font-bold text-blue-700">
                ₹{(breakdown.annualInHand / 100000).toFixed(2)}L
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Annual Tax</p>
              <p className="text-3xl font-bold text-red-700">
                ₹{(breakdown.annualTax / 100000).toFixed(2)}L
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">PF Contribution</p>
              <p className="text-3xl font-bold text-purple-700">
                ₹{(breakdown.pfAnnual / 100000).toFixed(2)}L
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Monthly Breakdown</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Gross Monthly Salary</span>
                <span className="font-semibold text-gray-900">₹{(amount * 100000 / 12).toLocaleString("en-IN")}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Employee PF (12% of Basic)</span>
                <span className="font-semibold text-red-600">- ₹{breakdown.pfMonthly.toLocaleString("en-IN")}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Professional Tax</span>
                <span className="font-semibold text-red-600">- ₹{breakdown.professionalTaxMonthly.toLocaleString("en-IN")}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Income Tax (New Regime 2025)</span>
                <span className="font-semibold text-red-600">- ₹{breakdown.monthlyTax.toLocaleString("en-IN")}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 bg-green-50 px-4 rounded-xl mt-4">
                <span className="font-bold text-gray-900">Net In-Hand Salary</span>
                <span className="text-2xl font-bold text-green-600">₹{breakdown.monthlyInHand.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Annual CTC Breakup */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Annual CTC Breakup</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Basic Salary (40%)</span>
                <span className="font-semibold text-gray-900">₹{(breakdown.breakdown.basic / 100000).toFixed(2)}L</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">HRA (20%)</span>
                <span className="font-semibold text-gray-900">₹{(breakdown.breakdown.hra / 100000).toFixed(2)}L</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Special Allowance (40%)</span>
                <span className="font-semibold text-gray-900">₹{(breakdown.breakdown.specialAllowance / 100000).toFixed(2)}L</span>
              </div>
              
              <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-xl mt-4">
                <span className="font-bold text-gray-900">Total CTC</span>
                <span className="text-xl font-bold text-blue-700">{amount} LPA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Key Insights for {amount} LPA</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-semibold mb-1">Effective Tax Rate</p>
                <p className="text-blue-100">
                  {((breakdown.annualTax / (amount * 100000)) * 100).toFixed(1)}% of your CTC goes to income tax
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">📉</span>
              <div>
                <p className="font-semibold mb-1">CTC vs In-Hand</p>
                <p className="text-blue-100">
                  You take home {(breakdown.annualInHand / (amount * 100000) * 100).toFixed(0)}% of your CTC
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏦</span>
              <div>
                <p className="font-semibold mb-1">PF Savings</p>
                <p className="text-blue-100">
                  ₹{breakdown.pfMonthly.toLocaleString("en-IN")} monthly goes to your PF account
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">💸</span>
              <div>
                <p className="font-semibold mb-1">Monthly Deductions</p>
                <p className="text-blue-100">
                  Total ₹{(breakdown.monthlyTax + breakdown.pfMonthly + breakdown.professionalTaxMonthly).toLocaleString("en-IN")} deducted monthly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Popular Salaries */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore Other Salary Packages
          </h2>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {otherSalaries.map((salary) => (
              <Link
                key={salary}
                href={`/salary-amount/${salary}-lpa-in-hand`}
                className="bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl p-4 text-center transition-all transform hover:scale-105"
              >
                <p className="text-sm text-gray-600 mb-1">{salary} LPA</p>
                <p className="text-lg font-bold text-blue-700">
                  ₹{getSalaryBreakdown(salary)?.monthlyInHand.toLocaleString("en-IN").replace(/,/g, '')}
                </p>
                <p className="text-xs text-gray-500">per month</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Calculate Your Exact In-Hand Salary →
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Your {amount} LPA Salary Breakdown
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              With a <strong>{amount} LPA CTC</strong> package, your <strong>monthly in-hand salary</strong> is approximately <strong>₹{breakdown.monthlyInHand.toLocaleString("en-IN")}</strong>. 
              This is what actually gets credited to your bank account every month after all deductions.
            </p>
            
            <p>
              Here&apos;s where your money goes:
            </p>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Provident Fund (PF):</strong> ₹{breakdown.pfMonthly.toLocaleString("en-IN")} per month (12% of basic salary)</li>
              <li><strong>Professional Tax:</strong> ₹{breakdown.professionalTaxMonthly.toLocaleString("en-IN")} per month (varies by state)</li>
              <li><strong>Income Tax:</strong> ₹{breakdown.monthlyTax.toLocaleString("en-IN")} per month (under new tax regime 2025)</li>
            </ul>
            
            <p>
              <strong>Total annual deductions:</strong> ₹{(breakdown.annualTax + breakdown.pfAnnual + breakdown.professionalTaxAnnual).toLocaleString("en-IN")}
            </p>
            
            <p>
              Remember, while your in-hand salary is ₹{breakdown.monthlyInHand.toLocaleString("en-IN")}, your PF contribution of ₹{breakdown.pfMonthly.toLocaleString("en-IN")} 
              per month accumulates in your EPF account and can be withdrawn upon retirement or resignation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
