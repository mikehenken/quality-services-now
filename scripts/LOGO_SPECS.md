# Logo Generation Specifications

## Mandatory Technical Requirements

### Dimensions & Ratio
- **Aspect Ratio:** 8.6:2.2 (width:height) = approximately 3.9:1
- **Example sizes:**
  - 830px × 212px
  - 1660px × 424px (2x for retina)
  - 415px × 106px (half size)
- **Format:** PNG with alpha transparency

### Background
- **MUST be transparent** - no white, no colored backgrounds
- **Alpha channel required** - PNG with full transparency support
- **No rectangles** - avoid large rectangular shapes or boxes around the logo

### Design Requirements
- Horizontal layout only
- Tight cropping - minimal padding around actual logo elements
- Clean edges with transparent background
- High contrast elements for visibility on any background

## Prompt Template

When generating logos, always include:

```
TECHNICAL REQUIREMENTS (CRITICAL):
- Aspect ratio: 8.6:2.2 (width:height) - approximately 3.9:1 horizontal
- TRANSPARENT BACKGROUND - no white, no colored background, fully transparent
- PNG with alpha transparency
- NO large rectangles or boxes - organic shapes only
- Tight cropping - minimal padding around logo elements
- Clean, crisp edges
```

## File Naming Convention

```
kds-navbar-logo-[variation]-[timestamp].png
kds-navbar-transparent-[variation]-[timestamp].png
```

## Implementation Notes

- Use `add_watermark=False` in generation calls
- Aspect ratio in Imagen API: use custom aspect ratio if supported, or crop/resize post-generation
- Always verify transparency in saved files
- Remove any background rectangles or padding in design

## Quality Checklist

Before finalizing a logo, verify:
- [ ] Correct aspect ratio (8.6:2.2)
- [ ] Transparent background (not white/gray)
- [ ] No rectangular boxes around logo
- [ ] Tight cropping with minimal padding
- [ ] PNG with alpha channel
- [ ] Clean edges, no artifacts
- [ ] Readable at small sizes
- [ ] Works on light and dark backgrounds

