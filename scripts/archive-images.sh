#!/bin/bash

# Archive current images to a version folder
# Usage: ./scripts/archive-images.sh v1

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "❌ Error: Version required"
    echo ""
    echo "Usage: ./scripts/archive-images.sh VERSION"
    echo "Example: ./scripts/archive-images.sh v1"
    echo ""
    exit 1
fi

echo "======================================================================="
echo "🗂️  Image Archival Tool"
echo "======================================================================="
echo ""
echo "This will copy current images to: /public/service-images/${VERSION}/"
echo ""

# Create version directory
VERSION_DIR="public/service-images/${VERSION}"
mkdir -p "$VERSION_DIR"

# Check if there are images to archive
if [ ! -d "public/service-images" ] || [ -z "$(ls -A public/service-images/*.jpg 2>/dev/null)" ]; then
    echo "⚠️  No images found in public/service-images/"
    echo ""
    echo "Generate images first:"
    echo "  export GOOGLE_API_KEY='your-key-here'"
    echo "  node scripts/generate-images-gemini.js"
    echo ""
    exit 1
fi

# Copy images
echo "📋 Copying images..."
cp public/service-images/*.jpg "$VERSION_DIR/" 2>/dev/null

# Count archived images
COUNT=$(ls -1 "$VERSION_DIR"/*.jpg 2>/dev/null | wc -l)

echo ""
echo "======================================================================="
echo "✅ Archived $COUNT images to ${VERSION}"
echo "======================================================================="
echo ""
echo "📁 Location: ${VERSION_DIR}/"
echo ""
echo "🌐 To use these images, add to URL:"
echo "   http://localhost:3000/?images=${VERSION}"
echo ""
echo "💡 To generate new images for 'current':"
echo "   node scripts/generate-images-gemini.js"
echo ""
echo "🔄 To switch back to archived version:"
echo "   cp ${VERSION_DIR}/*.jpg public/service-images/"
echo ""
echo "======================================================================="

