# SalaryTruth.in - Indian Salary Calculator 2025

A free, comprehensive salary calculator for Indian professionals that shows exact in-hand salary after all deductions (PF, income tax, professional tax), compares salaries across cities, and tells users if they are underpaid.

## 🚀 Features

### Core Functionality
- **In-Hand Salary Calculator**: Calculate exact take-home salary after all deductions
- **Tax Regime Comparison**: Compare New vs Old tax regime benefits
- **City-wise Comparison**: Compare salaries across 10 major Indian cities
- **Underpaid Verdict**: Know if you're earning below market rates
- **50+ Job Roles**: Comprehensive salary data for tech, finance, healthcare, and more roles

### Technical Features
- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **SEO Optimized** with auto-generated metadata
- ✅ **Static Site Generation** for all role pages
- ✅ **Mobile Responsive** design
- ✅ **AdSense Ready** placeholders
- ✅ **Affiliate Integration** ready
- ✅ **Zero External APIs** - pure calculation logic

## 📁 Project Structure

```
salary-truth/
├── src/
│   ├── app/
│   │   ├── salary/
│   │   │   └── [role]/
│   │   │       └── page.tsx          # Dynamic SEO pages for each role
│   │   ├── layout.tsx                # Root layout with SEO
│   │   ├── page.tsx                  # Homepage with calculator
│   │   ├── sitemap.ts                # Auto-generated sitemap
│   │   └── robots.ts                 # Robots.txt configuration
│   ├── components/
│   │   ├── Calculator.tsx            # Main calculator form
│   │   ├── ResultCard.tsx            # Salary breakdown display
│   │   ├── CityComparison.tsx        # City comparison table
│   │   ├── VerdictBadge.tsx          # Underpaid/fairly paid badge
│   │   ├── AffiliateSection.tsx      # Affiliate links section
│   │   ├── AdSlot.tsx                # AdSense placeholder
│   │   ├── Header.tsx                # Navigation header
│   │   └── Footer.tsx                # Footer component
│   └── lib/
│       ├── jobRoles.ts               # All 50 job roles list
│       ├── salaryData.ts             # Hardcoded salary ranges
│       ├── cityData.ts               # City multipliers & data
│       ├── taxCalculator.ts          # Tax computation logic
│       └── affiliateLinks.ts         # Affiliate URLs config
├── tailwind.config.ts                # Custom colors & fonts
└── tsconfig.json                     # TypeScript config
```

## 💰 Salary Data Coverage

### Job Roles (50+)
- Software Engineer, Frontend/Backend Developer, Full Stack
- Data Analyst, Data Scientist, Machine Learning Engineer
- DevOps Engineer, Cloud Architect, Cybersecurity Analyst
- Product Manager, Engineering Manager, CTO, VP Engineering
- QA Engineer, Project Manager, Scrum Master
- React/Node.js/Python/Java/Android/iOS Developers
- And many more...

### Cities (10)
- Bangalore (Base multiplier: 1.0)
- Mumbai (1.1x)
- Delhi NCR (0.95x)
- Hyderabad (0.95x)
- Pune (0.9x)
- Chennai (0.85x)
- Kolkata (0.75x)
- Ahmedabad (0.8x)
- Jaipur (0.75x)
- Indore (0.7x)

### Experience Levels
- Fresher (0-2 years)
- Mid Level (2-5 years)
- Senior (5-10 years)
- Lead/Manager (10+ years)

### Company Types
- Startup
- Mid-size Company
- MNC/Large Corp

## 🧮 Tax Calculation Logic

### New Tax Regime 2025-26
- 0 to ₹3,00,000: 0%
- ₹3,00,001 to ₹7,00,000: 5%
- ₹7,00,001 to ₹10,00,000: 10%
- ₹10,00,001 to ₹12,00,000: 15%
- ₹12,00,001 to ₹15,00,000: 20%
- Above ₹15,00,000: 30%
- Standard Deduction: ₹75,000
- Rebate u/s 87A: Full rebate up to ₹12,00,000 taxable income
- 4% Health & Education Cess

### Old Tax Regime
- 0 to ₹2,50,000: 0%
- ₹2,50,001 to ₹5,00,000: 5%
- ₹5,00,001 to ₹10,00,000: 20%
- Above ₹10,00,000: 30%
- Standard Deduction: ₹50,000
- Rebate u/s 87A: Up to ₹5,00,000 income
- 4% Cess

