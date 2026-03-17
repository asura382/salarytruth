import { Metadata } from "next"
import BlogCard from "@/components/BlogCard"
import { blogPosts } from "@/lib/blogData"

export const metadata: Metadata = {
  title: "Salary Guide Blog - Tax Tips, Career Advice & In-Hand Salary Calculations",
  description: "Expert articles on salary calculation, tax planning, career growth, and negotiation strategies for Indian professionals.",
  keywords: ["salary guide India", "tax planning blog", "career advice India", "in-hand salary calculation", "salary negotiation tips"],
  openGraph: {
    title: "Salary Truth Blog - Master Your Finances",
    description: "Free guides on salary calculation, tax optimization, and career growth",
    type: "website",
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Salary Truth <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights on salary calculation, tax planning, career growth, and negotiation strategies
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                📈 Featured Article
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How to Calculate In-Hand Salary from CTC
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Learn exactly how to calculate your in-hand salary from CTC. Understand PF, professional tax, income tax, and more with real examples.
              </p>
              <a 
                href="/blog/how-to-calculate-in-hand-salary-from-ctc"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Read Full Guide →
              </a>
            </div>
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              author={post.author}
              publishedAt={post.publishedAt}
              readTime={post.readTime}
              category={post.category}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Calculate Your Exact In-Hand Salary?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our free calculator to get precise in-hand salary breakdowns with tax calculations, PF deductions, and professional tax.
          </p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Calculate Now →
          </a>
        </div>
      </div>
    </div>
  )
}
