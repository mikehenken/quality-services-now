# Logo Generation Rules - READ THIS FIRST

## 🚨 Mandatory Specifications

### Technical Requirements (Non-Negotiable)

1. **Aspect Ratio: 8.6:2.2 (width:height)**
   - This is approximately 3.9:1 horizontal
   - Example: 830px × 212px
   - Example: 1660px × 424px (retina)

2. **Transparent Background**
   - MUST be fully transparent
   - NO white backgrounds
   - NO colored backgrounds
   - PNG with alpha transparency channel

3. **No Large Rectangles**
   - Avoid rectangular boxes around the logo
   - Use organic shapes (circles, shields, custom shapes)
   - No background rectangles or frames

4. **Tight Cropping**
   - Minimal padding around logo elements
   - Logo should fill the available space efficiently
   - No excessive whitespace

## 📋 Pre-Generation Checklist

Before running any logo generation script, verify:

- [ ] Prompt includes aspect ratio requirement (8.6:2.2)
- [ ] Prompt specifies transparent background
- [ ] Prompt prohibits rectangular boxes
- [ ] Prompt requires tight cropping
- [ ] `add_watermark=False` is set in API call
- [ ] Output format is PNG

## 🛠️ Scripts Updated

The following scripts now include these rules:

- `generate-focused-logo.py` - Main logo generator
- `interactive-logo-refine.py` - Interactive refinement tool
- `quick-revise.py` - Quick revision script

## ✅ Post-Generation Verification

After generating logos, check:

1. **Aspect Ratio**
   ```bash
   identify -format "%w x %h = %[fx:w/h]\n" logo.png
   # Should show ratio close to 3.9
   ```

2. **Transparency**
   ```bash
   identify -format "%A\n" logo.png
   # Should show "True" or "DirectClass"
   ```

3. **Visual Check**
   - Open in image viewer with checkerboard background
   - Verify no white/colored background
   - Verify no rectangular boxes
   - Verify tight cropping

## 📝 Example Prompt Template

```
A horizontal logo for "KD's Pressure Washing & Services".

**TECHNICAL REQUIREMENTS:**
- Aspect ratio: 8.6:2.2 (width:height)
- TRANSPARENT background - fully transparent, no colors
- NO rectangular boxes or frames
- Tight cropping - minimal padding
- PNG with alpha transparency

**Design:**
[Your design specifications here]
```

## ⚠️ Common Mistakes to Avoid

❌ **DON'T:**
- Use 16:9 or 1:1 aspect ratios (wrong!)
- Generate with white backgrounds
- Create logos with rectangular frames
- Leave excessive padding/whitespace
- Forget to specify transparent background

✅ **DO:**
- Use 8.6:2.2 aspect ratio (3.9:1)
- Generate with transparent backgrounds
- Use organic shapes (circles, custom shapes)
- Crop tightly to logo elements
- Always specify transparency requirements

## 🔧 Quick Fix Commands

If you need to adjust an existing logo:

```bash
# Check current size
identify logo.png

# Resize maintaining aspect ratio
convert logo.png -resize 830x212! logo-resized.png

# Add transparency (if missing)
convert logo.png -transparent white logo-transparent.png

# Remove padding (auto-trim)
convert logo.png -trim +repage logo-trimmed.png
```

---

**Remember:** These are MANDATORY requirements. Any logo that doesn't meet these specs will not work properly in the navbar.

