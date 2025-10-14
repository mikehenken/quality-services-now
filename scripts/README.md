# Logo Generation Scripts

Scripts for generating logos using Google Vertex AI Imagen.

---

## ⚡ QUICK START

**Your project is already configured!** Just run:

```bash
cd /home/mikeh/Projects/roe/scripts
./run-logo-generator.sh
```

See **[START_HERE.md](START_HERE.md)** for the simplest instructions!

---

## Prerequisites

1. **Google Cloud Project with Vertex AI enabled**
   ```bash
   # Set your project ID
   export GOOGLE_CLOUD_PROJECT="your-project-id"
   ```

2. **Authentication**
   ```bash
   # Authenticate with Google Cloud
   gcloud auth application-default login
   
   # Or use a service account
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   ```

3. **Python dependencies** (handled automatically by setup script)
   ```bash
   # Dependencies are installed in a virtual environment
   # No manual installation needed if using setup-and-run.sh
   ```

## Scripts

### `generate-logo.py`
Generates 4 variations of a single comprehensive logo design.

```bash
cd scripts
python3 generate-logo.py
```

**Features:**
- Single optimized prompt
- 4 variations
- Professional, modern design
- Incorporates all brand elements

### `generate-logo-enhanced.py`
Generates multiple styles with 2 variations each (8 total images).

```bash
cd scripts
python3 generate-logo-enhanced.py
```

**Styles:**
1. **Modern Geometric** - Clean, geometric design with circular unity pattern
2. **Shield Emblem** - Professional heritage-style badge
3. **Dynamic Abstract** - Energetic, contemporary design
4. **Community Focused** - Warm, inclusive community design

## Output

All generated logos are saved to `public/logos/` with naming format:
- `kds-logo-{style}-v{number}_{timestamp}.png`

Example: `kds-logo-modern_geometric-v1_20251014_143022.png`

## Design Elements

All logos incorporate:
- ✅ "KD'S" branding prominently displayed
- ✅ Blue (#0087ff) primary color
- ✅ Orange (#f97316) accent color  
- ✅ Pressure washing/painting service themes
- ✅ Unity of races shown naturally through varied skin tones
- ✅ Black-owned business pride (discrete elements)
- ✅ Florida/SWFL regional identity
- ✅ Professional, trustworthy aesthetic
- ✅ Works on light and dark backgrounds

## Usage

1. **Run generation:**
   ```bash
   export GOOGLE_CLOUD_PROJECT="your-project-id"
   cd scripts
   
   # Option A: Automated (creates venv, installs deps, runs script)
   ./setup-and-run.sh
   
   # Option B: Manual (if venv already setup)
   source venv/bin/activate
   python3 generate-logo-enhanced.py
   deactivate
   ```

2. **Review outputs:**
   ```bash
   ls -lh ../public/logos/
   ```

3. **Choose your favorite** and update `components/Header.tsx`:
   ```tsx
   <Image 
     src="/logos/kds-logo-modern_geometric-v1_20251014_143022.png"
     alt="KD's Pressure Washing"
     width={150}
     height={50}
   />
   ```

## Customization

Edit the prompts in the scripts to adjust:
- Style and aesthetic
- Color emphasis
- Element prominence
- Specific design details

## Troubleshooting

**Error: "GOOGLE_CLOUD_PROJECT not set"**
```bash
export GOOGLE_CLOUD_PROJECT="your-actual-project-id"
```

**Error: "Permission denied"**
```bash
gcloud auth application-default login
```

**Error: "Vertex AI API not enabled"**
- Visit [Google Cloud Console](https://console.cloud.google.com)
- Enable Vertex AI API for your project

**Error: "Module 'google.cloud.aiplatform' not found"**
```bash
# Make sure virtual environment is activated
cd scripts
source venv/bin/activate

# Or re-run setup
./setup-and-run.sh
```

## Cost

Vertex AI Imagen pricing (as of 2024):
- ~$0.04 per image generated
- Running `generate-logo-enhanced.py` generates 8 images (~$0.32)

See [Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing) for current rates.

