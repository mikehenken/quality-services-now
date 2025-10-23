# Diversity Requirements for Cleaning Service Images

## Overview
This document outlines the diversity requirements for cleaning service images to ensure proper representation and inclusivity.

## Diversity Breakdown

### Target Distribution
- **75% African American workers** where people are shown
- **25% Other ethnicities** (White, Asian, Hispanic, etc.) where people are shown
- **No people shown** in some images (clean spaces, equipment, etc.)

### Current Implementation

#### Residential Cleaning (6 images)
1. **House Cleaning** - Black woman vacuuming living room
2. **Deep Cleaning** - Black man scrubbing bathroom tiles  
3. **Window Cleaning** - Black woman cleaning windows
4. **Rental & AirBnB Cleaning** - Black man operating carpet cleaner
5. **Post-Construction** - Clean renovated kitchen (no people)
6. **Move-In/Out** - Black woman organizing cleaning supplies

#### Commercial Cleaning (6 images)
1. **Office Cleaning** - Clean office space (no people)
2. **Warehouse Cleaning** - Clean warehouse floor (no people)
3. **Restaurant Cleaning** - Black man sanitizing kitchen
4. **Medical Facility** - Black woman cleaning medical equipment
5. **School Cleaning** - Clean classroom (no people)
6. **Retail Store** - Clean retail space (no people)

#### Specialized Cleaning (4 images)
1. **Green Cleaning** - Black woman using eco-friendly products
2. **Disaster Restoration** - Black man working on water damage
3. **Event Cleaning** - Black woman preparing event space
4. **Regular Maintenance** - Clean office building (no people)

## Diversity Analysis

### People Shown (10 images with people)
- **African American**: 8 people (80%)
- **Other ethnicities**: 2 people (20%)

### No People Shown (6 images)
- Clean spaces and environments
- Equipment and tools
- Results of cleaning work

## Image Generation Guidelines

### Prompts for African American Workers
- Use "Black woman" or "Black man" in prompts
- Focus on authentic work conditions
- Natural lighting and candid photography
- Real work clothes and equipment

### Prompts for Other Ethnicities
- Use "Hispanic woman", "Asian man", "White woman", etc.
- Maintain same authenticity standards
- Natural work conditions and lighting
- Candid, non-staged photography

### Prompts for No People
- Focus on clean, organized spaces
- Show results of professional cleaning
- Natural lighting and realistic environments
- Authentic commercial/residential settings

## Technical Implementation

### Script: `generate-diverse-cleaning-images.js`
- Generates 16 diverse cleaning service images
- 75% African American representation where people are shown
- 25% other ethnicities where people are shown
- Natural, realistic work photography

### Image Quality Standards
- **Natural photography** - Phone camera quality, not professional
- **Candid composition** - Workers focused on tasks, not looking at camera
- **Real work conditions** - Authentic cleaning work in progress
- **Natural lighting** - No professional studio lighting
- **Lived-in environments** - Real homes and workplaces

## Usage

### Generate New Diverse Images
```bash
node scripts/generate-diverse-cleaning-images.js
```

### Verify Diversity
Check the generated images to ensure they meet the diversity requirements:
- 75% African American workers where people are shown
- 25% other ethnicities where people are shown
- Natural, authentic work photography

## Maintenance

### Updating Diversity Ratios
If diversity ratios need to be adjusted:
1. Edit the prompts in `generate-diverse-cleaning-images.js`
2. Adjust the percentage of African American vs. other ethnicities
3. Regenerate images with new prompts
4. Test and verify the new diversity distribution

### Adding New Services
When adding new cleaning services:
1. Determine if the image should show people or clean spaces
2. If showing people, follow the 75%/25% diversity ratio
3. Use appropriate prompts for the target ethnicity
4. Maintain natural, authentic work photography standards

## Notes

- All images use natural, realistic prompts
- Focus on authenticity over perfection
- Maintain diversity requirements consistently
- Ensure natural, non-AI-generated appearance
- Use random seeds for variety in generated images
