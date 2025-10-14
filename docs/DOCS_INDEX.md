# Documentation Index

Welcome to the KD's Pressure Washing & Services documentation.

## Deployment

- [Cloudflare Pages Deployment Guide](deployment/CLOUDFLARE_DEPLOYMENT.md) - Complete guide for free hosting on Cloudflare Pages

## Quick Links

- [Main README](../README.md) - Project overview and local development setup
- [Deployment Guide](deployment/CLOUDFLARE_DEPLOYMENT.md) - Deploy to production

## Project Structure

```
roe/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services showcase
│   ├── WhyUs.tsx         # Why choose us
│   ├── Guarantee.tsx     # Satisfaction guarantee
│   ├── Toolkit.tsx       # Equipment showcase
│   ├── Reviews.tsx       # Customer testimonials
│   ├── HowItWorks.tsx    # Process explanation
│   ├── EstimateForm.tsx  # Contact/estimate form
│   └── Footer.tsx        # Site footer
├── public/               # Static assets
├── docs/                 # Documentation
└── [config files]        # Next.js, TypeScript, Tailwind configs
```

## Getting Started

1. **Local Development**
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:3000

2. **Production Build**
   ```bash
   npm run build
   ```

3. **Deploy to Cloudflare Pages**
   - See [Cloudflare Deployment Guide](deployment/CLOUDFLARE_DEPLOYMENT.md)

## Support

For questions or issues, refer to the relevant documentation section above.

