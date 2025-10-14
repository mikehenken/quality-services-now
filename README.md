# KD's Pressure Washing & Services

A modern, professional marketing website for KD's Pressure Washing & Services, based in Lehigh Acres, FL.

## Features

- ✨ Modern, minimalist design with vibrant colors
- 📱 Fully responsive mobile-first layout
- 🎨 Smooth animations with Framer Motion
- 🚀 Built with Next.js 14 and TypeScript
- 💅 Styled with Tailwind CSS
- 📧 Contact form with email functionality
- ⭐ Customer reviews carousel
- 🎯 Service area locator

## Services Offered

### Residential
- Pressure Washing
- House Washing
- Exterior Painting
- Interior Painting
- Fence & Deck Staining
- Concrete Cleaning

### Commercial
- Building Washing
- Warehouse Cleaning
- Parking Lot Cleaning
- Commercial Painting
- Storefront Restoration
- HOA Services

## Service Areas

- Lehigh Acres, FL
- Fort Myers, FL
- Naples, FL
- Estero, FL
- Bonita Springs, FL
- Punta Gorda, FL

## 🚀 Quick Deploy (FREE)

Deploy to Cloudflare Pages in minutes - **completely free** with automatic deployments!

### One-Click Deployment Steps:

1. **Push to GitHub:**
   ```bash
   gh repo create kds-pressure-washing --public --source=. --remote=origin --push
   ```

2. **Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)**
   - Click "Create a project"
   - Connect your GitHub repository
   - Use these settings:
     - Framework: `Next.js (Static HTML Export)`
     - Build command: `npm run build`
     - Build output: `out`
   - Click "Save and Deploy"

3. **Done!** Your site is live at `https://your-project.pages.dev`

📖 **[Full Deployment Guide](docs/deployment/CLOUDFLARE_DEPLOYMENT.md)**

---

## Local Development

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

## Technology Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter, Poppins (Google Fonts)

## Project Structure

```
roe/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── WhyUs.tsx
│   ├── Guarantee.tsx
│   ├── Toolkit.tsx
│   ├── Reviews.tsx
│   ├── HowItWorks.tsx
│   ├── EstimateForm.tsx
│   └── Footer.tsx
├── public/
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Contact

**KD's Pressure Washing & Services**
- Phone: (239) 555-1234
- Email: info@kdspressurewashing.com
- Location: Lehigh Acres, FL

---

© 2024 KD's Pressure Washing & Services. All rights reserved.

