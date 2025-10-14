# Google Gemini Image Generation Setup

This guide explains how to generate images using Google's Gemini API with Imagen 3.

## Quick Setup

### 1. Get Your Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### 2. Set the API Key

```bash
export GOOGLE_API_KEY="your-api-key-here"
```

Or add it to your `~/.bashrc` or `~/.zshrc`:

```bash
echo 'export GOOGLE_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

### 3. Generate Images

```bash
cd /home/mikeh/Projects/roe
node scripts/generate-images-gemini.js
```

## What Gets Generated

The script generates 16 images:

**Residential Services (6):**
- Pressure Washing
- House Washing
- Exterior Painting
- Interior Painting
- Fence & Deck Staining
- Concrete Cleaning

**Commercial Services (6):**
- Building Washing
- Warehouse Cleaning
- Parking Lot Cleaning
- Commercial Painting
- Storefront Restoration
- HOA Services

**Toolkit Images (4):**
- Professional Pressure Washers
- Premium Paint Systems
- Soft Wash Technology
- Specialized Equipment

## Image Quality

All images are generated with:
- Natural, authentic look (not overly polished)
- Proper representation (Black workers where people are shown)
- Florida setting (palm trees, appropriate architecture)
- Smartphone camera quality (slightly grainy, natural lighting)
- 3:2 aspect ratio (1200x800)

## Troubleshooting

### Error: GOOGLE_API_KEY not set
Make sure you've exported the environment variable in your current shell session.

### Error: API key not valid
Double-check your API key from Google AI Studio.

### Error: Rate limit exceeded
The script includes delays between requests, but you may need to wait a few minutes and try again.

### Error: Safety filter blocked generation
Some prompts may be blocked by Google's safety filters. The script uses `block_few` setting and allows adult person generation.

## Alternative: Vertex AI

For production use, consider using Vertex AI instead:

```bash
node scripts/generate-images-vertex.js
```

This requires:
1. Google Cloud project with Vertex AI API enabled
2. Service account with proper permissions
3. `GOOGLE_APPLICATION_CREDENTIALS` environment variable set

## Cost

Google AI Studio API:
- Free tier: 60 requests per minute
- Each image generation = 1 request
- Check current pricing at: https://ai.google.dev/pricing

