import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getFAQBySlug, getAllFAQSlugs, getRelatedFAQs } from "@/lib/faqData"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const faq = getFAQBySlug(slug)
  
  if (!faq) {
    return {
      title: "FAQ Not Found",
    }
  }

  return {
    title: `${faq.question} | Salary Truth`,
    description: faq.answer.substring(0, 160),
    keywords: faq.keywords,
  }
}

export async function generateStaticParams() {
  return getAllFAQSlugs().map(slug => ({ slug }))
}

export default async function FAQPage({ params }: PageProps) {
  const { slug } = await params
  const faq = getFAQBySlug(slug)

  if (!faq) {
    notFound()
  }

  const relatedFAQs = getRelatedFAQs(slug, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/#faq"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          ← Back to All FAQs
        </Link>

        {/* FAQ Article */}
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
              {faq.category}
            </span>
          </div>

          {/* Question */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
            {faq.question}
          </h1>

          {/* Answer Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: faq.answer
                .replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
                .replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h3>')
                .replace(/^\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                .replace(/✅/gim, '<span class="text-green-600">✅</span>')
                .replace(/❌/gim, '<span class="text-red-600">❌</span>')
                .replace(/💡/gim, '<span class="text-yellow-600">💡</span>')
                .replace(/📍/gim, '<span class="text-blue-600">📍</span>')
                .replace(/💰/gim, '<span class="text-green-600">💰</span>')
                .replace(/🚀/gim, '<span class="text-purple-600">🚀</span>')
                .replace(/🏢/gim, '<span class="text-blue-600">🏢</span>')
                .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-600 hover:text-blue-700 underline font-medium">$1</a>')
                .replace(/\n/gim, '<br />')
            }}
          />
        </article>

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center mb-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Calculate Your Exact In-Hand Salary
          </h2>
          <p className="text-blue-100 mb-6">
            Get precise breakdowns with tax, PF, and professional tax deductions
          </p>
          <a 
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Calculate Now →
          </a>
        </div>

        {/* Related FAQs */}
        {relatedFAQs.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Questions
            </h2>
            
            <div className="space-y-4">
              {relatedFAQs.map((related) => (
                <Link
                  key={related.slug}
                  href={`/faq/${related.slug}`}
                  className="block group"
                >
                  <div className="bg-gray-50 hover:bg-blue-50 rounded-xl p-6 transition-all border border-gray-200 hover:border-blue-300">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0">❓</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                          {related.question}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {related.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
