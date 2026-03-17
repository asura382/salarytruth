import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "New vs Old Tax Regime 2025 - Which is Better? Complete Comparison",
  description: "Compare new and old tax regimes side-by-side. Calculate which tax regime saves you more money in 2025 with real examples.",
  keywords: ["new vs old tax regime", "tax regime comparison 2025", "which tax regime better", "income tax calculator India"],
  openGraph: {
    title: "New vs Old Tax Regime 2025 Comparison",
    description: "Find out which tax regime saves you more tax",
    type: "website",
  },
}

export default function TaxRegimeComparison() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            New vs Old Tax Regime
          </h1>
          <p className="text-xl text-gray-600">
            Complete comparison for FY 2025-26
          </p>
        </div>

        {/* Quick Verdict */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Quick Verdict 💡</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Choose NEW Regime if:</h3>
              <ul className="space-y-2 text-blue-50">
                <li>✅ You&apos;re a fresher with no investments</li>
                <li>✅ You don&apos;t pay HRA</li>
                <li>✅ Your income is below ₹15L</li>
                <li>✅ You want simplicity</li>
              </ul>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Choose OLD Regime if:</h3>
              <ul className="space-y-2 text-blue-50">
                <li>✅ You pay significant HRA</li>
                <li>✅ You have home loan interest</li>
                <li>✅ You max out 80C (₹1.5L)</li>
                <li>✅ You have medical insurance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tax Slabs Comparison */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tax Slabs Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-lg">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Income Range</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-700">New Regime</th>
                  <th className="text-center py-4 px-4 font-bold text-purple-700">Old Regime</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹0 - ₹2.5L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">0%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">0%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹2.5L - ₹3L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">0%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">5%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹3L - ₹5L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">5%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">5%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹5L - ₹6L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">5%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">20%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹6L - ₹7.5L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold">10%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">20%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹7.5L - ₹9L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold">10%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">20%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹9L - ₹10L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">15%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">20%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹10L - ₹12L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">15%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">30%</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">₹12L - ₹15L</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">20%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">30%</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">₹15L+</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">30%</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">30%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real Examples */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Example 1 */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Example 1: Fresher (₹6 LPA)</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">NEW Regime Tax</p>
                <p className="text-3xl font-bold text-blue-700">₹15,600</p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">OLD Regime Tax</p>
                <p className="text-3xl font-bold text-purple-700">₹31,200</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">NEW Regime Saves</p>
                <p className="text-2xl font-bold text-green-700">₹15,600 💰</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              <strong>Verdict:</strong> New regime is better for freshers with no deductions
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Example 2: Mid-Level (₹12 LPA, HRA ₹2L)</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">NEW Regime Tax</p>
                <p className="text-3xl font-bold text-blue-700">₹78,000</p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">OLD Regime Tax</p>
                <p className="text-3xl font-bold text-purple-700">₹52,000</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">OLD Regime Saves</p>
                <p className="text-2xl font-bold text-green-700">₹26,000 💰</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              <strong>Verdict:</strong> Old regime better when you have HRA and 80C investments
            </p>
          </div>
        </div>

        {/* Key Differences */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Differences
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Standard Deduction</h3>
                <p className="text-gray-700">Both regimes offer ₹50,000 standard deduction from your salary.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">HRA Exemption</h3>
                <p className="text-gray-700">Only available in OLD regime. Can save you lakhs if you live in metro cities.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Section 80C</h3>
                <p className="text-gray-700">OLD regime allows ₹1.5L deduction for PPF, EPF, LIC, ELSS, etc.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Medical Insurance (80D)</h3>
                <p className="text-gray-700">OLD regime allows ₹25,000-₹50,000 deduction for health insurance premiums.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Education Loan Interest</h3>
                <p className="text-gray-700">Only OLD regime allows deduction for education loan interest (Section 80E).</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Calculate Your Tax & In-Hand Salary →
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How to Choose Between New and Old Tax Regime?
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The <strong>new tax regime</strong> (default from FY 2023-24) offers lower tax rates but removes most exemptions and deductions. 
              It&apos;s ideal for taxpayers who don&apos;t have significant investments or HRA payments.
            </p>
            
            <p>
              The <strong>old tax regime</strong> has higher tax rates but allows you to claim various deductions like HRA, 
              80C (₹1.5L), 80D (medical insurance), home loan interest, and more. This can result in lower taxable income 
              if you maximize these deductions.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-6">Quick Calculation Method</h3>
            
            <p>
              Here&apos;s a simple way to decide:
            </p>
            
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Calculate your total deductions under old regime (HRA + 80C + 80D + others)</li>
              <li>If deductions are more than ₹3-4L, old regime might be better</li>
              <li>If you have minimal deductions, new regime is usually better</li>
              <li>Use our calculator above to see exact numbers for YOUR situation</li>
            </ol>
            
            <p className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
              <strong>Pro Tip:</strong> Even if you choose the new regime by default, you can switch to the old regime 
              while filing your ITR if it turns out to be more beneficial!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
