const { chromium } = require('playwright');

async function addEnvironmentVariable() {
  console.log('🌐 Cloudflare Pages Environment Variable Setup');
  console.log('=' .repeat(50));

  const browser = await chromium.launch({
    headless: false,
    slowMo: 300,
  });

  try {
    const page = await browser.newPage();

    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'your_web3forms_key';
    console.log('\n📋 Your API Key:', web3formsKey);

    console.log('\n🔧 Manual Steps (since I need your login):');
    console.log('1. Go to: https://dash.cloudflare.com/pages');
    console.log('2. Select your project (kds-pressure-washing)');
    console.log('3. Go to Settings → Environment variables');
    console.log('4. Click "Add variable"');
    console.log('   - Name: NEXT_PUBLIC_WEB3FORMS_KEY');
    console.log(`   - Value: ${web3formsKey}`);
    console.log('   - Environment: Production');
    console.log('5. Click Save');
    console.log('6. Go to Deployments tab');
    console.log('7. Click "Retry deployment"');

    console.log('\n⏰ Browser will stay open for you to complete these steps...');
    console.log('🔗 I can navigate to Cloudflare for you if you want...');

    // Keep browser open for 10 minutes
    await page.waitForTimeout(600000);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

addEnvironmentVariable();
