#!/usr/bin/env python3
"""
Interactive logo refinement tool
Pick your favorite, request changes, get variations
NEVER deletes anything - everything is preserved
"""

import os
import sys
import shutil
from datetime import datetime
from google.cloud import aiplatform
from vertexai.preview.vision_models import ImageGenerationModel

# Configuration
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "your-project-id")
LOCATION = "us-central1"
LOGOS_BASE_DIR = "../public/logos"

# Base prompt - UPDATED WITH TECHNICAL SPECS
BASE_PROMPT = """
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
    print(f"✓ Initialized Vertex AI")

def create_session_folder():
    """Create a new timestamped session folder"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    session_dir = os.path.join(LOGOS_BASE_DIR, f"session_{timestamp}")
    os.makedirs(session_dir, exist_ok=True)
    print(f"✓ Created session folder: {os.path.basename(session_dir)}")
    return session_dir

def list_all_logos():
    """List all logos from all sessions and base directory"""
    all_logos = []
    
    # Get logos from base directory
    if os.path.exists(LOGOS_BASE_DIR):
        for item in os.listdir(LOGOS_BASE_DIR):
            item_path = os.path.join(LOGOS_BASE_DIR, item)
            if os.path.isfile(item_path) and item.endswith('.png'):
                all_logos.append(('base', item, item_path))
    
    # Get logos from session directories
    if os.path.exists(LOGOS_BASE_DIR):
        for item in os.listdir(LOGOS_BASE_DIR):
            item_path = os.path.join(LOGOS_BASE_DIR, item)
            if os.path.isdir(item_path) and item.startswith('session_'):
                for logo in os.listdir(item_path):
                    if logo.endswith('.png'):
                        logo_path = os.path.join(item_path, logo)
                        all_logos.append((item, logo, logo_path))
    
    all_logos.sort(key=lambda x: x[2])  # Sort by path
    return all_logos

def pick_favorite():
    """Let user pick their favorite logo from all available"""
    print("\n" + "="*70)
    print("PICK YOUR FAVORITE LOGO (from any session)")
    print("="*70)
    
    all_logos = list_all_logos()
    
    if not all_logos:
        print("❌ No logos found in public/logos/")
        print("Run ./run-focused-generator.sh first to generate logos")
        sys.exit(1)
    
    print("\nAvailable logos:")
    current_folder = None
    for i, (folder, logo, path) in enumerate(all_logos, 1):
        if folder != current_folder:
            print(f"\n  [{folder}]")
            current_folder = folder
        print(f"  {i}. {logo}")
    
    while True:
        try:
            choice = input(f"\nEnter number (1-{len(all_logos)}), or 'quit' to exit: ").strip()
            
            if choice.lower() == 'quit':
                print("\nExiting...")
                sys.exit(0)
            
            idx = int(choice) - 1
            if 0 <= idx < len(all_logos):
                folder, logo, path = all_logos[idx]
                print(f"\n✓ Selected: {logo}")
                print(f"  From: {folder}")
                return logo, path
            else:
                print(f"Please enter a number between 1 and {len(all_logos)}")
        except (ValueError, KeyboardInterrupt):
            print("\nExiting...")
            sys.exit(0)

def get_revision_request():
    """Ask user what they want to change"""
    print("\n" + "="*70)
    print("WHAT WOULD YOU LIKE TO CHANGE?")
    print("="*70)
    print("\nExamples:")
    print("  - Make text darker/bolder")
    print("  - Smaller/larger icon")
    print("  - More/less orange accent")
    print("  - Simpler/more detailed emblem")
    print("  - Better contrast for white background")
    print("  - Larger/smaller text")
    print("\nOptions:")
    print("  - Type your change request")
    print("  - Type 'pick' to choose a different logo")
    print("  - Type 'done' to finish this session")
    
    revision = input("\nYour input: ").strip()
    
    if revision.lower() == 'done':
        return 'done'
    
    if revision.lower() == 'pick':
        return 'pick'
    
    return revision

def create_variation_prompt(base_prompt, revision_request):
    """Create a prompt for variations based on revision"""
    variation_prompt = f"""{base_prompt}

**IMPORTANT VARIATION REQUEST:**
{revision_request}

Keep all other aspects of the design the same. This should be a SMALL VARIATION based on the specific change requested above, not a completely new design.
"""
    return variation_prompt

def generate_variations(prompt, favorite_name, session_dir, count=4):
    """Generate variations based on revision"""
    try:
        print("\n" + "="*70)
        print(f"🎨 Generating {count} variations based on your revision...")
        print("="*70)
        
        model = ImageGenerationModel.from_pretrained("imagen-3.0-fast-generate-001")
        
        response = model.generate_images(
            prompt=prompt,
            number_of_images=count,
            aspect_ratio="16:9",
            safety_filter_level="block_few",
        )
        
        timestamp = datetime.now().strftime("%H%M%S")
        base_name = favorite_name.replace('.png', '')
        
        saved_files = []
        for i, image in enumerate(response.images):
            filename = f"{base_name}-rev-v{i+1}_{timestamp}.png"
            filepath = os.path.join(session_dir, filename)
            image.save(filepath)
            saved_files.append(filepath)
            print(f"✓ Saved: session/{os.path.basename(filepath)}")
        
        return saved_files
        
    except Exception as e:
        print(f"❌ Error: {str(e)}", file=sys.stderr)
        return []

def main():
    """Main interactive loop - unlimited revisions"""
    if PROJECT_ID == "your-project-id":
        print("⚠️  Please set GOOGLE_CLOUD_PROJECT environment variable")
        sys.exit(1)
    
    print("\n" + "="*70)
    print("KD'S PRESSURE WASHING - INTERACTIVE LOGO REFINEMENT")
    print("All logos preserved - nothing is deleted!")
    print("="*70)
    
    init_vertex_ai()
    
    # Create session folder for this run
    session_dir = create_session_folder()
    
    # Pick initial favorite
    favorite_name, favorite_path = pick_favorite()
    
    revision_count = 0
    
    # Interactive revision loop - UNLIMITED
    while True:
        revision_request = get_revision_request()
        
        if revision_request == 'done':
            print("\n✓ Session complete! All logos saved.")
            print(f"  Session folder: {os.path.basename(session_dir)}")
            print(f"  Total revisions: {revision_count}")
            print("\nYou can run this tool again anytime to refine any logo!")
            break
        
        if revision_request == 'pick':
            # Let them pick a new favorite
            favorite_name, favorite_path = pick_favorite()
            continue
        
        # Create variation prompt
        variation_prompt = create_variation_prompt(BASE_PROMPT, revision_request)
        
        # Generate variations
        variations = generate_variations(variation_prompt, favorite_name, session_dir, count=4)
        
        if variations:
            revision_count += 1
            print(f"\n✓ Generated {len(variations)} variations! (Revision #{revision_count})")
            print(f"\nSaved to: {os.path.basename(session_dir)}/")
            print("\nNext steps:")
            print("  - Type another change request for more variations")
            print("  - Type 'pick' to choose a different logo")
            print("  - Type 'done' when finished")
        else:
            print("\n❌ Failed to generate variations. Try again?")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nExiting...")
        sys.exit(0)

