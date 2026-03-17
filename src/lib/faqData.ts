export interface FAQItem {
  slug: string
  question: string
  answer: string
  category: string
  keywords: string[]
  relatedFAQs?: string[]
}

export const faqItems: FAQItem[] = [
  {
    slug: "how-is-pf-calculated",
    question: "How is PF (Provident Fund) calculated in India?",
    answer: `
## PF Calculation Formula

**Employee PF Contribution:** 12% of (Basic Salary + DA)
- This is deducted from your salary every month
- Goes to your EPF (Employees' Provident Fund) account

**Employer PF Contribution:** 12% of (Basic Salary + DA)
- Your employer contributes an equal amount
- Also goes to your EPF account

### Example Calculation

If your **Basic Salary** is ₹40,000 per month:

**Monthly PF:**
- Employee Contribution: ₹40,000 × 12% = **₹4,800**
- Employer Contribution: ₹40,000 × 12% = **₹4,800**
- **Total Monthly PF:** ₹9,600

**Annual PF:**
- Employee: ₹4,800 × 12 = **₹57,600**
- Employer: ₹4,800 × 12 = **₹57,600**
- **Total Annual:** ₹1,15,200

### Important Points

✅ PF is mandatory for companies with 20+ employees
✅ Both employee and employer contribute equally
✅ Full PF amount (employee + employer) belongs to you
✅ Interest rate: ~8-8.5% per annum (compounded annually)
✅ Tax-free withdrawal after 5 years of continuous service

### When Can You Withdraw PF?

1. **Retirement:** At age 58
2. **Resignation:** After 2 months of unemployment
3. **Partial Withdrawal:** For medical emergencies, home loan, education
4. **Transfer:** When changing jobs, you can transfer PF to new employer

### PF vs In-Hand Salary

Remember, while PF reduces your monthly in-hand salary, it's a forced savings mechanism that gives you:
- Tax-free interest income
- Retirement corpus
- Tax benefits under Section 80C (up to ₹1.5L)

Use our [salary calculator](/) to see exact PF deductions for your CTC.
    `,
    category: "PF & Deductions",
    keywords: ["PF calculation", "provident fund India", "EPF contribution", "how much PF deducted"],
    relatedFAQs: ["what-is-professional-tax", "how-to-calculate-in-hand-salary"]
  },
  {
    slug: "what-is-professional-tax",
    question: "What is Professional Tax and how much is deducted?",
    answer: `
## Understanding Professional Tax (PT)

**Professional Tax** is a state-level tax levied on individuals earning income from profession, employment, or trade.

### Key Facts About Professional Tax

📍 **State-Specific:** Each state in India has its own PT rates
💰 **Income Slab Based:** Varies based on your monthly salary
🏢 **Employer Deducted:** Automatically deducted by your employer
📅 **Monthly Deduction:** Typically ₹200-250 per month

### Professional Tax by Major Cities

| City | Monthly PT | Annual PT |
|------|------------|-----------|
| Bangalore | ₹200 | ₹2,400 |
| Hyderabad | ₹200 | ₹2,400 |
| Pune | ₹200 | ₹2,400 |
| Mumbai | ₹200 | ₹2,400 |
| Delhi | ₹100 | ₹1,200 |
| Gurgaon | ₹100 | ₹1,200 |
| Chennai | ₹200 | ₹2,400 |

### How Professional Tax Works

**Example:** If you work in Bangalore earning ₹50,000/month

**Monthly Breakdown:**
- Gross Salary: ₹50,000
- Professional Tax: -₹200
- **Before other deductions:** ₹49,800

**Annual Impact:**
- ₹200 × 12 = **₹2,400 per year**

### Important Points

✅ PT is deductible from your taxable income
✅ Maximum PT across India is ₹2,500 per year
✅ Different states have different slabs
✅ Self-employed professionals also need to pay PT
✅ PT certificate required for businesses

### PT Slabs (Example: Karnataka)

- Salary up to ₹15,000/month: **No PT**
- ₹15,001 - ₹25,000/month: **₹150/month**
- Above ₹25,000/month: **₹200/month**

Check your city's PT rate in our [calculator](/) to see exact impact on your in-hand salary.
    `,
    category: "Tax & Deductions",
    keywords: ["professional tax India", "PT deduction", "state tax salary", "how much professional tax"],
    relatedFAQs: ["how-is-pf-calculated", "new-vs-old-tax-regime"]
  },
  {
    slug: "how-to-negotiate-salary",
    question: "How to negotiate salary effectively in India?",
    answer: `
## Salary Negotiation Tactics That Work

### Rule #1: Never Reveal Current CTC First

**Wrong approach:**
HR: "What's your current CTC?"
You: "₹6 LPA"
Result: They offer ₹7.2L (20% hike) 😭

**Right approach:**
HR: "What's your current CTC?"
You: "I'd prefer to discuss my expectations. Based on market research and my skills, I'm expecting ₹10-12 LPA."

### Rule #2: Always Have Competing Offers

Even if you don't, create the perception:

*"I'm currently in final rounds with Company X and Company Y. Both are offering around ₹11-12 LPA. But I really like your product, so if you can match ₹12 LPA, I'll sign immediately."*

### The Magic Script

Use this exact template:

*"Thank you so much for the offer! I'm genuinely excited about this opportunity.*

*However, looking at the compensation, I was expecting something closer to ₹[X] LPA. This is based on:*
1. *Market research for similar roles in [City]*
2. *My [Y] years of specialized experience*
3. *The impact I plan to drive here*

*I understand budgets are tight, but if we can get to ₹[X], I'm ready to accept immediately.*

*Is there flexibility to revisit this?"*

### Timing Matters

**Best times to negotiate:**
- ✅ Tuesday-Thursday mornings (HR is fresh)
- ✅ End of quarter (they need to fill positions)
- ✅ After final round (they're invested in you)

**Worst times:**
- ❌ Monday mornings (stressed)
- ❌ Friday evenings (want to go home)

### Common HR Objections & Counters

**HR: "This is our standard band"**
You: *"I understand bands exist, but exceptional candidates deserve exceptional compensation. Given my [specific achievement], I believe I fall in that category."*

**HR: "We have other candidates"**
You: *"Absolutely, and I'm sure they're great. But we both know I'm the best fit. Why lose time when we can close this today?"*

**HR: "Budget constraints"**
You: *"I get that. Can we structure it differently? Maybe a signing bonus, or performance-based payout after 6 months?"*

### Real Examples

**Candidate A:**
- Initial: ₹6.5 LPA → Negotiated: ₹9.5 LPA (+46%)
- Tactic: Competing offer + market data

**Candidate B:**
- Initial: ₹12 LPA → Negotiated: ₹16 LPA (+33%)
- Tactic: Specific impact metrics + power pause

### Your Action Plan

1. Research market rates (use our [calculator](/))
2. Get competing offers (or at least interviews)
3. Practice your scripts
4. Never accept first offer
5. Be prepared to walk away

Remember: Companies EXPECT negotiation. They budget 10-20% extra for this. If you don't negotiate, you're leaving lakhs on the table! 💰
    `,
    category: "Career Growth",
    keywords: ["salary negotiation", "how to negotiate salary", "salary increase tips", "job offer negotiation"],
    relatedFAQs: ["startup-vs-mnc-salary", "average-salary-increase-per-year"]
  },
  {
    slug: "new-vs-old-tax-regime",
    question: "Which tax regime is better in 2025 - New or Old?",
    answer: `
## Quick Answer

**Choose NEW Regime if:**
- You're a fresher with no investments
- You don't pay HRA
- Your income is below ₹15L
- You want simplicity

**Choose OLD Regime if:**
- You pay significant HRA
- You have home loan interest
- You max out 80C (₹1.5L)
- You have medical insurance

### Tax Slabs Comparison 2025

#### New Regime (Lower Rates, No Exemptions)

| Income | Tax Rate |
|--------|----------|
| 0-3L   | 0%       |
| 3-6L   | 5%       |
| 6-9L   | 10%      |
| 9-12L  | 15%      |
| 12-15L | 20%      |
| 15L+   | 30%      |

Standard Deduction: ₹50,000 ✅

#### Old Regime (Higher Rates, With Exemptions)

| Income | Tax Rate |
|--------|----------|
| 0-2.5L | 0%       |
| 2.5-5L | 5%       |
| 5-10L  | 20%      |
| 10L+   | 30%      |

Standard Deduction: ₹50,000 ✅
Plus: HRA, 80C, 80D, LTA, etc.

### Real Examples

**Example 1: Fresher (₹6 LPA, no investments)**

New Regime:
- Taxable Income: ₹5.5L (after std deduction)
- Tax: ₹15,600

Old Regime:
- Taxable Income: ₹5.5L
- Tax: ₹31,200

**Winner: NEW saves ₹15,600** 💰

**Example 2: Mid-Level (₹12 LPA, HRA ₹2L, 80C ₹1.5L)**

New Regime:
- Taxable Income: ₹11.5L
- Tax: ₹78,000

Old Regime:
- Taxable Income: ₹12L - ₹2L(HRA) - ₹1.5L(80C) - ₹50k(std) = ₹8L
- Tax: ₹52,000

**Winner: OLD saves ₹26,000** 💰

### What You Lose in New Regime

❌ HRA exemption
❌ 80C deduction (₹1.5L)
❌ 80D medical insurance (₹25k-50k)
❌ LTA (Leave Travel Allowance)
❌ Home loan interest (₹2L)
❌ Education loan interest

### Decision Matrix

Calculate your total deductions under old regime:
- HRA + 80C + 80D + Others

**If total < ₹3L:** Choose NEW regime
**If total > ₹3-4L:** Choose OLD regime

Still confused? Use our [tax calculator](/) to compare both regimes with YOUR exact numbers!
    `,
    category: "Tax Planning",
    keywords: ["new vs old tax regime", "which tax regime better", "tax regime comparison 2025", "income tax India"],
    relatedFAQs: ["how-is-pf-calculated", "what-is-professional-tax"]
  },
  {
    slug: "average-salary-increase-per-year",
    question: "What is the average salary increase per year in India?",
    answer: `
## Average Salary Increments in India (2025)

### By Experience Level

| Experience | Average Hike | High Performer | Job Switch |
|------------|--------------|----------------|------------|
| Fresher (0-2y) | 8-12% | 15-20% | 30-50% |
| Mid (3-5y) | 10-15% | 20-25% | 40-70% |
| Senior (5-10y) | 12-18% | 25-35% | 50-100% |
| Lead (10+y) | 15-20% | 30-40% | 60-120% |

### Key Insights

📊 **Average Appraisal Hike:** 10-15% annually
🚀 **High Performers:** 20-25% annually
💼 **Job Switch:** 30-100% increase (biggest jumps!)

### Factors Affecting Your Hike

**1. Performance Rating**
- Exceeds Expectations: 20-30%
- Meets Expectations: 10-15%
- Below Expectations: 0-5%

**2. Company Type**
- Product Companies: 15-25% average
- Service Companies: 8-15% average
- Startups: 20-40% (but risky)

**3. Skills & Technology**
- In-demand skills (AI/ML, Cloud): +5-10% extra
- Legacy technologies: Lower hikes
- Management skills: +10-15%

### The Job Switch Premium

This is where real money is made:

**Example: Software Engineer**

Staying at same company (5 years):
- Year 0: ₹6L → Year 5: ₹10L
- Total growth: **67%**

Switching jobs twice (5 years):
- Job 1 (2y): ₹6L → ₹8L
- Job 2 (2y): ₹12L → ₹16L  
- Job 3 (1y): ₹20L
- Total growth: **233%** 🚀

### How to Maximize Your Hike

**1. Switch Jobs Strategically**
- Best time: 2-3 years at a company
- Peak hiring: Jan-April, Aug-Oct
- Avoid: Nov-Dec (budget exhausted)

**2. Upskill Continuously**
- Learn high-demand technologies
- Get certifications
- Build side projects

**3. Document Your Impact**
- Track achievements quarterly
- Quantify results (₹ saved, % improved)
- Prepare brag document before appraisals

**4. Get Counter Offers**
- Interview elsewhere
- Bring competing offers
- Use as leverage (carefully!)

### Industry Benchmarks

**IT/Software:**
- Fresher: ₹3.5-6L starting
- 5 YOE: ₹12-20L typical
- 10 YOE: ₹25-50L+ possible

**Product-Based:**
- Pay 30-50% more than service companies
- Better ESOPs
- Slower growth but stable

**Startups:**
- Highest salaries (20-50% premium)
- ESOPs lottery ticket
- High risk (90% fail rate)

### Pro Tips

✅ **Never wait** for annual appraisal if you're severely underpaid
✅ **Switch every 2-3 years** for maximum growth
✅ **Always have** multiple offers when negotiating
✅ **Research market rates** before accepting any offer

Check your current market value with our [salary calculator](/) to see if you're being paid fairly!
    `,
    category: "Career Growth",
    keywords: ["average salary increase", "yearly hike India", "salary growth rate", "job switch benefit"],
    relatedFAQs: ["how-to-negotiate-salary", "startup-vs-mnc-salary"]
  }
]

export function getFAQBySlug(slug: string): FAQItem | undefined {
  return faqItems.find(item => item.slug === slug)
}

export function getAllFAQSlugs(): string[] {
  return faqItems.map(item => item.slug)
}

export function getFAQsByCategory(category: string): FAQItem[] {
  return faqItems.filter(item => item.category === category)
}

export function getRelatedFAQs(currentSlug: string, limit: number = 3): FAQItem[] {
  const currentItem = getFAQBySlug(currentSlug)
  if (!currentItem || !currentItem.relatedFAQs) return []

  return faqItems
    .filter(item => currentItem.relatedFAQs?.includes(item.slug))
    .slice(0, limit)
}
