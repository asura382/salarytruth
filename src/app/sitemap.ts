import { MetadataRoute } from 'next';
import { getAllRoleSlugs } from '@/lib/jobRoles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://salarytruth.in';
  const roleSlugs = getAllRoleSlugs();

  // Homepage
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];

  // Add all role pages
  const rolePages = roleSlugs.map((slug) => ({
    url: `${baseUrl}/salary/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...rolePages];
}
