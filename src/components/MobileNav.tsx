"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()
  
  // Don't show on homepage (calculator is already visible)
  if (pathname === '/') return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 safe-area-bottom">
      <div className="grid grid-cols-4 h-16">
        <Link 
          href="/"
          className={`flex flex-col items-center justify-center space-y-1 ${
            pathname === '/' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs font-medium">Home</span>
        </Link>
        
        <Link 
          href="/tax-savings"
          className={`flex flex-col items-center justify-center space-y-1 ${
            pathname === '/tax-savings' ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl">💰</span>
          <span className="text-xs font-medium">Tax</span>
        </Link>
        
        <Link 
          href="/compare"
          className={`flex flex-col items-center justify-center space-y-1 ${
            pathname === '/compare' ? 'text-purple-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl">⚖️</span>
          <span className="text-xs font-medium">Compare</span>
        </Link>
        
        <Link 
          href="/companies"
          className={`flex flex-col items-center justify-center space-y-1 ${
            pathname === '/companies' ? 'text-orange-600' : 'text-gray-600'
          }`}
        >
          <span className="text-xl">🏢</span>
          <span className="text-xs font-medium">Companies</span>
        </Link>
      </div>
    </div>
  )
}
