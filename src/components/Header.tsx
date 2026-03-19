"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-blue-600">SalaryTruth.in</h1>
          </Link>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-lg"
            title={isDark ? "Switch to Light" : "Switch to Dark"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/hike-calculator" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Hike Calc
            </Link>
            <Link href="/city-compare" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              City Compare
            </Link>
            <Link href="/affordability" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Affordability
            </Link>
            <Link href="/salary-slip" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Salary Slip
            </Link>
            <Link href="/job-offer" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Job Offer
            </Link>
            <Link href="/tax-savings" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Tax Savings
            </Link>
            <Link href="/compare" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Compare Salaries
            </Link>
            <Link href="/companies" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Companies
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Blog
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link 
                href="/hike-calculator" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                📈 Hike Calculator
              </Link>
              <Link 
                href="/city-compare" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏙️ City Compare
              </Link>
              <Link 
                href="/affordability" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                💰 Affordability
              </Link>
              <Link 
                href="/salary-slip" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                📄 Salary Slip
              </Link>
              <Link 
                href="/job-offer" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                💼 Job Offer
              </Link>
              <Link 
                href="/tax-savings" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                💰 Tax Savings
              </Link>
              <Link 
                href="/compare" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                ⚖️ Compare Salaries
              </Link>
              <Link 
                href="/companies" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏢 Companies
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                📝 Blog
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
