"use client"

import { useState, useCallback } from "react"
import { calculateSalary, TaxCalculationResult } from "@/lib/taxCalculator"
import { getSalaryRange } from "@/lib/salaryData"
import { jobRoles } from "@/lib/jobRoles"
import { cityData } from "@/lib/cityData"
import { getCompanyOptions, getDefaultCompany, ROLE_CATEGORY } from "@/lib/professionCategories"
import ResultCard from "./ResultCard"
import VerdictBadge from "./VerdictBadge"
import CityComparison from "./CityComparison"
import AffiliateSection from "./AffiliateSection"

// All form state in ONE single object
type FormState = {
  jobTitle: string
  city: string
  experience: string
  companyType: string
  currentCTC: string
  taxRegime: "new" | "old"
}

const DEFAULT_FORM: FormState = {
  jobTitle: "",
  city: "Bangalore",
  experience: "fresher",
  companyType: "midsize",
  currentCTC: "",
  taxRegime: "new"
}

interface CalculatorProps {
  preselectedRole?: string
}

interface ExtendedTaxCalculationResult extends TaxCalculationResult {
  salaryRange: { min: number; max: number }
  midSalary: number
  jobTitle: string
  city: string
  experience: string
  companyType: string
  verdictCTC: number | null
  taxRegime: "new" | "old"
}

export default function Calculator({ preselectedRole }: CalculatorProps) {
  const [form, setForm] = useState<FormState>({
    ...DEFAULT_FORM,
    jobTitle: preselectedRole || ""
  })
  const [result, setResult] = useState<ExtendedTaxCalculationResult | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)

  // Single update function for all fields - clears results immediately
  const updateForm = useCallback((field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear results immediately when anything changes to prevent stale data
    setResult(null)
  }, [])

  // Special handler for job title that also resets company type to role's default
  const updateJobTitle = useCallback((newRole: string) => {
    const defaultCompany = getDefaultCompany(newRole)
    setForm(prev => ({ 
      ...prev, 
      jobTitle: newRole,
      companyType: defaultCompany  // Reset company type when role changes
    }))
    setResult(null)
  }, [])

  // Pure calculation function using parameters directly - NO state dependencies
  const runCalculation = useCallback((f: FormState) => {
    if (!f.jobTitle) return

    const roleSlug = jobRoles.find(r => r.name === f.jobTitle)?.slug
    if (!roleSlug) return

    // Get market salary range using parameters
    const salaryRange = getSalaryRange(
      roleSlug,
      f.experience as 'fresher' | 'mid' | 'senior' | 'lead',
      f.companyType as 'startup' | 'midsize' | 'mnc'
    )

    if (!salaryRange) return

    // Use mid-range of market salary for calculation
    const midSalary = (salaryRange.min + salaryRange.max) / 2

    // Get professional tax from city data
    const cityInfo = cityData.find(c => c.name === f.city)
    const professionalTax = cityInfo?.professionalTaxMonthly || 200

    // Calculate tax and in-hand salary
    const taxResult = calculateSalary(
      midSalary * 100000, // Convert lakhs to rupees
      professionalTax,
      f.taxRegime === "new"
    )

    const verdictCTC = f.currentCTC 
      ? parseFloat(f.currentCTC) 
      : null

    setResult({
      ...taxResult,
      salaryRange,
      midSalary,
      jobTitle: f.jobTitle,
      city: f.city,
      experience: f.experience,
      companyType: f.companyType,
      verdictCTC,
      taxRegime: f.taxRegime
    })
    setHasCalculated(true)
  }, [])

  const handleCalculate = () => {
    runCalculation(form)
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* FORM SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        
        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <select
            value={form.jobTitle}
            onChange={e => updateJobTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a job title</option>
            {jobRoles.map(role => (
              <option key={role.slug} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            value={form.city}
            onChange={e => updateForm("city", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {cityData.map(city => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select
            value={form.experience}
            onChange={e => updateForm("experience", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="fresher">Fresher (0-2 years)</option>
            <option value="mid">Mid Level (2-5 years)</option>
            <option value="senior">Senior (5-10 years)</option>
            <option value="lead">Lead/Manager (10+ years)</option>
          </select>
        </div>

        {/* Company Type — Dynamic based on profession */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {form.jobTitle && ROLE_CATEGORY[jobRoles.find(r => r.name === form.jobTitle)?.slug || ''] === "medical" 
              ? "Workplace Type" 
              : form.jobTitle && ROLE_CATEGORY[jobRoles.find(r => r.name === form.jobTitle)?.slug || ''] === "education"
              ? "Institution Type"
              : form.jobTitle && ROLE_CATEGORY[jobRoles.find(r => r.name === form.jobTitle)?.slug || ''] === "legal"
              ? "Practice Type"
              : "Company Type"}
          </label>
          <div className="flex gap-3">
            {getCompanyOptions(jobRoles.find(r => r.name === form.jobTitle)?.slug || "software-engineer").map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateForm("companyType", option.value)}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  form.companyType === option.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Current CTC */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Current CTC (optional — to check if underpaid)
          </label>
          <input
            type="number"
            value={form.currentCTC}
            onChange={e => updateForm("currentCTC", e.target.value)}
            placeholder="e.g. 10 for 10 LPA"
            step="0.5"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tax Regime */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Regime
          </label>
          <div className="flex gap-3">
            {(["new", "old"] as const).map(regime => (
              <button
                key={regime}
                type="button"
                onClick={() => updateForm("taxRegime", regime)}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  form.taxRegime === regime
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {regime === "new" ? "New Regime (2025)" : "Old Regime"}
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!form.jobTitle}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Calculate My In-Hand Salary →
        </button>

        {!form.jobTitle && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Please select a job title to calculate
          </p>
        )}
      </div>

      {/* RESULTS SECTION */}
      {result && (
        <div key={`${result.jobTitle}-${result.experience}-${result.companyType}-${result.city}`}>
          {result.verdictCTC && (
            <VerdictBadge
              currentSalary={result.verdictCTC}
              marketMin={result.salaryRange.min}
              marketMax={result.salaryRange.max}
            />
          )}
          <ResultCard 
            result={result} 
            marketRange={result.salaryRange}
            currentCTC={result.verdictCTC || undefined}
          />
          <CityComparison
            roleSlug={jobRoles.find(r => r.name === result.jobTitle)?.slug || ''}
            experienceLevel={result.experience as 'fresher' | 'mid' | 'senior' | 'lead'}
            companyType={result.companyType as 'startup' | 'midsize' | 'mnc'}
            selectedCity={result.city}
          />
          <AffiliateSection />
        </div>
      )}

      {hasCalculated && !result && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
          Press Calculate to see updated results
        </div>
      )}
    </div>
  )
}
