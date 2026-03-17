import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getSalaryBreakdown, getAllSalarySlugs, commonSalaries } from "@/lib/salaryBreakdowns"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const amount = parseInt(slug.split('-')[0])
  const breakdown = getSalaryBreakdown(amount)
  
  if (!breakdown) {
    return {
      title: "Salary Not Found",
    }
  }

  return {
    title: `${amount} LPA In-Hand Salary - Monthly Breakdown & Tax Calculation`,
    description: `Exact in-hand salary for ${amount} LPA CTC. Calculate monthly take-home pay after tax, PF, and professional tax deductions.`,
    keywords: [`${amount} lpa in hand`, `${amount} lakhs salary`, `in-hand salary calculator`, `salary calculation India`],
    openGraph: {
      title: `${amount} LPA In-Hand Salary Breakdown`,
      description: `See exactly how much you'll get in-hand with ${amount} LPA CTC`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
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
