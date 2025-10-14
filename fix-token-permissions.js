const axios = require('axios');

async function fixTokenPermissions() {
  const GLOBAL_TOKEN = process.env.CLOUDFLARE_GLOBAL_TOKEN || '';
  const API_BASE = 'https://api.cloudflare.com/client/v4';

  console.log('🔧 Attempting to create a new API token with Pages permissions...\n');

  try {
    // First, verify the global token works
    const userResponse = await axios.get(`${API_BASE}/user/tokens/verify`, {
      headers: {
        'Authorization': `Bearer ${GLOBAL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Global token verified!');

    // Get accounts that this token can access
    const accountsResponse = await axios.get(`${API_BASE}/accounts`, {
      headers: {
        'Authorization': `Bearer ${GLOBAL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (accountsResponse.data.result.length === 0) {
      console.log('❌ No accounts accessible with this token');
      console.log('🔑 You may need to add Account:Read permission to this token');
      return;
    }

    const account = accountsResponse.data.result[0];
    console.log(`✅ Found account: ${account.name} (${account.id})`);

    // Try to create a new token with Pages permissions
    console.log('\n🔑 Creating new API token with Pages:Edit permissions...');

    const newTokenResponse = await axios.post(`${API_BASE}/user/tokens`, {
      name: "KD's Pressure Washing - Pages Token",
      policies: [
        {
          kind: "pages#pages",
          effect: "allow",
          resources: {
            [`com.cloudflare.api.account.${account.id}`]: "*"
          }
        }
      ],
      not_before: new Date().toISOString(),
      expires_on: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
    }, {
      headers: {
        'Authorization': `Bearer ${GLOBAL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (newTokenResponse.data.result) {
      const newToken = newTokenResponse.data.result.value;
      console.log('\n🎉 SUCCESS! New API token created:');
      console.log(`🔑 ${newToken.substring(0, 15)}...${newToken.substring(newToken.length - 8)}`);

      console.log('\n📋 Use this new token in the setup script:');
      console.log('   node cloudflare-setup.js');
      console.log('\n✨ This new token has Pages:Edit permissions for your account!');
    } else {
      console.log('❌ Failed to create token:', newTokenResponse.data.errors);
    }

  } catch (error) {
    if (error.response?.status === 403) {
      console.log('❌ Global token doesn\'t have permission to create tokens');
      console.log('   Error:', error.response?.data?.errors?.[0]?.message);

      console.log('\n📋 MANUAL SOLUTION:');
      console.log('1. Go to: https://dash.cloudflare.com/profile/api-tokens');
      console.log('2. Click "Create Token"');
      console.log('3. Use "Edit Cloudflare Workers" template');
      console.log('4. Add Pages:Edit permission');
      console.log('5. Select your account in resources');
      console.log('6. Create and use the new token');
    } else {
      console.log('❌ Error:', error.response?.data?.errors || error.message);
    }
    console.log(`🔑 Token used: ${GLOBAL_TOKEN.substring(0, 10)}...${GLOBAL_TOKEN.substring(GLOBAL_TOKEN.length - 4)}`);
  }
}

fixTokenPermissions();
