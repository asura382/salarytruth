"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { calculateSalary } from "@/lib/taxCalculator"
import { getSalaryRange } from "@/lib/salaryData"
import { jobRoles } from "@/lib/jobRoles"

const companies = [
  { name: "TCS", slug: "tcs", 
    avgSalary: "6-25 LPA", employees: "600,000+",
    topRoles: ["Software Engineer", "Business Analyst", "Project Manager"],
    rating: 3.8, reviews: 1243 },
  { name: "Infosys", slug: "infosys",
    avgSalary: "6-22 LPA", employees: "300,000+",
    topRoles: ["Software Engineer", "Systems Engineer", "Tech Lead"],
    rating: 3.9, reviews: 987 },
  { name: "Wipro", slug: "wipro",
    avgSalary: "5-20 LPA", employees: "250,000+",
    topRoles: ["Software Engineer", "Project Manager", "QA Engineer"],
    rating: 3.7, reviews: 876 },
  { name: "HCL Technologies", slug: "hcl",
    avgSalary: "6-22 LPA", employees: "220,000+",
    topRoles: ["Software Engineer", "DevOps Engineer", "Tech Lead"],
    rating: 3.8, reviews: 654 },
  { name: "Accenture", slug: "accenture",
    avgSalary: "8-28 LPA", employees: "300,000+",
    topRoles: ["Software Engineer", "Business Analyst", "Cloud Architect"],
    rating: 4.0, reviews: 1102 },
  { name: "Amazon", slug: "amazon",
    avgSalary: "15-50 LPA", employees: "100,000+",
    topRoles: ["Software Engineer", "Data Scientist", "Product Manager"],
    rating: 4.1, reviews: 892 },
  { name: "Google", slug: "google",
    avgSalary: "20-80 LPA", employees: "10,000+",
    topRoles: ["Software Engineer", "Product Manager", "Data Scientist"],
    rating: 4.5, reviews: 432 },
  { name: "Microsoft", slug: "microsoft",
    avgSalary: "18-60 LPA", employees: "15,000+",
    topRoles: ["Software Engineer", "Cloud Architect", "Product Manager"],
    rating: 4.3, reviews: 521 },
  { name: "Flipkart", slug: "flipkart",
    avgSalary: "12-40 LPA", employees: "30,000+",
    topRoles: ["Software Engineer", "Data Scientist", "Product Manager"],
    rating: 4.0, reviews: 678 },
  { name: "Swiggy", slug: "swiggy",
    avgSalary: "10-35 LPA", employees: "5,000+",
    topRoles: ["Software Engineer", "Data Analyst", "Product Manager"],
    rating: 3.9, reviews: 312 },
  { name: "Zomato", slug: "zomato",
    avgSalary: "10-32 LPA", employees: "4,000+",
    topRoles: ["Software Engineer", "Data Scientist", "Marketing Manager"],
    rating: 3.8, reviews: 287 },
  { name: "Razorpay", slug: "razorpay",
    avgSalary: "12-40 LPA", employees: "3,000+",
    topRoles: ["Software Engineer", "Product Manager", "DevOps Engineer"],
    rating: 4.2, reviews: 198 },
  { name: "HDFC Bank", slug: "hdfc-bank",
    avgSalary: "5-20 LPA", employees: "150,000+",
    topRoles: ["Financial Analyst", "HR Manager", "Sales Manager"],
    rating: 3.9, reviews: 543 },
  { name: "Deloitte", slug: "deloitte",
    avgSalary: "8-30 LPA", employees: "50,000+",
    topRoles: ["Business Analyst", "Financial Analyst", "Project Manager"],
    rating: 4.0, reviews: 432 },
  { name: "IBM", slug: "ibm",
    avgSalary: "7-25 LPA", employees: "130,000+",
    topRoles: ["Software Engineer", "Cloud Architect", "Data Scientist"],
    rating: 3.9, reviews: 765 },
  { name: "Cognizant", slug: "cognizant",
    avgSalary: "6-22 LPA", employees: "350,000+",
    topRoles: ["Software Engineer", "Business Analyst", "QA Engineer"],
    rating: 3.8, reviews: 934 },
  { name: "PhonePe", slug: "phonepe",
    avgSalary: "12-38 LPA", employees: "4,000+",
    topRoles: ["Software Engineer", "Data Scientist", "Product Manager"],
    rating: 4.1, reviews: 234 },
  { name: "CRED", slug: "cred",
    avgSalary: "15-45 LPA", employees: "1,500+",
    topRoles: ["Software Engineer", "Product Manager", "Data Scientist"],
    rating: 4.3, reviews: 156 },
  { name: "Meesho", slug: "meesho",
    avgSalary: "10-35 LPA", employees: "3,000+",
    topRoles: ["Software Engineer", "Data Analyst", "Product Manager"],
    rating: 4.0, reviews: 187 },
  { name: "Paytm", slug: "paytm",
    avgSalary: "8-30 LPA", employees: "12,000+",
    topRoles: ["Software Engineer", "Product Manager", "Financial Analyst"],
    rating: 3.7, reviews: 456 }
]

