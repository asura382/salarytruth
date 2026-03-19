"use client"

import { useState } from "react"
import { calculateSalary } from "@/lib/taxCalculator"
import { cityData } from "@/lib/cityData"

const CITY_COSTS: Record<string, { total_comfortable: number }> = {
  "Bangalore": { total_comfortable: 45000 },
  "Mumbai": { total_comfortable: 52000 },
  "Delhi NCR": { total_comfortable: 42000 },
  "Hyderabad": { total_comfortable: 36000 },
  "Pune": { total_comfortable: 37000 },
  "Chennai": { total_comfortable: 34000 },
  "Kolkata": { total_comfortable: 29000 },
  "Ahmedabad": { total_comfortable: 27000 },
  "Jaipur": { total_comfortable: 25000 },
  "Indore": { total_comfortable: 22000 }
}

const BENEFIT_VALUES = {
  health_insurance: 15000,
  meal_allowance: 2200,
  cab_facility: 3000
}

export default function JobOfferCalculator() {
  const [currentJob, setCurrentJob] = useState({
    city: "Bangalore",
    ctc: 1000000,
    wfhDays: 3,
    commuteTime: 45,
    benefits: {
      health_insurance: true,
      meal_allowance: false,
      cab_facility: false,
      annual_bonus: 0
    }
  })

  const [newJob, setNewJob] = useState({
    city: "Hyderabad",
    ctc: 1200000,
    wfhDays: 2,
    commuteTime: 60,
    benefits: {
      health_insurance: true,
      meal_allowance: true,
      cab_facility: false,
      annual_bonus: 10
    }
  })

  const [calculated, setCalculated] = useState(false)

  // Calculate in-hand salaries
  const currentInHandAnnual = calculateSalary(currentJob.ctc, 200, true).inHandAnnual
  const newInHandAnnual = calculateSalary(newJob.ctc, 200, true).inHandAnnual

  // Cost of living adjustment
  const costDiff = CITY_COSTS[newJob.city].total_comfortable - CITY_COSTS[currentJob.city].total_comfortable

  // Commute cost calculation (₹2/minute assumed)
  const currentCommuteCost = currentJob.commuteTime * 2 * 22 * 4 * 0.05 // ₹0.05/min
  const newCommuteCost = newJob.commuteTime * 2 * 22 * 4 * 0.05

  // Benefits monetary value
  const calculateBenefitsValue = (benefits: typeof currentJob.benefits, ctc: number) => {
    let total = 0
    if (benefits.health_insurance) total += BENEFIT_VALUES.health_insurance
    if (benefits.meal_allowance) total += BENEFIT_VALUES.meal_allowance * 12
    if (benefits.cab_facility) total += BENEFIT_VALUES.cab_facility * 12
    if (benefits.annual_bonus > 0) total += ctc * (benefits.annual_bonus / 100)
    return total
  }

  const currentBenefitValue = calculateBenefitsValue(currentJob.benefits, currentJob.ctc)
  const newBenefitValue = calculateBenefitsValue(newJob.benefits, newJob.ctc)

  // WFH value (₹200/day saved on food + commute)
  const currentWFHValue = currentJob.wfhDays * 4 * 200
  const newWFHValue = newJob.wfhDays * 4 * 200

  // Total compensation
  const currentTotalValue = currentInHandAnnual + currentBenefitValue + (currentWFHValue * 12) - (currentCommuteCost * 12)
  const newTotalValue = newInHandAnnual + newBenefitValue + (newWFHValue * 12) - (newCommuteCost * 12)

  const difference = newTotalValue - currentTotalValue
  const percentageChange = ((difference / currentTotalValue) * 100)

  let verdict = ""
  let verdictColor = ""
  
  if (difference > 100000) {
    verdict = "✅ ACCEPT! Significant improvement"
    verdictColor = "green"
  } else if (difference > 0) {
    verdict = "⚠️ Slight improvement. Consider other factors"
    verdictColor = "yellow"
  } else {
    verdict = "❌ REJECT! You'll be worse off"
    verdictColor = "red"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Job Offer Comparison Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Should you accept this job offer? Compare real value beyond just CTC
          </p>
        </div>

        {/* Input Forms */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Current Job */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
              💼 Current Job
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={currentJob.city}
                  onChange={(e) => setCurrentJob({ ...currentJob, city: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                >
                  {cityData.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (₹)</label>
                <input
                  type="number"
                  value={currentJob.ctc}
                  onChange={(e) => setCurrentJob({ ...currentJob, ctc: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WFH Days/Week: <strong>{currentJob.wfhDays}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={currentJob.wfhDays}
                  onChange={(e) => setCurrentJob({ ...currentJob, wfhDays: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0 days</span>
                  <span>5 days</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commute Time (one way, minutes)</label>
                <input
                  type="number"
                  value={currentJob.commuteTime}
                  onChange={(e) => setCurrentJob({ ...currentJob, commuteTime: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 block mb-2">Benefits</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={currentJob.benefits.health_insurance}
                      onChange={(e) => setCurrentJob({ 
                        ...currentJob, 
                        benefits: { ...currentJob.benefits, health_insurance: e.target.checked }
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Health Insurance</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={currentJob.benefits.meal_allowance}
                      onChange={(e) => setCurrentJob({ 
                        ...currentJob, 
                        benefits: { ...currentJob.benefits, meal_allowance: e.target.checked }
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Meal Allowance</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={currentJob.benefits.cab_facility}
                      onChange={(e) => setCurrentJob({ 
                        ...currentJob, 
                        benefits: { ...currentJob.benefits, cab_facility: e.target.checked }
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Cab Facility</span>
                  </label>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Annual Bonus (%)</label>
                    <input
                      type="number"
                      value={currentJob.benefits.annual_bonus}
                      onChange={(e) => setCurrentJob({ 
                        ...currentJob, 
                        benefits: { ...currentJob.benefits, annual_bonus: Number(e.target.value) }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="e.g. 10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Job Offer */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-3">
              🎯 New Job Offer
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={newJob.city}
                  onChange={(e) => setNewJob({ ...newJob, city: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                >
                  {cityData.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Offered CTC (₹)</label>
                <input
                  type="number"
                  value={newJob.ctc}
                  onChange={(e) => setNewJob({ ...newJob, ctc: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WFH Days/Week: <strong>{newJob.wfhDays}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={newJob.wfhDays}
                  onChange={(e) => setNewJob({ ...newJob, wfhDays: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0 days</span>
                  <span>5 days</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commute Time (one way, minutes)</label>
                <input
                  type="number"
                  value={newJob.commuteTime}
                  onChange={(e) => setNewJob({ ...newJob, commuteTime: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 block mb-2">Benefits</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newJob.benefits.health_insurance}
                      onChange={(e) => setNewJob({ 
                        ...newJob, 
                        benefits: { ...newJob.benefits, health_insurance: e.target.checked }
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Health Insurance</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newJob.benefits.meal_allowance}
                      onChange={(e) => setNewJob({ 
                        ...newJob, 
                        benefits: { ...newJob.benefits, meal_allowance: e.target.checked }
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Meal Allowance</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newJob.benefits.cab_facility}
                      onChange={(e) => setNewJob({ 
                        ...newJob, 
                        benefits: { ...newJob.benefits, cab_facility: e.target.checked }
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Cab Facility</span>
                  </label>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Annual Bonus (%)</label>
                    <input
                      type="number"
                      value={newJob.benefits.annual_bonus}
                      onChange={(e) => setNewJob({ 
                        ...newJob, 
                        benefits: { ...newJob.benefits, annual_bonus: Number(e.target.value) }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="e.g. 15"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg mb-8"
        >
          Compare Offers →
        </button>

        {calculated && (
          <>
            {/* Section 1 — VERDICT BANNER */}
            <div className={`rounded-3xl p-8 mb-8 text-center ${
              verdictColor === "green" ? "bg-gradient-to-r from-green-500 to-emerald-600" :
              verdictColor === "yellow" ? "bg-gradient-to-r from-yellow-500 to-orange-600" :
              "bg-gradient-to-r from-red-500 to-pink-600"
            } text-white`}>
              <h2 className="text-4xl font-extrabold mb-2">{verdict}</h2>
              <p className="text-lg opacity-90">
                Total compensation change: <strong>{percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%</strong> 
                ({difference >= 0 ? '+' : ''}₹{Math.abs(difference).toLocaleString()}/year)
              </p>
            </div>

            {/* Section 2 — COMPARISON TABLE */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 overflow-x-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Comparison</h2>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Component</th>
                    <th className="text-center py-4 px-4 font-bold text-blue-700">Current Job</th>
                    <th className="text-center py-4 px-4 font-bold text-green-700">New Offer</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-700">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-semibold">In-Hand Salary (Annual)</td>
                    <td className="text-center py-4 px-4 font-bold text-gray-900">₹{(currentInHandAnnual / 100000).toFixed(2)}L</td>
                    <td className="text-center py-4 px-4 font-bold text-gray-900">₹{(newInHandAnnual / 100000).toFixed(2)}L</td>
                    <td className={`text-center py-4 px-4 font-bold ${(newInHandAnnual - currentInHandAnnual) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(newInHandAnnual - currentInHandAnnual) >= 0 ? '+' : ''}₹{((newInHandAnnual - currentInHandAnnual) / 100000).toFixed(2)}L
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-4">Benefits Value (Annual)</td>
                    <td className="text-center py-4 px-4 text-gray-700">₹{currentBenefitValue.toLocaleString()}</td>
                    <td className="text-center py-4 px-4 text-gray-700">₹{newBenefitValue.toLocaleString()}</td>
                    <td className={`text-center py-4 px-4 font-semibold ${(newBenefitValue - currentBenefitValue) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(newBenefitValue - currentBenefitValue) >= 0 ? '+' : ''}₹{(newBenefitValue - currentBenefitValue).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4">WFH Savings (Annual)</td>
                    <td className="text-center py-4 px-4 text-gray-700">₹{(currentWFHValue * 12).toLocaleString()}</td>
                    <td className="text-center py-4 px-4 text-gray-700">₹{(newWFHValue * 12).toLocaleString()}</td>
                    <td className={`text-center py-4 px-4 font-semibold ${(newWFHValue - currentWFHValue) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {((newWFHValue - currentWFHValue) * 12) >= 0 ? '+' : ''}₹{Math.abs((newWFHValue - currentWFHValue) * 12).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-4">Commute Cost (Annual)</td>
                    <td className="text-center py-4 px-4 text-red-600">-₹{(currentCommuteCost * 12).toLocaleString()}</td>
                    <td className="text-center py-4 px-4 text-red-600">-₹{(newCommuteCost * 12).toLocaleString()}</td>
                    <td className={`text-center py-4 px-4 font-semibold ${(currentCommuteCost - newCommuteCost) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {((currentCommuteCost - newCommuteCost) * 12) >= 0 ? '+' : ''}₹{Math.abs((currentCommuteCost - newCommuteCost) * 12).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-t-2 border-gray-800 font-bold text-lg">
                    <td className="py-4 px-4">TOTAL COMPENSATION</td>
                    <td className="text-center py-4 px-4 text-blue-700">₹{(currentTotalValue / 100000).toFixed(2)}L</td>
                    <td className="text-center py-4 px-4 text-green-700">₹{(newTotalValue / 100000).toFixed(2)}L</td>
                    <td className={`text-center py-4 px-4 ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {difference >= 0 ? '+' : ''}₹{(difference / 100000).toFixed(2)}L
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 3 — KEY INSIGHTS */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-blue-900 mb-2">💰 Salary Impact</h3>
                <p className="text-blue-800">
                  {(newInHandAnnual - currentInHandAnnual) >= 0 ? '✅' : '⚠️'} In-hand salary changes by{' '}
                  <strong>₹{((newInHandAnnual - currentInHandAnnual) / 100000).toFixed(2)}L/year</strong>
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-600">
                <h3 className="font-bold text-purple-900 mb-2">🏡 Cost of Living</h3>
                <p className="text-purple-800">
                  {costDiff >= 0 ? '⚠️' : '✅'} {newJob.city} is {Math.abs(costDiff)} {costDiff >= 0 ? 'more expensive' : 'cheaper'} than {currentJob.city}
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-600">
                <h3 className="font-bold text-green-900 mb-2">⏰ Work-Life Balance</h3>
                <p className="text-green-800">
                  {newJob.wfhDays > currentJob.wfhDays ? '✅' : newJob.wfhDays < currentJob.wfhDays ? '⚠️' : '➡️'}{' '}
                  WFH: {currentJob.wfhDays} → {newJob.wfhDays} days/week
                </p>
              </div>
            </div>

            {/* Section 4 — DECISION FACTORS */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 mb-8 border-2 border-indigo-300">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6">Decision Factors Beyond Money</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-indigo-800 mb-3">✅ Reasons to ACCEPT:</h3>
                  <ul className="space-y-2 text-indigo-900">
                    {newTotalValue > currentTotalValue && (
                      <li>• Higher total compensation (+₹{(difference / 100000).toFixed(2)}L)</li>
                    )}
                    {newJob.wfhDays > currentJob.wfhDays && (
                      <li>• Better work-life balance (more WFH days)</li>
                    )}
                    {newJob.commuteTime < currentJob.commuteTime && (
                      <li>• Shorter commute (saves {currentJob.commuteTime - newJob.commuteTime} mins/day)</li>
                    )}
                    {newBenefitValue > currentBenefitValue && (
                      <li>• Better benefits package</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-red-800 mb-3">⚠️ Reasons to REJECT:</h3>
                  <ul className="space-y-2 text-red-900">
                    {newTotalValue < currentTotalValue && (
                      <li>• Lower total compensation (-₹{(Math.abs(difference) / 100000).toFixed(2)}L)</li>
                    )}
                    {newJob.wfhDays < currentJob.wfhDays && (
                      <li>• Less flexibility (fewer WFH days)</li>
                    )}
                    {newJob.commuteTime > currentJob.commuteTime && (
                      <li>• Longer commute (adds {newJob.commuteTime - currentJob.commuteTime} mins/day)</li>
                    )}
                    {newBenefitValue < currentBenefitValue && (
                      <li>• Worse benefits package</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Job Offer Comparison Calculator — Should I Accept This Job Offer?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Received a job offer but not sure if it&apos;s better than your current role? Our{' '}
              <strong>job offer comparison calculator</strong> analyzes the COMPLETE picture — not just CTC, 
              but in-hand salary, benefits, work-from-home flexibility, commute costs, and cost of living 
              differences.
            </p>
            <p>
              <strong>What really matters when comparing offers:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>In-Hand Salary:</strong> CTC is misleading — focus on what hits your bank account</li>
              <li><strong>Benefits Value:</strong> Health insurance, meal cards, cab facility add ₹50K-2L annually</li>
              <li><strong>WFH Flexibility:</strong> Each WFH day saves ₹8K-12K/month on food and commute</li>
              <li><strong>Commute Time:</strong> Long commutes cost money AND reduce quality of life</li>
              <li><strong>Cost of Living:</strong> Moving from Bangalore to Mumbai needs 15% higher salary</li>
            </ul>
            <p className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-600">
              <strong>Pro Tip:</strong> Don&apos;t just compare base salaries! A ₹12L offer with great benefits, 
              5 days WFH, and no commute can be worth MORE than ₹15L with poor benefits, full office return, 
              and 2-hour daily commute. Use our calculator to find the REAL value.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
