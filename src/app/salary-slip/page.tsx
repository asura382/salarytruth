"use client"

import { useState } from "react"
import { calculateSalary } from "@/lib/taxCalculator"
import { cityData } from "@/lib/cityData"
import { jobRoles } from "@/lib/jobRoles"

export default function SalarySlipGenerator() {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    companyName: "",
    designation: "",
    department: "Engineering",
    month: "March",
    year: new Date().getFullYear(),
    annualCTC: 0,
    city: "Bangalore"
  })

  const [generated, setGenerated] = useState(false)

  // Calculate salary structure
  const monthlyCTC = formData.annualCTC / 12
  const basic = monthlyCTC * 0.4 // 40% of CTC
  const hra = monthlyCTC * 0.2 // 20% of CTC
  const medicalAllowance = 1250
  const transportAllowance = 1600
  const specialAllowance = monthlyCTC - (basic + hra + medicalAllowance + transportAllowance)

  // Deductions
  const employeePF = basic * 0.12 // 12% of basic
  const professionalTax = getProfessionalTax(formData.city)
  const taxResult = calculateSalary(formData.annualCTC, 200, true)
  const incomeTax = taxResult.incomeTaxMonthly

  const grossEarnings = basic + hra + specialAllowance + medicalAllowance + transportAllowance
  const totalDeductions = employeePF + professionalTax + incomeTax
  const netPay = grossEarnings - totalDeductions

  function getProfessionalTax(city: string) {
    // Maharashtra (Mumbai, Pune): ₹200/month
    if (city === "Mumbai" || city === "Pune") return 200
    // Karnataka (Bangalore): ₹200/month
    if (city === "Bangalore") return 200
    // Delhi, Hyderabad, Chennai: ₹100-150/month
    if (["Delhi NCR", "Hyderabad", "Chennai"].includes(city)) return 150
    // Others: ₹100/month
    return 100
  }

  function numberToWords(num: number): string {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]

    if (num === 0) return "Zero"

    const rupees = Math.floor(num)
    const paise = Math.round((num - rupees) * 100)

    function convertHundreds(n: number): string {
      if (n === 0) return ""
      if (n < 10) return ones[n]
      if (n < 20) return teens[n - 10]
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convertHundreds(n % 100) : "")
    }

    function convertIndianNumber(n: number): string {
      if (n === 0) return ""
      if (n < 100) return convertHundreds(n)
      if (n < 1000) return convertHundreds(Math.floor(n / 100)) + " Hundred" + (n % 100 !== 0 ? " " + convertHundreds(n % 100) : "")
      if (n < 100000) return convertHundreds(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convertIndianNumber(n % 1000) : "")
      if (n < 10000000) return convertHundreds(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + convertIndianNumber(n % 100000) : "")
      return convertHundreds(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + convertIndianNumber(n % 10000000) : "")
    }

    let result = convertIndianNumber(rupees) + " Rupees"
    if (paise > 0) result += " and " + convertHundreds(paise) + " Paise"
    return result + " Only"
  }

  const handlePrint = () => {
    window.print()
  }

  const employeeIdFormatted = formData.employeeId || `EMP${String(Date.now()).slice(-6)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Salary Slip Generator
          </h1>
          <p className="text-xl text-gray-600">
            Create professional pay slips instantly — download as PDF or print
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 no-print">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
              <input
                type="text"
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID (optional)</label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Auto-generated"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="ABC Technologies Pvt Ltd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select designation</option>
                {jobRoles.map(role => (
                  <option key={role.slug} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Support">Customer Support</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (₹)</label>
              <input
                type="number"
                value={formData.annualCTC}
                onChange={(e) => setFormData({ ...formData, annualCTC: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                placeholder="e.g. 1200000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              >
                {cityData.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setGenerated(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg mt-8"
          >
            Generate Salary Slip →
          </button>
        </div>

        {generated && formData.annualCTC > 0 && (
          <>
            {/* Print Controls */}
            <div className="flex justify-center gap-4 mb-8 no-print">
              <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                🖨️ Print Salary Slip
              </button>
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                📄 Download PDF
              </button>
            </div>

            {/* Salary Slip - A4 Format */}
            <div className="salary-slip bg-white rounded-none shadow-2xl mx-auto max-w-4xl" style={{ minHeight: "297mm", padding: "20mm" }}>
              {/* Header */}
              <div className="border-b-4 border-gray-800 pb-6 mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{formData.companyName || "COMPANY NAME"}</h1>
                <p className="text-gray-600">SALARY SLIP</p>
              </div>

              {/* Employee Details */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-2 text-sm">
                  <p><strong>Employee Name:</strong> {formData.employeeName || "Employee Name"}</p>
                  <p><strong>Employee ID:</strong> {employeeIdFormatted}</p>
                  <p><strong>Designation:</strong> {formData.designation || "Designation"}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Department:</strong> {formData.department}</p>
                  <p><strong>Month & Year:</strong> {formData.month} {formData.year}</p>
                  <p><strong>City:</strong> {formData.city}</p>
                </div>
              </div>

              {/* Salary Table */}
              <table className="w-full mb-8 border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-gray-900" colSpan={2}>EARNINGS</th>
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-gray-900" colSpan={2}>DEDUCTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3 w-1/4">Basic Salary</td>
                    <td className="border-2 border-gray-800 px-4 py-3 w-1/4 text-right">₹{Math.round(basic).toLocaleString()}</td>
                    <td className="border-2 border-gray-800 px-4 py-3 w-1/4">Employee PF</td>
                    <td className="border-2 border-gray-800 px-4 py-3 w-1/4 text-right">₹{Math.round(employeePF).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3">House Rent Allowance (HRA)</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{Math.round(hra).toLocaleString()}</td>
                    <td className="border-2 border-gray-800 px-4 py-3">Professional Tax</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{professionalTax.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3">Special Allowance</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{Math.round(specialAllowance).toLocaleString()}</td>
                    <td className="border-2 border-gray-800 px-4 py-3">Income Tax (TDS)</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{Math.round(incomeTax).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3">Medical Allowance</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{medicalAllowance.toLocaleString()}</td>
                    <td className="border-2 border-gray-800 px-4 py-3"></td>
                    <td className="border-2 border-gray-800 px-4 py-3"></td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3">Transport Allowance</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{transportAllowance.toLocaleString()}</td>
                    <td className="border-2 border-gray-800 px-4 py-3"></td>
                    <td className="border-2 border-gray-800 px-4 py-3"></td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border-2 border-gray-800 px-4 py-3">GROSS EARNINGS</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{Math.round(grossEarnings).toLocaleString()}</td>
                    <td className="border-2 border-gray-800 px-4 py-3">TOTAL DEDUCTIONS</td>
                    <td className="border-2 border-gray-800 px-4 py-3 text-right">₹{Math.round(totalDeductions).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Net Pay */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-600 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">NET PAY</span>
                  <span className="text-4xl font-extrabold text-green-700">₹{Math.round(netPay).toLocaleString()}</span>
                </div>
              </div>

              {/* Amount in Words */}
              <div className="mb-8">
                <p className="text-gray-700 italic">
                  <strong>Amount in words:</strong> {numberToWords(netPay)}
                </p>
              </div>

              {/* Footer */}
              <div className="border-t-2 border-gray-300 pt-6 mt-8 text-sm text-gray-600">
                <p className="mb-2">This is a computer generated salary slip</p>
                <p>Generated on: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </div>
          </>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12 no-print">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Salary Slip Generator India — Free Online Pay Slip Creator
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Need a professional salary slip for loan applications, visa processing, or rental agreements? 
              Our <strong>salary slip generator</strong> creates realistic, print-ready pay slips in seconds 
              with accurate tax calculations and professional formatting.
            </p>
            <p>
              <strong>What&apos;s included in your CTC:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Basic Salary (40%):</strong> Core salary component, used for PF calculations</li>
              <li><strong>HRA (20%):</strong> House Rent Allowance for tax exemption</li>
              <li><strong>Special Allowance:</strong> Remaining balance after other components</li>
              <li><strong>Medical & Transport:</strong> Fixed allowances (₹1,250 + ₹1,600)</li>
            </ul>
            <p>
              <strong>Deductions explained:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Employee PF (12% of Basic):</strong> Mandatory retirement contribution</li>
              <li><strong>Professional Tax:</strong> State tax (₹100-200/month based on city)</li>
              <li><strong>Income Tax (TDS):</strong> Monthly tax deduction based on tax regime</li>
            </ul>
            <p className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
              <strong>Pro Tip:</strong> This salary slip format is accepted by most banks for personal loans, 
              home loans, and credit card applications. For official use, always get it signed by HR and 
              stamped on company letterhead.
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .salary-slip {
            width: 210mm !important;
            padding: 20mm !important;
            font-family: Arial, sans-serif !important;
            box-shadow: none !important;
            margin: 0 auto !important;
          }
          body { background: white !important; }
        }
      `}</style>
    </div>
  )
}
