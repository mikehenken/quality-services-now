# Cloudflare Pages Deployment Guide

## 🚀 One-Click Deployment to Cloudflare Pages (FREE)

This guide will help you deploy KD's Pressure Washing & Services website to Cloudflare Pages for **FREE** with automatic deployments on every git push.

---

## Prerequisites

- A GitHub account (free)
- A Cloudflare account (free) - [Sign up here](https://dash.cloudflare.com/sign-up)

---

## Step 1: Push to GitHub

### Option A: Using GitHub CLI (Recommended)

If you have GitHub CLI installed:

```bash
gh repo create kds-pressure-washing --public --source=. --remote=origin --push
```

### Option B: Using GitHub Website

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `kds-pressure-washing`
3. **Do NOT** initialize with README (we already have one)
4. Click "Create repository"
5. Run these commands in your terminal:

```bash
cd /home/mikeh/Projects/roe
git remote add origin https://github.com/YOUR_USERNAME/kds-pressure-washing.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy to Cloudflare Pages

### 🎯 The "One-Click" Process

1. **Go to Cloudflare Pages**
   - Visit [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Click **"Create a project"**

2. **Connect GitHub**
   - Click **"Connect to Git"**
   - Authorize Cloudflare to access your GitHub account
   - Select the `kds-pressure-washing` repository

3. **Configure Build Settings**
   
   Fill in these EXACT settings:
   
   | Setting | Value |
   |---------|-------|
   | **Project name** | `kds-pressure-washing` (or your choice) |
   | **Production branch** | `main` |
   | **Framework preset** | `Next.js (Static HTML Export)` |
   | **Build command** | `npm run build` |
   | **Build output directory** | `out` |
   | **Root directory** | `/` (leave empty) |
   | **Environment variables** | None needed |

4. **Deploy!**
   - Click **"Save and Deploy"**
   - Wait 2-3 minutes for the build to complete ☕
   - Your site will be live at `https://kds-pressure-washing.pages.dev`

---

## Step 3: Custom Domain (Optional)

To use your own domain (e.g., `kdspressurewashing.com`):

1. In Cloudflare Pages dashboard, click on your project
2. Go to **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter your domain name
5. Follow the DNS configuration instructions
6. Wait for SSL certificate (usually takes 5-10 minutes)

**Note:** You'll need to own the domain and manage its DNS through Cloudflare.

---

## 🎉 That's It!

### What You Get:

✅ **Free hosting** - No credit card required  
✅ **Automatic deployments** - Every git push deploys automatically  
✅ **Global CDN** - Lightning-fast worldwide performance  
✅ **Free SSL certificate** - HTTPS included  
✅ **Unlimited bandwidth** - No usage limits  
✅ **DDoS protection** - Enterprise-level security  
✅ **Analytics** - Built-in website analytics  

---

## Automatic Deployments

From now on, whenever you make changes:

```bash
# Make your changes to the code
git add .
git commit -m "Your commit message"
git push
```

Cloudflare will automatically:
1. Detect the push
2. Build your site
3. Deploy the new version
4. Update your live site

**Build time:** ~2-3 minutes per deployment

---

## Viewing Your Site

- **Production URL:** `https://your-project-name.pages.dev`
- **Custom domain:** `https://yourdomain.com` (if configured)

---

## Troubleshooting

### Build Fails

If the build fails, check:
1. Build command is `npm run build`
2. Build output directory is `out`
3. Framework preset is `Next.js (Static HTML Export)`

### Site Not Updating

- Check the "Deployments" tab for build status
- Ensure your git push was successful
- Wait 2-3 minutes for the build to complete

### Need Help?

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)

---

## Advanced: Environment Variables (Future Use)

If you need to add environment variables later (for API keys, etc.):

1. Go to your project in Cloudflare Pages
2. Navigate to **Settings** > **Environment variables**
3. Add your variables for Production and/or Preview environments
4. Redeploy your site

---

## Cost Breakdown

| Feature | Cloudflare Pages | Cost |
|---------|------------------|------|
| Hosting | Unlimited sites | **FREE** |
| Bandwidth | Unlimited | **FREE** |
| Builds | 500/month | **FREE** |
| Build time | 20,000 minutes/month | **FREE** |
| Custom domain | Unlimited | **FREE** |
| SSL certificate | Auto-renewed | **FREE** |
| **TOTAL** | | **$0.00/month** |

---

**🎊 Your website is now live and ready to attract customers!**

