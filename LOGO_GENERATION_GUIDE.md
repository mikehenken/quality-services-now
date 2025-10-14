# Logo Generation Guide

Generate professional logos for KD's Pressure Washing & Services using Google Vertex AI Gemini/Imagen.

## 🎨 What You'll Get

The scripts will generate professional logos that incorporate:

✅ **KD'S Pressure Washing branding** - Business name prominently displayed  
✅ **Brand colors** - Blue (#0087ff) primary, Orange (#f97316) accent  
✅ **Service themes** - Pressure washing and painting elements  
✅ **Unity & diversity** - Natural, discrete representation through varied hand tones working together  
✅ **Black-owned business** - Subtle, tasteful celebration of ownership  
✅ **Florida identity** - SWFL regional elements (sunshine, palm)  
✅ **Professional aesthetic** - Trustworthy, modern, clean design  

## 🚀 Quick Start

### Prerequisites

1. **Google Cloud Project** with Vertex AI enabled
   - Create one at [Google Cloud Console](https://console.cloud.google.com)
   - Enable Vertex AI API

2. **Set your project ID:**
   ```bash
   export GOOGLE_CLOUD_PROJECT="your-actual-project-id"
   ```

3. **Authenticate:**
   ```bash
   gcloud auth application-default login
   ```

### Run the Generator

**Option 1: Automated Setup (Recommended)**
```bash
cd scripts
./setup-and-run.sh
```
The script will:
- Create a Python virtual environment
- Install dependencies in isolation
- Guide you through generation

**Option 2: Manual Run**
```bash
cd scripts

# Activate virtual environment (created by setup-and-run.sh)
source venv/bin/activate

# Generate multiple styles (8+ logos)
python3 generate-logo-enhanced.py

# OR generate single style (4 variations)
python3 generate-logo.py

# Deactivate when done
deactivate
```

## 📁 Output

All logos are saved to `public/logos/` with descriptive filenames:

```
public/logos/
├── kds-logo-modern_geometric-v1_20251014_143022.png
├── kds-logo-modern_geometric-v2_20251014_143022.png
├── kds-logo-shield_emblem-v1_20251014_143025.png
├── kds-logo-shield_emblem-v2_20251014_143025.png
├── kds-logo-dynamic_abstract-v1_20251014_143028.png
├── kds-logo-dynamic_abstract-v2_20251014_143028.png
├── kds-logo-community_focused-v1_20251014_143031.png
└── kds-logo-community_focused-v2_20251014_143031.png
```

## 🎭 Logo Styles

### 1. Modern Geometric
Clean, geometric design with circular unity pattern. Best for: Professional, tech-forward brand image.

### 2. Shield Emblem  
Heritage-style badge with coat of arms elements. Best for: Traditional, trustworthy, established feel.

### 3. Dynamic Abstract
Energetic, contemporary flowing design. Best for: Modern, dynamic, transformation-focused brand.

### 4. Community Focused
Warm, inclusive design emphasizing people working together. Best for: Community connection, approachability.

## 🔧 Using the Generated Logo

Once you've chosen your favorite:

1. **Update the Header component:**
   ```bash
   # Edit components/Header.tsx
   ```

2. **Replace the logo:**
   ```tsx
   import Image from 'next/image';
   
   // In your Header component:
   <Image 
     src="/logos/kds-logo-modern_geometric-v1_20251014_143022.png"
     alt="KD's Pressure Washing & Services"
     width={150}
     height={50}
     priority
   />
   ```

3. **Consider creating favicon:**
   - Use your chosen logo to create `public/favicon.ico`
   - Update `app/layout.tsx` if needed

## 💰 Cost Estimate

Vertex AI Imagen pricing (approximate):
- Per image: ~$0.04
- `generate-logo.py`: 4 images = ~$0.16
- `generate-logo-enhanced.py`: 8 images = ~$0.32

[Current Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing)

## 🎨 Customizing

Want different styles? Edit the prompts in the Python scripts:

**generate-logo-enhanced.py:**
```python
LOGO_PROMPTS = {
    "your_custom_style": """
    Your custom prompt here...
    """
}
```

Key elements to include in custom prompts:
- Business name ("KD'S")
- Color codes (#0087ff blue, #f97316 orange)
- Service elements (water spray, paint)
- Unity/diversity representation
- Professional style guidance
- Technical requirements (vector-style, high contrast, etc.)

## ❓ Troubleshooting

**"GOOGLE_CLOUD_PROJECT not set"**
```bash
export GOOGLE_CLOUD_PROJECT="your-project-id"
echo $GOOGLE_CLOUD_PROJECT  # Verify it's set
```

**"Permission denied" or "Not authenticated"**
```bash
gcloud auth application-default login
```

**"Vertex AI API not enabled"**
- Visit [Google Cloud Console](https://console.cloud.google.com)
- Navigate to APIs & Services
- Enable "Vertex AI API"

**"Module 'google.cloud.aiplatform' not found"**
```bash
# Activate the virtual environment first
cd scripts
source venv/bin/activate

# Or re-run the setup
./setup-and-run.sh
```

**Images look wrong or inappropriate**
- The AI has safety filters enabled
- Regenerate with modified prompts
- Adjust `safety_filter_level` in the scripts

## 🔄 Iterating on Designs

If you want to refine a particular style:

1. Copy the prompt from the script
2. Modify specific elements
3. Run generation again
4. Compare versions

Example refinements:
- "More emphasis on water elements"
- "Simpler, more minimal design"
- "Bolder typography"
- "More prominent unity symbolism"

## 📊 Choosing the Best Logo

Consider:
1. **Versatility** - Works at small and large sizes?
2. **Clarity** - Readable and recognizable?
3. **Brand alignment** - Matches your business personality?
4. **Uniqueness** - Stands out from competitors?
5. **Cultural sensitivity** - Unity shown naturally and respectfully?
6. **Technical** - Works on different backgrounds?

## 🎯 Next Steps

After selecting your logo:

1. ✅ Save the chosen version with a simple name: `kds-logo.png`
2. ✅ Create variations (dark/light backgrounds)
3. ✅ Generate SVG version (optional, for web optimization)
4. ✅ Update all branding across site
5. ✅ Create social media profile versions
6. ✅ Update favicon
7. ✅ Add to business cards, marketing materials

## 📝 Notes

- Generated images are 1:1 aspect ratio (square)
- PNG format with transparency support
- High resolution suitable for web and print
- Person generation allowed for diverse representation
- Safety filters active to ensure appropriate content

---

**Questions or issues?** Review the [scripts/README.md](scripts/README.md) for detailed technical documentation.

