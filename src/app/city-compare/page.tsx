"use client"

import { useState } from "react"

const CITY_COSTS: Record<string, { rent1bhk: number; rent2bhk: number; food: number; transport: number; utilities: number; entertainment: number; total_comfortable: number }> = {
  "Bangalore": { rent1bhk: 20000, rent2bhk: 35000, food: 8000, transport: 4000, utilities: 3000, entertainment: 5000, total_comfortable: 45000 },
  "Mumbai": { rent1bhk: 25000, rent2bhk: 45000, food: 9000, transport: 3000, utilities: 3500, entertainment: 6000, total_comfortable: 52000 },
  "Delhi NCR": { rent1bhk: 18000, rent2bhk: 32000, food: 7500, transport: 3500, utilities: 2500, entertainment: 5000, total_comfortable: 42000 },
  "Hyderabad": { rent1bhk: 15000, rent2bhk: 26000, food: 7000, transport: 3000, utilities: 2500, entertainment: 4000, total_comfortable: 36000 },
  "Pune": { rent1bhk: 16000, rent2bhk: 28000, food: 7000, transport: 3000, utilities: 2500, entertainment: 4000, total_comfortable: 37000 },
  "Chennai": { rent1bhk: 14000, rent2bhk: 24000, food: 6500, transport: 2500, utilities: 2500, entertainment: 3500, total_comfortable: 34000 },
  "Kolkata": { rent1bhk: 12000, rent2bhk: 20000, food: 6000, transport: 2000, utilities: 2000, entertainment: 3000, total_comfortable: 29000 },
  "Ahmedabad": { rent1bhk: 11000, rent2bhk: 19000, food: 5500, transport: 2000, utilities: 2000, entertainment: 3000, total_comfortable: 27000 },
  "Jaipur": { rent1bhk: 10000, rent2bhk: 17000, food: 5000, transport: 2000, utilities: 1500, entertainment: 2500, total_comfortable: 25000 },
  "Indore": { rent1bhk: 9000, rent2bhk: 15000, food: 4500, transport: 1500, utilities: 1500, entertainment: 2000, total_comfortable: 22000 }
}

const LIFESTYLE_MULTIPLIERS = {
  frugal: 0.7,
  comfortable: 1.0,
  lavish: 1.5
}

