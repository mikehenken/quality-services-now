/**
 * Generate service images using Google Gemini API with Imagen
 * 
 * Creates realistic, natural-looking photos with proper representation
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Google API Key - Get from: https://makersuite.google.com/app/apikey
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';

const serviceImages = [
  // RESIDENTIAL SERVICES
  {
    filename: 'service-pressure-washing',
    title: 'Pressure Washing',
    prompt: 'A natural candid smartphone photo of a Hispanic male worker actively pressure washing a concrete driveway in Florida, shot from the side. Worker wearing slightly dirty work t-shirt with some sweat visible, focused on his work not looking at camera, holding professional pressure washer wand with visible water spray hitting the concrete. Single-story tan house in background, palm trees, bright sunny day. Worker has light perspiration, clothes a bit damp from spray. Authentic candid work photo, slightly grainy phone camera quality, natural outdoor lighting. Real person doing real work, caught in the moment.',
  },
  {
    filename: 'service-house-washing',
    title: 'House Washing',
    prompt: 'Natural photo of a clean single-family house in Florida after soft washing. One-story beige or white home with pristine clean siding, palm trees in yard, well-maintained landscaping, bright sunny day. Photo taken from street view showing full house, authentic residential property. Real Florida suburban home, natural outdoor lighting, casual composition. No people visible.',
  },
  {
    filename: 'service-exterior-painting',
    title: 'Exterior Painting',
    prompt: 'Candid work photo of a Black woman painter applying paint to house exterior in Florida, photographed from an angle. Worker in slightly paint-stained work clothes and t-shirt, hair tied back, focused on painting the siding with roller not looking at camera. Paint roller on white or beige siding, ladder visible, single-family home, palm trees in background. Worker showing signs of real work - bit of sweat on forehead, paint smudges on clothes. Authentic painting work in progress, natural outdoor lighting, smartphone camera quality.',
  },
  {
    filename: 'service-interior-painting',
    title: 'Interior Painting',
    prompt: 'Natural candid photo of a white male painter working on interior room painting, shot from doorway. Worker in paint-spotted work clothes using paint roller on wall, not looking at camera, focused on work. Drop cloths on floor, residential room with neutral walls (light gray or beige), natural window light. Worker with slightly messy appearance from actual painting work. Authentic interior painting in progress, casual photo quality, real residential job.',
  },
  {
    filename: 'service-fence-deck-staining',
    title: 'Fence & Deck Staining',
    prompt: 'Casual photo of wooden deck being stained in Florida backyard. Dark brown wood stain on deck boards, brush or applicator visible on the wood, partial view of backyard with palm trees, bright sunny day. Staining work in progress showing stain can and application, natural outdoor photo, authentic residential property. Smartphone camera quality. No people in frame.',
  },
  {
    filename: 'service-concrete-cleaning',
    title: 'Concrete Cleaning',
    prompt: 'Natural photo showing dramatically clean concrete driveway in Florida. Clean light gray concrete surface, residential driveway leading to house, palm trees visible, single-family home in background, sunny day. Authentic concrete cleaning result, casual photo angle, real property photo. No people visible.',
  },

  // COMMERCIAL SERVICES
  {
    filename: 'service-building-washing',
    title: 'Building Washing',
    prompt: 'Photo of a modern commercial office building in Florida. Two-story professional building with clean exterior walls, small parking lot in front, palm trees around property, clear blue sky. Contemporary commercial property in Southwest Florida, natural daytime lighting, authentic business building. No people visible.',
  },
  {
    filename: 'service-warehouse-cleaning',
    title: 'Warehouse Cleaning',
    prompt: 'Photo of industrial warehouse or commercial facility exterior in Florida. Large one-story commercial building with warehouse doors, loading area, parking lot, palm trees visible. Industrial property, bright sunny day, natural outdoor photo of real commercial facility. No people in frame.',
  },
  {
    filename: 'service-parking-lot',
    title: 'Parking Lot Cleaning',
    prompt: 'Natural photo of clean commercial parking lot in Florida. Painted parking space lines on dark asphalt, clean surface, palm trees around perimeter, small commercial building in background. Bright sunny day, well-maintained parking area, authentic commercial property photo. No people or cars visible.',
  },
  {
    filename: 'service-commercial-painting',
    title: 'Commercial Painting',
    prompt: 'Candid photo of a Mexican male painter working on commercial building painting in Florida, shot from ground level. Worker on ladder painting exterior wall of commercial building, wearing work clothes with paint stains, bit sweaty from outdoor work, focused on painting not looking at camera. Palm trees visible, sunny day. Authentic commercial painting job showing real work conditions, natural work photo.',
  },
  {
    filename: 'service-storefront',
    title: 'Storefront Restoration',
    prompt: 'Natural photo of clean retail storefront in Florida shopping plaza. Small strip mall with storefronts, clean exterior walls, large windows, professional appearance, palm trees, parking lot visible. Bright sunny day, authentic Florida commercial retail property. No people in frame.',
  },
  {
    filename: 'service-hoa',
    title: 'HOA Services',
    prompt: 'Photo of residential HOA community in Florida. Clean neighborhood street with multiple single-family homes visible, well-maintained yards, palm trees, clean sidewalks and street. Sunny day, attractive residential community, natural outdoor photo of real Florida suburban neighborhood. No people or cars visible.',
  },

  // TOOLKIT IMAGES
  {
    filename: 'toolkit-pressure-washer',
    title: 'Professional Pressure Washers',
    prompt: 'Close-up candid photo of a white male worker holding professional pressure washer wand in Florida, photographed from the side. Worker in slightly dirty work shirt with some moisture from spray, looking down at equipment not at camera, professional gas-powered pressure washer wand in hands. Partial view of house and palm trees blurred in background. Natural work photo showing actual work conditions, authentic equipment shot, smartphone camera quality.',
  },
  {
    filename: 'toolkit-paint-systems',
    title: 'Premium Paint Systems',
    prompt: 'Candid photo of a Black male painter with professional painting equipment in Florida, shot from angle. Worker in paint-stained work clothes kneeling or bending down organizing paint supplies, not looking at camera. Paint buckets, professional paint roller and tray visible, residential house and palm trees in background. Worker showing signs of real work - paint on clothes and hands. Natural work photo, authentic painting setup, real job site.',
  },
  {
    filename: 'toolkit-soft-wash',
    title: 'Soft Wash Technology',
    prompt: 'Natural photo of pristine clean Florida house after soft washing. Single-family home with perfectly clean white or beige siding, palm trees, well-maintained yard, bright sunny day. Photo showing excellent result of gentle soft wash cleaning, authentic residential property, natural outdoor lighting. No people visible.',
  },
  {
    filename: 'toolkit-specialized-equipment',
    title: 'Specialized Equipment',
    prompt: 'Candid photo of a Hispanic woman technician holding pressure washing accessories in Florida, photographed from side angle. Worker in work clothes slightly damp from water spray, examining or adjusting surface cleaner attachment and nozzles, not looking at camera. Extension wands and various professional tools visible, palm trees and house in background. Worker with hair tied back, showing real work conditions. Natural work photo, authentic equipment display, smartphone camera quality.',
  },
];

async function generateImageWithGemini(imageData) {
  try {
    console.log(`\n🎨 Generating: ${imageData.title}`);
    console.log(`   File: ${imageData.filename}.jpg`);
    
    // Using Imagen 3 via Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GOOGLE_API_KEY}`,
      {
        instances: [{
          prompt: imageData.prompt
        }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '3:2',
          safetyFilterLevel: 'block_few',
          personGeneration: 'allow_adult',
          // Use lower guidance for more natural results
          guidanceScale: 15,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 60000
      }
    );
    
    if (response.data && response.data.predictions && response.data.predictions.length > 0) {
      const imageBase64 = response.data.predictions[0].bytesBase64Encoded;
      const imageBuffer = Buffer.from(imageBase64, 'base64');
      
      const outputPath = path.join(__dirname, '..', 'public', 'service-images', `${imageData.filename}.jpg`);
      fs.writeFileSync(outputPath, imageBuffer);
      
      console.log(`   ✅ Saved!`);
      return { success: true, filename: imageData.filename };
    } else {
      throw new Error('No image data in response');
    }
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.response?.data?.error?.message || error.message}`);
    return { success: false, filename: imageData.filename, error: error.message };
  }
}

async function generateAllImages() {
  console.log('=' .repeat(70));
  console.log('🚀 GENERATING IMAGES WITH GOOGLE GEMINI (IMAGEN 3)');
  console.log('=' .repeat(70));
  
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('\n❌ ERROR: GOOGLE_API_KEY not set!');
    console.log('\n📝 To fix this:');
    console.log('   1. Get API key: https://makersuite.google.com/app/apikey');
    console.log('   2. Set environment variable: export GOOGLE_API_KEY="your-key-here"');
    console.log('   3. Or edit this file and replace YOUR_API_KEY_HERE\n');
    process.exit(1);
  }
  
  console.log(`\n📸 Total images to generate: ${serviceImages.length}`);
  console.log('🤖 Model: Imagen 3');
  console.log('=' .repeat(70));
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', 'public', 'service-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`\n📁 Created directory: ${outputDir}\n`);
  }
  
  const results = [];
  
  for (let i = 0; i < serviceImages.length; i++) {
    const imageData = serviceImages[i];
    console.log(`\n[${i + 1}/${serviceImages.length}] Processing: ${imageData.title}`);
    console.log('-'.repeat(70));
    
    const result = await generateImageWithGemini(imageData);
    results.push(result);
    
    // Delay between requests to avoid rate limiting
    if (i < serviceImages.length - 1) {
      console.log('   ⏳ Waiting before next request...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(70));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n✅ Successful: ${successful}/${serviceImages.length}`);
  console.log(`❌ Failed: ${failed}/${serviceImages.length}`);
  
  if (successful > 0) {
    console.log('\n✨ Generated files in public/service-images/:');
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
  console.log('✨ Generation complete!');
  console.log('='.repeat(70) + '\n');
}

generateAllImages().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});

