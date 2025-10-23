#!/bin/bash

# Deploy to GitHub Script for Quality Services Now
# This script helps you push your code to GitHub for Cloudflare Pages deployment

echo "🚀 Quality Services Now - GitHub Deployment Script"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Error: Git repository not initialized"
    echo "Run: git init"
    exit 1
fi

# Check if remote exists
if git remote | grep -q origin; then
    echo "✓ Git remote 'origin' already exists"
    REMOTE_URL=$(git remote get-url origin)
    echo "  Remote URL: $REMOTE_URL"
else
    echo "📝 No GitHub remote found. Let's set one up!"
    echo ""
    echo "Please enter your GitHub repository URL:"
    echo "Example: https://github.com/username/quality-services-now.git"
    read -p "Repository URL: " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ No URL provided. Exiting."
        exit 1
    fi
    
    git remote add origin "$REPO_URL"
    echo "✓ Added remote: $REPO_URL"
fi

echo ""
echo "📦 Checking for uncommitted changes..."

# Check if there are changes to commit
if [[ -n $(git status -s) ]]; then
    echo "✓ Found changes to commit"
    git add .
    
    echo ""
    read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
    
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="Update website"
    fi
    
    git commit -m "$COMMIT_MSG"
    echo "✓ Changes committed: $COMMIT_MSG"
else
    echo "✓ No new changes to commit"
fi

echo ""
echo "🚢 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 Next Steps - Deploy to Cloudflare Pages:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Go to: https://dash.cloudflare.com/pages"
    echo "2. Click 'Create a project' → 'Connect to Git'"
    echo "3. Select your repository"
    echo "4. Use these settings:"
    echo "   - Framework: Next.js (Static HTML Export)"
    echo "   - Build command: npm run build"
    echo "   - Build output: out"
    echo "5. Click 'Save and Deploy'"
    echo ""
    echo "📖 Full guide: docs/deployment/CLOUDFLARE_DEPLOYMENT.md"
    echo ""
    echo "Your site will be live in ~3 minutes! 🚀"
    echo ""
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo "Please check your internet connection and repository permissions"
    exit 1
fi

