import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import CityComparison from '@/components/CityComparison';
import AffiliateSection from '@/components/AffiliateSection';
import AdSlot from '@/components/AdSlot';
import { getRoleBySlug, getAllRoleSlugs } from '@/lib/jobRoles';

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllRoleSlugs();
  return slugs.map((slug) => ({ role: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const roleData = getRoleBySlug(role);
  
  if (!roleData) {
    return {
      title: 'Role Not Found',
    };
  }

  const roleName = roleData.name;
  
  return {
    title: `${roleName} Salary in India 2025 | In-Hand After Tax | SalaryTruth.in`,
    description: `Check exact ${roleName.toLowerCase()} salary in India for 2025. Calculate your in-hand take-home salary after PF, tax and all deductions. Compare across Bangalore, Mumbai, Delhi.`,
    keywords: [`${roleName} salary`, `${roleName} salary India`, `${roleName} in-hand salary`, `${roleName} CTC calculator`],
    openGraph: {
      title: `${roleName} Salary India 2025`,
      description: `Calculate your exact ${roleName} in-hand salary after tax and deductions.`,
      type: 'article',
    },
  };
}

export default async function RolePage({ params }: PageProps) {
  const { role } = await params;
  const roleData = getRoleBySlug(role);
  
  if (!roleData) {
    notFound();
  }

  const roleName = roleData.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
          <li className="text-gray-400">/</li>
          <li><a href="/#popular-roles" className="text-blue-600 hover:underline">Salaries</a></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{roleName}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {roleName} Salary in India 2025 — In-Hand Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Calculate your exact take-home salary after PF, income tax, and professional tax
        </p>
      </header>

      {/* Ad Slot */}
      <AdSlot size="leaderboard" />

      {/* Calculator with pre-selected role */}
      <div className="mb-12">
        <Calculator preselectedRole={roleName} />
      </div>

      {/* Ad Slot */}
      <AdSlot size="banner" />

      {/* Static Content Section */}
      <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {roleName} Salary Trends in India (2025)
        </h2>
        
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            The salary for a {roleName} in India varies significantly based on experience level, 
            company type, and location. Freshers can expect to earn between ₹3-12 lakhs per annum, 
            while experienced professionals with 5-10 years of experience can earn ₹20-50 lakhs or more.
          </p>
          
          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Factors Affecting {roleName} Salary
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Experience Level:</strong> Fresher, Mid-Level, Senior, or Lead positions</li>
            <li><strong>Company Type:</strong> Startups, Mid-size companies, or MNCs</li>
            <li><strong>Location:</strong> Bangalore, Mumbai, Hyderabad, Pune, Chennai, etc.</li>
            <li><strong>Skills:</strong> Technical skills, certifications, and domain expertise</li>
            <li><strong>Industry:</strong> IT, Finance, Healthcare, E-commerce, etc.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Top Hiring Cities for {roleName}s
          </h3>
          <p className="text-gray-700 mb-4">
            Major tech hubs like Bangalore, Hyderabad, and Pune offer the highest salaries for 
            {roleName}s. However, cost of living should also be considered when comparing cities.
          </p>
        </div>
      </section>

      {/* City Comparison */}
      <section className="mb-12">
        <CityComparison
          roleSlug={role}
          experienceLevel="mid"
          companyType="midsize"
          selectedCity="Bangalore"
        />
      </section>

      {/* Affiliate Section */}
      <section className="mb-12">
        <AffiliateSection
          recommendations={[
            {
              title: 'Find Higher Paying Jobs',
              description: `Browse ${roleName} jobs paying ₹15+ LPA`,
              url: 'https://linkedin.com/jobs',
              buttonText: 'View Jobs on LinkedIn →',
            },
            {
              title: 'Upskill to Earn More',
              description: `Top courses to boost your ${roleName} salary by 40%`,
              url: 'https://coursera.org',
              buttonText: 'Browse Courses on Coursera →',
            },
            {
              title: 'Best Credit Cards for Your Salary',
              description: 'Maximize your in-hand salary with the right card',
              url: 'https://bankbazaar.com',
              buttonText: 'Compare Cards →',
            },
            {
              title: 'File ITR for Free',
              description: 'File your income tax return in 10 minutes',
              url: 'https://cleartax.in',
              buttonText: 'File on ClearTax →',
            },
          ]}
        />
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions about {roleName} Salary
        </h2>
        <div className="space-y-4">
          <FAQItem
            question={`What is the average salary of a ${roleName} in India?`}
            answer={`The average salary for a ${roleName} in India ranges from ₹4-15 LPA for freshers, ₹10-25 LPA for mid-level professionals, and ₹20-50+ LPA for senior roles. This varies based on company type, location, and skills.`}
          />
          <FAQItem
            question={`Which city pays the highest for ${roleName}s?`}
            answer={`Bangalore typically offers the highest salaries for ${roleName}s, followed by Mumbai, Hyderabad, and Gurgaon. However, consider the cost of living when comparing cities.`}
          />
          <FAQItem
            question="Are startups better than MNCs for this role?"
            answer="Startups often offer higher base salaries and ESOPs but may have less work-life balance. MNCs provide better job security, benefits, and structured growth. Choose based on your career goals."
          />
          <FAQItem
            question="How much can I expect as a fresher?"
            answer={`As a fresher ${roleName}, you can expect between ₹3-12 LPA depending on your college, skills, and the company. Product-based companies and well-funded startups typically pay more.`}
          />
          <FAQItem
            question="What skills increase salary the most?"
            answer="For technical roles, skills in cloud computing (AWS, Azure), DevOps, full-stack development, and machine learning command premium salaries. Soft skills like communication and leadership also boost earning potential."
          />
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="border border-gray-200 rounded-lg p-4 group">
      <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
        {question}
        <span className="ml-4 text-blue-600 group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <p className="mt-4 text-gray-600 leading-relaxed">{answer}</p>
    </details>
  );
}
