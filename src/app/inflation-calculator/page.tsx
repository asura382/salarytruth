"use client"

import { useState } from "react"

const INFLATION_DATA: Record<number, number> = {
  2018: 3.94,
  2019: 4.76,
  2020: 6.62,
  2021: 5.13,
  2022: 6.70,
  2023: 5.65,
  2024: 4.80,
}

export default function InflationCalculator() {
  const [salary, setSalary] = useState("")
  const [year, setYear] = useState("2020")
  const [currentSalary, setCurrentSalary] = useState("")
  const [result, setResult] = useState<{
    pastSalary: number
    startYear: number
    salaryNeededToday: number
    totalInflation: number
    currentSalary: number
    actualGrowth: number
    realGrowth: number
    gap: number
    yearlyData: {
      year: number
      inflation: number
      realValue: number
      multiplier: number
    }[]
    cumulativeMultiplier: number
  } | null>(null)

  const calculate = () => {
    const pastSalary = parseFloat(salary)
    const startYear = parseInt(year)
    const current = parseFloat(currentSalary) || 0

    let cumulativeMultiplier = 1
    const yearlyData = []
    
    for (let y = startYear; y <= 2024; y++) {
      const inflationRate = INFLATION_DATA[y] || 5
      cumulativeMultiplier *= (1 + inflationRate / 100)
      yearlyData.push({
        year: y,
        inflation: inflationRate,
        realValue: pastSalary * cumulativeMultiplier,
        multiplier: cumulativeMultiplier
      })
    }

    const salaryNeededToday = pastSalary * cumulativeMultiplier
    const totalInflation = ((cumulativeMultiplier - 1) * 100)
    const actualGrowth = current > 0 
      ? ((current - pastSalary) / pastSalary * 100) 
      : 0
    const realGrowth = actualGrowth - totalInflation

    setResult({
      pastSalary,
      startYear,
      salaryNeededToday: Math.round(salaryNeededToday * 10) / 10,
      totalInflation: Math.round(totalInflation * 10) / 10,
      currentSalary: current,
      actualGrowth: Math.round(actualGrowth * 10) / 10,
      realGrowth: Math.round(realGrowth * 10) / 10,
      gap: Math.round((salaryNeededToday - current) * 10) / 10,
      yearlyData,
      cumulativeMultiplier
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Inflation Salary Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Find out if your salary is keeping up with India&apos;s inflation rate
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your salary in past year (LPA)
              </label>
              <input
                type="number"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                placeholder="e.g. 6"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 text-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which year?
              </label>
              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
              >
                {[2018,2019,2020,2021,2022,2023,2024].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your current salary (LPA) — optional
              </label>
              <input
                type="number"
                value={currentSalary}
                onChange={e => setCurrentSalary(e.target.value)}
                placeholder="e.g. 10 (to compare real growth)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 text-lg font-semibold"
              />
            </div>
          </div>
          
          <button
            onClick={calculate}
            disabled={!salary}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50"
          >
            Calculate Inflation Impact →
          </button>
        </div>

        {result && (
          <>
            {/* Headline */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 mb-8 text-center">
              <div className="text-5xl mb-4">💸</div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                Your ₹{result.pastSalary}L in {result.startYear} needs to be ₹{result.salaryNeededToday}L today
              </h2>
              <p className="text-lg text-gray-600">
                India&apos;s cumulative inflation since {result.startYear}: <strong className="text-red-600">{result.totalInflation}%</strong>
              </p>
            </div>

            {/* Real Growth Analysis */}
            {result.currentSalary > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Real Growth Analysis</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <p className="text-sm text-gray-600 mb-2">Nominal Growth</p>
                    <p className={`text-3xl font-extrabold ${result.actualGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.actualGrowth >= 0 ? '+' : ''}{result.actualGrowth}%
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Your actual salary increase</p>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-6">
                    <p className="text-sm text-gray-600 mb-2">Inflation Rate</p>
                    <p className="text-3xl font-extrabold text-red-600">{result.totalInflation}%</p>
                    <p className="text-xs text-gray-500 mt-2">Purchasing power lost</p>
                  </div>

                  <div className={`rounded-2xl p-6 ${result.realGrowth >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-sm text-gray-600 mb-2">Real Growth</p>
                    <p className={`text-3xl font-extrabold ${result.realGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.realGrowth >= 0 ? '+' : ''}{result.realGrowth}%
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Actual wealth created</p>
                  </div>
                </div>

                {result.realGrowth < 0 && (
                  <div className="mt-6 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-xl">
                    <p className="text-orange-900 text-lg">
                      ⚠️ <strong>Warning:</strong> Despite earning ₹{result.currentSalary}L, you&apos;ve actually lost{' '}
                      <strong>₹{Math.abs(result.gap)}L</strong> in purchasing power since {result.startYear}.
                    </p>
                  </div>
                )}

                {result.realGrowth >= 0 && (
                  <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 rounded-xl">
                    <p className="text-green-900 text-lg">
                      ✅ <strong>Great job!</strong> You&apos;ve beaten inflation and gained{' '}
                      <strong>₹{result.gap}L</strong> in real purchasing power!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Yearly Breakdown */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Year-by-Year Breakdown</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Year</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900">Inflation</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900">Cumulative</th>
                      <th className="text-right py-3 px-4 font-bold text-green-700">Required Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyData.map((data, i: number) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="py-3 px-4 font-semibold text-gray-900">{data.year}</td>
                        <td className="text-right py-3 px-4 text-gray-700">{data.inflation.toFixed(2)}%</td>
                        <td className="text-right py-3 px-4 text-gray-700">{((data.multiplier - 1) * 100).toFixed(2)}%</td>
                        <td className="text-right py-3 px-4 font-bold text-green-700">₹{(data.realValue/100000).toFixed(2)}L</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Inflation Salary Calculator India 2025 — Is Your Salary Growing Fast Enough?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Wondering if your salary growth is actually beating inflation? Our{' '}
              <strong>inflation calculator</strong> uses India&apos;s official CPI inflation data 
              to show you the REAL value of your money over time.
            </p>
            <p>
              <strong>India&apos;s Inflation History (2018-2024):</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>2024:</strong> 4.80% — Moderate inflation</li>
              <li><strong>2023:</strong> 5.65% — Rising food prices</li>
              <li><strong>2022:</strong> 6.70% — Post-pandemic spike</li>
              <li><strong>2021:</strong> 5.13% — Recovery phase</li>
              <li><strong>2020:</strong> 6.62% — Pandemic impact</li>
            </ul>
            <p className="bg-red-50 p-4 rounded-xl border-l-4 border-red-600">
              <strong>Reality Check:</strong> If your salary hasn&apos;t grown by at least 6-8% annually, 
              you&apos;re actually getting RICHER in nominal terms but POORER in real terms. 
              Most people need 12-15% annual hikes just to maintain their lifestyle!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
