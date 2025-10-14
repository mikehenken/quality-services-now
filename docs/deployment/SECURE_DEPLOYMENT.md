# Secure Deployment Guide

This guide covers the secure deployment process that includes API key leak detection before pushing to GitHub and deploying to Cloudflare Pages.

## Quick Start

```bash
./deploy.sh
```

That's it! The script handles everything automatically with built-in security checks.

## What the Deploy Script Does

The `deploy.sh` script performs the following steps in order:

1. **Security Scan** - Checks for hardcoded API keys and secrets
2. **GitIgnore Verification** - Ensures .env files are ignored
3. **Git Commit** - Stages and commits your changes
4. **Push to GitHub** - Pushes to main branch
5. **Cloudflare Auto-Deploy** - Triggers automatic Cloudflare Pages deployment

## Security Features

### API Key Detection

The script scans your codebase for common secret patterns including:

- API keys (`api_key`, `apikey`)
- Secret keys (`secret_key`, `secretkey`)
- Access tokens (`access_token`, `accesstoken`)
- Auth tokens (`auth_token`, `authtoken`)
- Passwords
- Private keys
- AWS Access Keys (AKIA...)
- Stripe Keys (sk_live_, sk_test_)
- Google API Keys (AIzaSy...)
- GitHub Tokens (ghp_, gho_)

### Files Excluded from Scanning

The following are automatically excluded from security scans:
- `node_modules/`
- `.git/`
- `.next/`
- `out/`
- `build/`
- `coverage/`
- `dist/`
- Lock files (`package-lock.json`, `yarn.lock`)
- Image files (`.svg`, `.png`, `.jpg`, etc.)
- Font files

### .env File Protection

The script ensures:
- `.env` files are in `.gitignore`
- No `.env` files are staged for commit
- Automatic addition to `.gitignore` if missing

## Usage Examples

### Basic Deployment

```bash
./deploy.sh
```

The script will:
- Prompt for a commit message (or use a timestamp)
- Run all security checks
- Push to GitHub
- Trigger Cloudflare deployment

### Custom Commit Message

When prompted, enter your commit message:

```
Enter commit message (or press Enter for default): Add new contact form
```

### If Security Check Fails

If the script detects potential secrets:

```
❌ SECURITY CHECK FAILED

Potential API keys or secrets detected in your code!

Please:
1. Move all secrets to .env files
2. Ensure .env files are in .gitignore
3. Use environment variables in your code
4. Review the findings above and remove any hardcoded secrets
```

**What to do:**

1. Review the detected secrets
2. Move them to `.env` files
3. Update your code to use `process.env.VARIABLE_NAME`
4. Ensure `.env` is in `.gitignore`
5. Run the deploy script again

### Handling False Positives

If the security scan detects code that looks like a secret but isn't (false positive), you have two options:

**Option 1: Bypass the check (not recommended)**
```bash
git push origin main
```

**Option 2: Update the exclusion list (recommended)**
Edit `deploy.sh` and add the file to `EXCLUDE_FILES` or modify the pattern detection.

## Environment Variables Setup

### For Local Development

Create a `.env` file in the project root:

```bash
# .env (NEVER commit this file)
GOOGLE_API_KEY=your_actual_key_here
NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
```

### For Cloudflare Pages

1. Go to Cloudflare Pages dashboard
2. Select your project
3. Go to Settings → Environment variables
4. Add your environment variables:
   - `GOOGLE_API_KEY` = your_actual_key
   - etc.

## Cloudflare Pages Configuration

### Initial Setup

If not already connected:

1. Go to https://dash.cloudflare.com/pages
2. Click "Create a project" → "Connect to Git"
3. Select your GitHub repository
4. Configure build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`

### Automatic Deployments

Once connected, every push to `main` branch automatically:
1. Triggers a new build on Cloudflare
2. Deploys to your production URL
3. Updates in ~2-3 minutes

### Build Settings

The script assumes Next.js static export configuration. Ensure your `next.config.mjs` includes:

```javascript
const nextConfig = {
  output: 'export',
  // ... other config
};
```

## Troubleshooting

### Push Rejected

```
❌ Failed to push to GitHub
```

**Possible solutions:**

```bash
# Pull latest changes first
git pull origin main --rebase

# Then try deploying again
./deploy.sh
```

### No Remote Configured

The script will prompt you to enter your GitHub repository URL:

```
Please enter your GitHub repository URL:
Example: https://github.com/username/repo.git
Repository URL: 
```

Enter your repository URL and the script will configure it automatically.

### Permission Denied

If you see permission errors:

```bash
# Make sure the script is executable
chmod +x deploy.sh
```

### Cloudflare Build Fails

Check Cloudflare Pages dashboard for build logs:
1. Go to https://dash.cloudflare.com/pages
2. Select your project
3. Click on the failed deployment
4. Review build logs

Common issues:
- Missing environment variables
- Build command errors
- Wrong output directory

## Best Practices

1. **Always use environment variables for secrets**
   ```javascript
   // ✅ Good
   const apiKey = process.env.GOOGLE_API_KEY;
   
   // ❌ Bad
   const apiKey = "AIzaSy...actual-key-here";
   ```

2. **Keep .env files local and never commit them**
   ```bash
   # .gitignore should include:
   .env
   .env.local
   .env*.local
   ```

3. **Use descriptive commit messages**
   ```bash
   # ✅ Good
   Add contact form with validation
   
   # ❌ Bad
   Update
   ```

4. **Test locally before deploying**
   ```bash
   npm run dev  # Test locally
   npm run build  # Verify build works
   ./deploy.sh  # Deploy
   ```

5. **Review changes before committing**
   ```bash
   git status  # See what's changed
   git diff    # Review exact changes
   ```

## Security Checklist

Before every deployment, ensure:

- [ ] No API keys in code
- [ ] All secrets in .env files
- [ ] .env files in .gitignore
- [ ] Environment variables set in Cloudflare
- [ ] No sensitive data in commit history
- [ ] Code review completed (if team project)

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Environment Variables in Next.js](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

## Script Location

- Main script: `/deploy.sh`
- Fallback (basic): `/deploy-to-github.sh`

