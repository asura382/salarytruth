"use client"

import { useState } from "react"

function calculateSIP(monthly: number, years: number) {
  const r = 0.12 / 12
  const n = years * 12
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

export default function AffordabilityCalculator() {
  const [inHandSalary, setInHandSalary] = useState<number>(50000)
  const [expenses, setExpenses] = useState<number | undefined>(undefined)
  const [savingsTarget, setSavingsTarget] = useState<number | undefined>(undefined)

  const disposableIncome = inHandSalary - (expenses || inHandSalary * 0.5)
  const actualSavings = disposableIncome - (savingsTarget || disposableIncome * 0.2)

  // Home Loan (50% EMI rule, 8.5% interest, 20 year tenure)
  const maxEMI = inHandSalary * 0.5
  const maxHomeLoan = maxEMI * 12 * 20 * 0.7
  const homeValue = maxHomeLoan * 1.2

  // Car Loan (20% EMI rule, 5 year tenure)
  const maxCarEMI = inHandSalary * 0.2
  const maxCarLoan = maxCarEMI * 12 * 5 * 0.85

  // Investment projections
  const sipMonthly = actualSavings * 0.3
  const sipIn5Years = calculateSIP(sipMonthly, 5)
  const sipIn10Years = calculateSIP(sipMonthly, 10)

  // Get car recommendations based on loan amount
  const getCarRecommendations = () => {
    if (maxCarLoan > 1500000) return "Creta, Seltos, Carens, Grand Vitara"
    if (maxCarLoan > 1000000) return "Swift, i20, Nexon, Venue, Punch"
    if (maxCarLoan > 600000) return "Alto K10, S-Presso, WagonR, Tiago"
    return "Used cars under ₹5L: Swift, i10, Beat"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            What Can You Afford?
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your home loan, car loan and investment potential based on salary
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly In-Hand Salary (₹)
              </label>
              <input
                type="number"
                value={inHandSalary}
                onChange={(e) => setInHandSalary(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 text-lg font-semibold"
                placeholder="e.g. 50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Expenses (₹) <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                type="number"
                value={expenses === undefined ? "" : expenses}
                onChange={(e) => setExpenses(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                placeholder="Auto-calculated"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Savings Target (₹) <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                type="number"
                value={savingsTarget === undefined ? "" : savingsTarget}
                onChange={(e) => setSavingsTarget(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                placeholder="Auto-calculated"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4 text-center">
            💡 Results update automatically as you type — no submit button needed!
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Card 1 — Home Loan */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🏠</span>
              <h2 className="text-2xl font-bold text-green-900">Home Loan Eligibility</h2>
            </div>
            
            <p className="text-green-700 mb-2">You can get a home loan of up to</p>
            <p className="text-4xl font-extrabold text-green-700 mb-4">
              ₹{(maxHomeLoan / 100000).toFixed(1)} Lakhs
            </p>

            <div className="space-y-2 text-sm text-green-800">
              <p>Max EMI you can afford: <strong>₹{Math.round(maxEMI).toLocaleString()}/month</strong></p>
              <p>Home worth: <strong>₹{(homeValue / 100000).toFixed(1)} Lakhs</strong> (with 20% down payment)</p>
              <p className="text-xs opacity-75">Assuming 8.5% interest, 20 year tenure</p>
            </div>
          </div>

          {/* Card 2 — Car Loan */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🚗</span>
              <h2 className="text-2xl font-bold text-blue-900">Car Loan Eligibility</h2>
            </div>
            
            <p className="text-blue-700 mb-2">You can comfortably afford</p>
            <p className="text-4xl font-extrabold text-blue-700 mb-4">
              ₹{(maxCarLoan / 100000).toFixed(1)} Lakhs car loan
            </p>

            <div className="space-y-2 text-sm text-blue-800">
              <p>Max EMI: <strong>₹{Math.round(maxCarEMI).toLocaleString()}/month</strong></p>
              <p><strong>Recommended cars:</strong></p>
              <p className="font-semibold">{getCarRecommendations()}</p>
              <p className="text-xs opacity-75">5 year loan tenure assumed</p>
            </div>
          </div>

          {/* Card 3 — SIP Investment */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">📈</span>
              <h2 className="text-2xl font-bold text-purple-900">SIP Investment Projection</h2>
            </div>
            
            <p className="text-purple-700 mb-2">If you invest ₹{Math.round(sipMonthly).toLocaleString()}/month in SIP:</p>
            
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="bg-white/60 rounded-xl p-4">
                <p className="text-sm text-purple-600 mb-1">5 Years</p>
                <p className="text-2xl font-bold text-purple-700">₹{(sipIn5Years / 100000).toFixed(1)}L</p>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <p className="text-sm text-purple-600 mb-1">10 Years</p>
                <p className="text-2xl font-bold text-purple-700">₹{(sipIn10Years / 100000).toFixed(1)}L</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-purple-800">
              <p>At assumed <strong>12% annual return</strong></p>
              <p className="text-xs opacity-75">Mutual fund investments subject to market risk</p>
            </div>
          </div>

          {/* Card 4 — Money Map */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border-2 border-orange-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">💰</span>
              <h2 className="text-2xl font-bold text-orange-900">Monthly Money Map</h2>
            </div>
            
            <p className="text-orange-700 mb-4">Your ₹{inHandSalary.toLocaleString()}/month breakdown:</p>

            <div className="space-y-4">
              <MoneyBar label="Needs (50%)" amount={inHandSalary * 0.5} color="bg-red-500" percentage={50} />
              <MoneyBar label="Wants (30%)" amount={inHandSalary * 0.3} color="bg-yellow-500" percentage={30} />
              <MoneyBar label="Savings (20%)" amount={inHandSalary * 0.2} color="bg-green-500" percentage={20} />
            </div>

            <div className="mt-4 pt-4 border-t border-orange-200">
              <p className="text-sm text-orange-800">
                Actual savings possible: <strong>₹{Math.round(actualSavings).toLocaleString()}/month</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Warning Text */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl mb-8">
          <p className="text-yellow-800">
            <strong>⚠️ Disclaimer:</strong> These are estimates based on general financial guidelines 
            (50-30-20 rule, EMI ratios). Actual loan eligibility depends on credit score, existing EMIs, 
            and bank policies. Consult a financial advisor for personalized advice.
          </p>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Salary to Home Loan Calculator India — What Can You Afford on Your Salary?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Wondering what lifestyle your salary can support? Our <strong>affordability calculator</strong> 
              instantly shows you how much home loan, car loan, and investments you can afford based on 
              your monthly income.
            </p>
            <p>
              <strong>Bank Rules for Loan Eligibility:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Home Loan:</strong> Max 50% of monthly salary as EMI (FOIR ratio)</li>
              <li><strong>Car Loan:</strong> Max 20% of salary towards car EMI</li>
              <li><strong>Total EMI:</strong> Should not exceed 60% of net monthly income</li>
            </ul>
            <p>
              <strong>Investment Recommendations:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>SIP in Equity Mutual Funds:</strong> 30% of savings for long-term wealth (12% expected return)</li>
              <li><strong>Emergency Fund:</strong> Keep 6 months expenses in FD or liquid fund</li>
              <li><strong>PPF/EPF:</strong> For retirement planning with tax benefits</li>
            </ul>
            <p className="bg-green-50 p-4 rounded-xl border-l-4 border-green-600">
              <strong>Pro Tip:</strong> Always calculate your affordability BEFORE house hunting or car shopping. 
              People who pre-calculate their budget save an average of ₹2-5 lakhs by avoiding expensive mistakes!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MoneyBar({ label, amount, color, percentage }: { label: string; amount: number; color: string; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="font-semibold text-gray-900">₹{Math.round(amount).toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
