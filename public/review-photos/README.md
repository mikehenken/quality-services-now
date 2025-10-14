# Review Photos

## Overview
This directory contains AI-generated property photos used in the area availability feature. These images appear in review cards when users check service availability for different areas.

## Generated Images
All 13 images were generated using **Pollinations.ai** (Flux model) on October 14, 2025.

### Purpose
- Provide authentic-looking property photos for customer reviews
- Show diverse representation of customers
- Display various property types (residential & commercial)
- Create trust through realistic imagery

### Generation Details
- **Service**: Pollinations.ai (free, no API key required)
- **Model**: Flux
- **Quality**: Realistic smartphone photography aesthetic
- **Diversity**: Features Black, Hispanic, and diverse homeowners/business owners
- **Style**: Casual phone photos, not professional photography

## File Naming Convention
Format: `{area}-{firstname}.jpg`

Examples:
- `lehigh-deandre.jpg` - DeAndre L. from Lehigh Acres
- `fort-myers-marcus.jpg` - Marcus J. from Fort Myers
- `naples-jasmine.jpg` - Jasmine W. from Naples

## Image Specifications
- **Format**: JPEG
- **Size Range**: 33KB - 131KB
- **Dimensions**: ~800x600px
- **Optimization**: Served through Next.js Image component

## Usage
Referenced in `/components/Hero.tsx`:
```typescript
image: "/review-photos/lehigh-deandre.jpg"
```

## Regeneration
To regenerate images:
```bash
node scripts/generate-review-photos.js
```

This will create new AI-generated images for all review cards.

## Notes
- All images are custom-generated for this project
- No stock photography used
- Images intentionally styled to look like authentic customer photos
- Diverse representation prioritized in generation prompts

