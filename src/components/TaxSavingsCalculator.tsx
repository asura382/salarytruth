"use client"

import { useState } from "react"
import Link from "next/link"

export default function TaxSavingsCalculator() {
  // Form state
  const [annualCTC, setAnnualCTC] = useState<number>(1000000)
  const [existing80CInvestment, setExisting80CInvestment] = useState<number>(0)
  const [healthInsurancePremium, setHealthInsurancePremium] = useState<number>(0)
  const [hraReceivedMonthly, setHraReceivedMonthly] = useState<number>(0)
  const [rentPaidMonthly, setRentPaidMonthly] = useState<number>(0)
  const [isMetro, setIsMetro] = useState<boolean>(true)
  const [taxRegime, setTaxRegime] = useState<"new" | "old">("new")

  // Results state
  const [calculated, setCalculated] = useState(false)

  // Calculate tax based on regime
  const calculateTax = (taxableIncome: number, regime: "new" | "old") => {
    let tax = 0
    
    if (regime === "new") {
      // New Regime 2025 slabs
      if (taxableIncome > 300000) {
        if (taxableIncome <= 600000) {
          tax = (taxableIncome - 300000) * 0.05
        } else if (taxableIncome <= 900000) {
          tax = 15000 + (taxableIncome - 600000) * 0.10
        } else if (taxableIncome <= 1200000) {
          tax = 45000 + (taxableIncome - 900000) * 0.15
        } else if (taxableIncome <= 1500000) {
          tax = 90000 + (taxableIncome - 1200000) * 0.20
        } else {
          tax = 150000 + (taxableIncome - 1500000) * 0.30
        }
      }
    } else {
      // Old Regime slabs
      if (taxableIncome > 250000) {
        if (taxableIncome <= 500000) {
          tax = (taxableIncome - 250000) * 0.05
        } else if (taxableIncome <= 1000000) {
          tax = 12500 + (taxableIncome - 500000) * 0.20
        } else {
          tax = 112500 + (taxableIncome - 1000000) * 0.30
        }
      }
    }
    
    // Add 4% cess
    return tax * 1.04
  }

  // Get marginal tax rate
  const getMarginalTaxRate = (taxableIncome: number, regime: "new" | "old") => {
    if (regime === "new") {
      if (taxableIncome > 1500000) return 0.30
      if (taxableIncome > 1200000) return 0.20
      if (taxableIncome > 900000) return 0.15
      if (taxableIncome > 600000) return 0.10
      if (taxableIncome > 300000) return 0.05
      return 0
    } else {
      if (taxableIncome > 1000000) return 0.30
      if (taxableIncome > 500000) return 0.20
      if (taxableIncome > 250000) return 0.05
      return 0
    }
  }

  // Run calculations
  const runCalculation = () => {
    setCalculated(true)
  }

  // Current scenario (no optimization)
  const standardDeduction = 50000
  
  // Old regime taxable income without optimization
  let taxableIncomeOld = annualCTC
  if (taxRegime === "old" || !calculated) {
    // HRA exemption calculation
    const hraExemptionOld = Math.min(
      hraReceivedMonthly * 12,
      (isMetro ? 0.5 : 0.4) * annualCTC * 0.4,
      (rentPaidMonthly * 12) - (0.1 * annualCTC * 0.4)
    )
    
    taxableIncomeOld = annualCTC 
      - standardDeduction 
      - existing80CInvestment 
      - healthInsurancePremium
      - Math.max(0, hraExemptionOld)
  }
  
  const currentTaxOld = calculateTax(taxableIncomeOld, "old")
  const currentMonthlyTaxOld = currentTaxOld / 12
  
  // New regime (no exemptions)
  const taxableIncomeNew = annualCTC - standardDeduction
  const currentTaxNew = calculateTax(taxableIncomeNew, "new")
  const currentMonthlyTaxNew = currentTaxNew / 12
  
  // Optimized scenario
  const marginalRate = getMarginalTaxRate(annualCTC, taxRegime)
  
  // Optimization suggestions
  const remaining80C = Math.max(0, 150000 - existing80CInvestment)
  const potential80CSaving = remaining80C * marginalRate
  
  const additional80D = Math.max(0, 25000 - healthInsurancePremium)
  const healthSaving = additional80D * marginalRate
  
  const npsSaving = 50000 * marginalRate
  
  // HRA optimization
  const hraExemptionOptimized = Math.min(
    hraReceivedMonthly * 12,
    (isMetro ? 0.5 : 0.4) * annualCTC * 0.4,
    Math.max(0, (rentPaidMonthly * 12) - (0.1 * annualCTC * 0.4))
  )
  const hraTaxSaving = Math.max(0, hraExemptionOptimized) * marginalRate
  
  // Total potential savings
  const totalSavings = potential80CSaving + healthSaving + npsSaving + hraTaxSaving
  
  // Optimized taxable income
  const optimizedTaxableIncome = taxRegime === "old" 
    ? taxableIncomeOld - remaining80C - additional80D - Math.max(0, hraExemptionOptimized)
    : taxableIncomeNew
  
  const optimizedTax = calculateTax(optimizedTaxableIncome, taxRegime)
  const optimizedMonthlyTax = optimizedTax / 12
  const optimizedInHand = ((annualCTC - optimizedTax) / 12)
  
  const currentInHand = ((annualCTC - (taxRegime === "new" ? currentTaxNew : currentTaxOld)) / 12)
  const monthlyIncrease = optimizedInHand - currentInHand
  const yearlyIncrease = totalSavings

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Tax Savings Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Find exactly how much tax you can save legally in 2025
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual CTC (₹)
                </label>
                <input
                  type="number"
                  value={annualCTC}
                  onChange={(e) => setAnnualCTC(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                  placeholder="e.g. 1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Already investing in 80C? (₹)
                </label>
                <input
                  type="number"
                  value={existing80CInvestment}
                  onChange={(e) => setExisting80CInvestment(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 50000"
                />
                <p className="text-xs text-gray-500 mt-1">PF, PPF, LIC, ELSS, etc.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Insurance Premium (₹/year)
                </label>
                <input
                  type="number"
                  value={healthInsurancePremium}
                  onChange={(e) => setHealthInsurancePremium(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 15000"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HRA Received Monthly (₹)
                </label>
                <input
                  type="number"
                  value={hraReceivedMonthly}
                  onChange={(e) => setHraReceivedMonthly(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Paid Monthly (₹)
                </label>
                <input
                  type="number"
                  value={rentPaidMonthly}
                  onChange={(e) => setRentPaidMonthly(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 15000"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">City Type</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMetro(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      !isMetro
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Non-Metro
                  </button>
                  <button
                    onClick={() => setIsMetro(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isMetro
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Metro
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Tax Regime</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTaxRegime("old")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      taxRegime === "old"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Old
                  </button>
                  <button
                    onClick={() => setTaxRegime("new")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      taxRegime === "new"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    New
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={runCalculation}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg mt-8"
          >
            Calculate My Tax Savings →
          </button>
        </div>

        {/* Results */}
        {calculated && (
          <>
            {/* Comparison Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Current Tax */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-red-200">
                <h3 className="text-lg font-bold text-red-700 mb-4">Current Tax</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxable Income</span>
                    <span className="font-semibold">₹{(taxRegime === "new" ? taxableIncomeNew : taxableIncomeOld).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Tax</span>
                    <span className="font-semibold text-red-700">₹{Math.round(taxRegime === "new" ? currentTaxNew : currentTaxOld).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Tax</span>
                    <span className="font-semibold text-red-700">₹{Math.round(taxRegime === "new" ? currentMonthlyTaxNew : currentMonthlyTaxOld).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">In-Hand Monthly</span>
                      <span className="font-bold text-gray-900">₹{Math.round(currentInHand).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* You Save */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-xl p-6 text-white transform scale-105">
                <h3 className="text-lg font-bold mb-4 text-center">YOU SAVE</h3>
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-green-100 text-sm mb-1">Per Year</p>
                    <p className="text-4xl font-extrabold">₹{Math.round(yearlyIncrease).toLocaleString()}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-green-100 text-sm mb-1">Per Month</p>
                    <p className="text-3xl font-extrabold">₹{Math.round(monthlyIncrease).toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-green-100">
                    {((yearlyIncrease / (taxRegime === "new" ? currentTaxNew : currentTaxOld)) * 100).toFixed(0)}% tax reduction
                  </p>
                </div>
              </div>

              {/* After Optimization */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-700 mb-4">After Optimization</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxable Income</span>
                    <span className="font-semibold">₹{Math.round(optimizedTaxableIncome).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Tax</span>
                    <span className="font-semibold text-green-700">₹{Math.round(optimizedTax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Tax</span>
                    <span className="font-semibold text-green-700">₹{Math.round(optimizedMonthlyTax).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">In-Hand Monthly</span>
                      <span className="font-bold text-gray-900">₹{Math.round(optimizedInHand).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestion Cards */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Your Tax-Saving Opportunities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 80C Card */}
                {remaining80C > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-3xl">📈</span>
                      <div>
                        <h3 className="font-bold text-gray-900">Invest in PPF / ELSS</h3>
                        <p className="text-sm text-gray-600">Maximize 80C deduction</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-700">
                        Invest ₹{remaining80C.toLocaleString()} more under 80C
                      </p>
                      <p className="text-lg font-bold text-blue-700">
                        Tax saved: ₹{Math.round(potential80CSaving).toLocaleString()}/year
                      </p>
                    </div>
                    <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                      Learn More →
                    </Link>
                  </div>
                )}

                {/* Health Insurance Card */}
                {additional80D > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-3xl">🏥</span>
                      <div>
                        <h3 className="font-bold text-gray-900">Health Insurance</h3>
                        <p className="text-sm text-gray-600">Claim under 80D</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-700">
                        Buy policy worth ₹{additional80D.toLocaleString()}
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        Tax saved: ₹{Math.round(healthSaving).toLocaleString()}/year
                      </p>
                    </div>
                    <Link href="/faq/what-is-professional-tax" className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                      Learn More →
                    </Link>
                  </div>
                )}

                {/* NPS Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">💼</span>
                    <div>
                      <h3 className="font-bold text-gray-900">NPS Investment</h3>
                      <p className="text-sm text-gray-600">Additional 80CCD(1B)</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700">
                      Invest ₹50,000 in NPS Tier-I
                    </p>
                    <p className="text-lg font-bold text-purple-700">
                      Tax saved: ₹{Math.round(npsSaving).toLocaleString()}/year
                    </p>
                  </div>
                  <Link href="/faq/new-vs-old-tax-regime" className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                    Learn More →
                  </Link>
                </div>

                {/* HRA Card */}
                {hraReceivedMonthly > 0 && rentPaidMonthly > 0 && hraTaxSaving > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-600">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-3xl">🏠</span>
                      <div>
                        <h3 className="font-bold text-gray-900">HRA Optimization</h3>
                        <p className="text-sm text-gray-600">Claim full exemption</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-700">
                        Claim HRA of ₹{Math.round(hraExemptionOptimized).toLocaleString()}
                      </p>
                      <p className="text-lg font-bold text-orange-700">
                        Tax saved: ₹{Math.round(hraTaxSaving).toLocaleString()}/year
                      </p>
                    </div>
                    <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc" className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1">
                      Learn More →
                    </Link>
                  </div>
                )}

                {/* Home Loan Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-600">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">🏡</span>
                    <div>
                      <h3 className="font-bold text-gray-900">Home Loan Interest</h3>
                      <p className="text-sm text-gray-600">Section 24(b)</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700">
                      Claim up to ₹2,00,000 on home loan interest
                    </p>
                    <p className="text-lg font-bold text-red-700">
                      Potential saving: ₹{Math.round(200000 * marginalRate).toLocaleString()}/year
                    </p>
                  </div>
                  <Link href="/faq/how-is-pf-calculated" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Regime Comparison */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Which Regime Saves More?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">New Regime</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Taxable Income</span>
                      <span className="font-semibold">₹{Math.round(taxableIncomeNew).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax</span>
                      <span className="font-semibold">₹{Math.round(currentTaxNew).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/30 pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold">Effective Rate</span>
                        <span className="font-bold">{((currentTaxNew / annualCTC) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Old Regime</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Taxable Income</span>
                      <span className="font-semibold">₹{Math.round(taxableIncomeOld).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax</span>
                      <span className="font-semibold">₹{Math.round(currentTaxOld).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/30 pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold">Effective Rate</span>
                        <span className="font-bold">{((currentTaxOld / annualCTC) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-lg">
                  <strong>Winner:</strong>{" "}
                  {currentTaxNew < currentTaxOld 
                    ? "New Regime saves ₹" + Math.round(currentTaxOld - currentTaxNew).toLocaleString() 
                    : "Old Regime saves ₹" + Math.round(currentTaxNew - currentTaxOld).toLocaleString()}
                </p>
              </div>
            </div>
          </>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Maximize Your Tax Savings Legally in 2025
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Our free <strong>tax savings calculator</strong> helps you find every legal deduction available under Indian tax laws. 
              By optimizing your investments and claims, you can save up to ₹1 lakh or more in taxes annually.
            </p>
            <p>
              <strong>Key tax-saving sections:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Section 80C:</strong> Up to ₹1.5L deduction via PPF, ELSS, LIC, NSC, ULIP, Sukanya Samriddhi, home loan principal</li>
              <li><strong>Section 80D:</strong> Up to ₹25,000 for health insurance premiums (₹50,000 for senior citizens)</li>
              <li><strong>Section 80CCD(1B):</strong> Additional ₹50,000 for NPS Tier-I investment (over and above 80C)</li>
              <li><strong>HRA Exemption:</strong> Tax-free HRA if living in rented accommodation</li>
              <li><strong>Section 24(b):</strong> Up to ₹2L deduction on home loan interest for self-occupied property</li>
            </ul>
            <p className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
              <strong>Pro Tip:</strong> The new tax regime (2025) offers lower tax rates but removes most exemptions. 
              If you have significant HRA, 80C investments, or 80D premiums, the old regime might still be better. 
              Use our calculator above to compare both!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
