# Cloudflare Pages Deployment Guide

## 🚀 One-Click Deployment to Cloudflare Pages (FREE)

This guide will help you deploy Quality Services Now website to Cloudflare Pages for **FREE** with automatic deployments on every git push.

---

## Prerequisites

- A GitHub account (free)
- A Cloudflare account (free) - [Sign up here](https://dash.cloudflare.com/sign-up)

---

## Step 1: Push to GitHub

### Option A: Using GitHub CLI (Recommended)

If you have GitHub CLI installed:

```bash
gh repo create quality-services-now --public --source=. --remote=origin --push
```

### Option B: Using GitHub Website

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `quality-services-now`
3. **Do NOT** initialize with README (we already have one)
4. Click "Create repository"
5. Run these commands in your terminal:

```bash
cd /home/mikeh/Projects/roe
git remote add origin https://github.com/YOUR_USERNAME/quality-services-now.git
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
   - Select the `quality-services-now` repository

3. **Configure Build Settings**
   
   Fill in these EXACT settings:
   
   | Setting | Value |
   |---------|-------|
   | **Project name** | `quality-services-now-site` (or your choice) |
   | **Production branch** | `main` |
   | **Framework preset** | `Next.js (Static HTML Export)` |
   | **Build command** | `npm run build` |
   | **Build output directory** | `out` |
   | **Root directory** | `/` (leave empty) |
   | **Environment variables** | Add this (see below) |

   **Environment Variable to Add:**
   - Click **"Add variable"** under Environment variables
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: Get your FREE key from [web3forms.com](https://web3forms.com) using email `EMAIL_REMOVED`
   - (See [Email Setup Guide](../setup/EMAIL_SETUP.md) for detailed instructions)

4. **Deploy!**
   - Click **"Save and Deploy"**
   - Wait 2-3 minutes for the build to complete ☕
   - Your site will be live at `https://quality-services-now-site.pages.dev`

---

## Step 3: Your Free Cloudflare Subdomain! 🎉

**You're done!** Cloudflare automatically gives you a FREE subdomain:

- **Your live URL:** `https://quality-services-now-site.pages.dev`
- **FREE SSL certificate** included
- **Works immediately** - no setup needed
- **No domain purchase required**

This is a **real, permanent URL** you can use forever at no cost!

---

## Optional: Add Your Own Custom Domain Later

**Only if you want to use your own domain** (like `qualityservicesnow.com`):

1. In Cloudflare Pages dashboard, click on your project
2. Go to **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter your domain name
5. Follow the DNS configuration instructions
6. Wait for SSL certificate (usually takes 5-10 minutes)

**Note:** You'll need to own the domain and manage its DNS through Cloudflare. **This is completely optional** - the free `.pages.dev` subdomain works great!

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

- **FREE Cloudflare Subdomain:** `https://quality-services-now-site.pages.dev`
  - This is your permanent URL - no domain purchase needed!
  - Includes free SSL certificate
  - Works immediately after deployment
  
- **Optional Custom Domain:** `https://yourdomain.com` (only if you bought a domain)

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

## 📧 Email Setup for Contact Form

**IMPORTANT:** The contact form needs a FREE email service to send you inquiries.

### Quick Setup (2 minutes):

1. **Get your FREE Web3Forms API key:**
   - Go to https://web3forms.com
   - Enter your company email: `qualityservicesnik@gmail.com`
   - Click "Get Access Key"
   - Check your email and copy the key

2. **Add to Cloudflare Pages:**
   - In your Cloudflare Pages dashboard, go to your project
   - Navigate to **Settings** → **Environment variables**
   - Click **"Add variable"**
     - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
     - Value: [paste your Web3Forms key]
     - Environment: Select **Production**
   - Click **Save**

3. **Redeploy:**
   - Go to the **Deployments** tab
   - Click "Retry deployment" on the latest deployment
   - Wait 2-3 minutes

**Done!** All contact form submissions will now be sent to `qualityservicesnik@gmail.com`

📖 **[Full Email Setup Guide](../setup/EMAIL_SETUP.md)**

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