### Other Deductions
- **Employee PF**: 12% of basic salary (40% of CTC)
- **Professional Tax**: State-specific (₹0-₹200/month)
- **Employer PF**: 12% of basic (shown for info only)

## 🎨 Design System

### Colors
- Primary Blue: `#1a56db`
- Success Green: `#057a55`
- Warning Amber: `#c27803`
- Danger Red: `#e02424`
- Background: `#f9fafb`

### Typography
- Font: Inter (Google Fonts)
- Mobile-first responsive scale

## 💰 Monetization

### AdSense Slots
4 strategic placements:
1. Below calculator header (728x90 leaderboard)
2. Right sidebar (300x250 rectangle)
3. Between results and comparison (468x60 banner)
4. Below affiliate section (728x90 leaderboard)

### Affiliate Links
4 recommendation cards:
- LinkedIn Jobs (job search)
- Coursera (upskilling courses)
- BankBazaar (credit cards)
- ClearTax (ITR filing)

All affiliate URLs are centralized in `src/lib/affiliateLinks.ts` for easy updates.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd salary-truth

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Server
Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Pages & Routes

### Homepage (`/`)
- Main calculator with all features
- How it works section
- Popular roles grid (20 roles)
- FAQ section with 8 schema-marked questions
- Trust signals

### Role-Specific Pages (`/salary/[role]`)
Auto-generated static pages for all 50 roles:
- `/salary/software-engineer`
- `/salary/data-scientist`
- `/salary/product-manager`
- ... and 47 more

Each page includes:
- Pre-filled calculator with selected role
- Role-specific salary insights
- City comparison table
- Role-specific FAQs
- Breadcrumb navigation

### Sitemap (`/sitemap.xml`)
Auto-generated with:
- Homepage (priority 1.0, monthly change)
- All 50 role pages (priority 0.8, monthly change)

### Robots.txt (`/robots.txt`)
Allows all search engines, references sitemap.

## 🔧 Configuration

### Add More Roles
Edit `src/lib/jobRoles.ts`:
```typescript
export const jobRoles: JobRole[] = [
  // Add new role
  { name: 'New Role Name', slug: 'new-role-name' },
];
```

### Update Salary Data
Edit `src/lib/salaryData.ts`:
```typescript
'new-role': {
  fresher: { startup: { min: 3, max: 6 }, midsize: {...}, mnc: {...} },
  mid: { ... },
  senior: { ... },
  lead: { ... },
}
```

### Add New City
Edit `src/lib/cityData.ts`:
```typescript
{
  name: 'New City',
  multiplier: 0.85,
  professionalTaxMonthly: 150,
  costOfLivingIndex: 'Medium',
  topCompanies: ['Company1', 'Company2'],
}
```

### Update Affiliate Links
Edit `src/lib/affiliateLinks.ts`:
```typescript
export const affiliateLinks = {
  linkedinJobs: {
    url: 'https://your-affiliate-link.com',
    // ...
  }
};
```

## 📊 SEO Features

### Meta Tags
- Dynamic title and description for each page
- Open Graph tags for social sharing
- Twitter Card integration
- Keywords meta tags

### Structured Data
- FAQ schema on homepage
- Article schema on role pages
- BreadcrumbList schema

### Performance
- Static site generation (SSG)
- Optimized images
- Minimal JavaScript
- Fast loading (<2s)

## 🎯 Verdict Logic

The calculator provides intelligent feedback:

- **Underpaid 🔴**: Current salary < Market minimum
  - Shows % below market
  - Suggests negotiation or job change

- **Fairly Paid 🟡**: Between min and median
  - Room for growth

- **Well Paid 🟢**: Between median and max
  - Above average compensation

- **Exceptional 🚀**: Above market maximum
  - Top percentile earner

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Salary data sourced from market research and user contributions
- Tax slabs as per Indian Income Tax Act 2025
- Professional tax rates as per state government notifications

## 📞 Support

For questions or issues, please contact support@salarytruth.in

---

**Built with ❤️ for Indian professionals**

Calculate your true worth at [SalaryTruth.in](https://salarytruth.in)
