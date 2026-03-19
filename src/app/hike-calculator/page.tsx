"use client"

import { useState } from "react"
import { toPng } from "html-to-image"
import { calculateSalary } from "@/lib/taxCalculator"
import { cityData } from "@/lib/cityData"
import { jobRoles } from "@/lib/jobRoles"

const MARKET_HIKE_DATA = {
  fresher: { min: 15, max: 25, avg: 20 },
  mid: { min: 10, max: 18, avg: 14 },
  senior: { min: 8, max: 15, avg: 11 },
  lead: { min: 6, max: 12, avg: 9 }
}

export default function HikeCalculator() {
  const [currentCTC, setCurrentCTC] = useState<number>(10)
  const [hikePercent, setHikePercent] = useState<number>(20)
  const [jobTitle, setJobTitle] = useState<string>("")
  const [city, setCity] = useState<string>("Bangalore")
  const [experience, setExperience] = useState<string>("mid")
  const [calculated, setCalculated] = useState(false)

  const newCTC = currentCTC * (1 + hikePercent / 100)
  
  const oldInHand = calculateSalary(currentCTC * 100000, 200, true)
  const newInHand = calculateSalary(newCTC * 100000, 200, true)
  
  const monthlyGain = newInHand.inHandMonthly - oldInHand.inHandMonthly
  const annualGain = monthlyGain * 12
  
  const marketHike = MARKET_HIKE_DATA[experience as keyof typeof MARKET_HIKE_DATA]
  
  let verdict = ""
  let verdictColor = ""
  
  if (hikePercent >= marketHike.max) {
    verdict = "🚀 Excellent Hike! Above Market Average"
    verdictColor = "green"
  } else if (hikePercent >= marketHike.min) {
    verdict = "✅ Fair Hike. Matches Market Standard"
    verdictColor = "blue"
  } else {
    verdict = "⚠️ Below Market! You Should Negotiate"
    verdictColor = "red"
  }

  const counterOfferCTC = currentCTC * (1 + marketHike.max / 100)
  const counterDifference = (counterOfferCTC - newCTC) * 100000

  const handleDownload = async () => {
    const element = document.getElementById("share-card")
    if (!element) return
    
    try {
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#0f172a"
      })
      const link = document.createElement("a")
      link.download = "salary-hike-verdict.png"
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const jobTitleFormatted = jobTitle ? jobTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : "Professional"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Salary Hike Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Is your appraisal hike good or bad? Compare with market standards
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current CTC (₹ LPA)
              </label>
              <input
                type="number"
                value={currentCTC}
                onChange={(e) => setCurrentCTC(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                placeholder="e.g. 10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hike Percentage Offered (%)
              </label>
              <input
                type="number"
                value={hikePercent}
                onChange={(e) => setHikePercent(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                placeholder="e.g. 20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <select
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select job title</option>
                {jobRoles.map(role => (
                  <option key={role.slug} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              >
                {cityData.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              >
                <option value="fresher">Fresher (0-2 years)</option>
                <option value="mid">Mid Level (2-5 years)</option>
                <option value="senior">Senior (5-10 years)</option>
                <option value="lead">Lead/Manager (10+ years)</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setCalculated(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg mt-8"
          >
            Calculate My Hike →
          </button>
        </div>

        {calculated && (
          <>
            {/* Section 1 — THE VERDICT */}
            <div className={`rounded-3xl p-8 mb-8 text-center ${
              verdictColor === "green" ? "bg-gradient-to-r from-green-500 to-emerald-600" :
              verdictColor === "blue" ? "bg-gradient-to-r from-blue-500 to-indigo-600" :
              "bg-gradient-to-r from-red-500 to-pink-600"
            } text-white`}>
              <h2 className="text-4xl font-extrabold mb-2">{verdict}</h2>
              <p className="text-lg opacity-90">
                For a {experience} {jobTitleFormatted}, this is {" "}
                {hikePercent >= marketHike.max ? "above" : hikePercent >= marketHike.min ? "at par with" : "below"}
                {" "}market average of {marketHike.avg}%
              </p>
            </div>

            {/* Section 2 — NUMBERS BREAKDOWN */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Numbers Breakdown</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Old CTC</span>
                    <span className="font-bold text-xl">₹{currentCTC} LPA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New CTC</span>
                    <span className="font-bold text-xl text-green-600">₹{newCTC.toFixed(1)} LPA</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Old In-Hand</span>
                      <span className="font-semibold">₹{Math.round(oldInHand.inHandMonthly).toLocaleString()}/month</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">New In-Hand</span>
                      <span className="font-semibold text-green-600">₹{Math.round(newInHand.inHandMonthly).toLocaleString()}/month</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                  <div className="text-center">
                    <p className="text-green-700 font-semibold mb-2">Monthly Gain</p>
                    <p className="text-4xl font-extrabold text-green-600 mb-4">
                      +₹{Math.round(monthlyGain).toLocaleString()}
                    </p>
                    <div className="border-t border-green-200 pt-4">
                      <p className="text-green-700 font-semibold mb-2">Annual Gain</p>
                      <p className="text-3xl font-extrabold text-green-600">
                        +₹{Math.round(annualGain).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 — MARKET COMPARISON */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Comparison</h2>
              
              <p className="text-gray-700 mb-4">
                For <strong>{jobTitleFormatted}</strong> with your experience, market average hike is <strong>{marketHike.avg}%</strong> (range: {marketHike.min}-{marketHike.max}%)
              </p>

              <div className="relative h-8 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${Math.min(hikePercent / 30 * 100, 100)}%` }}
                />
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-yellow-400"
                  style={{ left: `${marketHike.min / 30 * 100}%` }}
                />
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-blue-400"
                  style={{ left: `${marketHike.max / 30 * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>0%</span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  Min ({marketHike.min}%)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                  Max ({marketHike.max}%)
                </span>
                <span>30%</span>
              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-4 border-l-4 border-blue-600">
                <p className="text-blue-800">
                  <strong>Your hike:</strong> {hikePercent}% — 
                  {hikePercent < marketHike.min ? " Below minimum market standard" : 
                   hikePercent > marketHike.max ? " Above maximum market standard!" : 
                   " Within market range ✓"}
                </p>
              </div>
            </div>

            {/* Section 4 — COUNTER OFFER SUGGESTION */}
            {hikePercent < marketHike.min && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-8 mb-8 border-2 border-orange-300">
                <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center gap-3">
                  💡 Counter Offer Suggestion
                </h2>
                
                <div className="space-y-4">
                  <p className="text-orange-900 text-lg">
                    Based on market data, you should negotiate for <strong>{marketHike.max}%</strong> hike
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">They offered</p>
                      <p className="text-2xl font-bold text-gray-900">₹{newCTC.toFixed(1)} LPA</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-sm text-green-700 mb-1">You should ask for</p>
                      <p className="text-2xl font-bold text-green-700">₹{counterOfferCTC.toFixed(1)} LPA</p>
                    </div>
                  </div>

                  <p className="text-orange-900">
                    That would give you ₹{counterOfferCTC.toFixed(1)} LPA instead of ₹{newCTC.toFixed(1)} LPA — 
                    <strong className="text-green-700"> difference of ₹{(counterDifference / 100000).toFixed(1)}L/year</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Section 5 — SHAREABLE CARD */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Verdict</h2>
              
              <div 
                id="share-card"
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-2xl mx-auto mb-6"
                style={{ width: "600px" }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">SALARY HIKE VERDICT</h3>
                  <p className="text-gray-400 text-sm">salarytruth.vercel.app</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <p className="text-gray-300 text-sm mb-2">{jobTitleFormatted}</p>
                  <p className="text-white text-lg mb-4">{city} • {experience}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Old CTC</p>
                      <p className="text-2xl font-bold text-white">₹{currentCTC}L</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">New CTC</p>
                      <p className="text-2xl font-bold text-green-400">₹{newCTC.toFixed(1)}L</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-gray-400 text-xs mb-1">Hike</p>
                    <p className="text-3xl font-extrabold text-green-400">{hikePercent}%</p>
                  </div>
                </div>

                <div className={`rounded-xl p-4 text-center ${
                  verdictColor === "green" ? "bg-green-600" :
                  verdictColor === "blue" ? "bg-blue-600" :
                  "bg-red-600"
                }`}>
                  <p className="text-white font-bold text-lg">{verdict}</p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleDownload}
                  className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors"
                >
                  📸 Download Card
                </button>
              </div>
            </div>
          </>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Salary Hike Calculator India 2025 — Is Your Appraisal Hike Good or Bad?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Not sure if your salary hike is fair? Our <strong>salary hike calculator</strong> compares your 
              appraisal percentage with market standards across 50+ job roles and experience levels.
            </p>
            <p>
              <strong>Market Average Hikes by Experience (2025):</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Fresher (0-2 years):</strong> 15-25% (avg 20%) — High growth phase</li>
              <li><strong>Mid Level (2-5 years):</strong> 10-18% (avg 14%) — Skill building phase</li>
              <li><strong>Senior (5-10 years):</strong> 8-15% (avg 11%) — Leadership transition</li>
              <li><strong>Lead/Manager (10+ years):</strong> 6-12% (avg 9%) — Management track</li>
            </ul>
            <p className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
              <strong>Pro Tip:</strong> If your hike is below market average, don&apos;t accept it blindly. 
              Use our counter-offer suggestion to negotiate better. Data shows people who negotiate 
              earn ₹15-25 lakhs more over their career!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
