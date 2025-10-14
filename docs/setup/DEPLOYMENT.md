# 🚀 Quick Deploy to Cloudflare Pages

## Super Fast Deployment (5 minutes)

### Step 1: Push to GitHub

```bash
# If you have GitHub CLI installed:
gh repo create kds-pressure-washing --public --source=. --remote=origin --push

# OR manually:
# 1. Create repo at https://github.com/new
# 2. Run:
git remote add origin https://github.com/YOUR_USERNAME/kds-pressure-washing.git
git push -u origin main
```

### Step 2: Deploy to Cloudflare Pages

1. Go to **https://dash.cloudflare.com/pages**
2. Click **"Create a project"** → **"Connect to Git"**
3. Select your `kds-pressure-washing` repository
4. Use these settings:

   ```
   Framework preset: Next.js (Static HTML Export)
   Build command: npm run build
   Build output directory: out
   ```

5. Click **"Save and Deploy"**

### Step 3: Done! 🎉

Your site will be live at: `https://kds-pressure-washing.pages.dev`

**This is a FREE permanent URL!** 
- ✅ No domain purchase required
- ✅ FREE SSL certificate included  
- ✅ Works immediately
- ✅ You can add a custom domain later (optional)

---

## Why Cloudflare Pages?

- ✅ **100% FREE** - No credit card needed
- ✅ **Automatic deployments** - Push to git, auto-deploy
- ✅ **Global CDN** - Lightning fast worldwide
- ✅ **Free SSL** - HTTPS included
- ✅ **Unlimited bandwidth** - No traffic limits
- ✅ **Custom domains** - Use your own domain for free

---

## Full Documentation

For detailed instructions, troubleshooting, and custom domain setup:

📖 **[Complete Deployment Guide](docs/deployment/CLOUDFLARE_DEPLOYMENT.md)**

---

## Update Your Site

After initial deployment, just push changes:

```bash
git add .
git commit -m "Update website"
git push
```

Cloudflare automatically rebuilds and deploys! ⚡

