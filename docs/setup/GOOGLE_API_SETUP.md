# Google API Setup Guide

## Current Issue

The application is currently showing a 500 error for the `/api/gmb-data/` endpoint because the Google API key is not configured. The application has been updated to provide fallback data when the API key is missing, but for full functionality, you need to set up the Google API.

## Quick Fix (Immediate)

The application now works with fallback data, so the 500 error should be resolved. However, to get real Google My Business data, follow the setup steps below.

## Complete Setup (Recommended)

### 1. Create Environment File

Create a `.env.local` file in your project root:

```bash
# Google API Configuration
GOOGLE_API_KEY=your_google_api_key_here

# Google Cloud Project
GOOGLE_CLOUD_PROJECT=api-project-600875470759

# Google My Business Configuration
GMB_BUSINESS_PROFILE_ID=6224689361226042939
```

### 2. Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select or create a project
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Copy the generated API key
6. Replace `your_google_api_key_here` in `.env.local` with your actual API key

### 3. Enable Required APIs

1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - "Google My Business Business Information API"
   - "Google My Business Account Management API"

### 4. Request Google My Business API Access

**Important**: Google My Business APIs require special access that must be requested:

1. Visit the [Google My Business API Access Request](https://developers.google.com/my-business/content/overview)
2. Fill out the access request form
3. Provide your business information and use case
4. Wait for approval (can take several days to weeks)

### 5. Test the Setup

Run the test script to verify your configuration:

```bash
node test-gmb-service.js
```

## Current Behavior

### Without API Key (Fallback Mode)
- ✅ Application works without errors
- ✅ Shows fallback business data
- ✅ Displays sample reviews and ratings
- ✅ No 500 errors

### With API Key (Full Mode)
- ✅ Fetches real data from Google My Business
- ✅ Shows actual reviews and ratings
- ✅ Displays real business photos
- ✅ Updates automatically

## Troubleshooting

### Common Issues

1. **"Google API key is not configured"**
   - Solution: Create `.env.local` file with `GOOGLE_API_KEY=your_key`

2. **"Access Denied" errors**
   - Solution: Request access to Google My Business APIs
   - This is a common issue as these APIs require special approval

3. **"Business Profile Not Found"**
   - Solution: Verify the `GMB_BUSINESS_PROFILE_ID` is correct
   - Ensure the business is verified on Google My Business

4. **Rate Limit Errors**
   - Solution: The application includes fallback data for this scenario

### Debug Mode

To see detailed error information, check the browser console or server logs when accessing `/api/gmb-data/`.

## Files Modified

- `lib/gmb-service.ts` - Added fallback data and better error handling
- `app/api/gmb-data/route.ts` - Improved error messages and fallback support
- `test-gmb-service.js` - Test script for debugging

## Next Steps

1. **Immediate**: The application now works with fallback data
2. **Short-term**: Set up Google API key for real data
3. **Long-term**: Request Google My Business API access for full integration

The application is now resilient and will work regardless of API configuration status.
