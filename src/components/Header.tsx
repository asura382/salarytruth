"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const TOOLS = [
  { href: "/", label: "🏠 Salary Calculator", desc: "Calculate exact in-hand salary" },
  { href: "/hike-calculator", label: "📈 Hike Calculator", desc: "Is your appraisal hike fair?" },
  { href: "/tax-savings", label: "💰 Tax Savings", desc: "Save up to ₹1L in tax legally" },
  { href: "/compare", label: "⚖️ Compare Salaries", desc: "Compare two salary profiles" },
  { href: "/city-compare", label: "🏙️ City Comparison", desc: "Should you move cities?" },
  { href: "/affordability", label: "🏠 Affordability", desc: "Home loan & SIP calculator" },
  { href: "/salary-slip", label: "📄 Salary Slip", desc: "Generate a salary slip PDF" },
  { href: "/job-offer", label: "💼 Job Offer", desc: "Should I accept this offer?" },
  { href: "/inflation-calculator", label: "📉 Inflation Impact", desc: "Is salary beating inflation?" },
  { href: "/notice-period", label: "📅 Notice Period", desc: "Last working day calculator" },
  { href: "/freelance-calculator", label: "💻 Freelance Rates", desc: "How much to charge per hour?" },
  { href: "/appraisal-email", label: "✉️ Appraisal Email", desc: "Write salary hike request" },
  { href: "/companies", label: "🏢 Companies", desc: "What does your company pay?" },
  { href: "/blog", label: "📝 Blog", desc: "Salary guides and tips" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setIsDark(true)
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">SalaryTruth.in</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Home
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1"
              >
                🛠️ All Tools
                <span className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              {toolsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setToolsOpen(false)} />
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 max-h-96 overflow-y-auto">
                    {TOOLS.map(tool => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex flex-col px-4 py-2.5 hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-900">{tool.label}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{tool.desc}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Blog
            </Link>

            <Link href="/companies" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Companies
            </Link>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-base"
              title={isDark ? "Switch to Light" : "Switch to Dark"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </nav>

          {/* Mobile: dark mode + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 text-base"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg border border-gray-200 text-gray-700"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 max-h-screen overflow-y-auto">
          <div className="px-4 py-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider py-2">
              All Tools
            </div>
            {TOOLS.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 border-b border-gray-50 hover:bg-blue-50 rounded-lg px-2"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">{tool.label}</div>
                  <div className="text-xs text-gray-500">{tool.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
