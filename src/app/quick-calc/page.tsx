"use client"

import { useState } from "react"
import { calculateSalary } from "@/lib/taxCalculator"

export default function QuickCTCCalculator() {
  const [ctc, setCtc] = useState("")
  const [result, setResult] = useState<{
    inHandMonthly: number
    inHandAnnual: number
    incomeTaxAnnual: number
    employeePF: number
    taxableIncome: number
    effectiveRate: number
  } | null>(null)

  const calculate = () => {
    const annualCTC = parseFloat(ctc) * 100000
    if (!annualCTC) return
    
    const taxResult = calculateSalary(annualCTC, 200, true)
    setResult({
      inHandMonthly: Math.round(taxResult.inHandMonthly),
      inHandAnnual: Math.round(taxResult.inHandAnnual),
      incomeTaxAnnual: Math.round(taxResult.incomeTaxAnnual),
      employeePF: Math.round(taxResult.employeePF * 12),
      taxableIncome: Math.round(taxResult.taxableIncome),
      effectiveRate: taxResult.effectiveTaxRate
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">CTC to In-Hand Calculator</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">Quick calculation - no email required</p>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (₹ LPA)</label>
          <input
            type="number"
            value={ctc}
            onChange={e => setCtc(e.target.value)}
            placeholder="e.g. 12"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={calculate}
            disabled={!ctc}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg mt-4 disabled:opacity-50"
          >
            Calculate Now →
          </button>
        </div>

        {result && (
          <>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 mb-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">Your Monthly In-Hand Salary</h2>
              <p className="text-6xl font-extrabold mb-2">₹{result.inHandMonthly.toLocaleString()}</p>
              <p className="text-lg opacity-90">₹{(result.inHandAnnual / 100000).toFixed(2)}L per year</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">💰 Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income Tax (Annual)</span>
                    <span className="font-bold text-red-600">₹{result.incomeTaxAnnual.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee PF (Annual)</span>
                    <span className="font-bold text-blue-600">₹{result.employeePF.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxable Income</span>
                    <span className="font-bold text-gray-900">₹{(result.taxableIncome / 100000).toFixed(2)}L</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">📊 Tax Rate</h3>
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-indigo-700 mb-2">{result.effectiveRate.toFixed(1)}%</p>
                  <p className="text-gray-600">Effective Tax Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl">
              <p className="text-blue-900">
                <strong>💡 Pro Tip:</strong> This is an estimate under the new tax regime (2025). 
                Actual in-hand may vary based on HRA, LTA, and other exemptions claimed.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
