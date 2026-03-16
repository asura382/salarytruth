import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-blue-600">SalaryTruth.in</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/#popular-roles" className="text-gray-600 hover:text-blue-600 transition-colors">
              Popular Roles
            </Link>
            <Link href="/#faq" className="text-gray-600 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
