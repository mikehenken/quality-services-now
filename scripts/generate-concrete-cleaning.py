#!/usr/bin/env python3
"""
Generates the Concrete Cleaning service image using Vertex AI Imagen.
Shows a Black woman power washing a half-cleaned driveway for dramatic before/after effect.
"""

import os
import sys
from datetime import datetime
from google.cloud import aiplatform
from vertexai.preview.vision_models import ImageGenerationModel

# Configuration
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "your-project-id")
LOCATION = "us-central1"
OUTPUT_DIR = "../public/service-images"

# Concrete Cleaning Prompt
CONCRETE_CLEANING_PROMPT = """
Natural candid smartphone photo of a Black woman actively power washing a concrete driveway in Florida, shot from medium distance showing both worker and driveway. Worker in slightly damp work clothes and t-shirt, hair tied back, sweaty from outdoor work, focused on pressure washing not looking at camera, holding professional pressure washer wand with visible water spray. Driveway is HALF CLEANED - left side still dirty with dark stains and grime, right side already cleaned showing light gray concrete, clear dramatic contrast between dirty and clean halves. Single-story house in background, palm trees, bright sunny day. Worker showing signs of real work - perspiration visible, clothes damp from water spray. Authentic work in progress photo, smartphone camera quality, natural outdoor lighting. Real person doing real work, dramatic before/after visible in same shot.
"""

NEGATIVE_PROMPT = """
professional photography, stock photo, staged, perfect lighting, studio quality, looking at camera, clean clothes, shiny skin, completely clean driveway, completely dirty driveway, zoomed in too close
"""

def init_vertex_ai():
    """Initialize Vertex AI"""
    aiplatform.init(project=PROJECT_ID, location=LOCATION)
    print(f"✓ Initialized Vertex AI - Project: {PROJECT_ID}, Location: {LOCATION}")

def generate_concrete_cleaning_image(count: int = 4):
    """Generate concrete cleaning service images"""
    try:
        print("\n" + "="*70)
        print(f"🎨 Generating {count} variations of Concrete Cleaning image...")
        print("="*70)
        print(f"Prompt:\n{CONCRETE_CLEANING_PROMPT}\n")

        model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")

        response = model.generate_images(
            prompt=CONCRETE_CLEANING_PROMPT,
            negative_prompt=NEGATIVE_PROMPT,
            number_of_images=count,
            aspect_ratio="4:3",
            safety_filter_level="block_few",
            person_generation="allow_adult",
        )

        os.makedirs(OUTPUT_DIR, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        saved_files = []
        for i, image in enumerate(response.images):
            if i == 0:
                # First one is the main service image
                filename = f"service-concrete-cleaning.jpg"
            else:
                # Additional variations
                filename = f"service-concrete-cleaning-v{i+1}_{timestamp}.jpg"
            filepath = os.path.join(OUTPUT_DIR, filename)
            image.save(filepath)
            saved_files.append(filepath)
            print(f"✓ Saved: {filepath}")

        return saved_files

    except Exception as e:
        print(f"❌ Error generating images: {str(e)}", file=sys.stderr)
        return []

def main():
    """Main function"""
    if PROJECT_ID == "your-project-id":
        print("⚠️  Please set GOOGLE_CLOUD_PROJECT environment variable")
        sys.exit(1)

    print("\n" + "="*70)
    print("KD'S PRESSURE WASHING - CONCRETE CLEANING IMAGE GENERATOR")
    print("="*70)

    try:
        init_vertex_ai()
        
        # Generate 4 variations
        print("Generating concrete cleaning images...")
        files = generate_concrete_cleaning_image(count=4)

        # Summary
        print("\n" + "="*70)
        print("🎉 CONCRETE CLEANING IMAGE GENERATION COMPLETE!")
        print("="*70)
        print(f"Total images generated: {len(files)}")
        print(f"Output directory: {OUTPUT_DIR}")
        print("\nGenerated files:")
        for f in files:
            print(f"  - {os.path.basename(f)}")
        print("\n" + "="*70)
        print("NEXT STEPS:")
        print("="*70)
        print("1. Review the images in public/service-images/")
        print("2. The main image is: service-concrete-cleaning.jpg")
        print("3. Choose from variations if needed.")
        print("="*70 + "\n")

    except Exception as e:
        print(f"\n❌ Failed: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

