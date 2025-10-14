# Email Setup for Contact Form

The contact form uses **Web3Forms** - a completely FREE service that sends form submissions directly to your email.

## Quick Setup (2 minutes)

### Step 1: Get Your FREE API Key

1. Go to https://web3forms.com
2. Enter your email address
3. Click "Get Access Key"
4. Check your email and copy the access key

### Step 2: Add to Cloudflare Pages

1. Go to your Cloudflare Pages dashboard
2. Select your site (kds-pressure-washing or whatever you named it)
3. Go to **Settings** → **Environment variables**
4. Click **Add variable**
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: [paste your access key from Web3Forms]
   - Click **Save**

### Step 3: Redeploy (if already deployed)

If your site is already live:
1. Go to **Deployments** tab
2. Click "Retry deployment" on the latest deployment

**That's it!** All form submissions will now be sent to your email address

---

## What You'll Receive

When someone submits the contact form, you'll get an email with:
- Customer Name
- Email
- Phone Number
- Service Address
- Service Type
- Project Details/Message

## Features

✅ **100% Free** - No credit card required  
✅ **Unlimited submissions** (fair use policy)  
✅ **Spam filtering** built-in  
✅ **Works with static sites** (no backend needed)  
✅ **Instant delivery** to your inbox  

## Alternative: Testing Locally

If you want to test locally before deploying:

1. Create a `.env.local` file in the project root
2. Add your key:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
   ```
3. Run `npm run dev`

The `.env.local` file is already in `.gitignore` so your key won't be committed.

---

**Need help?** Web3Forms has great docs at https://docs.web3forms.com

