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

      {/* FAQ Section */}
      <section id="faq" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          <FAQItem
            question="How is in-hand salary calculated in India?"
            answer="In-hand salary is calculated by deducting Employee PF (12% of basic), Professional Tax (state-specific, usually ₹200/month), and Income Tax (based on tax regime slabs) from your gross CTC. Our calculator uses the latest 2025 tax slabs and includes standard deduction."
          />
          <FAQItem
            question="What is the in-hand salary for ₹10 LPA in 2025?"
            answer="For ₹10 LPA in the new tax regime, your approximate in-hand salary would be ₹75,000-₹78,000 per month after deductions (PF, professional tax, and income tax). The exact amount varies based on your city's professional tax rate."
          />
          <FAQItem
            question="What is the in-hand salary for ₹15 LPA in 2025?"
            answer="For ₹15 LPA in the new tax regime, your approximate in-hand salary would be ₹1,05,000-₹1,10,000 per month. Under the old regime, it might be slightly lower depending on your investments."
          />
          <FAQItem
            question="What is the in-hand salary for ₹20 LPA in 2025?"
            answer="For ₹20 LPA, expect around ₹1,40,000-₹1,45,000 per month in-hand under the new tax regime. The new regime is typically more beneficial for this salary range."
          />
          <FAQItem
            question="What is the in-hand salary for ₹25 LPA in 2025?"
            answer="For ₹25 LPA, your in-hand salary would be approximately ₹1,75,000-₹1,80,000 per month. At this level, the new regime usually offers better savings compared to the old regime."
          />
          <FAQItem
            question="New tax regime vs old tax regime — which is better?"
            answer="The new tax regime (2025) is generally better for most salaried individuals as it offers lower tax rates and a higher standard deduction of ₹75,000. However, if you have significant investments (₹1.5L+ in 80C, HRA benefits), the old regime might be better. Our calculator shows both for comparison."
          />
          <FAQItem
            question="How much PF is deducted from salary?"
            answer="Employee PF contribution is 12% of your basic salary (which is typically 40% of CTC). For example, on a ₹10 LPA CTC, your basic would be ₹4L, and PF deduction would be ₹48,000 annually (₹4,000/month)."
          />
          <FAQItem
            question="What is professional tax and who pays it?"
            answer="Professional Tax is a state-level tax deducted monthly from your salary. It varies by state: Karnataka (Bangalore) charges ₹200/month, Maharashtra (Mumbai/Pune) charges ₹200/month, Delhi has no professional tax, while Telangana (Hyderabad) and Tamil Nadu (Chennai) charge ₹150/month."
          />
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
