# Environment Variables Setup Guide

This guide explains how to set up environment variables for local development and production deployment.

## Quick Start

### 1. Create Local .env File

```bash
# Copy the example file
cp .env.example .env
```

### 2. Fill in Your Values

Edit `.env` with your actual API keys and credentials:

```bash
# Open in your editor
nano .env
# or
code .env
```

### 3. Never Commit .env

The `.env` file is automatically ignored by git (see `.gitignore`). **Never commit this file!**

---

## Environment Variables Reference

### Required for Contact Form

#### `NEXT_PUBLIC_WEB3FORMS_KEY`
**Required for:** Contact form functionality  
**Get from:** https://web3forms.com  
**Used in:** `components/EstimateForm.tsx`

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key_here
```

**Setup:**
1. Go to https://web3forms.com
2. Enter your company email address: `qualityservicesnik@gmail.com`
3. Get your access key from email
4. Add to `.env` file

---

### Required for Image Generation (Development Only)

#### `GOOGLE_API_KEY`
**Required for:** AI image generation scripts  
**Get from:** https://makersuite.google.com/app/apikey  
**Used in:** Image generation scripts in `/scripts`

```bash
GOOGLE_API_KEY=your_google_api_key_here
```

**Setup:**
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Enable Gemini API / Imagen access
4. Add to `.env` file

---

### Optional - For Automated Cloudflare Deployment Scripts

#### Cloudflare Credentials
**Required for:** Automated deployment scripts (optional)  
**Get from:** https://dash.cloudflare.com/profile/api-tokens

```bash
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_TOKEN=your_account_token_here
CLOUDFLARE_ORIGINAL_TOKEN=your_original_token_here
CLOUDFLARE_GLOBAL_API_KEY=your_global_api_key_here
CLOUDFLARE_EMAIL=your_cloudflare_email@example.com
```

**Note:** These are only needed if you want to use the automated Cloudflare setup scripts (`cloudflare-setup.js`, etc.). Manual deployment through Cloudflare dashboard doesn't require these.

---

### Optional - Contact Email

#### `CONTACT_EMAIL`
**Required for:** Script output messages  
**Default:** Shows generic message if not set

```bash
CONTACT_EMAIL=your_email@example.com
```

---

### Optional - Site URL

#### `NEXT_PUBLIC_SITE_URL`
**Required for:** Local development URL  
**Default:** `http://localhost:3000`

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Production Environment Variables (Cloudflare Pages)

For production deployment, you need to set environment variables in Cloudflare Pages dashboard:

### Required in Production

1. **Go to Cloudflare Pages Dashboard**
   - https://dash.cloudflare.com/pages
   - Select your project

2. **Navigate to Environment Variables**
   - Settings → Environment variables

3. **Add Required Variable**

   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_WEB3FORMS_KEY` | Your Web3Forms key | Production |

4. **Redeploy**
   - Go to Deployments tab
   - Click "Retry deployment" or push new commit

---

## Security Best Practices

### ✅ DO:
- Use `.env` file for local development
- Keep `.env` in `.gitignore`
- Use environment variables in code: `process.env.VARIABLE_NAME`
- Set production variables in Cloudflare dashboard
- Use different keys for development and production
- Regenerate keys if accidentally exposed

### ❌ DON'T:
- Commit `.env` to git
- Hardcode API keys in code
- Share API keys in screenshots or documentation
- Use production keys in development
- Commit `.env.example` with real keys (use placeholders only)

---

## Checking for Leaked Keys

Before deploying, always run the security check:

```bash
./deploy.sh
```

This script automatically:
- Scans for hardcoded API keys
- Checks that `.env` is in `.gitignore`
- Prevents deployment if secrets are detected

---

## Troubleshooting

### Contact Form Not Working

**Problem:** Contact form submissions fail

**Solution:**
1. Check `.env` has `NEXT_PUBLIC_WEB3FORMS_KEY`
2. For local dev: Restart dev server after adding `.env`
3. For production: Check Cloudflare environment variables
4. Verify Web3Forms key is valid at https://web3forms.com

### Image Generation Scripts Fail

**Problem:** `GOOGLE_API_KEY not set` error

**Solution:**
1. Create `.env` file in project root
2. Add `GOOGLE_API_KEY=your_key_here`
3. Verify API key is valid at https://makersuite.google.com
4. Ensure Gemini API is enabled

### Environment Variables Not Loading

**Problem:** `process.env.VARIABLE` returns undefined

**Solution:**

**For Next.js variables:**
- Must start with `NEXT_PUBLIC_` to be available in browser
- Must restart dev server after changing `.env`
- Clear `.next` folder: `rm -rf .next && npm run dev`

**For Node.js scripts:**
- Variable names don't need `NEXT_PUBLIC_` prefix
- Scripts must load `.env` manually (see `scripts/generate-images-gemini.js` for example)

---

## Example .env File

Here's a complete example with all variables:

```bash
# Required for contact form
NEXT_PUBLIC_WEB3FORMS_KEY=abc123def456ghi789

# Optional for image generation
GOOGLE_API_KEY=AIzaSy...your-key-here

# Optional for automated scripts
CLOUDFLARE_ACCOUNT_ID=1234567890abcdef
CLOUDFLARE_API_TOKEN=token_here
CLOUDFLARE_EMAIL=you@example.com
CONTACT_EMAIL=qualityservicesnik@gmail.com

# Optional for development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Files That Use Environment Variables

### Frontend (Next.js)
- `components/EstimateForm.tsx` → `NEXT_PUBLIC_WEB3FORMS_KEY`

### Backend Scripts
- `scripts/generate-images-gemini.js` → `GOOGLE_API_KEY`
- `scripts/generate-concrete-cleaning-only.js` → `GOOGLE_API_KEY`
- `scripts/generate-review-photos.js` → `GOOGLE_API_KEY`
- `cloudflare-setup.js` → Cloudflare credentials
- `cloudflare-setup-v2.js` → Cloudflare credentials
- `add-env-var-to-cloudflare.js` → `NEXT_PUBLIC_WEB3FORMS_KEY`

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Web3Forms Documentation](https://docs.web3forms.com)
- [Google AI API Keys](https://makersuite.google.com/app/apikey)
- [Cloudflare API Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)

