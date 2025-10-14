# 🚀 Deployment Quick Reference

## One-Command Secure Deploy

```bash
./deploy.sh
```

**What it does:**
1. Scans code for API keys/secrets ✅
2. Verifies .gitignore setup ✅
3. Commits your changes ✅
4. Pushes to GitHub main ✅
5. Triggers Cloudflare auto-deploy ✅

---

## Common Commands

### Deploy with Security Check
```bash
./deploy.sh
```

### Deploy (Old Script - No Security Check)
```bash
./deploy-to-github.sh
```

### Manual Deploy Steps
```bash
# 1. Check for secrets manually
grep -r "api_key" --exclude-dir={node_modules,.git,.next}

# 2. Stage and commit
git add .
git commit -m "Your commit message"

# 3. Push to GitHub
git push origin main
```

---

## Troubleshooting

### Script Permission Denied
```bash
chmod +x deploy.sh
```

### Security Check Failed
1. Move secrets to `.env` file
2. Add `.env` to `.gitignore`
3. Use `process.env.YOUR_VAR` in code
4. Run `./deploy.sh` again

### Push Rejected
```bash
git pull origin main --rebase
./deploy.sh
```

### Check Deployment Status
- Visit: https://dash.cloudflare.com/pages
- Check build logs for errors

---

## Environment Variables

### Local (.env file)
```bash
# Create .env in project root
GOOGLE_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Cloudflare Pages
1. Dashboard → Your Project → Settings
2. Environment variables
3. Add variables for production

---

## Security Checklist

Before deploy:
- [ ] No API keys in code
- [ ] All secrets in .env
- [ ] .env in .gitignore
- [ ] Cloudflare env vars set
- [ ] Build tested locally

---

## Full Documentation

- **[Secure Deployment Guide](SECURE_DEPLOYMENT.md)** - Complete guide
- **[Cloudflare Setup](CLOUDFLARE_DEPLOYMENT.md)** - Initial setup
- **[Quick Start](../setup/QUICK_START.md)** - 3-minute deploy

---

**Last Updated:** 2025-10-14

