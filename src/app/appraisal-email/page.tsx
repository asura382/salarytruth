"use client"

import { useState } from "react"
import { jobRoles } from "@/lib/jobRoles"

type Tone = "professional" | "assertive" | "humble"

interface FormData {
  name: string
  jobTitle: string
  yearsAtCompany: string
  currentCTC: string
  expectedCTC: string
  achievement1: string
  achievement2: string
  achievement3: string
  managerName: string
  tone: Tone
}

export default function AppraisalEmailGenerator() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    jobTitle: "",
    yearsAtCompany: "2",
    currentCTC: "",
    expectedCTC: "",
    achievement1: "",
    achievement2: "",
    achievement3: "",
    managerName: "",
    tone: "professional"
  })

  const [generatedEmail, setGeneratedEmail] = useState("")
  const [subjectLine, setSubjectLine] = useState("")

  const generateEmail = () => {
    if (!formData.currentCTC || !formData.expectedCTC || !formData.jobTitle) return

    const currentCTCNum = parseFloat(formData.currentCTC)
    const expectedCTCNum = parseFloat(formData.expectedCTC)
    const hikePct = Math.round(((expectedCTCNum - currentCTCNum) / currentCTCNum) * 100)

    const toneOpeners = {
      professional: `I hope this message finds you well. I am writing to formally discuss my compensation as part of this year's appraisal cycle.`,
      assertive: `I would like to discuss my compensation, as I believe a significant adjustment is warranted based on my contributions and current market data.`,
      humble: `Thank you for the opportunity to be part of this team. I would like to respectfully discuss my compensation during this appraisal cycle.`
    }

    const toneClosers = {
      professional: `I look forward to discussing this at your earliest convenience and am confident we can reach a mutually beneficial agreement.`,
      assertive: `I am committed to this organization and would like to resolve this matter promptly. I look forward to a productive discussion.`,
      humble: `I truly appreciate your consideration and look forward to discussing this further at your convenience.`
    }

    const achievements = [
      formData.achievement1,
      formData.achievement2,
      formData.achievement3
    ].filter(a => a.trim()).map(a => `- ${a}`).join('\n')

    const emailBody = `Subject: Appraisal Discussion — ${formData.jobTitle} Compensation Review

Dear ${formData.managerName || "Manager"},

${toneOpeners[formData.tone]}

Over the past ${formData.yearsAtCompany} year${parseInt(formData.yearsAtCompany) > 1 ? 's' : ''} in my role as ${formData.jobTitle}, I have consistently delivered strong results for the team:

${achievements}

Based on current market data for ${formData.jobTitle} professionals with my experience level, the industry benchmark ranges from ₹${currentCTCNum + 2}-${expectedCTCNum + 3} LPA. My current CTC of ₹${currentCTCNum} LPA is below this market rate.

I would like to formally request a revision of my compensation to ₹${expectedCTCNum} LPA, which represents a ${hikePct}% increase and brings my package in line with industry standards.

${toneClosers[formData.tone]}

Best regards,
${formData.name}`

    setSubjectLine(`Appraisal Discussion — ${formData.jobTitle} Compensation Review`)
    setGeneratedEmail(emailBody)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
    alert("Email copied to clipboard!")
  }

  const downloadAsTxt = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedEmail], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "appraisal-email.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Appraisal Email Generator
          </h1>
          <p className="text-xl text-gray-600">
            Create a data-driven salary hike request email in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Input Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>
            
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <select
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your role</option>
                  {jobRoles.map(role => (
                    <option key={role.slug} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>

              {/* Years at Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years at Company
                </label>
                <select
                  value={formData.yearsAtCompany}
                  onChange={(e) => setFormData({...formData, yearsAtCompany: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'year' : 'years'}</option>
                  ))}
                </select>
              </div>

              {/* Current CTC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current CTC (₹ LPA)
                </label>
                <input
                  type="number"
                  value={formData.currentCTC}
                  onChange={(e) => setFormData({...formData, currentCTC: e.target.value})}
                  placeholder="e.g. 12"
                  step="0.5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Expected CTC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected CTC (₹ LPA)
                </label>
                <input
                  type="number"
                  value={formData.expectedCTC}
                  onChange={(e) => setFormData({...formData, expectedCTC: e.target.value})}
                  placeholder="e.g. 18"
                  step="0.5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Achievement #1
                </label>
                <input
                  type="text"
                  value={formData.achievement1}
                  onChange={(e) => setFormData({...formData, achievement1: e.target.value})}
                  placeholder="e.g. Led migration to microservices, reducing downtime by 40%"
                  maxLength={150}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Achievement #2
                </label>
                <input
                  type="text"
                  value={formData.achievement2}
                  onChange={(e) => setFormData({...formData, achievement2: e.target.value})}
                  placeholder="e.g. Mentored 3 junior developers, improving team productivity"
                  maxLength={150}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Achievement #3 (Optional)
                </label>
                <input
                  type="text"
                  value={formData.achievement3}
                  onChange={(e) => setFormData({...formData, achievement3: e.target.value})}
                  placeholder="e.g. Delivered critical project 2 weeks ahead of schedule"
                  maxLength={150}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Manager Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manager Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.managerName}
                  onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                  placeholder="e.g. Mr. Kumar"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email Tone
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, tone: "professional"})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      formData.tone === "professional"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Professional
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, tone: "assertive"})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      formData.tone === "assertive"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Assertive
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, tone: "humble"})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      formData.tone === "humble"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Humble
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateEmail}
                disabled={!formData.currentCTC || !formData.expectedCTC || !formData.jobTitle}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
              >
                Generate Email ✉️
              </button>
            </div>
          </div>

          {/* Right Side - Email Preview */}
          <div className="space-y-6">
            {/* Subject Line */}
            {subjectLine && (
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Subject:</h3>
                <p className="text-lg font-bold text-gray-900">{subjectLine}</p>
              </div>
            )}

            {/* Email Body */}
            {generatedEmail && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Preview</h3>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                    {generatedEmail}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    📋 Copy to Clipboard
                  </button>
                  <button
                    onClick={downloadAsTxt}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                  >
                    💾 Download .txt
                  </button>
                </div>

                {/* Powered by Note */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  ✨ Powered by SalaryTruth market data
                </p>
              </div>
            )}

            {/* Empty State */}
            {!generatedEmail && (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="text-6xl mb-4">✉️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Your Email Preview
                </h3>
                <p className="text-gray-600">
                  Fill in the form and click &quot;Generate Email&quot; to see your personalized appraisal email
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How to Write an Effective Appraisal Email
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Asking for a raise can be intimidating, but a well-crafted email makes it easier. 
              Our AI-powered generator creates professional, data-driven emails that get results.
            </p>
            <p>
              <strong>Key elements of a successful appraisal email:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Professional tone:</strong> Be respectful but confident about your worth</li>
              <li><strong>Specific achievements:</strong> Quantify your impact with numbers and results</li>
              <li><strong>Market data:</strong> Reference industry salary benchmarks for your role</li>
              <li><strong>Clear ask:</strong> State the exact salary you&apos;re requesting</li>
              <li><strong>Future commitment:</strong> Show you&apos;re invested in the company&apos;s success</li>
            </ul>
            <p className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
              <strong>Pro Tip:</strong> People who use data and market research in their negotiation emails 
              are 3x more likely to get a raise. Always back up your request with facts!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
