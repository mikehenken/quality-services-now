const axios = require('axios');

async function setupCloudflare() {
  const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
  const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
  const GLOBAL_API_KEY = process.env.CLOUDFLARE_GLOBAL_API_KEY || '';
  const EMAIL = process.env.CLOUDFLARE_EMAIL || '';

  // Try different authentication approaches
  const AUTH_METHODS = [
    // API Token with Bearer auth
    {
      type: 'API_TOKEN_BEARER',
      token: API_TOKEN,
      auth: `Bearer ${API_TOKEN}`
    },
    // Global API Key with Basic auth (email:key format)
    {
      type: 'GLOBAL_API_KEY',
      email: EMAIL,
      key: GLOBAL_API_KEY,
      auth: 'Basic ' + Buffer.from(`${EMAIL}:${GLOBAL_API_KEY}`).toString('base64')
    },
    // Try X-Auth-Key header format for Global API Key
    {
      type: 'GLOBAL_API_KEY_XAUTH',
      email: EMAIL,
      key: GLOBAL_API_KEY,
      auth: `Bearer ${API_TOKEN}`, // Use API token as fallback
      headers: {
        'X-Auth-Key': GLOBAL_API_KEY,
        'X-Auth-Email': EMAIL
      }
    }
  ];

  const API_BASE = 'https://api.cloudflare.com/client/v4';

  console.log('🔧 Setting up Cloudflare Pages with your authentication...\n');
  console.log(`📁 Using Account ID: ${ACCOUNT_ID}\n`);

  for (const method of AUTH_METHODS) {
    const displayKey = method.token || method.key;
    console.log(`🔑 Trying ${method.type}: ${displayKey.substring(0, 10)}...${displayKey.substring(displayKey.length - 4)}\n`);

    try {
      // Use the known account ID from your Pages dashboard
      console.log(`📋 Using Account ID: ${ACCOUNT_ID}`);

      const headers = {
        'Content-Type': 'application/json',
        ...method.headers
      };

      if (method.auth) {
        headers['Authorization'] = method.auth;
      }

      // List Pages projects
      console.log('\n📄 Finding your Pages projects...');
      const projectsResponse = await axios.get(`${API_BASE}/accounts/${ACCOUNT_ID}/pages/projects`, {
        headers
      });

      if (projectsResponse.data.result.length === 0) {
        console.log(`❌ No Pages projects found with ${method.type}`);
        continue;
      }

      // Find the kds-pressure-washing project or use the first one
      let project = projectsResponse.data.result.find(p => p.name === 'kds-pressure-washing') || projectsResponse.data.result[0];

      console.log(`✅ Found project: ${project.name} (${project.id})`);

      // Add environment variable
      console.log('\n🔑 Adding Web3Forms API key as environment variable...');

      const envVarResponse = await axios.post(
        `${API_BASE}/accounts/${ACCOUNT_ID}/pages/projects/${project.id}/deployments/${project.latest_deployment?.id || 'production'}/env-vars`,
        {
          key: 'NEXT_PUBLIC_WEB3FORMS_KEY',
          value: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
          type: 'plain_text'
        },
        {
          headers
        }
      );

      if (envVarResponse.data.success) {
        console.log('\n🎉 SUCCESS! Environment variable added!');
        console.log('🚀 Your contact form should now work!');
        console.log('\n📧 Test it by:');
        console.log('   1. Going to your live site');
        console.log('   2. Filling out the contact form');
        console.log(`   3. Checking ${process.env.CONTACT_EMAIL || 'your email'} for the email`);

        // Show which method worked
        console.log(`\n✅ Used authentication method: ${method.type}`);
        return;
      } else {
        console.log('❌ Failed to add environment variable:', envVarResponse.data.errors);
      }

    } catch (error) {
      if (error.response?.status === 401) {
        console.log(`❌ Invalid ${method.type}. Trying next method...`);
      } else if (error.response?.status === 403) {
        console.log(`❌ ${method.type} doesn\'t have permission to manage Pages projects.`);
        console.log(`   Error: ${error.response?.data?.errors?.[0]?.message || 'Unknown'}`);
      } else {
        console.log(`❌ Error with ${method.type}:`, error.response?.data?.errors || error.message);
      }
    }
  }

  console.log('\n❌ Could not complete setup with either authentication method.');
  console.log('\n📋 Please add the environment variable manually:');
  console.log('   https://dash.cloudflare.com/pages → Your Project → Settings → Environment variables');
  console.log('   Name: NEXT_PUBLIC_WEB3FORMS_KEY');
  console.log(`   Value: ${process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'your_web3forms_key'}`);
}

setupCloudflare();
