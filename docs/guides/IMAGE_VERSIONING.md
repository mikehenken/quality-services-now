# Image Versioning System

The website supports multiple versions of service images that can be switched using URL parameters.

## Quick Start

### View Different Image Versions

Add `?images=VERSION` to any page URL:

```
http://localhost:3000/?images=current        (default, latest images)
http://localhost:3000/?images=v1             (archived version 1)
http://localhost:3000/?images=v2             (archived version 2)
```

## Directory Structure

```
public/
└── service-images/
    ├── *.jpg                    # Current/latest images (default)
    ├── v1/
    │   └── *.jpg               # Archived version 1
    ├── v2/
    │   └── *.jpg               # Archived version 2
    └── v3/
        └── *.jpg               # Archived version 3
```

## Workflow

### 1. Archive Current Images

Before generating new images, archive the current ones:

```bash
./scripts/archive-images.sh v1
```

This copies all current images from `/public/service-images/` to `/public/service-images/v1/`

### 2. Generate New Images

Generate new images (they go into the main directory):

```bash
export GOOGLE_API_KEY='your-api-key'
node scripts/generate-images-gemini.js
```

New images are saved to `/public/service-images/*.jpg`

### 3. Switch Between Versions

Use URL parameters to preview different versions:

- **Current/Latest**: `http://localhost:3000/`
- **Version 1**: `http://localhost:3000/?images=v1`
- **Version 2**: `http://localhost:3000/?images=v2`

## Use Cases

### A/B Testing
```bash
# Archive current images as v1
./scripts/archive-images.sh v1

# Generate new images
node scripts/generate-images-gemini.js

# Compare:
# - http://localhost:3000/?images=v1    (old)
# - http://localhost:3000/              (new)
```

### Rollback to Previous Version
```bash
# Copy archived images back to current
cp public/service-images/v1/*.jpg public/service-images/
```

### Seasonal Variations
```bash
# Archive summer images
./scripts/archive-images.sh summer

# Generate winter images
node scripts/generate-images-gemini.js

# Switch between:
# - http://localhost:3000/?images=summer
# - http://localhost:3000/              (winter)
```

## Image Files Affected

All service and toolkit images are versioned:

**Services (Residential):**
- service-pressure-washing.jpg
- service-house-washing.jpg
- service-exterior-painting.jpg
- service-interior-painting.jpg
- service-fence-deck-staining.jpg
- service-concrete-cleaning.jpg

**Services (Commercial):**
- service-building-washing.jpg
- service-warehouse-cleaning.jpg
- service-parking-lot.jpg
- service-commercial-painting.jpg
- service-storefront.jpg
- service-hoa.jpg

**Toolkit:**
- toolkit-pressure-washer.jpg
- toolkit-paint-systems.jpg
- toolkit-soft-wash.jpg
- toolkit-specialized-equipment.jpg

## How It Works

The versioning system works by:

1. **URL Parameter Detection**: Components check for `?images=` parameter
2. **Path Replacement**: If version is specified, image paths are modified:
   - Current: `/service-images/service-pressure-washing.jpg`
   - Versioned: `/service-images/v1/service-pressure-washing.jpg`
3. **Fallback**: If version parameter is missing or "current", uses default paths

## Commands Reference

```bash
# Archive current images to version
./scripts/archive-images.sh v1

# Generate new images (Gemini)
export GOOGLE_API_KEY='your-key'
node scripts/generate-images-gemini.js

# Generate new images (Vertex AI)
export GOOGLE_APPLICATION_CREDENTIALS='path/to/credentials.json'
node scripts/generate-images-vertex.js

# Copy version back to current
cp public/service-images/v1/*.jpg public/service-images/

# List all versions
ls -d public/service-images/*/
```

## Tips

1. **Always archive before generating**: Prevents losing good images
2. **Use semantic version names**: `v1`, `v2`, or `summer`, `winter`, `diverse`, etc.
3. **Test versions locally**: Preview with URL parameters before deployment
4. **Document changes**: Update IMAGE_DIVERSITY.md when changing images
5. **Keep archives**: Don't delete old versions, disk space is cheap

## Deployment

When deploying, all image versions are deployed. Users can still switch between versions using URL parameters in production:

```
https://yoursite.com/?images=v1
https://yoursite.com/?images=v2
```

This is useful for:
- Client feedback on different image sets
- A/B testing in production
- Quick rollback without redeployment

