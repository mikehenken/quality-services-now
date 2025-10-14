/**
 * Generate realistic property review photos using AI
 * 
 * This script uses Google's Imagen API to generate authentic-looking
 * property photos that appear to be taken on a smartphone.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = 'GOOGLE_API_KEY_REMOVED';

// Review photo specifications
const reviewPhotos = [
  // Lehigh Acres
  {
    id: 'lehigh-deandre',
    area: 'Lehigh Acres',
    name: 'DeAndre L.',
    type: 'residential',
    prompt: 'A casual smartphone photo taken by a Black male homeowner showing his freshly pressure washed concrete driveway and house exterior in Lehigh Acres, Florida. Single-story beige house with clean siding, palm trees in yard, bright sunny day. Photo taken from street view at a slight angle, natural outdoor lighting, slightly imperfect composition like a real phone photo, not professional photography. Clean driveway with visible wet spots from recent washing. Realistic and authentic.',
  },
  {
    id: 'lehigh-maria',
    area: 'Lehigh Acres',
    name: 'Maria R.',
    type: 'residential',
    prompt: 'A casual smartphone photo of a clean residential property in Lehigh Acres, Florida taken by a Hispanic homeowner. One-story house with light tan/beige exterior, freshly cleaned concrete driveway showing dramatic cleanliness, green lawn, palm trees. Photo taken from driveway looking toward house, natural sunlight, casual angle, authentic phone camera quality. Not staged or professional. Real Florida suburban home.',
  },
  
  // Fort Myers
  {
    id: 'fort-myers-marcus',
    area: 'Fort Myers',
    name: 'Marcus J.',
    type: 'residential',
    prompt: 'Casual iPhone photo taken by a Black homeowner of his house in Fort Myers, Florida after pressure washing. Modern single-family home with two-car garage, clean driveway, palm trees. Photo taken from street or driveway, showing house pride, natural outdoor lighting, slightly casual composition. Clean concrete and house exterior visible. Authentic smartphone photography, not professional real estate photo.',
  },
  {
    id: 'fort-myers-linda',
    area: 'Fort Myers',
    name: 'Linda K.',
    type: 'commercial',
    prompt: 'Smartphone photo of a small commercial office building in Fort Myers, Florida taken by a Black woman business owner. One or two-story professional office building with clean exterior walls, small parking lot, palm trees. Daytime photo, casual angle from parking lot, showing clean building after pressure washing. Real commercial property, authentic phone camera, natural lighting. Not stock photography.',
  },
  {
    id: 'fort-myers-robert',
    area: 'Fort Myers',
    name: 'Robert T.',
    type: 'residential',
    prompt: 'Casual phone photo of a residential pool deck and patio in Fort Myers, Florida after pressure washing. Clean concrete pool deck, partial view of pool water, screen enclosure (lanai), patio furniture. Taken in backyard, bright Florida sunshine, palm trees in background. Authentic smartphone quality photo showing homeowner pride. Natural composition, not professional.',
  },
  
  // Naples
  {
    id: 'naples-jasmine',
    area: 'Naples',
    name: 'Jasmine W.',
    type: 'residential',
    prompt: 'Smartphone photo taken by a Black woman homeowner of her house in Naples, Florida after painting and pressure washing. Upscale single-family home with fresh exterior paint, clean driveway, well-maintained landscaping, palm trees. Photo taken from street showing house curb appeal, natural lighting, casual angle. Authentic phone camera quality, homeowner pride visible. Not professional photography.',
  },
  {
    id: 'naples-patricia',
    area: 'Naples',
    name: 'Patricia M.',
    type: 'residential',
    prompt: 'Casual phone photo of an upscale two-story home in Naples, Florida. Luxury single-family residence with pristine exterior, elegant landscaping, circular driveway or nice entrance, palm trees. Natural sunlight, taken from street view, authentic smartphone camera quality. Real Florida luxury home, not professional real estate photography. Shows well-maintained property.',
  },
  
  // Estero
  {
    id: 'estero-carlos',
    area: 'Estero',
    name: 'Carlos M.',
    type: 'residential',
    prompt: 'Smartphone photo of a home interior room in Estero, Florida after fresh painting. Living room or bedroom with newly painted walls in neutral color (beige, gray, or white), furniture partially visible, natural window lighting, clean professional paint job. Authentic phone camera quality, casual angle. Real home interior showing quality paint work. Not professional photography.',
  },
  {
    id: 'estero-jennifer',
    area: 'Estero',
    name: 'Jennifer S.',
    type: 'commercial',
    prompt: 'Smartphone photo of a shopping plaza or strip mall in Estero, Florida taken by a Black woman business owner. Small commercial retail building with storefronts, clean exterior walls after pressure washing, parking lot visible, palm trees. Daytime, casual angle from parking area, authentic phone camera. Real commercial property in Southwest Florida. Natural outdoor lighting.',
  },
  
  // Bonita Springs
  {
    id: 'bonita-springs-aaliyah',
    area: 'Bonita Springs',
    name: 'Aaliyah T.',
    type: 'commercial',
    prompt: 'Casual phone photo taken by a Black woman of a commercial office building in Bonita Springs, Florida. Modern professional office building, one or two stories, clean exterior after pressure washing, small parking area, palm trees, sunny day. Taken from parking lot, authentic smartphone quality, natural composition. Real Southwest Florida commercial property.',
  },
  {
    id: 'bonita-springs-michael',
    area: 'Bonita Springs',
    name: 'Michael B.',
    type: 'residential',
    prompt: 'Smartphone photo taken by a Black male homeowner of his house in Bonita Springs, Florida. Nice single-family home with clean exterior, fresh appearance after professional maintenance, well-kept yard, palm trees. Taken from street or driveway showing homeowner pride, natural outdoor lighting, casual composition. Authentic phone camera quality, not professional real estate photo.',
  },
  
  // Punta Gorda
  {
    id: 'punta-gorda-tyrone',
    area: 'Punta Gorda',
    name: 'Tyrone K.',
    type: 'residential',
    prompt: 'Casual smartphone photo taken by a Black homeowner of his backyard patio and pool deck in Punta Gorda, Florida after pressure washing. Clean concrete patio area, partial pool view visible, screen enclosure, outdoor patio furniture. Backyard setting, Florida sunshine, palm trees. Authentic phone camera quality showing clean surfaces. Not professional photography.',
  },
  {
    id: 'punta-gorda-susan',
    area: 'Punta Gorda',
    name: 'Susan L.',
    type: 'residential',
    prompt: 'Smartphone photo of a waterfront property in Punta Gorda, Florida. Single-family home with water view (canal or bay in background), clean exterior, dock or waterfront area visible, palm trees. Casual angle showing beautiful Florida waterfront property, natural outdoor lighting. Authentic phone camera quality. Real residential property, not professional photography.',
  },
];

/**
 * Generate image using Google's Gemini API (with imagen)
 */
