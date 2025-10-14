/**
 * Generate ONLY the Concrete Cleaning image using Google Gemini API with Imagen
 * 
 * Quick regeneration script for the concrete cleaning service image
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

// Google API Key - Get from: https://makersuite.google.com/app/apikey
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';

const concreteCleaningImage = {
  filename: 'service-concrete-cleaning',
  title: 'Concrete Cleaning',
  prompt: 'Natural candid smartphone photo of a Black woman actively power washing a concrete driveway in Florida, shot from medium distance showing both worker and driveway. Worker in slightly damp work clothes and t-shirt, hair tied back, sweaty from outdoor work, focused on pressure washing not looking at camera, holding professional pressure washer wand with visible water spray. Driveway is HALF CLEANED - left side still dirty with dark stains and grime, right side already cleaned showing light gray concrete, clear dramatic contrast between dirty and clean halves. Single-story house in background, palm trees, bright sunny day. Worker showing signs of real work - perspiration visible, clothes damp from water spray. Authentic work in progress photo, smartphone camera quality, natural outdoor lighting. Real person doing real work, dramatic before/after visible in same shot.',
};

async function generateImage() {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🚀 GENERATING CONCRETE CLEANING IMAGE');
    console.log('='.repeat(70));
    
    if (!GOOGLE_API_KEY) {
      console.error('\n❌ ERROR: GOOGLE_API_KEY not set!');
      console.log('\n📝 To fix this:');
      console.log('   1. Get API key: https://makersuite.google.com/app/apikey');
      console.log('   2. Create .env file in project root');
      console.log('   3. Add: GOOGLE_API_KEY=your-key-here');
      console.log('   4. Run: node scripts/generate-concrete-cleaning-only.js\n');
      process.exit(1);
    }
    
    console.log(`\n🎨 Generating: ${concreteCleaningImage.title}`);
    console.log(`   File: ${concreteCleaningImage.filename}.jpg`);
    console.log('   📥 Requesting from Gemini API...\n');
    
    // Using Imagen 3 via Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GOOGLE_API_KEY}`,
      {
        instances: [{
          prompt: concreteCleaningImage.prompt
        }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '3:2',
          safetyFilterLevel: 'block_few',
          personGeneration: 'allow_adult',
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
      
      const outputPath = path.join(__dirname, '..', 'public', 'service-images', `${concreteCleaningImage.filename}.jpg`);
      fs.writeFileSync(outputPath, imageBuffer);
      
      console.log('   ✅ Successfully saved!');
      console.log(`   📁 Location: public/service-images/${concreteCleaningImage.filename}.jpg`);
      console.log('\n' + '='.repeat(70));
      console.log('✨ Done! Image generated successfully!');
      console.log('='.repeat(70) + '\n');
    } else {
      throw new Error('No image data in response');
    }
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.response?.data?.error?.message || error.message}`);
    console.log('\n' + '='.repeat(70));
    process.exit(1);
  }
}

generateImage();

