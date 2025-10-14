#!/bin/bash

echo "======================================================================="
echo "🚀 Google Gemini Image Generator Setup"
echo "======================================================================="
echo ""

# Check if API key is set
if [ -z "$GOOGLE_API_KEY" ]; then
    echo "⚠️  GOOGLE_API_KEY environment variable not set"
    echo ""
    echo "📝 Quick Setup:"
    echo ""
    echo "1. Get your API key:"
    echo "   https://makersuite.google.com/app/apikey"
    echo ""
    echo "2. Set it temporarily (current session only):"
    echo "   export GOOGLE_API_KEY='your-api-key-here'"
    echo ""
    echo "3. Or set it permanently in your ~/.bashrc:"
    echo "   echo \"export GOOGLE_API_KEY='your-api-key-here'\" >> ~/.bashrc"
    echo "   source ~/.bashrc"
    echo ""
    echo "4. Then run the generator:"
    echo "   node scripts/generate-images-gemini.js"
    echo ""
    echo "======================================================================="
    exit 1
else
    echo "✅ GOOGLE_API_KEY is set"
    echo ""
    echo "🎨 Ready to generate images!"
    echo ""
    read -p "Generate all 16 images now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "======================================================================="
        echo "Starting image generation..."
        echo "======================================================================="
        node scripts/generate-images-gemini.js
    else
        echo ""
        echo "Cancelled. Run this when ready:"
        echo "  node scripts/generate-images-gemini.js"
    fi
fi

