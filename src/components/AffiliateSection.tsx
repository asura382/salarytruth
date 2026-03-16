"use client"

const links = [
  {
    title: "Best Jobs in Your City",
    description: "Find high-paying opportunities matching your skills.",
    buttonText: "Browse Jobs on Naukri →",
    url: "https://www.naukri.com",
    color: "blue"
  },
  {
    title: "Upskill to Earn More", 
    description: "Top-rated courses to boost your salary potential.",
    buttonText: "Explore Courses on Udemy →",
    url: "https://www.udemy.com",
    color: "green"
  },
  {
    title: "Best Credit Cards",
    description: "Maximize your in-hand salary with the right card.",
    buttonText: "Compare Cards on BankBazaar →",
    url: "https://www.bankbazaar.com/credit-card.html",
    color: "purple"
  },
  {
    title: "File ITR for Free",
    description: "File your income tax return in 10 minutes.",
    buttonText: "File on ClearTax →",
    url: "https://cleartax.in",
    color: "orange"
  }
]

export default function AffiliateSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Based on Your Profile, We Recommend:
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Resources to help you maximize your earning potential.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((item) => (
          <div 
            key={item.title}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-gray-900 mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500 mb-3">
              {item.description}
            </p>
            
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#1a56db",
                color: "white",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                cursor: "pointer"
              }}
            >
              {item.buttonText}
            </a>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Disclosure: We may earn a commission when you 
        click on links above at no extra cost to you.
      </p>
    </div>
  )
}
