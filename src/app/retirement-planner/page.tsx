"use client"

import { useState } from "react"

export default function RetirementPlanner() {
  const [currentAge, setCurrentAge] = useState(25)
  const [retireAge, setRetireAge] = useState(60)
  const [monthlyExpense, setMonthlyExpense] = useState(50000)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [monthlyInvest, setMonthlyInvest] = useState(20000)

  const yearsToGrow = retireAge - currentAge
  const monthsToGrow = yearsToGrow * 12
  
  // Assume 12% annual return on investments
  const monthlyReturn = 0.12 / 12
  
  // Future value of current savings
  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyReturn, monthsToGrow)
  
  // Future value of monthly SIP
  const futureValueSIP = monthlyInvest * ((Math.pow(1 + monthlyReturn, monthsToGrow) - 1) / monthlyReturn) * (1 + monthlyReturn)
  
  const totalCorpus = futureValueCurrent + futureValueSIP
  
  // Assume 6% annual return post-retirement, 25 years retirement
  const monthsRetirement = 25 * 12
  const monthlyPension = totalCorpus * (monthlyReturn * Math.pow(1 + monthlyReturn, monthsRetirement)) / (Math.pow(1 + monthlyReturn, monthsRetirement) - 1)
  
  const inflationAdjustedExpense = monthlyExpense * Math.pow(1 + 0.06, yearsToGrow)
  const surplus = monthlyPension - inflationAdjustedExpense

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Retirement Planner
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Will you have enough to live comfortably after retirement?
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={e => setCurrentAge(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Age</label>
              <input
                type="number"
                value={retireAge}
                onChange={e => setRetireAge(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Expense (₹)</label>
              <input
                type="number"
                value={monthlyExpense}
                onChange={e => setMonthlyExpense(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Savings (₹)</label>
              <input
                type="number"
                value={currentSavings}
                onChange={e => setCurrentSavings(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Investment (₹)</label>
              <input
                type="number"
                value={monthlyInvest}
                onChange={e => setMonthlyInvest(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-900 mb-4">🎯 Retirement Corpus</h3>
            <p className="text-5xl font-extrabold text-green-700 mb-2">
              ₹{(totalCorpus / 100000).toFixed(1)}L
            </p>
            <p className="text-green-800">
              ({yearsToGrow} years @ 12% return)
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-300">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">💰 Monthly Pension</h3>
            <p className="text-5xl font-extrabold text-purple-700 mb-2">
              ₹{Math.round(monthlyPension).toLocaleString()}
            </p>
            <p className="text-purple-800">
              For 25 years post-retirement
            </p>
          </div>
        </div>

        <div className={`rounded-3xl p-8 mb-8 text-center ${surplus >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
          <h2 className="text-3xl font-extrabold mb-4">
            {surplus >= 0 ? '✅ You&apos;re on Track!' : '⚠️ You Need to Save More'}
          </h2>
          <p className="text-xl mb-4">
            Inflation-adjusted expense at {retireAge}: <strong>₹{Math.round(inflationAdjustedExpense).toLocaleString()}/month</strong>
          </p>
          <p className={`text-2xl font-bold ${surplus >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {surplus >= 0 ? 'Surplus' : 'Shortfall'}: ₹{Math.abs(Math.round(surplus)).toLocaleString()}/month
          </p>
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Where Your Money Comes From</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Current Savings Growth</span>
              <span className="font-bold text-blue-700">₹{(futureValueCurrent / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Monthly SIP Growth</span>
              <span className="font-bold text-green-700">₹{(futureValueSIP / 100000).toFixed(1)}L</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
              <span>Total Corpus</span>
              <span className="text-purple-700">₹{(totalCorpus / 100000).toFixed(1)}L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
