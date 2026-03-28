import { jobRoles } from "@/lib/jobRoles"

export async function GET() {
  const baseUrl = "https://salarytruth.vercel.app"
  
  const staticPages = [
    { url: baseUrl, priority: "1.0", freq: "weekly" },
    { url: `${baseUrl}/hike-calculator`, priority: "0.9", freq: "monthly" },
    { url: `${baseUrl}/tax-savings`, priority: "0.9", freq: "monthly" },
    { url: `${baseUrl}/compare`, priority: "0.9", freq: "monthly" },
    { url: `${baseUrl}/city-compare`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/affordability`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/salary-slip`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/job-offer`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/notice-period`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/inflation-calculator`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/form-16`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/salary-growth`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/freelance-calculator`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/appraisal-email`, priority: "0.8", freq: "monthly" },
    { url: `${baseUrl}/companies`, priority: "0.9", freq: "weekly" },
    { url: `${baseUrl}/blog`, priority: "0.9", freq: "weekly" },
    { url: `${baseUrl}/resume-builder`, priority: "0.9", freq: "monthly" },
  ]

  const salaryAmountPages = [
    3,4,5,6,7,8,9,10,12,15,18,20,25,30,40,50
  ].map(lpa => ({
    url: `${baseUrl}/salary-amount/${lpa}-lpa-in-hand`,
    priority: "0.9",
    freq: "monthly"
  }))

  const rolePages = jobRoles.map((role: any) => ({
    url: `${baseUrl}/salary/${role.slug}`,
    priority: "0.8",
    freq: "monthly"
  }))

  const allPages = [
    ...staticPages,
    ...salaryAmountPages,
    ...rolePages
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
