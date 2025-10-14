const axios = require('axios');

async function troubleshootCloudflare() {
  const API_KEY = 'CLOUDFLARE_KEY_REMOVED'; // User's global API key
  const API_BASE = 'https://api.cloudflare.com/client/v4';

  console.log('🔍 Troubleshooting Cloudflare API access...\n');
  console.log(`🔑 Using API key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 4)}\n`);

  try {
    // Test basic API access
    const userResponse = await axios.get(`${API_BASE}/user`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ API key is valid!');
    console.log(`👤 User: ${userResponse.data.result.email}`);

    // Check accounts
    const accountsResponse = await axios.get(`${API_BASE}/accounts`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`📋 Found ${accountsResponse.data.result.length} account(s):`);
    accountsResponse.data.result.forEach(account => {
      console.log(`   - ${account.name} (${account.id})`);
    });

    // Check Pages projects for each account
    for (const account of accountsResponse.data.result) {
      console.log(`\n🔍 Checking Pages projects for account: ${account.name}`);
      try {
        const projectsResponse = await axios.get(`${API_BASE}/accounts/${account.id}/pages/projects`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        if (projectsResponse.data.result.length > 0) {
          console.log(`📄 Found ${projectsResponse.data.result.length} project(s):`);
          projectsResponse.data.result.forEach(project => {
            console.log(`   - ${project.name} (${project.id})`);
          });
        } else {
          console.log('   No Pages projects found');
        }
      } catch (error) {
        console.log(`   ❌ Cannot access Pages projects: ${error.response?.data?.errors?.[0]?.message || error.message}`);
      }
    }

  } catch (error) {
    if (error.response?.status === 401) {
      console.log('❌ Invalid API key - please check if it\'s correct');
    } else if (error.response?.status === 403) {
      console.log('❌ API key doesn\'t have required permissions');
      console.log('   You need "Pages:Edit" permission for your API token');
    } else {
      console.log('❌ Error:', error.response?.data?.errors || error.message);
    }
    console.log(`🔑 API key used: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 4)}`);
  }
}

troubleshootCloudflare();
