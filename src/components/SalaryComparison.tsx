"use client"

import { useState } from "react"
import { useRef } from "react"
import { toPng } from "html-to-image"
import { calculateSalary, TaxCalculationResult } from "@/lib/taxCalculator"
import { getSalaryRange } from "@/lib/salaryData"
import { jobRoles } from "@/lib/jobRoles"
import { cityData } from "@/lib/cityData"
import { getCompanyOptions, getDefaultCompany } from "@/lib/professionCategories"

interface ComparisonProfile {
  jobTitle: string
  city: string
  experience: string
  companyType: string
  annualCTC: string
}

interface CalculationResult extends TaxCalculationResult {
  midSalary: number
  jobTitle: string
  city: string
  experience: string
  companyType: string
  verdictCTC: number | null
}

export default function SalaryComparison() {
  // Profile A state
  const [profileA, setProfileA] = useState<ComparisonProfile>({
    jobTitle: "",
    city: "Bangalore",
    experience: "fresher",
    companyType: "midsize",
    annualCTC: ""
  })
  const [resultA, setResultA] = useState<CalculationResult | null>(null)

  // Profile B state
  const [profileB, setProfileB] = useState<ComparisonProfile>({
    jobTitle: "",
    city: "Bangalore",
    experience: "fresher",
    companyType: "midsize",
    annualCTC: ""
  })
  const [resultB, setResultB] = useState<CalculationResult | null>(null)

  const [compared, setCompared] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Calculate for profile A
  const calculateProfileA = () => {
    if (!profileA.jobTitle) return

    const roleSlug = jobRoles.find(r => r.name === profileA.jobTitle)?.slug
    if (!roleSlug) return

    const salaryRange = getSalaryRange(
      roleSlug,
      profileA.experience as 'fresher' | 'mid' | 'senior' | 'lead',
      profileA.companyType as 'startup' | 'midsize' | 'mnc'
    )

    if (!salaryRange) return

    const midSalary = (salaryRange.min + salaryRange.max) / 2
    const cityInfo = cityData.find(c => c.name === profileA.city)
    const professionalTax = cityInfo?.professionalTaxMonthly || 200

    const taxResult = calculateSalary(
      midSalary * 100000,
      professionalTax,
      true
    )

    const verdictCTC = profileA.annualCTC ? parseFloat(profileA.annualCTC) : null

    setResultA({
      ...taxResult,
      midSalary,
      jobTitle: profileA.jobTitle,
      city: profileA.city,
      experience: profileA.experience,
      companyType: profileA.companyType,
      verdictCTC
    })
  }

  // Calculate for profile B
  const calculateProfileB = () => {
    if (!profileB.jobTitle) return

    const roleSlug = jobRoles.find(r => r.name === profileB.jobTitle)?.slug
    if (!roleSlug) return

    const salaryRange = getSalaryRange(
      roleSlug,
      profileB.experience as 'fresher' | 'mid' | 'senior' | 'lead',
      profileB.companyType as 'startup' | 'midsize' | 'mnc'
    )

    if (!salaryRange) return

    const midSalary = (salaryRange.min + salaryRange.max) / 2
    const cityInfo = cityData.find(c => c.name === profileB.city)
    const professionalTax = cityInfo?.professionalTaxMonthly || 200

    const taxResult = calculateSalary(
      midSalary * 100000,
      professionalTax,
      true
    )

    const verdictCTC = profileB.annualCTC ? parseFloat(profileB.annualCTC) : null

    setResultB({
      ...taxResult,
      midSalary,
      jobTitle: profileB.jobTitle,
      city: profileB.city,
      experience: profileB.experience,
      companyType: profileB.companyType,
      verdictCTC
    })
  }

  // Compare both
  const handleCompare = () => {
    calculateProfileA()
    calculateProfileB()
    setCompared(true)
  }

  // Get percentile
  const getPercentile = (salary: number, role: string, experience: string) => {
    const roleSlug = jobRoles.find(r => r.name === role)?.slug
    if (!roleSlug) return 50

    const range = getSalaryRange(roleSlug, experience as 'fresher' | 'mid' | 'senior' | 'lead', "midsize")
    if (!range) return 50

    if (salary <= range.min) return 15
    if (salary >= range.max) return 92
    return Math.round(15 + ((salary - range.min) / (range.max - range.min)) * 77)
  }

  // Download comparison card
  const handleDownload = async () => {
    if (!cardRef.current) return
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#0f172a"
      })
      const link = document.createElement("a")
      link.download = "salary-comparison.png"
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error generating card:", error)
    }
  }

  // Share to WhatsApp
  const shareWhatsApp = async () => {
    await handleDownload()
    const text = encodeURIComponent(
      `💰 Salary Comparison\n\n` +
      `${resultA?.jobTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} (${resultA?.city}): ₹${Math.round(resultA?.inHandMonthly || 0).toLocaleString()}/month\n` +
      `${resultB?.jobTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} (${resultB?.city}): ₹${Math.round(resultB?.inHandMonthly || 0).toLocaleString()}/month\n\n` +
      `Check your salary at salarytruth.vercel.app/compare`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  // Determine winner and verdict
  const difference = resultA && resultB ? resultA.inHandMonthly - resultB.inHandMonthly : 0
  const winner = difference > 0 ? 'A' : difference < 0 ? 'B' : 'tie'
  
  const getVerdict = () => {
    if (!resultA || !resultB) return ""
    
    if (resultA.jobTitle === resultB.jobTitle && resultA.city === resultB.city) {
      if (Math.abs(difference) > 10000) {
        return `🔥 Person ${winner === 'tie' ? 'A' : winner} is getting paid ₹${Math.abs(difference).toLocaleString()} more for the EXACT same work. Someone needs a raise talk!`
      }
      return `You're basically the same person 👯 Both of you should negotiate more!`
    }
    
    if (resultA.jobTitle === resultB.jobTitle && resultA.city !== resultB.city) {
      return `After cost of living adjustment, Person ${winner === 'tie' ? 'B' : winner === 'A' ? 'B' : 'A'} actually lives better in ${winner === 'A' ? resultB.city : resultA.city} 🤔`
    }
    
    return `${resultA.jobTitle.split('-').pop()} vs ${resultB.jobTitle.split('-').pop()} — the market has spoken 💼`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Salary Comparison Tool
          </h1>
          <p className="text-xl text-gray-600">
            Compare two salaries side by side and see who earns more
          </p>
        </div>

        {/* Two Calculator Panels */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Profile A */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">A</span>
              Person A
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <select
                  value={profileA.jobTitle}
                  onChange={(e) => setProfileA({...profileA, jobTitle: e.target.value, companyType: getDefaultCompany(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select job title</option>
                  {jobRoles.map(role => (
                    <option key={role.slug} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={profileA.city}
                  onChange={(e) => setProfileA({...profileA, city: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {cityData.map(city => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select
                  value={profileA.experience}
                  onChange={(e) => setProfileA({...profileA, experience: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fresher">Fresher (0-2 years)</option>
                  <option value="mid">Mid Level (2-5 years)</option>
                  <option value="senior">Senior (5-10 years)</option>
                  <option value="lead">Lead/Manager (10+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                <div className="flex gap-2">
                  {getCompanyOptions(jobRoles.find(r => r.name === profileA.jobTitle)?.slug || "software-engineer").map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setProfileA({...profileA, companyType: option.value})}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
                        profileA.companyType === option.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (₹ LPA) - Optional</label>
                <input
                  type="number"
                  value={profileA.annualCTC}
                  onChange={(e) => setProfileA({...profileA, annualCTC: e.target.value})}
                  placeholder="e.g. 10"
                  step="0.5"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={calculateProfileA}
                disabled={!profileA.jobTitle}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                Calculate A →
              </button>
            </div>
          </div>

          {/* Profile B */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-green-300">
            <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">B</span>
              Person B
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <select
                  value={profileB.jobTitle}
                  onChange={(e) => setProfileB({...profileB, jobTitle: e.target.value, companyType: getDefaultCompany(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select job title</option>
                  {jobRoles.map(role => (
                    <option key={role.slug} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={profileB.city}
                  onChange={(e) => setProfileB({...profileB, city: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                >
                  {cityData.map(city => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select
                  value={profileB.experience}
                  onChange={(e) => setProfileB({...profileB, experience: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                >
                  <option value="fresher">Fresher (0-2 years)</option>
                  <option value="mid">Mid Level (2-5 years)</option>
                  <option value="senior">Senior (5-10 years)</option>
                  <option value="lead">Lead/Manager (10+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
                <div className="flex gap-2">
                  {getCompanyOptions(jobRoles.find(r => r.name === profileB.jobTitle)?.slug || "software-engineer").map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setProfileB({...profileB, companyType: option.value})}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
                        profileB.companyType === option.value
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (₹ LPA) - Optional</label>
                <input
                  type="number"
                  value={profileB.annualCTC}
                  onChange={(e) => setProfileB({...profileB, annualCTC: e.target.value})}
                  placeholder="e.g. 12"
                  step="0.5"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={calculateProfileB}
                disabled={!profileB.jobTitle}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                Calculate B →
              </button>
            </div>
          </div>
        </div>

        {/* Compare Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleCompare}
            disabled={!profileA.jobTitle || !profileB.jobTitle}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all shadow-2xl"
          >
            Compare →
          </button>
        </div>

        {/* Results */}
        {compared && resultA && resultB && (
          <>
            {/* Winner Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-center mb-4">
                {winner === 'tie' 
                  ? "🤝 It's a Tie!" 
                  : `💰 Person ${winner} Earns ₹${Math.abs(difference).toLocaleString()} More Per Month!`}
              </h2>
              <p className="text-center text-lg text-purple-100">{getVerdict()}</p>
            </div>

            {/* Percentile Badges */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 text-center">
                <p className="text-blue-700 font-bold text-lg mb-2">Person A Percentile</p>
                <p className="text-5xl font-extrabold text-blue-600 mb-2">
                  {getPercentile(resultA.inHandMonthly, resultA.jobTitle, resultA.experience)}%
                </p>
                <p className="text-blue-800">
                  Earns more than {getPercentile(resultA.inHandMonthly, resultA.jobTitle, resultA.experience)}% of {resultA.jobTitle.split('-').pop()} professionals
                </p>
              </div>
              <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 text-center">
                <p className="text-green-700 font-bold text-lg mb-2">Person B Percentile</p>
                <p className="text-5xl font-extrabold text-green-600 mb-2">
                  {getPercentile(resultB.inHandMonthly, resultB.jobTitle, resultB.experience)}%
                </p>
                <p className="text-green-800">
                  Earns more than {getPercentile(resultB.inHandMonthly, resultB.jobTitle, resultB.experience)}% of {resultB.jobTitle.split('-').pop()} professionals
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 overflow-x-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Side by Side Breakdown</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Metric</th>
                    <th className="text-center py-4 px-4 font-bold text-blue-700">Person A</th>
                    <th className="text-center py-4 px-4 font-bold text-green-700">Person B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Gross CTC (Annual)</td>
                    <td className="text-center py-4 px-4 font-semibold">₹{(resultA.midSalary * 100000).toLocaleString()}</td>
                    <td className="text-center py-4 px-4 font-semibold">₹{(resultB.midSalary * 100000).toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-green-50">
                    <td className="py-4 px-4 text-gray-700 font-bold">Monthly In-Hand</td>
                    <td className={`text-center py-4 px-4 font-bold text-lg ${winner === 'A' ? 'text-green-700 bg-green-100 rounded-lg' : ''}`}>₹{Math.round(resultA.inHandMonthly).toLocaleString()}</td>
                    <td className={`text-center py-4 px-4 font-bold text-lg ${winner === 'B' ? 'text-green-700 bg-green-100 rounded-lg' : ''}`}>₹{Math.round(resultB.inHandMonthly).toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Annual In-Hand</td>
                    <td className="text-center py-4 px-4 font-semibold">₹{Math.round(resultA.inHandAnnual).toLocaleString()}</td>
                    <td className="text-center py-4 px-4 font-semibold">₹{Math.round(resultB.inHandAnnual).toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Income Tax/Year</td>
                    <td className="text-center py-4 px-4 font-semibold text-red-600">₹{Math.round(resultA.incomeTaxAnnual).toLocaleString()}</td>
                    <td className="text-center py-4 px-4 font-semibold text-red-600">₹{Math.round(resultB.incomeTaxAnnual).toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">PF Saved/Year</td>
                    <td className="text-center py-4 px-4 font-semibold text-purple-600">₹{Math.round(resultA.employeePF * 12).toLocaleString()}</td>
                    <td className="text-center py-4 px-4 font-semibold text-purple-600">₹{Math.round(resultB.employeePF * 12).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Effective Tax Rate</td>
                    <td className="text-center py-4 px-4 font-semibold">{((resultA.incomeTaxAnnual / (resultA.midSalary * 100000)) * 100).toFixed(1)}%</td>
                    <td className="text-center py-4 px-4 font-semibold">{((resultB.incomeTaxAnnual / (resultB.midSalary * 100000)) * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Shareable Card */}
            <div ref={cardRef} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 mb-8 max-w-4xl mx-auto" style={{ width: "800px" }}>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">SALARY COMPARISON</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-900/50 rounded-2xl p-6">
                  <div className="text-blue-400 font-bold mb-4">PERSON A</div>
                  <div className="space-y-2 text-white">
                    <p className="text-sm">{resultA.jobTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
                    <p className="text-xs text-gray-400">{resultA.city} • {resultA.experience}</p>
                    <p className="text-3xl font-extrabold text-green-400">₹{Math.round(resultA.inHandMonthly).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">per month</p>
                    <div className="mt-4 inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {getPercentile(resultA.inHandMonthly, resultA.jobTitle, resultA.experience)}th Percentile
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/50 rounded-2xl p-6">
                  <div className="text-green-400 font-bold mb-4">PERSON B</div>
                  <div className="space-y-2 text-white">
                    <p className="text-sm">{resultB.jobTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
                    <p className="text-xs text-gray-400">{resultB.city} • {resultB.experience}</p>
                    <p className="text-3xl font-extrabold text-green-400">₹{Math.round(resultB.inHandMonthly).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">per month</p>
                    <div className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {getPercentile(resultB.inHandMonthly, resultB.jobTitle, resultB.experience)}th Percentile
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-sm">salarytruth.vercel.app/compare</p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <button
                onClick={handleDownload}
                className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors"
              >
                📸 Download PNG
              </button>
              <button
                onClick={shareWhatsApp}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                📱 Share on WhatsApp
              </button>
            </div>
          </>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Compare Salaries & See Where You Stand
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Our <strong>salary comparison tool</strong> lets you compare two different profiles side by side. 
              See who earns more, understand percentile rankings, and get insights into market rates across different roles, cities, and experience levels.
            </p>
            <p>
              <strong>Why use this tool?</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Compare your salary with peers in the same role</li>
              <li>See how different cities pay for the same position</li>
              <li>Understand your market value with percentile rankings</li>
              <li>Make informed decisions about job switches and negotiations</li>
              <li>Share comparison cards on social media</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
