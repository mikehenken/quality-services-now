/**
 * Generate natural, realistic cleaning service images
 * 
 * Creates authentic-looking work photos that don't appear AI-generated
 * Focus: Natural, candid, realistic cleaning work photography
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const naturalCleaningImages = [
  // RESIDENTIAL CLEANING - Natural, realistic work photos
  {
    filename: 'cleaning-house-cleaning',
    title: 'House Cleaning',
    prompt: 'Real photo of a Black woman in casual work clothes vacuuming a living room. Shot from behind/side angle, natural indoor lighting, slightly grainy phone camera quality. Worker focused on task, not looking at camera. Real residential home with normal furniture, lived-in appearance. Authentic cleaning work in progress.',
  },
  {
    filename: 'cleaning-deep-cleaning',
    title: 'Deep Cleaning',
    prompt: 'Candid photo of a Black man scrubbing bathroom tiles with cleaning supplies. Shot from doorway, natural lighting, phone camera quality. Worker in work clothes, focused on cleaning, not posed. Real bathroom with normal fixtures, authentic cleaning work. No professional lighting or staging.',
  },
  {
    filename: 'cleaning-window-cleaning',
    title: 'Window Cleaning',
    prompt: 'Natural photo of a Black woman cleaning windows from inside a home. Shot from interior, natural window light, casual composition. Worker in work clothes, using window cleaning supplies, focused on task. Real residential window, authentic cleaning work. Phone camera quality, not professional photography.',
  },
  {
    filename: 'cleaning-rental-airbnb-cleaning',
    title: 'Rental & AirBnB Cleaning',
    prompt: 'Natural photo of a Black woman preparing a rental property for new guests. Shot from side angle, natural indoor lighting, phone camera quality. Worker in work clothes, focused on cleaning and organizing, not looking at camera. Real rental property interior, authentic turnover cleaning work in progress.',
  },
  {
    filename: 'cleaning-post-construction',
    title: 'Post-Construction Cleaning',
    prompt: 'Photo of a clean, newly renovated kitchen after construction cleanup. Natural lighting, real residential space, authentic post-construction cleaning results. No people visible, realistic home environment, phone camera quality.',
  },
  {
    filename: 'cleaning-move-in-out',
    title: 'Move-In/Out Cleaning',
    prompt: 'Natural photo of a Black woman organizing cleaning supplies in an empty room. Shot from side angle, natural lighting, phone camera quality. Worker in work clothes, focused on organizing supplies, not posed. Real empty residential room, authentic move-out cleaning preparation.',
  },

  // COMMERCIAL CLEANING - Natural, realistic work photos
  {
    filename: 'cleaning-office-cleaning',
    title: 'Office Cleaning',
    prompt: 'Photo of a clean, organized office space after professional cleaning. Natural lighting, real commercial office environment, authentic cleaning results. No people visible, realistic office setting, phone camera quality.',
  },
  {
    filename: 'cleaning-warehouse-cleaning',
    title: 'Warehouse Cleaning',
    prompt: 'Photo of a clean industrial warehouse floor after professional cleaning. Natural lighting, real commercial facility, authentic cleaning results. No people visible, realistic warehouse environment, phone camera quality.',
  },
  {
    filename: 'cleaning-restaurant-cleaning',
    title: 'Restaurant Cleaning',
    prompt: 'Natural photo of a Black man sanitizing kitchen surfaces in a restaurant. Shot from side angle, natural lighting, phone camera quality. Worker in kitchen work clothes, focused on sanitizing, not looking at camera. Real commercial kitchen, authentic cleaning work.',
  },
  {
    filename: 'cleaning-medical-cleaning',
    title: 'Medical Facility Cleaning',
    prompt: 'Candid photo of a Black woman cleaning medical equipment in a healthcare facility. Shot from doorway, natural lighting, phone camera quality. Worker in medical cleaning uniform, focused on sanitizing, not posed. Real medical facility, authentic healthcare cleaning work.',
  },
  {
    filename: 'cleaning-school-cleaning',
    title: 'School Cleaning',
    prompt: 'Photo of a clean classroom after professional cleaning. Natural lighting, real educational facility, authentic cleaning results. No people visible, realistic school environment, phone camera quality.',
  },
  {
    filename: 'cleaning-retail-cleaning',
    title: 'Retail Store Cleaning',
    prompt: 'Photo of a clean retail store after professional cleaning. Natural lighting, real commercial retail space, authentic cleaning results. No people visible, realistic store environment, phone camera quality.',
  },

  // SPECIALIZED CLEANING - Natural, realistic work photos
  {
    filename: 'cleaning-green-cleaning',
    title: 'Green/Eco-Friendly Cleaning',
    prompt: 'Natural photo of a Black woman using eco-friendly cleaning products in a home. Shot from side angle, natural lighting, phone camera quality. Worker in work clothes, focused on cleaning with green products, not posed. Real residential home, authentic eco-friendly cleaning work.',
  },
  {
    filename: 'cleaning-disaster-restoration',
    title: 'Disaster Restoration Cleaning',
    prompt: 'Real photo of a Black man working on water damage cleanup in a home. Shot from medium distance, natural lighting, phone camera quality. Worker in protective gear, focused on restoration work, not looking at camera. Real residential home with water damage, authentic restoration work.',
  },
  {
    filename: 'cleaning-holiday-cleaning',
    title: 'Holiday/Event Cleaning',
    prompt: 'Natural photo of a Black woman preparing event space for cleaning. Shot from side angle, natural lighting, phone camera quality. Worker in work clothes, organizing event cleaning supplies, not posed. Real event venue, authentic event cleaning preparation.',
  },
  {
    filename: 'cleaning-regular-maintenance',
    title: 'Regular Maintenance Cleaning',
    prompt: 'Photo of a well-maintained office building after regular cleaning service. Natural outdoor lighting, real commercial property, authentic maintenance cleaning results. No people visible, realistic office building, phone camera quality.',
  }
];

async function generateNaturalImage(imageData) {
  try {
    console.log(`\n🎨 Generating: ${imageData.title}`);
    console.log(`   File: ${imageData.filename}.jpg`);
    
    const encodedPrompt = encodeURIComponent(imageData.prompt);
    
    // Use more natural settings to avoid AI-generated look
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&nologo=true&model=flux&enhance=false&seed=${Math.floor(Math.random() * 1000000)}`;
    
    console.log('   📥 Downloading...');
    
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 120000
    });
    
    const outputPath = path.join(__dirname, '..', 'public', 'cleaning-images', `${imageData.filename}.jpg`);
    fs.writeFileSync(outputPath, response.data);
    
    console.log(`   ✅ Saved!`);
    return { success: true, filename: imageData.filename };
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { success: false, filename: imageData.filename, error: error.message };
  }
}

async function generateAllNaturalImages() {
  console.log('=' .repeat(70));
  console.log('🚀 GENERATING NATURAL, REALISTIC CLEANING IMAGES');
  console.log('=' .repeat(70));
  
  console.log(`\n📸 Total images to generate: ${naturalCleaningImages.length}`);
  console.log('🤖 Generator: Pollinations.ai (Flux model)');
  console.log('👥 Focus: Natural, authentic work photos');
  console.log('🎯 Quality: Realistic, not AI-generated looking');
  console.log('=' .repeat(70));
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', 'public', 'cleaning-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`\n📁 Created directory: ${outputDir}\n`);
  }
  
  const results = [];
  
  for (let i = 0; i < naturalCleaningImages.length; i++) {
    const imageData = naturalCleaningImages[i];
    console.log(`\n[${i + 1}/${naturalCleaningImages.length}] Processing: ${imageData.title}`);
    console.log('-'.repeat(70));
    
    const result = await generateNaturalImage(imageData);
    results.push(result);
    
    // Delay between requests to avoid rate limiting
    if (i < naturalCleaningImages.length - 1) {
      console.log('   ⏳ Waiting before next request...');
      await new Promise(resolve => setTimeout(resolve, 4000));
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(70));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n✅ Successful: ${successful}/${naturalCleaningImages.length}`);
  console.log(`❌ Failed: ${failed}/${naturalCleaningImages.length}`);
  
  if (successful > 0) {
    console.log('\n✨ Generated files in public/cleaning-images/:');
    results.filter(r => r.success).forEach(r => {
      console.log(`   ✓ ${r.filename}.jpg`);
    });
  }
  
  if (failed > 0) {
    console.log('\n⚠️  Failed files:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ✗ ${r.filename}.jpg - ${r.error}`);
    });
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✨ Natural cleaning image generation complete!');
  console.log('='.repeat(70) + '\n');
}

generateAllNaturalImages().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
