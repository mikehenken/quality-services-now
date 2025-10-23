/**
 * Generate Hero Background Image using Google Gemini API with Imagen
 * 
 * Creates a cleaning company hero background with 3 women in professional cleaning pose
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

// Hero background image specification
const heroImage = {
  filename: 'hero-cleaning-team',
  title: 'Cleaning Company Hero Background',
  prompt: 'Professional team photo of 3 female cleaning professionals in confident, professional pose. Three women standing side by side facing forward, confident and professional stance. Left side: Black woman in her 30s, wearing clean white work uniform with company logo, holding professional microfiber mop and bucket. Center: Hispanic woman in her 20s, wearing work uniform, holding spray bottles and cleaning cloths. Right side: White woman in her 30s, wearing work uniform, holding vacuum cleaner and dusting tools. All three women looking directly at camera with confident, professional expressions. Background shows clean modern rental property or AirBnB interior with bright lighting. High-quality professional photography, clean composition, team ready for work. All workers appear professional, clean, and confident. Wide shot showing full team and cleaning equipment including mops, buckets, spray bottles, vacuum, and cleaning supplies.',
};

/**
 * Generate image using Google's Gemini API with Imagen 3
 */
async function generateHeroImage() {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🚀 GENERATING CLEANING COMPANY HERO BACKGROUND');
    console.log('='.repeat(70));
    
    if (!GOOGLE_API_KEY) {
      console.error('\n❌ ERROR: GOOGLE_API_KEY not set!');
      console.log('\n📝 To fix this:');
      console.log('   1. Get API key: https://makersuite.google.com/app/apikey');
      console.log('   2. Create .env file in project root');
      console.log('   3. Add: GOOGLE_API_KEY=your-key-here');
      console.log('   4. Run: node scripts/generate-hero-background.js\n');
      process.exit(1);
    }
    
    console.log(`\n🎨 Generating: ${heroImage.title}`);
    console.log(`   File: ${heroImage.filename}.jpg`);
    console.log('   📥 Requesting from Gemini API...\n');
    
    // Using Gemini 2.5 Flash Image via Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a high-quality professional photograph: ${heroImage.prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 1,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 120000
      }
    );
    
    if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
      const content = response.data.candidates[0].content;
      
      // Look for image data in the response
      let imageData = null;
      if (content.parts) {
        for (const part of content.parts) {
          if (part.inline_data && part.inline_data.data) {
            imageData = part.inline_data.data;
            break;
          }
        }
      }
      
      if (imageData) {
        // Create output directory
        const outputDir = path.join(__dirname, '..', 'public', 'images');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
          console.log(`\n📁 Created directory: ${outputDir}`);
        }
        
        // Save the image
        const outputPath = path.join(outputDir, `${heroImage.filename}.jpg`);
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(outputPath, buffer);
        
        console.log('\n✅ ✅ ✅ SUCCESS! Hero background generated! ✅ ✅ ✅');
        console.log(`📁 Saved to: ${outputPath}`);
        console.log('\n🎯 Perfect for:');
        console.log('   - Hero section background');
        console.log('   - Homepage banner');
        console.log('   - Team showcase');
        console.log('\n📐 Dimensions: High resolution (wide format)');
        console.log('👥 Features: 3-woman team in professional pose');
        console.log('🧽 Equipment: Cleaning supplies and tools');
      } else {
        console.error('\n❌ No image data found in API response');
        console.log('Response structure:', JSON.stringify(response.data, null, 2));
      }
      
    } else {
      console.error('\n❌ No valid response from API');
      console.log('Response:', JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.error('\n❌ Error generating hero image:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.log('\n💡 Possible issues:');
      console.log('   - API key not valid');
      console.log('   - Prompt blocked by safety filters');
      console.log('   - Invalid request format');
    } else if (error.response?.status === 429) {
      console.log('\n⏳ Rate limit exceeded. Please wait a few minutes and try again.');
    }
  }
}

/**
 * Alternative: Use Pollinations.ai (free, no API key required)
 */
async function generateHeroImageWithPollinations() {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🚀 GENERATING CLEANING COMPANY HERO BACKGROUND (Pollinations.ai)');
    console.log('='.repeat(70));
    
    console.log(`\n🎨 Generating: ${heroImage.title}`);
    console.log(`   File: ${heroImage.filename}.jpg`);
    
    const encodedPrompt = encodeURIComponent(heroImage.prompt);
    
    // Using same settings as working script but with higher resolution for hero
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1920&height=1080&nologo=true&model=flux&enhance=false`;
    
    console.log('   📥 Downloading...');
    
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 120000
    });
    
    // Create output directory
    const outputDir = path.join(__dirname, '..', 'public', 'images');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`\n📁 Created directory: ${outputDir}`);
    }
    
    const outputPath = path.join(outputDir, `${heroImage.filename}.jpg`);
    fs.writeFileSync(outputPath, response.data);
    
    console.log('\n✅ ✅ ✅ SUCCESS! Hero background generated! ✅ ✅ ✅');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log('\n🎯 Perfect for:');
    console.log('   - Hero section background');
    console.log('   - Homepage banner');
    console.log('   - Team showcase');
    console.log('\n📐 Dimensions: 1920x1080 (Full HD)');
    console.log('👥 Features: 3-woman team in professional pose');
    console.log('🧽 Equipment: Cleaning supplies and tools');
    
  } catch (error) {
    console.error('\n❌ Error generating hero image:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🎨 CLEANING COMPANY HERO BACKGROUND GENERATOR');
  console.log('='.repeat(70));
  
  // Force use of Pollinations.ai due to Gemini API rate limits
  console.log('\n🎨 Using Pollinations.ai (free, no rate limits)');
  console.log('   Note: Gemini API has rate limits, using alternative service');
  await generateHeroImageWithPollinations();
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
