import { Metadata } from "next"
import Link from "next/link"
import { cityData } from "@/lib/cityData"

export const metadata: Metadata = {
  title: "Bangalore vs Hyderabad Salary Comparison 2025 - Which City Pays More?",
  description: "Complete salary comparison between Bangalore and Hyderabad. Cost of living, take-home pay, rent, and quality of life analysis for IT professionals.",
  keywords: ["bangalore vs hyderabad salary", "IT salary comparison", "cost of living India", "best city for software engineer", "bangalore hyderabad tech jobs"],
  openGraph: {
    title: "Bangalore vs Hyderabad: Salary & Cost of Living Battle",
    description: "Which city puts more money in your pocket?",
    type: "website",
  },
}

export default function BangaloreVsHyderabad() {
  const bangalore = cityData.find(c => c.name === "Bangalore")!
  const hyderabad = cityData.find(c => c.name === "Hyderabad")!

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Bangalore vs Hyderabad
          </h1>
          <p className="text-xl text-gray-600">
            The Ultimate IT Hub Showdown 2025
          </p>
        </div>

        {/* Quick Stats Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Bangalore */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-500">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                BLR
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Bangalore</h2>
              <p className="text-gray-600">Silicon Valley of India</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Cost of Living</span>
                <span className="font-bold text-blue-700">{bangalore.costOfLivingIndex}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Professional Tax</span>
                <span className="font-bold text-blue-700">₹{bangalore.professionalTaxMonthly}/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Salary Multiplier</span>
                <span className="font-bold text-blue-700">{bangalore.multiplier}x</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">Avg IT Salary</span>
                <span className="font-bold text-blue-700">₹12-14 LPA</span>
              </div>
            </div>
          </div>

          {/* Hyderabad */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-500">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                HYD
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Hyderabad</h2>
              <p className="text-gray-600">Cyberabad</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Cost of Living</span>
                <span className="font-bold text-green-700">{hyderabad.costOfLivingIndex}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Professional Tax</span>
                <span className="font-bold text-green-700">₹{hyderabad.professionalTaxMonthly}/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Salary Multiplier</span>
                <span className="font-bold text-green-700">{hyderabad.multiplier}x</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-700">Avg IT Salary</span>
                <span className="font-bold text-green-700">₹10-12 LPA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Comparison by Experience */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Software Engineer Salaries
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-lg">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Experience Level</th>
                  <th className="text-center py-4 px-4 font-bold text-blue-700">Bangalore</th>
                  <th className="text-center py-4 px-4 font-bold text-green-700">Hyderabad</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-700">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">Fresher (0-2 yrs)</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">₹6.5L</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">₹5.5L</span></td>
                  <td className="text-center py-4 px-4"><span className="text-red-600 font-bold">+18% BLR</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">Mid-Level (3-5 yrs)</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">₹14L</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">₹12L</span></td>
                  <td className="text-center py-4 px-4"><span className="text-red-600 font-bold">+17% BLR</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-700">Senior (5-10 yrs)</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">₹24L</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">₹20L</span></td>
                  <td className="text-center py-4 px-4"><span className="text-red-600 font-bold">+20% BLR</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">Lead/Manager (10+ yrs)</td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">₹35L</span></td>
                  <td className="text-center py-4 px-4"><span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">₹30L</span></td>
                  <td className="text-center py-4 px-4"><span className="text-red-600 font-bold">+17% BLR</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost of Living Reality Check */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Real In-Hand Comparison (Mid-Level Developer)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bangalore */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Bangalore (₹14 LPA)</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>In-Hand Salary</span>
                  <span className="font-bold text-green-400">₹95,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Rent (Koramangala)</span>
                  <span className="font-bold text-red-400">- ₹22,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Food & Living</span>
                  <span className="font-bold text-red-400">- ₹11,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport</span>
                  <span className="font-bold text-red-400">- ₹4,000</span>
                </div>
                <div className="border-t border-white/30 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Remaining</span>
                    <span className="font-bold text-yellow-400 text-lg">₹58,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hyderabad */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-green-300">Hyderabad (₹12 LPA)</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>In-Hand Salary</span>
                  <span className="font-bold text-green-400">₹82,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Rent (Gachibowli)</span>
                  <span className="font-bold text-red-400">- ₹15,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Food & Living</span>
                  <span className="font-bold text-red-400">- ₹9,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport</span>
                  <span className="font-bold text-red-400">- ₹3,000</span>
                </div>
                <div className="border-t border-white/30 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Remaining</span>
                    <span className="font-bold text-yellow-400 text-lg">₹55,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-lg">
              <strong>Winner:</strong> Bangalore by just <span className="text-green-300 font-bold">₹3,000/month</span> 💰
            </p>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Bangalore */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bangalore Pros & Cons</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                  <span className="text-xl">✅</span> Advantages
                </h4>
                <ul className="space-y-2 text-gray-700 ml-8">
                  <li>• Better weather year-round</li>
                  <li>• More startup opportunities</li>
                  <li>• Vibrant nightlife & culture</li>
                  <li>• International connectivity</li>
                  <li>• Larger tech community</li>
                </ul>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  <span className="text-xl">❌</span> Disadvantages
                </h4>
                <ul className="space-y-2 text-gray-700 ml-8">
                  <li>• Terrible traffic congestion</li>
                  <li>• Higher pollution levels</li>
                  <li>• Crowded everywhere</li>
                  <li>• Higher cost of living</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hyderabad */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hyderabad Pros & Cons</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                  <span className="text-xl">✅</span> Advantages
                </h4>
                <ul className="space-y-2 text-gray-700 ml-8">
                  <li>• Better infrastructure</li>
                  <li>• Less traffic congestion</li>
                  <li>• Lower cost of living</li>
                  <li>• Growing tech scene</li>
                  <li>• Better work-life balance</li>
                </ul>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  <span className="text-xl">❌</span> Disadvantages
                </h4>
                <ul className="space-y-2 text-gray-700 ml-8">
                  <li>• Hotter climate</li>
                  <li>• Fewer job switches</li>
                  <li>• Less cosmopolitan</li>
                  <li>• Smaller startup ecosystem</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final Verdict */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Final Verdict 🏆</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Choose Bangalore if:</h3>
              <ul className="space-y-2 text-blue-50">
                <li>✅ You want maximum career growth</li>
                <li>✅ You&apos;re early in your career (0-5 YOE)</li>
                <li>✅ You value networking & opportunities</li>
                <li>✅ You prefer better weather</li>
              </ul>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Choose Hyderabad if:</h3>
              <ul className="space-y-2 text-green-50">
                <li>✅ You want better work-life balance</li>
                <li>✅ You&apos;re planning to settle down</li>
                <li>✅ You prefer lower stress lifestyle</li>
                <li>✅ You want to save on rent costs</li>
              </ul>
            </div>
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

        {/* Other Comparisons */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compare Other Cities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/compare/bangalore-vs-pune"
              className="bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl p-6 text-center transition-all transform hover:scale-105"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Bangalore vs Pune</h3>
              <p className="text-sm text-gray-600">IT hub comparison</p>
            </Link>
            
            <Link 
              href="/compare/hyderabad-vs-pune"
              className="bg-gradient-to-br from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-xl p-6 text-center transition-all transform hover:scale-105"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hyderabad vs Pune</h3>
              <p className="text-sm text-gray-600">Cost of living battle</p>
            </Link>
            
            <Link 
              href="/compare/bangalore-vs-gurgaon"
              className="bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl p-6 text-center transition-all transform hover:scale-105"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Bangalore vs Gurgaon</h3>
              <p className="text-sm text-gray-600">North vs South</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