export default function CityComparator() {
  const [currentCity, setCurrentCity] = useState("Bangalore")
  const [currentSalary, setCurrentSalary] = useState(50000)
  const [newCity, setNewCity] = useState("Hyderabad")
  const [newSalary, setNewSalary] = useState(55000)
  const [lifestyle, setLifestyle] = useState<"frugal" | "comfortable" | "lavish">("comfortable")

  const currentCosts = CITY_COSTS[currentCity]
  const newCosts = CITY_COSTS[newCity]
  const multiplier = LIFESTYLE_MULTIPLIERS[lifestyle]

  const currentExpenses = currentCosts.total_comfortable * multiplier
  const newExpenses = newCosts.total_comfortable * multiplier
  const currentSavings = currentSalary - currentExpenses
  const newSavings = newSalary - newExpenses
  const salaryNeeded = currentSalary * (newExpenses / currentExpenses)

  let verdict = ""
  let verdictColor = ""
  
  if (newSavings > currentSavings + 5000) {
    verdict = "✅ This move makes financial sense!"
    verdictColor = "green"
  } else if (newSavings > currentSavings - 5000) {
    verdict = "⚠️ Financially neutral move"
    verdictColor = "yellow"
  } else {
    verdict = "❌ You'll be worse off financially"
    verdictColor = "red"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Cost of Living Comparator
          </h1>
          <p className="text-xl text-gray-600">
            Should you move cities for that job? Compare real purchasing power
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Current City */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Current Situation</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current City</label>
                <select
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(CITY_COSTS).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly In-Hand (₹)</label>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                />
              </div>
            </div>

            {/* New City */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">New Opportunity</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New City</label>
                <select
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                >
                  {Object.keys(CITY_COSTS).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Monthly In-Hand (₹)</label>
                <input
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 text-lg font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Selection */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Lifestyle Type</label>
            <div className="flex gap-4">
              <button
                onClick={() => setLifestyle("frugal")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
                  lifestyle === "frugal"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🧘 Frugal
              </button>
              <button
                onClick={() => setLifestyle("comfortable")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
                  lifestyle === "comfortable"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                😊 Comfortable
              </button>
              <button
                onClick={() => setLifestyle("lavish")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
                  lifestyle === "lavish"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                💎 Lavish
              </button>
            </div>
          </div>
        </div>

        {/* Section 1 — VERDICT BANNER */}
        <div className={`rounded-3xl p-8 mb-8 text-center ${
          verdictColor === "green" ? "bg-gradient-to-r from-green-500 to-emerald-600" :
          verdictColor === "yellow" ? "bg-gradient-to-r from-yellow-500 to-orange-600" :
          "bg-gradient-to-r from-red-500 to-pink-600"
        } text-white`}>
          <h2 className="text-3xl font-extrabold mb-2">{verdict}</h2>
          <p className="text-lg opacity-90">
            {newSavings > 0 ? `You'll save ₹${Math.round(newSavings).toLocaleString()}/month in ${newCity}` : 
             `You'll need additional ₹${Math.abs(Math.round(newSavings)).toLocaleString()}/month to sustain`}
          </p>
        </div>

        {/* Section 2 — SIDE BY SIDE COMPARISON */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Side by Side Comparison</h2>
          
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-4 font-bold text-gray-900">Metric</th>
                <th className="text-center py-4 px-4 font-bold text-blue-700">{currentCity}</th>
                <th className="text-center py-4 px-4 font-bold text-green-700">{newCity}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4 font-semibold">Monthly Salary</td>
                <td className="text-center py-4 px-4 font-bold text-gray-900">₹{currentSalary.toLocaleString()}</td>
                <td className="text-center py-4 px-4 font-bold text-gray-900">₹{newSalary.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="py-4 px-4">Rent (1BHK)</td>
                <td className="text-center py-4 px-4 text-gray-700">₹{Math.round(currentCosts.rent1bhk * multiplier).toLocaleString()}</td>
                <td className="text-center py-4 px-4 text-gray-700">₹{Math.round(newCosts.rent1bhk * multiplier).toLocaleString()}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4">Food</td>
                <td className="text-center py-4 px-4 text-gray-700">₹{Math.round(currentCosts.food * multiplier).toLocaleString()}</td>
                <td className="text-center py-4 px-4 text-gray-700">₹{Math.round(newCosts.food * multiplier).toLocaleString()}</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="py-4 px-4">Transport</td>
                <td className="text-center py-4 px-4 text-gray-700">₹{Math.round(currentCosts.transport * multiplier).toLocaleString()}</td>
                <td className="text-center py-4 px-4 text-gray-700">₹{Math.round(newCosts.transport * multiplier).toLocaleString()}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4">Total Expenses</td>
                <td className="text-center py-4 px-4 font-bold text-red-600">₹{Math.round(currentExpenses).toLocaleString()}</td>
                <td className="text-center py-4 px-4 font-bold text-red-600">₹{Math.round(newExpenses).toLocaleString()}</td>
              </tr>
              <tr className="border-t-2 border-gray-300">
                <td className="py-4 px-4 font-bold text-lg">Monthly Savings</td>
                <td className={`text-center py-4 px-4 font-bold text-xl ${currentSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentSavings > 0 ? '+' : ''}₹{Math.round(currentSavings).toLocaleString()}
                </td>
                <td className={`text-center py-4 px-4 font-bold text-xl ${newSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {newSavings > 0 ? '+' : ''}₹{Math.round(newSavings).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3 — KEY INSIGHT */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 mb-8 border-2 border-indigo-300">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
            💡 Key Insight
          </h2>
          
          <div className="space-y-4">
            <p className="text-indigo-900 text-lg">
              To maintain your current lifestyle in <strong>{newCity}</strong>, you need at least <strong>₹{Math.round(salaryNeeded).toLocaleString()}/month</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className={`rounded-xl p-4 ${newSalary >= salaryNeeded ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="text-sm text-gray-600 mb-1">Your offer</p>
                <p className={`text-2xl font-bold ${newSalary >= salaryNeeded ? 'text-green-700' : 'text-red-700'}`}>
                  ₹{newSalary.toLocaleString()}/month
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-700 mb-1">Required salary</p>
                <p className="text-2xl font-bold text-blue-700">₹{Math.round(salaryNeeded).toLocaleString()}/month</p>
              </div>
            </div>

            {newSalary >= salaryNeeded ? (
              <p className="text-green-800 font-semibold">
                ✅ Your offer is ₹{(newSalary - salaryNeeded).toLocaleString()} ABOVE what you need!
              </p>
            ) : (
              <p className="text-red-800 font-semibold">
                ⚠️ Your offer is ₹{Math.abs(Math.round(salaryNeeded - newSalary)).toLocaleString()} BELOW requirement
              </p>
            )}
          </div>
        </div>

        {/* Section 4 — EXPENSE BREAKDOWN */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Breakdown ({lifestyle} lifestyle)</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Current City */}
            <div>
              <h3 className="text-lg font-bold text-blue-700 mb-4">{currentCity}</h3>
              <div className="space-y-2">
                <ExpenseBar label="Rent" amount={currentCosts.rent1bhk * multiplier} total={currentExpenses} color="bg-red-500" />
                <ExpenseBar label="Food" amount={currentCosts.food * multiplier} total={currentExpenses} color="bg-orange-500" />
                <ExpenseBar label="Transport" amount={currentCosts.transport * multiplier} total={currentExpenses} color="bg-blue-500" />
                <ExpenseBar label="Utilities" amount={currentCosts.utilities * multiplier} total={currentExpenses} color="bg-yellow-500" />
                <ExpenseBar label="Entertainment" amount={currentCosts.entertainment * multiplier} total={currentExpenses} color="bg-purple-500" />
              </div>
            </div>

            {/* New City */}
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4">{newCity}</h3>
              <div className="space-y-2">
                <ExpenseBar label="Rent" amount={newCosts.rent1bhk * multiplier} total={newExpenses} color="bg-red-500" />
                <ExpenseBar label="Food" amount={newCosts.food * multiplier} total={newExpenses} color="bg-orange-500" />
                <ExpenseBar label="Transport" amount={newCosts.transport * multiplier} total={newExpenses} color="bg-blue-500" />
                <ExpenseBar label="Utilities" amount={newCosts.utilities * multiplier} total={newExpenses} color="bg-yellow-500" />
                <ExpenseBar label="Entertainment" amount={newCosts.entertainment * multiplier} total={newExpenses} color="bg-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Cost of Living Comparison India 2025 — Should You Move Cities for That Job?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Moving to a new city for a job? Don&apos;t just compare salary numbers — compare real purchasing power. 
              Our <strong>cost of living calculator</strong> helps you understand if that higher salary actually means 
              better savings after accounting for city expenses.
            </p>
            <p>
              <strong>Most Expensive Cities in India (2025):</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Mumbai:</strong> ₹52,000/month (comfortable lifestyle) — Highest rent in India</li>
              <li><strong>Bangalore:</strong> ₹45,000/month — High rent, moderate food costs</li>
              <li><strong>Delhi NCR:</strong> ₹42,000/month — Balanced cost structure</li>
            </ul>
            <p>
              <strong>Most Affordable Cities:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Indore:</strong> ₹22,000/month — Lowest cost of living</li>
              <li><strong>Jaipur:</strong> ₹25,000/month — Affordable rent and food</li>
              <li><strong>Kolkata:</strong> ₹29,000/month — Cheap transport and utilities</li>
            </ul>
            <p className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
              <strong>Pro Tip:</strong> A ₹10L package in Bangalore might give you LOWER savings than ₹8L in 
              Hyderabad due to cost of living differences. Always calculate real purchasing power before 
              accepting a job offer!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpenseBar({ label, amount, total, color }: { label: string; amount: number; total: number; color: string }) {
  const percentage = Math.round((amount / total) * 100)
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">₹{Math.round(amount).toLocaleString()} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
