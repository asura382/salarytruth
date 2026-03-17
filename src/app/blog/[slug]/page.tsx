import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogPost, getAllBlogSlugs, getRelatedPosts } from "@/lib/blogData"
import BlogCard from "@/components/BlogCard"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${post.title} | Salary Truth`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        {/* Article */}
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{post.publishedAt}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-3">$1</h3>')
                  .replace(/^\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                  .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-600 hover:text-blue-700 underline font-medium">$1</a>')
                  .replace(/\n/gim, '<br />')
              }}
            />
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">
                Calculate Your Exact In-Hand Salary
              </h3>
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
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Read More Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  slug={relatedPost.slug}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  author={relatedPost.author}
                  publishedAt={relatedPost.publishedAt}
                  readTime={relatedPost.readTime}
                  category={relatedPost.category}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
