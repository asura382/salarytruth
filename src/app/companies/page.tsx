"use client"

import { useState } from "react"
import Link from "next/link"

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

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            What Does Your Company Pay?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Anonymous salary data from employees across India&apos;s top companies
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies (e.g., TCS, Amazon, Google)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-blue-300 rounded-2xl px-6 py-4 pl-14 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500"
            >
              {/* Company Name & Rating */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="font-semibold text-gray-700">{company.rating}</span>
                  <span className="text-xs text-gray-500">({company.reviews})</span>
                </div>
              </div>

              {/* Salary Badge */}
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4">
                ₹{company.avgSalary}
              </div>

              {/* Employee Count */}
              <p className="text-sm text-gray-600 mb-4">
                👥 {company.employees} employees
              </p>

              {/* Top Roles */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Top Roles:</p>
                <div className="flex flex-wrap gap-2">
                  {company.topRoles.map((role, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Salaries Button */}
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                View Salaries →
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500">
              No companies found matching &quot;{searchTerm}&quot;
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Browse Salaries by Company
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Find out what different companies pay in India. Our anonymous salary database includes data from 
              <strong> TCS, Infosys, Wipro, HCL, Accenture, Amazon, Google, Microsoft, Flipkart</strong> and many more.
            </p>
            <p>
              <strong>Why browse company salaries?</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Compare your current salary with company averages</li>
              <li>Negotiate better with market data</li>
              <li>Make informed decisions about job switches</li>
              <li>Understand salary ranges for different roles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