// Sample reviews for each company
const sampleReviews: Record<string, Array<{ role: string; exp: string; ctc: string; comment: string; rating: number }>> = {
  tcs: [
    { role: "Software Engineer", exp: "3 years", ctc: "₹12 LPA", comment: "Good work culture, competitive salary for the industry. Appraisals are fair.", rating: 4 },
    { role: "Business Analyst", exp: "5 years", ctc: "₹18 LPA", comment: "Great learning opportunities but work-life balance can be better.", rating: 4 },
    { role: "Project Manager", exp: "8 years", ctc: "₹25 LPA", comment: "Excellent benefits and job security. Growth is slow but steady.", rating: 4 },
  ],
  infosys: [
    { role: "Software Engineer", exp: "2 years", ctc: "₹9 LPA", comment: "Good training program for freshers. Salary is average compared to product companies.", rating: 4 },
    { role: "Systems Engineer", exp: "4 years", ctc: "₹14 LPA", comment: "Decent place to start career. Projects vary a lot depending on account.", rating: 4 },
  ],
  amazon: [
    { role: "Software Engineer", exp: "3 years", ctc: "₹28 LPA", comment: "High pressure but excellent compensation and learning. Best for career growth.", rating: 5 },
    { role: "Data Scientist", exp: "5 years", ctc: "₹45 LPA", comment: "Amazing perks and benefits. Work-life balance depends on team.", rating: 4 },
  ],
  google: [
    { role: "Software Engineer", exp: "4 years", ctc: "₹55 LPA", comment: "Dream company with best-in-class facilities and compensation.", rating: 5 },
  ],
  microsoft: [
    { role: "Software Engineer", exp: "5 years", ctc: "₹48 LPA", comment: "Great work-life balance and amazing culture. Compensation is top-notch.", rating: 5 },
  ]
}

