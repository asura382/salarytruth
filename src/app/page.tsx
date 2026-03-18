'use client';

import Calculator from '@/components/Calculator';
import AdSlot from '@/components/AdSlot';
import { jobRoles } from '@/lib/jobRoles';
import Link from 'next/link';

export default function Home() {
  const popularRoles = jobRoles.slice(0, 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Indian Salary Calculator 2025
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Calculate Your Exact In-Hand Salary After Tax & All Deductions
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Used by 10,000+ professionals across India
        </p>
      </section>

      {/* Ad Slot - Leaderboard */}
      <AdSlot size="leaderboard" />

      {/* Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <Calculator />
        </div>
        <div className="hidden lg:block">
          <AdSlot size="rectangle" />
        </div>
      </div>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Enter Your Details
            </h3>
            <p className="text-gray-600">
              Select your job role, city, experience level, and company type
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get Instant Calculation
            </h3>
            <p className="text-gray-600">
              See your exact in-hand salary after PF, tax, and professional tax
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Compare & Decide
            </h3>
            <p className="text-gray-600">
              Know if you&apos;re underpaid and compare salaries across cities
            </p>
          </div>
        </div>
      </section>

      {/* Popular Roles Grid */}
      <section id="popular-roles" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Popular Job Roles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularRoles.map((role) => (
            <Link
              key={role.slug}
              href={`/salary/${role.slug}`}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
            >
              <h3 className="text-sm font-medium text-gray-900">{role.name}</h3>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/#all-roles"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all {jobRoles.length} roles →
          </Link>
        </div>
      </section>

      {/* Salary Pages Section */}
      <section className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Calculate Specific Salary Packages
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Quick calculations for common CTC packages. See exact in-hand salaries for popular amounts.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[3, 4, 5, 6, 7, 8, 9, 10].map(amount => (
            <Link
              key={amount}
              href={`/salary-amount/${amount}-lpa-in-hand`}
              className="bg-white hover:bg-blue-100 rounded-xl p-4 text-center transition-all transform hover:scale-105 shadow-md"
            >
              <p className="text-sm font-semibold text-gray-900">{amount} LPA</p>
              <p className="text-xs text-gray-600">In-Hand Calculator</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/salary-amount/12-lpa-in-hand"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View more salary packages →
          </Link>
        </div>
      </section>

      {/* Comparison Pages Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Compare & Learn
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link 
            href="/compare/new-vs-old-tax-regime"
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold mb-3">Tax Regimes</h3>
            <p className="text-blue-100 text-sm">
              New vs Old Tax Regime comparison with real examples
            </p>
          </Link>
          
          <Link 
            href="/compare/bangalore-vs-hyderabad"
            className="bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-4xl mb-4">🏙️</div>
            <h3 className="text-xl font-bold mb-3">City Salaries</h3>
            <p className="text-green-100 text-sm">
              Bangalore vs Hyderabad salary & cost of living battle
            </p>
          </Link>
          
          <Link 
            href="/compare/startup-vs-mnc-salary"
            className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Company Types</h3>
            <p className="text-orange-100 text-sm">
              Startup vs MNC salary, ESOPs & benefits breakdown
            </p>
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Latest from the Blog
            </h2>
            <p className="text-gray-600">
              Expert guides on salary, tax planning & career growth
            </p>
          </div>
          <Link 
            href="/blog"
            className="hidden md:inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            View All Posts →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
              Tax Planning
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              How to Calculate In-Hand Salary from CTC
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Learn exactly how to calculate your in-hand salary from CTC with real examples.
            </p>
          </Link>
          
          <Link href="/blog/new-vs-old-tax-regime-2025-which-is-better" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
              Tax Planning
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              New vs Old Tax Regime 2025: Which is Better?
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Detailed comparison with calculators to find which regime saves you more tax.
            </p>
          </Link>
          
          <Link href="/blog/how-to-negotiate-salary-in-india" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
              Career Growth
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              How to Negotiate Salary: 10 Tactics That Work
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Proven salary negotiation tactics used by top performers to get 30-50% hikes.
            </p>
          </Link>
        </div>
        
        <div className="mt-6 text-center md:hidden">
          <Link 
            href="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            View All Posts →
          </Link>
        </div>
      </section>

      {/* More Free Tools Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          More Free Salary Tools
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Everything you need to understand, compare, and optimize your salary
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Card 1 - Tax Savings Calculator */}
          <Link 
            href="/tax-savings"
            className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-green-500"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              💰
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Save Up to ₹1 Lakh in Tax
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Find exactly how much tax you can save legally with PF, NPS, insurance and more deductions
            </p>
            <div className="flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
              Calculate Tax Savings →
            </div>
          </Link>

          {/* Card 2 - Compare Salaries */}
          <Link 
            href="/compare"
            className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-500"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              ⚖️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Compare Two Salaries
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              See who earns more between two profiles. Find your salary percentile among professionals in your city
            </p>
            <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
              Compare Now →
            </div>
          </Link>

          {/* Card 3 - Company Reviews */}
          <Link 
            href="/companies"
            className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-orange-500"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              🏢
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              What Does Your Company Pay?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Browse anonymous salary data from TCS, Infosys, Amazon, Google and 50+ top Indian companies
            </p>
            <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
              Browse Companies →
            </div>
          </Link>

          {/* Card 4 - Appraisal Email Generator */}
          <Link 
            href="/appraisal-email"
            className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Write Your Appraisal Email
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              AI generates a data-driven salary hike request email based on your market underpayment percentage
            </p>
            <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
              Generate Email →
            </div>
          </Link>
        </div>
      </section>
      {/* Enhanced FAQ Section */}
      <section id="faq" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Get instant answers to common questions about salary calculation, taxes, and deductions
        </p>
        <div className="space-y-4 max-w-4xl mx-auto">
          <Link href="/faq/how-is-pf-calculated" className="block">
            <FAQItem
              question="How is PF (Provident Fund) calculated in India?"
              answer="Employee PF contribution is 12% of your basic salary. For example, on a ₹10 LPA CTC, your basic would be ₹4L, and PF deduction would be ₹48,000 annually (₹4,000/month). Your employer contributes an equal amount."
            />
          </Link>
          <Link href="/faq/what-is-professional-tax" className="block">
            <FAQItem
              question="What is professional tax and who pays it?"
              answer="Professional Tax is a state-level tax deducted monthly from your salary. It varies by state: Karnataka (Bangalore) charges ₹200/month, Maharashtra (Mumbai/Pune) charges ₹200/month, Delhi has no professional tax, while Telangana (Hyderabad) and Tamil Nadu (Chennai) charge ₹150/month."
            />
          </Link>
          <Link href="/faq/how-to-negotiate-salary" className="block">
            <FAQItem
              question="How to negotiate salary effectively in India?"
              answer="Never reveal current CTC first, always have competing offers, use the magic script: 'Based on market research and my skills, I'm expecting ₹[X] LPA.' Research shows people who negotiate earn ₹15-25 lakhs more over their career."
            />
          </Link>
          <Link href="/faq/new-vs-old-tax-regime" className="block">
            <FAQItem
              question="New tax regime vs old tax regime — which is better?"
              answer="The new tax regime (2025) is generally better for most salaried individuals as it offers lower tax rates. However, if you have significant investments (₹1.5L+ in 80C, HRA benefits), the old regime might be better. Use our calculator to compare both."
            />
          </Link>
          <Link href="/faq/average-salary-increase-per-year" className="block">
            <FAQItem
              question="What is the average salary increase per year in India?"
              answer="Average annual hike is 10-15%, but switching jobs can give you 30-100% increases. High performers get 20-25% annually. The biggest wealth creation happens through strategic job switches every 2-3 years."
            />
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/faq/how-is-pf-calculated"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all FAQs →
          </Link>
        </div>
      </section>

      {/* Ad Slot - Bottom Leaderboard */}
      <AdSlot size="leaderboard" />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="bg-white rounded-lg shadow p-6 group">
      <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
        {question}
        <span className="ml-4 text-blue-600 group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <p className="mt-4 text-gray-600 leading-relaxed">{answer}</p>
    </details>
  );
}
