#!/usr/bin/env python3
"""Quick revision script for specific logo changes"""

import os
import sys
from datetime import datetime
from google.cloud import aiplatform
from vertexai.preview.vision_models import ImageGenerationModel

PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "api-project-600875470759")
LOCATION = "us-central1"
OUTPUT_DIR = "../public/logos"

# Base prompt
BASE_PROMPT = """
A modern, minimalist, and friendly horizontal logo for "KD's Pressure Washing & Services", designed specifically for a website navigation bar/header.

- **Layout:** Horizontal format. The emblem/icon should be on the left, with the text "KD'S" to the right. This must be a wide, landscape-oriented design that fits naturally in a navbar.
- **Core Emblem:** A clean, compact icon that combines a stylized water droplet and a subtle paint roller stroke. The two elements should be balanced and harmonious, forming a cohesive circular or shield shape.
- **Color Palette:**
    - **Primary:** A trustworthy, professional blue (#0087ff).
    - **Accent:** A friendly, energetic orange (#f97316).
- **Florida Vibe (Subtle):** A single, small, stylized sun ray or sparkle element integrated cleanly into the emblem.
- **Black-Owned Vibe (Extremely Subtle):** The design should incorporate a single, tasteful accent in a deep red or warm gold, perhaps as a small dot or a thin line in the emblem, to subtly nod to excellence and heritage without being explicit.
- **Typography:** The text "KD'S" should be clean, bold, sans-serif, positioned to the right of the emblem. It must be easily readable at small sizes.
- **Overall Feel:** Trustworthy, modern, approachable, and professional. The design must be clean, uncluttered, and work perfectly in a horizontal website header/navbar.
- **Style:** Vector, flat design, high contrast, minimalist, horizontal layout.
"""

REVISION_REQUEST = """
**CRITICAL CHANGES REQUIRED:**
1. **TRANSPARENT BACKGROUND** - The background must be fully transparent (not white, not colored). Only the logo elements should be visible.
2. **TIGHT CROPPING** - Minimize all padding and whitespace. The height and width should be exactly as big as the logo design itself, with minimal or no extra space around it.
3. **Clean edges** - Ensure the logo has clean, crisp edges with the transparent background.

Keep all other design elements exactly the same - same colors, same layout, same style. Just make the background transparent and crop tightly.
"""

def init_vertex_ai():
    aiplatform.init(project=PROJECT_ID, location=LOCATION)
    print(f"✓ Initialized Vertex AI")

def generate_revision():
    print("\n" + "="*70)
    print("Generating TRANSPARENT + TIGHT CROPPED variations...")
    print("="*70)
    
    prompt = f"{BASE_PROMPT}\n\n{REVISION_REQUEST}"
    
    model = ImageGenerationModel.from_pretrained("imagen-3.0-fast-generate-001")
    
    response = model.generate_images(
        prompt=prompt,
        number_of_images=4,
        aspect_ratio="16:9",
        safety_filter_level="block_few",
        add_watermark=False,
    )
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    session_dir = os.path.join(OUTPUT_DIR, f"session_{timestamp}")
    os.makedirs(session_dir, exist_ok=True)
    
    saved_files = []
    for i, image in enumerate(response.images):
        filename = f"kds-navbar-transparent-v{i+1}_{timestamp}.png"
        filepath = os.path.join(session_dir, filename)
        image.save(filepath)
        saved_files.append(filepath)
        print(f"✓ Saved: {filename}")
    
    return saved_files, session_dir

if __name__ == "__main__":
    print("\n" + "="*70)
    print("KD'S LOGO - TRANSPARENT BACKGROUND REVISION")
    print("="*70)
    
    init_vertex_ai()
    files, session = generate_revision()
    
    print("\n" + "="*70)
    print("✅ COMPLETE!")
    print("="*70)
    print(f"Generated {len(files)} transparent, tightly-cropped variations")
    print(f"Saved to: {os.path.basename(session)}/")
    print("\nReview and pick your favorite!")
    print("="*70 + "\n")

