import Link from "next/link"

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  readTime: string
  category: string
}

export default function BlogCard({ slug, title, excerpt, author, publishedAt, readTime, category }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">{author}</p>
              <p className="text-xs text-gray-500">{publishedAt}</p>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">{readTime}</span>
        </div>
      </article>
    </Link>
  )
}
