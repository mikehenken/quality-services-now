#!/usr/bin/env python3
"""
Generates a single, highly-focused logo concept with 8 variations.
Designed for a modern, minimalist, horizontal navbar logo.
"""

import os
import sys
from datetime import datetime
from google.cloud import aiplatform
from vertexai.preview.vision_models import ImageGenerationModel

# Configuration
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "your-project-id")
LOCATION = "us-central1"
OUTPUT_DIR = "../public/logos"

# The single, focused prompt - HORIZONTAL NAVBAR FORMAT
FOCUSED_PROMPT = """
A modern, minimalist, and friendly horizontal logo for "KD's Pressure Washing & Services", designed specifically for a website navigation bar/header.

**CRITICAL TECHNICAL REQUIREMENTS:**
- **Aspect ratio:** 8.6:2.2 (width:height) - approximately 3.9:1 horizontal ratio
- **TRANSPARENT BACKGROUND** - fully transparent, no white or colored background
- **NO rectangles** - avoid large rectangular shapes or boxes around the logo
- **Tight cropping** - minimal padding, logo elements should fill the space efficiently
- **PNG with alpha transparency** - clean edges

**Design:**
- **Layout:** Horizontal format. Small compact icon/emblem on left, "KD'S" text on right.
- **Core Emblem:** Clean icon combining stylized water droplet + paint brush/roller. Circular or organic shape (NO rectangles/boxes).
- **Color Palette:**
    - **Primary:** Vibrant blue (#0087ff)
    - **Accent:** Orange (#f97316)
- **Florida Vibe (Subtle):** Small sun ray or sparkle element in the emblem.
- **Black-Owned Vibe (Extremely Subtle):** Tiny gold or warm accent (small dot/line in emblem).
- **Typography:** "KD'S" in clean, bold, sans-serif. Easily readable at small sizes.
- **Overall Feel:** Professional, trustworthy, modern, approachable. Clean and minimal.
- **Style:** Vector, flat design, high contrast, minimalist.
"""

def init_vertex_ai():
    """Initialize Vertex AI"""
    aiplatform.init(project=PROJECT_ID, location=LOCATION)
    print(f"✓ Initialized Vertex AI - Project: {PROJECT_ID}, Location: {LOCATION}")

def generate_logo(prompt: str, count: int = 8):
    """Generate logos for the focused prompt"""
    try:
        print("\n" + "="*70)
        print(f"🎨 Generating {count} variations of the horizontal navbar logo...")
        print("="*70)
        print(f"Prompt:\n{prompt}\n")

        model = ImageGenerationModel.from_pretrained("imagen-3.0-fast-generate-001")
        
        response = model.generate_images(
            prompt=prompt,
            number_of_images=count,
            aspect_ratio="16:9",  # Horizontal format for navbar
            safety_filter_level="block_few",
            add_watermark=False,
        )

        os.makedirs(OUTPUT_DIR, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%d%m_%H%M%S")

        saved_files = []
        for i, image in enumerate(response.images):
            filename = f"kds-navbar-logo-v{i+1}_{timestamp}.png"
            filepath = os.path.join(OUTPUT_DIR, filename)
            image.save(filepath)
            saved_files.append(filepath)
            print(f"✓ Saved: {filepath}")

        return saved_files

    except Exception as e:
        print(f"❌ Error generating logos: {str(e)}", file=sys.stderr)
        return []

def main():
    """Main function"""
    if PROJECT_ID == "your-project-id":
        print("⚠️  Please set GOOGLE_CLOUD_PROJECT environment variable")
        sys.exit(1)

    print("\n" + "="*70)
    print("KD'S PRESSURE WASHING - HORIZONTAL NAVBAR LOGO GENERATOR")
    print("="*70)

    try:
        init_vertex_ai()
        
        # Generate in two batches of 4 (API limit is 4 per call)
        print("Generating batch 1 of 2...")
        batch1 = generate_logo(FOCUSED_PROMPT, count=4)
        print("\nGenerating batch 2 of 2...")
        batch2 = generate_logo(FOCUSED_PROMPT, count=4)
        
        all_files = batch1 + batch2

        # Summary
        print("\n" + "="*70)
        print("🎉 NAVBAR LOGO GENERATION COMPLETE!")
        print("="*70)
        print(f"Total images generated: {len(all_files)}")
        print(f"Output directory: {OUTPUT_DIR}")
        print("\nGenerated files:")
        for f in all_files:
            print(f"  - {os.path.basename(f)}")
        print("\n" + "="*70)
        print("NEXT STEPS:")
        print("="*70)
        print("1. Review the new, horizontal navbar logos in public/logos/")
        print("2. Choose the best one for your header.")
        print("3. Update components/Header.tsx.")
        print("="*70 + "\n")

    except Exception as e:
        print(f"\n❌ Failed: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
