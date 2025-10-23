# Environment Configuration

This document explains how to set up environment variables for the Google My Business integration.

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google API Configuration
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CLOUD_PROJECT=api-project-600875470759

# Google My Business Configuration
GMB_BUSINESS_PROFILE_ID=6224689361226042939
```

## Getting Your Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `api-project-600875470759`
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Copy the generated API key
6. Replace `your_google_api_key_here` with your actual API key

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Use different API keys for development and production
- Consider restricting API key permissions for security

## Verification

To verify your setup is working:

1. Start the development server: `npm run dev`
2. Check the browser console for any API errors
3. Visit the reviews section to see if GMB data loads
4. Check the network tab for API calls to `/api/gmb-data`

## Troubleshooting

### API Key Issues
- Verify the API key is correct
- Check if Google My Business API is enabled
- Ensure the API key has proper permissions

### Environment Variable Issues
- Make sure `.env.local` is in the project root
- Restart the development server after adding variables
- Check for typos in variable names
