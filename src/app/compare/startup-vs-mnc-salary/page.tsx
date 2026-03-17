import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Startup vs MNC Salary 2025 - Which Pays More? Complete Comparison",
  description: "Compare startup and MNC salaries in India. ESOPs, benefits, career growth, and real compensation breakdown for tech professionals.",
  keywords: ["startup vs mnc salary", "product based vs service based", "ESOPs India", "tech career growth"],
  openGraph: {
    title: "Startup vs MNC Salary Comparison 2025",
    description: "Where should you work for maximum compensation?",
    type: "website",
  },
}

export default function StartupVsMNC() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Startup vs MNC Salary
          </h1>
          <p className="text-xl text-gray-600">
            Complete Compensation Breakdown 2025
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Startup */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-orange-500">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                🚀
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Startup</h2>
              <p className="text-gray-600">High Risk, High Reward</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Fresher (0-2 YOE)</p>
                <p className="text-2xl font-bold text-orange-700">₹6-10 LPA</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Mid-Level (3-5 YOE)</p>
                <p className="text-2xl font-bold text-orange-700">₹15-25 LPA</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Senior (5-8 YOE)</p>
                <p className="text-2xl font-bold text-orange-700">₹25-45 LPA</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">ESOPs Potential</p>
                <p className="text-lg font-bold text-green-700">₹50L - ₹5Cr+</p>
              </div>
            </div>
          </div>

          {/* MNC */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-500">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                🏢
              </div>
              <h2 className="text-3xl font-bold text-gray-900">MNC</h2>
              <p className="text-gray-600">Stability & Benefits</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Fresher (0-2 YOE)</p>
                <p className="text-2xl font-bold text-blue-700">₹4-6 LPA</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Mid-Level (3-5 YOE)</p>
                <p className="text-2xl font-bold text-blue-700">₹12-18 LPA</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Senior (5-8 YOE)</p>
                <p className="text-2xl font-bold text-blue-700">₹20-35 LPA</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Total Benefits Value</p>
                <p className="text-lg font-bold text-purple-700">+25-30% of CTC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Differences */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What You&apos;re Missing Out On
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Startup Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-orange-700 mb-4">Startup Advantages 💡</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">Higher Base Salary:</strong>
                    <p className="text-gray-700">20-50% more than MNCs for same role</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">ESOPs (Lottery Ticket):</strong>
                    <p className="text-gray-700">0.01-0.5% equity that could be worth crores</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">Faster Growth:</strong>
                    <p className="text-gray-700">2x promotion speed, rapid skill development</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">Learning Budget:</strong>
                    <p className="text-gray-700">₹50k-2L annually for courses & conferences</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* MNC Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">MNC Advantages 🏆</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">Work-Life Balance:</strong>
                    <p className="text-gray-700">Fixed 9-6 hours, unlimited sick leaves</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">Job Security:</strong>
                    <p className="text-gray-700">Very low layoff risk, stable income</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">Benefits Package:</strong>
                    <p className="text-gray-700">Health insurance, gym, food, transport</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✅</span>
                  <div>
                    <strong className="text-gray-900">Brand Value:</strong>
                    <p className="text-gray-700">Big names look great on resume</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5-Year Wealth Comparison */}
        <div className="bg-gradient-to-r from-orange-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            5-Year Wealth Creation Battle
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Startup Success */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-300">Startup (Success Case)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Year 0-5 Salary</span>
                  <span className="font-bold">₹1 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>ESOP Exit Value</span>
                  <span className="font-bold text-green-300">₹2 Cr</span>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total Net Worth</span>
                    <span className="font-bold text-green-300 text-2xl">₹3 Cr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MNC Path */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-300">MNC (Stable Path)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Year 0-5 Salary</span>
                  <span className="font-bold">₹70 L</span>
                </div>
                <div className="flex justify-between">
                  <span>ESOPs</span>
                  <span className="font-bold">₹0</span>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total Net Worth</span>
                    <span className="font-bold text-blue-300 text-2xl">₹70 L</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Startup Failure */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-red-300">Startup (Failure Case)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Year 0-5 Salary</span>
                  <span className="font-bold">₹90 L</span>
                </div>
                <div className="flex justify-between">
                  <span>ESOPs Value</span>
                  <span className="font-bold text-red-300">₹0</span>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total Net Worth</span>
                    <span className="font-bold text-yellow-300 text-2xl">₹90 L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-white/80">
            *Even in failure case, startup path comes ahead due to higher base salary
          </p>
        </div>

        {/* Decision Matrix */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Which Should YOU Choose?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-orange-300 rounded-2xl p-6 bg-orange-50">
              <h3 className="text-2xl font-bold text-orange-700 mb-4">Join a Startup if:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ You&apos;re willing to take calculated risks</li>
                <li>✅ You want rapid learning & growth</li>
                <li>✅ You&apos;re early in career (0-5 YOE)</li>
                <li>✅ You dream of that ESOP exit</li>
                <li>✅ You thrive in fast-paced environments</li>
              </ul>
            </div>

            <div className="border-2 border-blue-300 rounded-2xl p-6 bg-blue-50">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">Join an MNC if:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ You value work-life balance</li>
                <li>✅ You want predictable career growth</li>
                <li>✅ You have family responsibilities</li>
                <li>✅ You&apos;re planning for MBA abroad</li>
                <li>✅ You prefer stability over upside</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-orange-600 to-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:from-orange-700 hover:to-blue-700 transition-all shadow-lg"
          >
            Calculate Your In-Hand Salary →
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding the Real Difference
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              The startup vs MNC debate isn&apos;t just about salary—it&apos;s about your entire career trajectory and life goals.
            </p>
            
            <p>
              <strong>Startups</strong> typically pay 20-50% more in base salary and offer ESOPs (Employee Stock Options), 
              which can be worth anywhere from ₹0 to ₹5+ crores depending on the company&apos;s success. However, they come 
              with higher risk—90% of startups fail within 5 years.
            </p>
            
            <p>
              <strong>MNCs</strong> offer stability, better work-life balance, and comprehensive benefits packages worth 
              an additional 25-30% of your CTC. While the base salary might be lower, the total compensation including 
              bonuses, stock purchase plans, and retention bonuses can be substantial.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
              <p className="font-semibold text-gray-900 mb-2">💡 Our Recommendation:</p>
              <p className="text-gray-700">
                Early in your career (0-5 years)? Join a well-funded startup to learn fast and earn more. 
                Even if it fails, you&apos;ll be ahead financially and skill-wise. Mid-career (5+ years)? 
                Depends on your risk appetite and family situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
