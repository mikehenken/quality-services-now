# Natural Cleaning Service Images Guide

## Overview
This guide explains the approach used to generate natural, realistic cleaning service images that look authentic and not AI-generated.

## Key Principles

### ✅ Natural Photography Style
- **Phone camera quality** - Slightly grainy, natural lighting
- **Candid composition** - Workers focused on tasks, not looking at camera
- **Real work conditions** - Authentic cleaning work in progress
- **Natural lighting** - No professional studio lighting
- **Lived-in environments** - Real homes and workplaces

### ✅ Authentic Work Representation
- **Black workers prominently featured** where people are shown
- **Real work clothes** - Not overly clean or staged
- **Natural work positions** - Workers focused on cleaning tasks
- **Authentic equipment** - Real cleaning supplies and tools
- **Realistic settings** - Actual homes, offices, and commercial spaces

### ✅ Avoid AI-Generated Look
- **No perfect composition** - Natural, casual framing
- **No professional lighting** - Natural indoor/outdoor lighting
- **No staged poses** - Workers caught in natural work moments
- **No overly clean appearance** - Real work conditions
- **No perfect symmetry** - Natural, organic compositions

## Image Categories

### Residential Cleaning (6 images)
1. **House Cleaning** - Black woman vacuuming living room
2. **Deep Cleaning** - Black man scrubbing bathroom tiles
3. **Window Cleaning** - Black woman cleaning windows
4. **Rental & AirBnB Cleaning** - Black woman preparing rental property for new guests
5. **Post-Construction** - Clean renovated kitchen (no people)
6. **Move-In/Out** - Black woman organizing cleaning supplies

### Commercial Cleaning (6 images)
1. **Office Cleaning** - Clean office space (no people)
2. **Warehouse Cleaning** - Clean warehouse floor (no people)
3. **Restaurant Cleaning** - Black man sanitizing kitchen
4. **Medical Facility** - Black woman cleaning medical equipment
5. **School Cleaning** - Clean classroom (no people)
6. **Retail Store** - Clean retail space (no people)

### Specialized Cleaning (4 images)
1. **Green Cleaning** - Black woman using eco-friendly products
2. **Disaster Restoration** - Black man working on water damage
3. **Event Cleaning** - Black woman preparing event space
4. **Regular Maintenance** - Clean office building (no people)

## Technical Implementation

### Image Generation Script
- **File**: `scripts/generate-natural-cleaning-images.js`
- **Service**: Pollinations.ai (Flux model)
- **Settings**: Natural quality, no enhancement
- **Random seeds**: Each image gets unique seed for variety

### Prompt Strategy
Each prompt focuses on:
- **Natural photography** - "Real photo", "phone camera quality"
- **Authentic work** - "Worker focused on task", "not looking at camera"
- **Realistic settings** - "Real residential home", "authentic cleaning work"
- **Natural lighting** - "Natural lighting", "not professional photography"

### File Organization
```
public/cleaning-images/
├── cleaning-house-cleaning.jpg
├── cleaning-deep-cleaning.jpg
├── cleaning-window-cleaning.jpg
├── cleaning-rental-airbnb-cleaning.jpg
├── cleaning-post-construction.jpg
├── cleaning-move-in-out.jpg
├── cleaning-office-cleaning.jpg
├── cleaning-warehouse-cleaning.jpg
├── cleaning-restaurant-cleaning.jpg
├── cleaning-medical-cleaning.jpg
├── cleaning-school-cleaning.jpg
├── cleaning-retail-cleaning.jpg
├── cleaning-green-cleaning.jpg
├── cleaning-disaster-restoration.jpg
├── cleaning-holiday-cleaning.jpg
└── cleaning-regular-maintenance.jpg
```

## Usage

### Generate New Images
```bash
node scripts/generate-natural-cleaning-images.js
```

### Regenerate Specific Images
Edit the script to include only the images you want to regenerate.

### Test Images
Visit `http://localhost:3002` to see the images in action on the website.

## Quality Standards

### ✅ Good Natural Images
- Look like real work photos
- Workers focused on tasks
- Natural lighting and composition
- Authentic work environments
- Realistic cleaning equipment

### ❌ Avoid These
- Overly perfect composition
- Professional studio lighting
- Workers looking at camera
- Staged or posed appearance
- Too clean or perfect settings
- AI-generated artifacts

## Diversity Requirements

### Worker Representation
- **Black people prominently featured** where people are shown
- **Authentic work conditions** - Real cleaning work, not staged
- **Natural work clothing** - Appropriate for cleaning tasks
- **Diverse settings** - Residential and commercial environments

### Gender Balance
- **Women**: House cleaning, window cleaning, medical cleaning, event cleaning, green cleaning
- **Men**: Deep cleaning, restaurant cleaning, disaster restoration

## Maintenance

### Regenerating Images
If images need to be updated:
1. Edit prompts in `generate-natural-cleaning-images.js`
2. Run the generation script
3. Test on the website
4. Deploy changes

### Adding New Services
1. Add new image definition to the script
2. Update corresponding component references
3. Generate new images
4. Test and deploy

## Notes

- Images are optimized for web use (1200x800)
- All images use natural, realistic prompts
- Focus on authenticity over perfection
- Maintain diversity requirements
- Ensure natural, non-AI-generated appearance
