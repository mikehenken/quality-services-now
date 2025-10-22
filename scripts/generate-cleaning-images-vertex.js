/**
 * Generate cleaning service images using Google Vertex AI Imagen
 * 
 * Creates realistic, natural-looking photos with proper representation
 * Focus: Cleaning services with mostly Black people where people are shown
 */

const aiplatform = require('@google-cloud/aiplatform');
const fs = require('fs');
const path = require('path');

// Initialize Vertex AI client
const { PredictionServiceClient } = aiplatform.v1;
const { helpers } = aiplatform;

// Your Google Cloud project details
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'your-project-id';
const LOCATION = 'us-central1';
const PUBLISHER = 'google';
const MODEL = 'imagegeneration@006';

const clientOptions = {
  apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
};

const client = new PredictionServiceClient(clientOptions);

const cleaningServiceImages = [
  // RESIDENTIAL CLEANING SERVICES
  {
    filename: 'cleaning-house-cleaning',
    title: 'House Cleaning',
    prompt: 'Natural candid smartphone photo of a Black woman house cleaner actively cleaning a residential living room in Florida, shot from the side. Worker wearing professional cleaning uniform with slight wear, focused on vacuuming not looking at camera, hair tied back in ponytail, slight perspiration from physical work. Modern Florida home with palm trees visible through window, bright natural lighting. Worker showing signs of real work - slightly tired but professional, authentic cleaning work in progress. Smartphone camera quality, natural indoor lighting, real person doing real work.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-deep-cleaning',
    title: 'Deep Cleaning',
    prompt: 'Candid photo of a Black male cleaner scrubbing bathroom tiles in Florida home, photographed from doorway angle. Worker in cleaning uniform with slight moisture from water, focused on scrubbing not looking at camera, hair tied back, showing signs of physical cleaning work. Modern bathroom with palm trees visible through window, bright natural lighting. Authentic deep cleaning work in progress, natural indoor photo, real residential cleaning job.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-window-cleaning',
    title: 'Window Cleaning',
    prompt: 'Natural candid smartphone photo of a Black woman window cleaner working on residential windows in Florida, shot from ground level. Worker on ladder cleaning exterior windows, wearing work clothes with slight dampness from cleaning solution, focused on work not looking at camera, hair tied back. Single-story Florida home with palm trees, bright sunny day. Worker showing signs of real work - slight perspiration, authentic window cleaning in progress, natural outdoor lighting.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-carpet-cleaning',
    title: 'Carpet Cleaning',
    prompt: 'Candid photo of a Black male carpet cleaner operating professional carpet cleaning equipment in Florida home, shot from side angle. Worker in slightly damp work uniform, focused on operating machine not looking at camera, hair tied back, showing signs of physical work. Residential living room with palm trees visible through window, natural indoor lighting. Authentic carpet cleaning work in progress, professional equipment, real cleaning job.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-post-construction',
    title: 'Post-Construction Cleaning',
    prompt: 'Natural photo of a clean Florida home interior after post-construction cleaning. Modern residential living room with pristine clean surfaces, no construction debris, palm trees visible through large windows, bright natural lighting. Professional cleaning results showing spotless interior, authentic Florida home, natural indoor photo. No people visible.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-move-in-out',
    title: 'Move-In/Out Cleaning',
    prompt: 'Candid smartphone photo of a Black woman cleaner preparing for move-out cleaning in Florida home, shot from medium distance. Worker in professional cleaning uniform organizing cleaning supplies, not looking at camera, hair tied back, slight perspiration from preparation work. Empty residential room with palm trees visible through window, bright natural lighting. Authentic move-out cleaning preparation, natural indoor photo, real cleaning work.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },

  // COMMERCIAL CLEANING SERVICES
  {
    filename: 'cleaning-office-cleaning',
    title: 'Office Cleaning',
    prompt: 'Natural photo of clean modern office space in Florida after professional cleaning. Contemporary office with pristine clean desks, organized workspace, palm trees visible through large windows, bright natural lighting. Professional commercial cleaning results, authentic Florida office building, natural indoor photo. No people visible.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-warehouse-cleaning',
    title: 'Warehouse Cleaning',
    prompt: 'Photo of clean industrial warehouse interior in Florida after professional cleaning. Large warehouse space with clean floors, organized storage areas, palm trees visible through windows, bright natural lighting. Professional industrial cleaning results, authentic Florida commercial facility, natural indoor photo. No people visible.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-restaurant-cleaning',
    title: 'Restaurant Cleaning',
    prompt: 'Natural candid photo of a Black male restaurant cleaner working in commercial kitchen in Florida, shot from side angle. Worker in professional kitchen cleaning uniform, focused on sanitizing surfaces not looking at camera, hair tied back, slight perspiration from physical work. Commercial kitchen with palm trees visible through window, bright natural lighting. Authentic restaurant cleaning work in progress, natural indoor photo, real commercial cleaning job.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-medical-cleaning',
    title: 'Medical Facility Cleaning',
    prompt: 'Candid photo of a Black woman medical cleaner sanitizing medical equipment in Florida healthcare facility, shot from doorway. Worker in professional medical cleaning uniform with slight moisture from sanitizing solution, focused on cleaning not looking at camera, hair tied back, showing signs of careful sanitizing work. Modern medical facility with palm trees visible through window, bright natural lighting. Authentic medical cleaning work in progress, professional sanitization, real healthcare cleaning job.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-school-cleaning',
    title: 'School Cleaning',
    prompt: 'Natural photo of clean school classroom in Florida after professional cleaning. Modern classroom with pristine clean desks, organized learning materials, palm trees visible through windows, bright natural lighting. Professional educational facility cleaning results, authentic Florida school, natural indoor photo. No people visible.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-retail-cleaning',
    title: 'Retail Store Cleaning',
    prompt: 'Photo of clean retail store interior in Florida after professional cleaning. Modern retail space with clean floors, organized merchandise displays, palm trees visible through storefront windows, bright natural lighting. Professional commercial cleaning results, authentic Florida retail space, natural indoor photo. No people visible.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },

  // SPECIALIZED CLEANING SERVICES
  {
    filename: 'cleaning-green-cleaning',
    title: 'Green/Eco-Friendly Cleaning',
    prompt: 'Candid photo of a Black woman eco-cleaner using green cleaning products in Florida home, shot from side angle. Worker in professional cleaning uniform with eco-friendly cleaning supplies, focused on natural cleaning not looking at camera, hair tied back, slight perspiration from physical work. Residential home with palm trees visible through window, bright natural lighting. Authentic eco-friendly cleaning work in progress, natural cleaning products, real green cleaning job.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-disaster-restoration',
    title: 'Disaster Restoration Cleaning',
    prompt: 'Natural candid photo of a Black male disaster restoration cleaner working on water damage cleanup in Florida home, shot from medium distance. Worker in protective cleaning gear with restoration equipment, focused on cleanup not looking at camera, hair tied back, showing signs of intensive restoration work. Residential home with palm trees visible through window, bright natural lighting. Authentic disaster restoration work in progress, professional restoration equipment, real emergency cleaning job.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-holiday-cleaning',
    title: 'Holiday/Event Cleaning',
    prompt: 'Candid photo of a Black woman event cleaner preparing venue for special event in Florida, shot from side angle. Worker in professional cleaning uniform organizing event cleaning supplies, not looking at camera, hair tied back, slight perspiration from preparation work. Event venue with palm trees visible through large windows, bright natural lighting. Authentic event cleaning preparation, natural indoor photo, real special event cleaning work.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  },
  {
    filename: 'cleaning-regular-maintenance',
    title: 'Regular Maintenance Cleaning',
    prompt: 'Natural photo of well-maintained Florida office building after regular cleaning service. Professional commercial building with clean exterior, organized landscaping, palm trees, bright sunny day. Consistent maintenance cleaning results, authentic Florida commercial property, natural outdoor photo. No people visible.',
    negativePrompt: 'professional photography, stock photo, studio lighting, perfect composition, overly sharp, artificial, staged, posed, looking at camera, clean clothes, shiny skin',
  }
];

async function generateImageWithVertexAI(imageData) {
  try {
    console.log(`\n🎨 Generating: ${imageData.title}`);
    console.log(`   File: ${imageData.filename}.jpg`);
    
    const instance = {
      prompt: imageData.prompt,
      negative_prompt: imageData.negativePrompt,
      seed: Math.floor(Math.random() * 1000000),
      guidance_scale: 7.5,
      num_inference_steps: 50,
      safety_filter_level: 'block_few',
      person_generation: 'allow_adult'
    };
    
    const parameter = {
      type: 'GENERATE_IMAGE',
      generateImage: instance
    };
    
    const request = {
      endpoint: `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/${PUBLISHER}/models/${MODEL}`,
      instances: [helpers.toValue(parameter)],
    };
    
    console.log('   📥 Requesting from Vertex AI...');
    
    const [response] = await client.predict(request);
    const predictions = response.predictions;
    
    if (predictions && predictions[0] && predictions[0].bytesBase64Encoded) {
      const imageBuffer = Buffer.from(predictions[0].bytesBase64Encoded, 'base64');
      const outputPath = path.join(__dirname, '..', 'public', 'cleaning-images', `${imageData.filename}.jpg`);
      fs.writeFileSync(outputPath, imageBuffer);
      
      console.log(`   ✅ Saved!`);
      return { success: true, filename: imageData.filename };
    } else {
      throw new Error('No image data received from Vertex AI');
    }
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { success: false, filename: imageData.filename, error: error.message };
  }
}

async function generateAllCleaningImages() {
  console.log('=' .repeat(70));
  console.log('🚀 GENERATING DIVERSE CLEANING SERVICE IMAGES');
  console.log('=' .repeat(70));
  
  console.log(`\n📸 Total images to generate: ${cleaningServiceImages.length}`);
  console.log('🤖 Generator: Google Vertex AI Imagen');
  console.log('👥 Diversity: Mostly Black people where people are shown');
  console.log('🎯 Quality: Natural, candid, authentic cleaning work photos');
  console.log('=' .repeat(70));
  
  // Create output directory
  const outputDir = path.join(__dirname, '..', 'public', 'cleaning-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`\n📁 Created directory: ${outputDir}\n`);
  }
  
  const results = [];
  
  for (let i = 0; i < cleaningServiceImages.length; i++) {
    const imageData = cleaningServiceImages[i];
    console.log(`\n[${i + 1}/${cleaningServiceImages.length}] Processing: ${imageData.title}`);
    console.log('-'.repeat(70));
    
    const result = await generateImageWithVertexAI(imageData);
    results.push(result);
    
    // Delay between requests to avoid rate limiting
    if (i < cleaningServiceImages.length - 1) {
      console.log('   ⏳ Waiting before next request...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(70));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n✅ Successful: ${successful}/${cleaningServiceImages.length}`);
  console.log(`❌ Failed: ${failed}/${cleaningServiceImages.length}`);
  
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
  console.log('✨ Cleaning service image generation complete!');
  console.log('='.repeat(70) + '\n');
}

generateAllCleaningImages().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