async function generateWithGemini(prompt, filename) {
  try {
    console.log(`\n🎨 Generating ${filename}...`);
    console.log(`Prompt: ${prompt.substring(0, 100)}...`);
    
    // Try Gemini's experimental imagen endpoint
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a realistic photograph: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 32,
          topP: 1,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    console.log(`✅ Generated ${filename}`);
    return response.data;
    
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.response?.data || error.message);
    return null;
  }
}

/**
 * Alternative: Use Pollinations.ai (free, no API key required)
 */
async function generateWithPollinations(prompt, filename) {
  try {
    console.log(`\n🎨 Generating ${filename} with Pollinations.ai...`);
    
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&model=flux`;
    
    console.log('📥 Downloading image...');
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 60000
    });
    
    const outputPath = path.join(__dirname, '..', 'public', 'review-photos', `${filename}.jpg`);
    fs.writeFileSync(outputPath, response.data);
    
    console.log(`✅ Saved to: ${outputPath}`);
    return outputPath;
    
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    return null;
  }
}

/**
 * Main generation function
 */
async function generateAllPhotos() {
  console.log('🚀 Starting review photo generation...\n');
  console.log('=' .repeat(60));
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', 'public', 'review-photos');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}\n`);
  }
  
  console.log(`📸 Generating ${reviewPhotos.length} photos...`);
  console.log('⏱️  This may take a few minutes...\n');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const photo of reviewPhotos) {
    // Use Pollinations.ai (free and doesn't require API key setup)
    const result = await generateWithPollinations(photo.prompt, photo.id);
    
    results.push({
      id: photo.id,
      area: photo.area,
      name: photo.name,
      success: result !== null,
      path: result
    });
    
    // Small delay to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n✅ Successful: ${successful}/${reviewPhotos.length}`);
  console.log(`❌ Failed: ${failed}/${reviewPhotos.length}`);
  
  if (successful > 0) {
    console.log('\n📁 Generated files:');
    results.filter(r => r.success).forEach(r => {
      console.log(`   - ${r.id}.jpg (${r.area} - ${r.name})`);
    });
  }
  
  if (failed > 0) {
    console.log('\n⚠️  Failed files:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.id}.jpg (${r.area} - ${r.name})`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Generation complete!');
  console.log('\n💡 Next step: Update Hero.tsx to use local images instead of Unsplash');
  console.log('   Example: image: "/review-photos/lehigh-deandre.jpg"');
  console.log('='.repeat(60) + '\n');
}

// Run the generator
generateAllPhotos().catch(console.error);

