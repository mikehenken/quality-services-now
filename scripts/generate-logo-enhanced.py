#!/usr/bin/env python3
"""
Enhanced logo generation with multiple prompt variations
Generates different styles to choose from
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

# Different prompt variations to try
LOGO_PROMPTS = {
    "modern_geometric": """
Clean, modern logo for "KD'S" pressure washing and painting services.
Geometric design with:
- Bold "KD'S" lettering in vibrant blue (#0087ff)
- Circular badge with water droplets and paint splash elements
- Orange (#f97316) accent stripe or highlight
- Diverse hands in different skin tones (brown, tan, beige) forming a circular unity pattern around the badge
- Minimalist silhouettes, no detailed faces
- Professional, trustworthy design
- Florida sunshine rays in background
- Vector style, high contrast
Style: Corporate modern, clean lines, professional
""",
    
    "shield_emblem": """
Professional shield-style emblem logo for "KD'S Pressure Washing & Services".
Design:
- Shield/badge shape with "KD'S" prominently displayed
- Water pressure spray and paint roller crossed like a coat of arms
- Color palette: vibrant blue (#0087ff) primary, orange (#f97316) accents
- Subtle unity symbol: overlapping circles or interlinked hands in varied brown/tan/beige tones
- Small star or sun element representing Florida and Black excellence
- Clean typography, bold and readable
- Professional service industry aesthetic
- Works on light and dark backgrounds
Style: Modern heritage, trustworthy, premium quality
""",

    "dynamic_abstract": """
Dynamic, modern logo for "KD'S" cleaning and painting company.
Elements:
- Stylized "KD'S" in bold custom font, blue (#0087ff)
- Abstract water spray/wave pattern with orange (#f97316) paint accents
- Circular motion suggesting transformation and cleaning
- Unity represented by gradient of warm earth tones (representing diverse community) flowing through design
- Small Florida palm or sunshine element integrated naturally
- Discrete nod to Black ownership through gold/yellow accent star or crown element
- Sleek, professional, energetic feel
- Vector style, modern and fresh
Style: Contemporary, dynamic, approachable yet professional
""",

    "community_focused": """
Friendly, professional logo for "KD'S Pressure Washing & Services" - Black-owned Florida business.
Design concept:
- Central "KD'S" wordmark in strong blue (#0087ff)
- House/building silhouette being cleaned/painted
- Multiple hands in various natural skin tones (browns, tans, beiges) working together on the house
- Orange (#f97316) elements: sun rays, paint strokes, water droplets
- Circular or rounded design creating welcoming feel
- Palm tree or Florida sunshine incorporated subtly
- Community and unity shown through collaborative imagery
- Professional but warm and approachable
- Clean lines, easy to reproduce
Style: Modern community-focused, inclusive, professional service
"""
}

def init_vertex_ai():
    """Initialize Vertex AI"""
    aiplatform.init(project=PROJECT_ID, location=LOCATION)
    print(f"✓ Initialized Vertex AI - Project: {PROJECT_ID}, Location: {LOCATION}")

def generate_logos_batch(style_name: str, prompt: str, count: int = 2):
    """Generate logos for a specific style"""
    try:
        print(f"\n{'='*70}")
        print(f"🎨 Generating '{style_name}' style logos ({count} variations)...")
        print(f"{'='*70}")
        print(f"Prompt:\n{prompt}\n")
        
        model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")
        
        response = model.generate_images(
            prompt=prompt,
            number_of_images=count,
            aspect_ratio="1:1",
            safety_filter_level="block_few",
            person_generation="allow_adult",
        )
        
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        saved_files = []
        for i, image in enumerate(response.images):
            filename = f"kds-logo-{style_name}-v{i+1}_{timestamp}.png"
            filepath = os.path.join(OUTPUT_DIR, filename)
            image.save(filepath)
            saved_files.append(filepath)
            print(f"✓ Saved: {filepath}")
        
        return saved_files
        
    except Exception as e:
        print(f"❌ Error generating {style_name}: {str(e)}", file=sys.stderr)
        return []

def main():
    """Main function - generates all logo variations"""
    
    if PROJECT_ID == "your-project-id":
        print("⚠️  Please set GOOGLE_CLOUD_PROJECT environment variable")
        print("   Example: export GOOGLE_CLOUD_PROJECT=your-actual-project-id")
        sys.exit(1)
    
    print("\n" + "="*70)
    print("KD'S PRESSURE WASHING - LOGO GENERATOR")
    print("Generating multiple style variations")
    print("="*70)
    
    try:
        init_vertex_ai()
        
        all_files = []
        
        # Generate each style
        for style_name, prompt in LOGO_PROMPTS.items():
            files = generate_logos_batch(style_name, prompt, count=2)
            all_files.extend(files)
            print(f"✓ Completed: {style_name} ({len(files)} images)")
        
        # Summary
        print("\n" + "="*70)
        print("🎉 LOGO GENERATION COMPLETE!")
        print("="*70)
        print(f"Total images generated: {len(all_files)}")
        print(f"Output directory: {OUTPUT_DIR}")
        print("\nGenerated files by style:")
        
        current_style = None
        for f in all_files:
            style = f.split('-')[2]  # Extract style from filename
            if style != current_style:
                print(f"\n{style.upper().replace('_', ' ')}:")
                current_style = style
            print(f"  - {os.path.basename(f)}")
        
        print("\n" + "="*70)
        print("NEXT STEPS:")
        print("="*70)
        print("1. Review all generated logos in public/logos/")
        print("2. Choose your favorite style and variation")
        print("3. Optionally refine by modifying prompts and regenerating")
        print("4. Update components/Header.tsx to use the new logo")
        print("5. Consider creating SVG versions for web optimization")
        print("="*70 + "\n")
        
    except Exception as e:
        print(f"\n❌ Failed: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

