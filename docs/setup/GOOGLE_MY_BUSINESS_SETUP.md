# Google My Business API Setup

This document explains how to set up Google My Business API integration for pulling real reviews, images, and business information.

## Prerequisites

1. **Google Cloud Project**: You need a valid Google Cloud project
2. **Google My Business Account**: Your business must have a verified Google My Business profile
3. **API Access**: Request access to Google My Business APIs (not available to all users)

## Setup Steps

### 1. Enable Google My Business API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `api-project-600875470759`
3. Navigate to "APIs & Services" > "Library"
4. Search for "Google My Business Business Information API"
5. Click "Enable"

### 2. Create API Key

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to specific APIs for security

### 3. Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Google API Configuration
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CLOUD_PROJECT=api-project-600875470759

# Google My Business Configuration
GMB_BUSINESS_PROFILE_ID=6224689361226042939
```

### 4. Request API Access

Google My Business APIs require special access:

1. Visit the [Google My Business API Access Request](https://developers.google.com/my-business/content/overview)
2. Fill out the access request form
3. Provide your business information and use case
4. Wait for approval (can take several days)

## API Usage

### Business Profile ID

The Business Profile ID for this project is: `6224689361226042939`

### Available Endpoints

- **Location Info**: `/api/gmb-data` - Fetches business location details
- **Reviews**: Automatically included in location data
- **Photos**: Automatically included in location data

### Rate Limits

- Google My Business APIs have rate limits
- The service includes fallback data if API calls fail
- Caching is recommended for production use

## Implementation Details

### GMB Service (`lib/gmb-service.ts`)

The `GMBService` class handles:
- Authentication with Google APIs
- Fetching business location information
- Retrieving reviews and ratings
- Getting business photos
- Error handling and fallbacks

### API Route (`app/api/gmb-data/route.ts`)

Provides a Next.js API endpoint that:
- Fetches data from Google My Business
- Returns structured JSON response
- Handles errors gracefully
- Includes fallback data

### React Hook (`hooks/useGMBData.ts`)

Custom hook for components that:
- Manages loading states
- Handles API errors
- Provides TypeScript types
- Caches data appropriately

## Components Updated

### Reviews Component
- Now fetches real reviews from Google My Business
- Falls back to hardcoded reviews if API fails
- Shows loading states
- Displays real ratings and review counts

### Hero Component
- Enhanced area-specific reviews with GMB data
- Maintains fallback to original reviews
- Shows real business information
- Integrates seamlessly with existing UI

## Troubleshooting

### Common Issues

1. **API Key Invalid**
   - Verify the API key is correct
   - Check if the API is enabled in Google Cloud Console
   - Ensure the API key has proper permissions

2. **Access Denied**
   - Google My Business APIs require special access
   - Request access through the official form
   - Wait for approval

3. **Rate Limits**
   - Implement caching to reduce API calls
   - Use fallback data when limits are reached
   - Consider upgrading API quotas

4. **Business Profile Not Found**
   - Verify the Business Profile ID is correct
   - Ensure the business is verified on Google My Business
   - Check if the profile is public

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

This will show detailed API responses and errors in the console.

## Security Considerations

1. **API Key Security**
   - Never commit API keys to version control
   - Use environment variables
   - Restrict API key permissions

2. **Rate Limiting**
   - Implement proper rate limiting
   - Cache responses appropriately
   - Monitor API usage

3. **Error Handling**
   - Always provide fallback data
   - Don't expose sensitive error details
   - Log errors for debugging

## Production Deployment

1. Set environment variables in your hosting platform
2. Ensure API access is approved
3. Monitor API usage and costs
4. Implement proper caching
5. Set up error monitoring

## Support

For issues with Google My Business API:
- [Google My Business API Documentation](https://developers.google.com/my-business/content/overview)
- [Google Cloud Support](https://cloud.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-my-business-api)
