"use client"

import { useState } from "react"

export default function FreelanceCalculator() {
  const [fullTimeCTC, setFullTimeCTC] = useState(1200000)
  const [freelanceRate, setFreelanceRate] = useState(2000)
  const [hoursPerDay, setHoursPerDay] = useState(6)
  const [daysPerMonth, setDaysPerMonth] = useState(20)
  const [calculated, setCalculated] = useState(false)

  const fullTimeMonthly = fullTimeCTC / 12
  const freelanceMonthly = freelanceRate * hoursPerDay * daysPerMonth
  
  // Freelance benefits (no office costs, tax savings)
  const officeCostSavings = 8000 // commute, food, clothes
  const taxBenefit = freelanceMonthly * 0.3 * 0.3 // 30% expense deduction
  
  const freelanceEffective = freelanceMonthly + officeCostSavings + taxBenefit
  const difference = freelanceEffective - fullTimeMonthly

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Freelance vs Full-Time Calculator
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Should you quit your job and go independent?
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Full-Time */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">💼 Full-Time Job</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (₹)</label>
              <input
                type="number"
                value={fullTimeCTC}
                onChange={e => setFullTimeCTC(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
              />
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700 mb-1">Monthly In-Hand</p>
              <p className="text-3xl font-bold text-blue-700">₹{Math.round(fullTimeMonthly).toLocaleString()}</p>
            </div>
          </div>

          {/* Freelance */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">🚀 Freelance</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹)</label>
                <input
                  type="number"
                  value={freelanceRate}
                  onChange={e => setFreelanceRate(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hours/Day</label>
                <input
                  type="number"
                  value={hoursPerDay}
                  onChange={e => setHoursPerDay(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days/Month</label>
                <input
                  type="number"
                  value={daysPerMonth}
                  onChange={e => setDaysPerMonth(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-6 bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-purple-700 mb-1">Gross Monthly</p>
              <p className="text-3xl font-bold text-purple-700">₹{Math.round(freelanceMonthly).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg mb-8"
        >
          Compare →
        </button>

        {calculated && (
          <>
            <div className={`rounded-3xl p-8 mb-8 text-center ${difference > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <h2 className="text-3xl font-extrabold mb-2">
                {difference > 0 ? '✅ Freelance Wins!' : '💼 Stick to Your Job'}
              </h2>
              <p className="text-xl">
                Freelance earns <strong>₹{Math.abs(difference).toLocaleString()}/month</strong> {difference > 0 ? 'more' : 'less'}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Freelance Benefits Breakdown</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Gross Income</span>
                  <span className="font-bold">₹{Math.round(freelanceMonthly).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>+ Office Cost Savings</span>
                  <span className="font-bold">₹{officeCostSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>+ Tax Benefit (30% deduction)</span>
                  <span className="font-bold">₹{Math.round(taxBenefit).toLocaleString()}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
                  <span>Effective Monthly</span>
                  <span className="text-purple-700">₹{Math.round(freelanceEffective).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
