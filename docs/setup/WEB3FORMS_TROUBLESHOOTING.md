# Web3Forms Troubleshooting Guide

This guide helps you fix common issues with the contact form email configuration.

## Current Issue: "This method is not allowed"

If you're getting this error, it means the Web3Forms API key needs to be regenerated with the correct company email address.

## Step-by-Step Fix

### 1. Get a New API Key

1. **Go to Web3Forms**: https://web3forms.com
2. **Enter Company Email**: `qualityservicesnik@gmail.com`
3. **Click "Get Access Key"**
4. **Check Email**: Look for the email in `qualityservicesnik@gmail.com` inbox
5. **Copy the Key**: Save the access key from the email

### 2. Update Cloudflare Pages

1. **Go to Cloudflare Pages Dashboard**: https://dash.cloudflare.com/pages
2. **Select Your Project**: Find your site (quality-services-now-site or similar)
3. **Navigate to Settings**: Settings → Environment variables
4. **Update the Variable**:
   - Find `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Click "Edit"
   - Paste the new key
   - Click "Save"

### 3. Redeploy the Site

1. **Go to Deployments Tab**
2. **Click "Retry deployment"** on the latest deployment
3. **Wait 2-3 minutes** for the build to complete

### 4. Test the Form

1. **Visit your live site**
2. **Fill out the contact form**
3. **Submit the form**
4. **Check `qualityservicesnik@gmail.com`** for the email

## Alternative: Test Locally

If you want to test before deploying:

1. **Update your local `.env` file**:
   ```bash
   NEXT_PUBLIC_WEB3FORMS_KEY=your_new_key_here
   ```

2. **Restart the development server**:
   ```bash
   npm run dev
   ```

3. **Test the form** at `http://localhost:3000`

## Verification

After updating the API key, you should receive emails at `qualityservicesnik@gmail.com` with:

- Customer name and contact information
- Service type requested
- Project details
- Service address

## Common Issues

### Issue: "This method is not allowed"
**Solution**: Regenerate the API key with the correct email address

### Issue: Form submits but no email received
**Solution**: 
1. Check spam folder
2. Verify the API key was created with `qualityservicesnik@gmail.com`
3. Ensure the key is properly set in Cloudflare Pages

### Issue: "Failed to send message" error
**Solution**:
1. Check that `NEXT_PUBLIC_WEB3FORMS_KEY` is set in environment variables
2. Verify the key is valid and not expired
3. Ensure the site has been redeployed after adding the key

## Need Help?

- **Web3Forms Documentation**: https://docs.web3forms.com
- **Web3Forms Support**: https://web3forms.com/contact
- **Check the logs**: Look at the browser console for any JavaScript errors

---

**Remember**: The API key must be created using the company email address (`qualityservicesnik@gmail.com`) for the form to work correctly.