export default function CompanyDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const company = companies.find(c => c.slug === slug)
  
  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Not Found</h1>
          <Link href="/companies" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Companies
          </Link>
        </div>
      </div>
    )
  }

  const companyReviews = sampleReviews[slug] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/companies" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
          ← Back to Companies
        </Link>

        {/* Company Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
                {company.name}
              </h1>
              <p className="text-xl text-gray-600">
                👥 {company.employees} employees
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold text-lg mb-2">
                ₹{company.avgSalary}
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <span className="font-bold text-2xl text-gray-900">{company.rating}</span>
                <span className="text-gray-500">({company.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary by Role Table */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Salary by Role at {company.name}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Role</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Experience</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Salary Range</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">In-Hand/Month</th>
                </tr>
              </thead>
              <tbody>
                {company.topRoles.map((roleName, roleIdx) => {
                  // Find matching role in jobRoles
                  const matchedRole = jobRoles.find(r => r.name.toLowerCase() === roleName.toLowerCase())
                  const roleSlug = matchedRole?.slug || "software-engineer"
                  
                  // Get salary ranges for different experience levels
                  const fresherRange = getSalaryRange(roleSlug, "fresher", "mnc")
                  const midRange = getSalaryRange(roleSlug, "mid", "mnc")
                  const seniorRange = getSalaryRange(roleSlug, "senior", "mnc")

                  const rows = [
                    { exp: "Fresher (0-2 yrs)", range: fresherRange },
                    { exp: "Mid (2-5 yrs)", range: midRange },
                    { exp: "Senior (5-10 yrs)", range: seniorRange }
                  ]

                  return rows.map((row, idx) => {
                    if (!row.range) return null
                    
                    const midSalary = (row.range.min + row.range.max) / 2
                    const taxResult = calculateSalary(midSalary * 100000, 200, true)
                    const inHandMonthly = Math.round(taxResult.inHandMonthly)

                    return (
                      <tr key={`${roleIdx}-${idx}`} className="border-b border-gray-200 hover:bg-gray-50">
                        {idx === 0 && (
                          <td 
                            rowSpan={3} 
                            className="py-4 px-4 font-semibold text-gray-900 align-top"
                          >
                            {roleName}
                          </td>
                        )}
                        <td className="py-4 px-4 text-gray-700">{row.exp}</td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                            ₹{row.range.min}-{row.range.max} LPA
                          </span>
                        </td>
                        <td className="py-4 px-4 font-bold text-gray-900">
                          ₹{inHandMonthly.toLocaleString()}
                        </td>
                      </tr>
                    )
                  })
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Your Salary Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Submit Your Salary Anonymously
          </h2>
          <SalarySubmissionForm companyName={company.name} />
        </div>

        {/* Anonymous Reviews */}
        {companyReviews.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Anonymous Reviews from {company.name} Employees
            </h2>
            <div className="space-y-6">
              {companyReviews.map((review, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-6 py-4">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-semibold text-gray-900">{review.role}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{review.exp}</span>
                    <span className="text-gray-500">•</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {review.ctc}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={j < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">— Posted anonymously</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Check if You&apos;re Underpaid at {company.name}
          </h2>
          <p className="text-blue-100 mb-6">
            Compare your salary with market data and know your exact worth
          </p>
          <Link 
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
          >
            Calculate Your Salary →
          </Link>
        </div>
      </div>
    </div>
  )
}

// Salary Submission Form Component
function SalarySubmissionForm({ companyName }: { companyName: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    ctc: "",
    review: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Store in localStorage (MVP approach - no backend)
    const submissions = JSON.parse(localStorage.getItem("salarySubmissions") || "[]")
    submissions.push({
      ...formData,
      company: companyName,
      submittedAt: new Date().toISOString()
    })
    localStorage.setItem("salarySubmissions", JSON.stringify(submissions))
    
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ role: "", experience: "", ctc: "", review: "" })
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
        <p className="text-green-700 font-semibold text-lg">✅ Thank you! Your salary has been submitted anonymously.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Role
        </label>
        <select
          required
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your role</option>
          {jobRoles.map(role => (
            <option key={role.slug} value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience
        </label>
        <select
          required
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select experience</option>
          <option value="0-2">0-2 years (Fresher)</option>
          <option value="2-5">2-5 years (Mid)</option>
          <option value="5-10">5-10 years (Senior)</option>
          <option value="10+">10+ years (Lead/Manager)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Annual CTC (₹ LPA)
        </label>
        <input
          type="number"
          required
          value={formData.ctc}
          onChange={(e) => setFormData({...formData, ctc: e.target.value})}
          placeholder="e.g. 12"
          step="0.5"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          One Line Review (Optional)
        </label>
        <input
          type="text"
          value={formData.review}
          onChange={(e) => setFormData({...formData, review: e.target.value})}
          placeholder="e.g. Good work culture, average appraisals"
          maxLength={200}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
      >
        Submit Anonymously
      </button>
    </form>
  )
}
