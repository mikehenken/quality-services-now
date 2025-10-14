#!/usr/bin/env python3
"""
Generate logo for KD's Pressure Washing & Services using Vertex AI Imagen
"""

import os
import sys
import json
from datetime import datetime
from google.cloud import aiplatform
from vertexai.preview.vision_models import ImageGenerationModel

# Configuration
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "your-project-id")
LOCATION = "us-central1"
OUTPUT_DIR = "../public/logos"

def init_vertex_ai():
    """Initialize Vertex AI"""
    aiplatform.init(project=PROJECT_ID, location=LOCATION)
    print(f"✓ Initialized Vertex AI - Project: {PROJECT_ID}, Location: {LOCATION}")

def generate_logo(prompt: str, number_of_images: int = 4):
    """
    Generate logo using Vertex AI Imagen
    
    Args:
        prompt: The image generation prompt
        number_of_images: Number of variations to generate (1-4)
    """
    try:
        print(f"\n🎨 Generating {number_of_images} logo variations...")
        print(f"📝 Prompt: {prompt}\n")
        
        # Initialize the model
        model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")
        
        # Generate images
        response = model.generate_images(
            prompt=prompt,
            number_of_images=number_of_images,
            aspect_ratio="1:1",
            safety_filter_level="block_few",
            person_generation="allow_adult",
        )
        
        # Create output directory
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        saved_files = []
        
        # Save each generated image
        for i, image in enumerate(response.images):
            filename = f"kds-logo-v{i+1}_{timestamp}.png"
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            image.save(filepath)
            saved_files.append(filepath)
            print(f"✓ Saved: {filepath}")
        
        print(f"\n🎉 Successfully generated {len(saved_files)} logo variations!")
        return saved_files
        
    except Exception as e:
        print(f"❌ Error generating logo: {str(e)}", file=sys.stderr)
        raise

def main():
    """Main function"""
    
    # Detailed prompt incorporating all requirements
    prompt = """
Professional business logo for "KD's Pressure Washing & Services", a pressure washing and painting company.

Design elements:
- Clean, modern, minimalist style
- Incorporate subtle water/pressure spray elements and paint brush/roller
- Use vibrant blue (#0087ff) as primary color and orange (#f97316) as accent
- Include stylized "KD'S" text in bold, professional font
- Symbol: water droplets or spray pattern forming a circular design
- Subtle representation of unity and diversity through varied hand tones working together holding spray wands or paint tools in the background or negative space
- Black-owned business pride shown discretely through color accent or design element
- Florida sunshine/palm element subtly integrated
- Professional, trustworthy, and welcoming feel
- Suitable for a service business
- Vector-style, crisp and clean
- Works well on both light and dark backgrounds
- No realistic faces, use simplified stylized human silhouettes if including people
- Badge or shield shape with modern twist
- High contrast and easy to read at small sizes

Style: Modern, professional, geometric, clean lines, corporate but approachable
"""

    try:
        # Check if GOOGLE_CLOUD_PROJECT is set
        if PROJECT_ID == "your-project-id":
            print("⚠️  Please set GOOGLE_CLOUD_PROJECT environment variable")
            print("   Example: export GOOGLE_CLOUD_PROJECT=your-actual-project-id")
            sys.exit(1)
        
        # Initialize and generate
        init_vertex_ai()
        saved_files = generate_logo(prompt, number_of_images=4)
        
        print("\n" + "="*60)
        print("LOGO GENERATION COMPLETE")
        print("="*60)
        print(f"Generated files: {len(saved_files)}")
        for f in saved_files:
            print(f"  - {f}")
        print("\nNext steps:")
        print("1. Review the generated logos")
        print("2. Choose your favorite or generate more variations")
        print("3. Update your Header.tsx component to use the new logo")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ Failed to generate logo: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

