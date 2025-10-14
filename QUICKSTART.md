# ⚡ Quickstart Guide

## Deploy Your Website in 3 Steps

### Option 1: Using GitHub CLI (Fastest)

```bash
# 1. Push to GitHub
gh repo create kds-pressure-washing --public --source=. --remote=origin --push

# 2. Open Cloudflare Pages
# Go to: https://dash.cloudflare.com/pages
# Click "Create project" → Connect GitHub → Select repository

# 3. Use these build settings:
Framework: Next.js (Static HTML Export)
Build command: npm run build
Build output: out
```

**Done!** Site live in 3 minutes at `https://kds-pressure-washing.pages.dev`

---

### Option 2: Using Helper Script

```bash
# Run the deployment helper script
./deploy-to-github.sh

# Then follow the Cloudflare Pages setup as above
```

---

### Option 3: Manual Method

```bash
# 1. Create GitHub repo at https://github.com/new

# 2. Push your code
git remote add origin https://github.com/YOUR_USERNAME/kds-pressure-washing.git
git push -u origin main

# 3. Deploy via Cloudflare Pages (see above)
```

---

## What Happens After Deployment?

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Cloudflare automatically:
- ✅ Detects your push
- ✅ Builds your site
- ✅ Deploys updates
- ✅ Updates your live site (~2 min)

---

## Important Files

- **DEPLOY.md** - Quick deploy reference
- **docs/deployment/CLOUDFLARE_DEPLOYMENT.md** - Complete deployment guide
- **deploy-to-github.sh** - Helper script for GitHub push
- **README.md** - Full project documentation

---

## Need Help?

📖 [Full Deployment Guide](docs/deployment/CLOUDFLARE_DEPLOYMENT.md)

---

## Costs

**Everything is FREE:**
- ✅ Hosting: FREE
- ✅ Bandwidth: Unlimited FREE
- ✅ SSL Certificate: FREE
- ✅ Custom Domain: FREE
- ✅ Automatic Deployments: FREE

**Total: $0.00/month** 🎉

