const axios = require('axios');

async function setupCloudflare() {
  const API_TOKENS = [
    { key: 'CLOUDFLARE_ACCOUNT_TOKEN_REMOVED', name: 'Account Token' },
    { key: 'CLOUDFLARE_ORIGINAL_TOKEN_REMOVED', name: 'Original Token' }
  ];
  const API_BASE = 'https://api.cloudflare.com/client/v4';

  console.log('🔧 Setting up Cloudflare Pages - Testing multiple tokens...\n');

  for (const token of API_TOKENS) {
    console.log(`\n🔑 Trying ${token.name}: ${token.key.substring(0, 10)}...${token.key.substring(token.key.length - 4)}`);
    
    try {
      // Test basic API access
      const userResponse = await axios.get(`${API_BASE}/user`, {
        headers: {
          'Authorization': `Bearer ${token.key}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ Token valid! User: ${userResponse.data.result.email}`);

      // Get accounts
      const accountsResponse = await axios.get(`${API_BASE}/accounts`, {
        headers: {
          'Authorization': `Bearer ${token.key}`,
          'Content-Type': 'application/json'
        }
      });

      if (accountsResponse.data.result.length === 0) {
        console.log('❌ No accounts found with this token');
        continue;
      }

      const account = accountsResponse.data.result[0];
      console.log(`✅ Found account: ${account.name} (${account.id})`);

      // Try to get Pages projects
      const projectsResponse = await axios.get(`${API_BASE}/accounts/${account.id}/pages/projects`, {
        headers: {
          'Authorization': `Bearer ${token.key}`,
          'Content-Type': 'application/json'
        }
      });

      if (projectsResponse.data.result.length === 0) {
        console.log('❌ No Pages projects found');
        continue;
      }

      console.log(`✅ Found ${projectsResponse.data.result.length} Pages project(s):`);
      projectsResponse.data.result.forEach(p => {
        console.log(`   - ${p.name}`);
      });

      // Find or use first project
      let project = projectsResponse.data.result.find(p => p.name === 'kds-pressure-washing') || projectsResponse.data.result[0];
      console.log(`\n🎯 Using project: ${project.name}`);

      // Try to set environment variable
      console.log('🔑 Adding Web3Forms API key as environment variable...');

      // First, try with PATCH to update project settings
      try {
        const envVarResponse = await axios.patch(
          `${API_BASE}/accounts/${account.id}/pages/projects/${project.name}`,
          {
            deployment_configs: {
              production: {
                env_vars: {
                  NEXT_PUBLIC_WEB3FORMS_KEY: {
                    type: 'plain_text',
                    value: 'WEB3FORMS_KEY_REMOVED'
                  }
                }
              }
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${token.key}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (envVarResponse.data.success) {
          console.log('\n✅ ✅ ✅ SUCCESS! Environment variable added! ✅ ✅ ✅');
          console.log('🚀 Your contact form should now work!');
          console.log('\n📧 Test it by:');
          console.log('   1. Going to your live site');
          console.log('   2. Filling out the contact form');
          console.log('   3. Checking EMAIL_REMOVED for the email');
          return;
        }
      } catch (envError) {
        console.log('⚠️  PATCH method failed, trying alternate approach...');
        console.log(`   Error: ${envError.response?.data?.errors?.[0]?.message || envError.message}`);
      }

      // If PATCH failed, provide manual instructions
      console.log('\n📋 MANUAL SETUP REQUIRED:');
      console.log(`1. Go to: https://dash.cloudflare.com/${account.id}/pages/view/${project.name}/settings/environment-variables`);
      console.log('2. Click "Add variable"');
      console.log('   Name: NEXT_PUBLIC_WEB3FORMS_KEY');
      console.log('   Value: WEB3FORMS_KEY_REMOVED');
      console.log('   Environment: Production');
      console.log('3. Click Save');
      console.log('4. Redeploy your site');
      return;

    } catch (error) {
      if (error.response?.status === 401) {
        console.log(`❌ Invalid token`);
      } else if (error.response?.status === 403) {
        console.log(`❌ Token doesn't have required permissions`);
        console.log(`   Error: ${error.response?.data?.errors?.[0]?.message || 'Unknown'}`);
      } else {
        console.log(`❌ Error: ${error.response?.data?.errors?.[0]?.message || error.message}`);
      }
    }
  }

  console.log('\n\n⚠️  COULD NOT COMPLETE AUTOMATED SETUP');
  console.log('📋 Please add the environment variable manually:');
  console.log('   https://dash.cloudflare.com/pages → Your Project → Settings → Environment variables');
  console.log('   Name: NEXT_PUBLIC_WEB3FORMS_KEY');
  console.log('   Value: WEB3FORMS_KEY_REMOVED');
}

setupCloudflare();
