export const AFFILIATE_LINKS = {
  jobs: "https://www.linkedin.com/jobs/",
  courses: "https://www.coursera.org/",
  creditCards: "https://www.bankbazaar.com/credit-card.html",
  itr: "https://cleartax.in/s/efiling-income-tax-return",
  naukri: "https://www.naukri.com/",
  upskill: "https://www.udemy.com/courses/development/"
}

export interface AffiliateLink {
  title: string;
  description: string;
  url: string;
  buttonText: string;
}

export const affiliateLinks: Record<string, AffiliateLink> = {
  linkedinJobs: {
    title: 'Find Higher Paying Jobs',
    description: 'Browse jobs paying ₹{salary}+ LPA',
    url: AFFILIATE_LINKS.jobs,
    buttonText: 'View Jobs on LinkedIn →',
  },
  coursera: {
    title: 'Upskill to Earn More',
    description: 'Top courses to boost your salary by 40%',
    url: AFFILIATE_LINKS.courses,
    buttonText: 'Browse Courses on Coursera →',
  },
  bankbazaar: {
    title: 'Best Credit Cards for Your Salary',
    description: 'Maximize your in-hand salary with the right card',
    url: AFFILIATE_LINKS.creditCards,
    buttonText: 'Compare Cards →',
  },
  cleartax: {
    title: 'File ITR for Free',
    description: 'File your income tax return in 10 minutes',
    url: AFFILIATE_LINKS.itr,
    buttonText: 'File on ClearTax →',
  },
  naukri: {
    title: 'Search Jobs on Naukri',
    description: 'India\'s largest job portal',
    url: AFFILIATE_LINKS.naukri,
    buttonText: 'Browse Jobs →',
  },
  udemy: {
    title: 'Upskill with Udemy',
    description: 'Affordable courses to boost your career',
    url: AFFILIATE_LINKS.upskill,
    buttonText: 'Explore Courses →',
  },
};

export function getAffiliateRecommendations(
  roleName: string,
  marketMaxSalary: number,
  inHandMonthly: number
): AffiliateLink[] {
  return [
    {
      ...affiliateLinks.linkedinJobs,
      description: affiliateLinks.linkedinJobs.description.replace('{salary}', marketMaxSalary.toString()),
    },
    {
      ...affiliateLinks.coursera,
      description: `Top courses to boost your ${roleName} salary by 40%`,
    },
    {
      ...affiliateLinks.bankbazaar,
      description: `Best credit cards for ₹${Math.round(inHandMonthly / 1000)}k/month salary`,
    },
    affiliateLinks.cleartax,
  ];
}
