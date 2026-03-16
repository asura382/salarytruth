# Deployment Guide - SalaryTruth.in

This guide covers deploying your SalaryTruth.in application to production.

## 🚀 Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications with zero configuration.

### Option 1: Deploy via Vercel Dashboard

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/salary-truth.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Keep default settings
   - Click "Deploy"

3. **Done!**
   Your app will be live at `https://salary-truth.vercel.app`

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🌐 Custom Domain Setup

1. **Buy Domain**
   - Purchase domain from Namecheap, GoDaddy, or similar

2. **Configure DNS in Vercel**
   - Go to Project Settings → Domains
   - Add your domain: `salarytruth.in`
   - Add www subdomain: `www.salarytruth.in`

3. **Update DNS Records**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Enable HTTPS**
   - Vercel automatically provisions SSL certificate
   - Takes 5-10 minutes to propagate

## ⚙️ Environment Variables

This project doesn't require any environment variables (zero API dependencies).

If you want to add analytics later:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENSE_AD_CLIENT=ca-pub-XXXXXXXXXXXXXX
```

## 🔍 Post-Deployment Checklist

### SEO Verification
- [ ] Check meta titles and descriptions
- [ ] Verify sitemap.xml is accessible at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Test Open Graph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Submit sitemap to Google Search Console

### Performance Testing
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Check Core Web Vitals in Vercel dashboard
- [ ] Test on mobile devices
- [ ] Verify page load time < 2 seconds

### Functional Testing
- [ ] Test all 50 role pages
- [ ] Verify calculator calculations
- [ ] Test city comparison table
- [ ] Check all internal links
- [ ] Test FAQ accordions

### Analytics Setup (Optional)
```tsx
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
```

## 📈 Add Google AdSense

1. **Sign up for AdSense**
   - Go to [google.com/adsense](https://google.com/adsense)
   - Create account with your domain

2. **Add AdSense Script**
   ```tsx
   // src/components/AdSlot.tsx
   useEffect(() => {
     const script = document.createElement('script');
     script.async = true;
     script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
     script.crossOrigin = 'anonymous';
     document.head.appendChild(script);
     
     return () => {
       document.head.removeChild(script);
     };
   }, []);
   ```

3. **Replace Placeholders**
   Update ad slot IDs in components:
   ```tsx
   <AdSlot size="leaderboard" slotId="1234567890" />
   ```

4. **Verify Site**
   - Add verification meta tag to layout.tsx
   - Wait for AdSense approval (2-7 days)

## 🔗 Add Affiliate Links

Update affiliate URLs in `src/lib/affiliateLinks.ts`:

```typescript
export const affiliateLinks = {
  linkedinJobs: {
    url: 'https://linkedin.com/jobs?your-affiliate-id',
    // ...
  },
  coursera: {
    url: 'https://coursera.org/?your-affiliate-id',
    // ...
  }
};
```

## 📊 Monitoring & Maintenance

### Weekly Tasks
- Monitor Vercel analytics
- Check Google Search Console for crawl errors
- Review AdSense performance

### Monthly Tasks
- Update salary data if needed
- Add new job roles based on search trends
- Optimize underperforming pages

### Quarterly Tasks
- Audit affiliate link performance
- Update tax slabs if government changes policies
- Refresh FAQ content

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to main branch:

```bash
# Make changes
git add .
git commit -m "Update salary data for 2025"
git push origin main

# Vercel will automatically rebuild and deploy
```

## 🛡️ Backup Strategy

1. **GitHub Repository**
   - All code version controlled
   - Enable branch protection on main

2. **Database Backup** (if added later)
   - Use Vercel Postgres or external DB
   - Schedule weekly backups

3. **Analytics Data**
   - Export Google Analytics reports monthly

## 📱 Mobile App (Future Enhancement)

Consider building a React Native version:
```bash
npx create-expo-app salary-truth-mobile
```

## 🎯 Marketing Your Launch

1. **Product Hunt**
   - Prepare launch post
   - Gather initial upvotes
   - Respond to comments

2. **Social Media**
   - Twitter thread about building the app
   - LinkedIn post targeting HR professionals
   - Reddit r/IndiaInvestments, r/bangalore

3. **SEO Content**
   - Write blog posts about salary trends
   - Guest post on career blogs
   - Reach out to career counselors

## 📧 Contact & Support

Set up support email:
- Use Gmail or custom domain email
- Add contact form on website
- Create FAQ documentation

---

**Your SalaryTruth.in app is now ready to serve millions of Indian professionals! 🚀**

For technical support, check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
