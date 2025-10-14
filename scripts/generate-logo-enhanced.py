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

# Different prompt variations to try - REFINED FOR SUBTLETY
LOGO_PROMPTS = {
    "abstract_mosaic": """
Professional, clean logo for "KD's Pressure Washing & Services".
- **Primary Text:** Bold, modern "KD'S" in vibrant blue (#0087ff).
- **Design:** A circular emblem containing an abstract mosaic or tile pattern. The mosaic should subtly incorporate shapes resembling water droplets and paint strokes.
- **Unity Element (Subtle):** Within the mosaic, use a gentle, flowing gradient of warm earth tones (terracotta, beige, brown) to represent community diversity. This should be an abstract texture, not literal people.
- **Accent Color:** Orange (#f97316) used for small highlight elements within the mosaic.
- **Overall Feel:** Corporate, clean, trustworthy, with a hint of warmth. Vector style.
""",

    "geometric_weave": """
Modern, premium logo for "KD's Pressure Washing & Services".
- **Primary Text:** "KD'S" in a strong, professional sans-serif font, colored vibrant blue (#0087ff). "Pressure Washing & Services" in smaller text below.
- **Design:** A stylized shield or badge shape. Inside, a clean, geometric pattern of interlocking lines or a subtle woven texture. The pattern should evoke a sense of strength and connection.
- **Unity Element (Subtle):** The interlocking lines of the weave can contain very subtle, alternating earth tones (beige, tan, brown) to imply different threads coming together as one.
- **Accent Color:** Orange (#f97316) used as a border or a single highlight line in the weave.
- **Black-Owned Pride (Subtle):** A single, small, clean star element in a tasteful gold/orange, integrated into the top of the shield.
- **Overall Feel:** Established, reliable, high-quality. Vector style, high contrast.
""",

    "dynamic_flow": """
Sleek, dynamic logo for "KD's Pressure Washing & Services".
- **Primary Text:** Stylized, slightly italicized "KD'S" in vibrant blue (#0087ff).
- **Design:** An abstract, circular swirl combining a blue wave/spray element with an orange (#f97316) paint stroke. The two elements should flow together harmoniously.
- **Unity Element (Subtle):** The blue wave can have a subtle gradient that shifts through a spectrum of blues, while the orange stroke has a gradient of warm earth tones, suggesting a blend of elements and community.
- **Florida Element (Subtle):** The overall circular shape can subtly evoke a sun.
- **Overall Feel:** Energetic, modern, transformative. Clean lines, vector style.
""",

    "minimalist_emblem": """
Clean, minimalist, and professional logo for "KD's Pressure Washing & Services".
- **Primary Text:** "KD'S" in a clean, bold font, central to the design. Blue (#0087ff).
- **Design:** A simple house or building outline, with a water droplet on one side and a paint roller stroke on the other, creating a balanced emblem.
- **Unity Element (Subtle):** The foundation line of the house graphic can be a thicker bar composed of a subtle, elegant gradient of warm earth tones (beige, tan, brown), symbolizing a strong community foundation.
- **Accent Color:** The paint stroke is orange (#f97316).
- **Overall Feel:** Approachable, professional, clear, and direct. High contrast, works well at small sizes.
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

