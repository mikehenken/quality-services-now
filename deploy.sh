#!/bin/bash

# Secure Deploy Script for Cloudflare Pages
# Checks for API key leaks before pushing to GitHub

set -e  # Exit on error

echo "🔒 Secure Cloudflare Deployment Script"
echo "======================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check for secrets
check_for_secrets() {
    echo "🔍 Scanning for potential API keys and secrets..."
    echo ""
    
    LEAKED_SECRETS=false
    
    # Patterns to check for common secrets
    declare -a PATTERNS=(
        "(?i)(api[_-]?key|apikey)[\s]*[:=][\s]*['\"]?[a-zA-Z0-9_\-]{20,}['\"]?"
        "(?i)(secret[_-]?key|secretkey)[\s]*[:=][\s]*['\"]?[a-zA-Z0-9_\-]{20,}['\"]?"
        "(?i)(access[_-]?token|accesstoken)[\s]*[:=][\s]*['\"]?[a-zA-Z0-9_\-]{20,}['\"]?"
        "(?i)(auth[_-]?token|authtoken)[\s]*[:=][\s]*['\"]?[a-zA-Z0-9_\-]{20,}['\"]?"
        "(?i)(password)[\s]*[:=][\s]*['\"]?[a-zA-Z0-9_\-]{8,}['\"]?"
        "(?i)(private[_-]?key|privatekey)[\s]*[:=][\s]*['\"]?[a-zA-Z0-9_\-]{20,}['\"]?"
        "AKIA[0-9A-Z]{16}"  # AWS Access Key
        "sk_live_[0-9a-zA-Z]{24,}"  # Stripe Live Key
        "sk_test_[0-9a-zA-Z]{24,}"  # Stripe Test Key
        "AIzaSy[0-9a-zA-Z_\-]{33}"  # Google API Key
        "ya29\.[0-9A-Za-z\-_]+"  # Google OAuth
        "ghp_[0-9a-zA-Z]{36}"  # GitHub Personal Access Token
        "gho_[0-9a-zA-Z]{36}"  # GitHub OAuth Token
    )
    
    # Files and directories to exclude from scanning
    EXCLUDE_DIRS="node_modules|\.git|\.next|out|build|coverage|dist"
    EXCLUDE_FILES="package-lock\.json|yarn\.lock|\.svg|\.png|\.jpg|\.jpeg|\.gif|\.ico|\.woff|\.woff2|\.ttf|\.eot"
    
    # Scan files for secret patterns
    for pattern in "${PATTERNS[@]}"; do
        # Use grep with Perl regex to search
        if grep -rniP --exclude-dir={node_modules,.git,.next,out,build,coverage,dist} \
                     --exclude="package-lock.json" \
                     --exclude="yarn.lock" \
                     --exclude="*.svg" \
                     --exclude="*.png" \
                     --exclude="*.jpg" \
                     --exclude="*.jpeg" \
                     --exclude="*.gif" \
                     --exclude="*.ico" \
                     --exclude="*.woff*" \
                     --exclude="*.ttf" \
                     --exclude="*.eot" \
                     --exclude="deploy.sh" \
                     "$pattern" . 2>/dev/null; then
            LEAKED_SECRETS=true
        fi
    done
    
    echo ""
    
    # Check for .env files that shouldn't be committed
    echo "🔍 Checking for .env files..."
    if git ls-files | grep -E "^\.env$|^\.env\.local$|^\.env\.production$"; then
        echo -e "${RED}❌ ERROR: .env files found in git staging!${NC}"
        echo "The following .env files are staged for commit:"
        git ls-files | grep -E "^\.env"
        LEAKED_SECRETS=true
    else
        echo -e "${GREEN}✓ No .env files in git staging${NC}"
    fi
    
    echo ""
    
    # Check staged files specifically
    if git diff --cached --name-only | grep -qE "\.env"; then
        echo -e "${RED}❌ ERROR: .env file is staged for commit!${NC}"
        LEAKED_SECRETS=true
    fi
    
    if [ "$LEAKED_SECRETS" = true ]; then
        echo ""
        echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${RED}❌ SECURITY CHECK FAILED${NC}"
        echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo "Potential API keys or secrets detected in your code!"
        echo ""
        echo "Please:"
        echo "1. Move all secrets to .env files"
        echo "2. Ensure .env files are in .gitignore"
        echo "3. Use environment variables in your code"
        echo "4. Review the findings above and remove any hardcoded secrets"
        echo ""
        echo "If these are false positives, you can:"
        echo "- Add them to the exclude list in this script"
        echo "- Or use: git push (to bypass this check)"
        echo ""
        return 1
    else
        echo -e "${GREEN}✅ No secrets detected - safe to proceed${NC}"
        echo ""
        return 0
    fi
}

# Function to verify .gitignore
verify_gitignore() {
    echo "🔍 Verifying .gitignore configuration..."
    
    if [ ! -f .gitignore ]; then
        echo -e "${YELLOW}⚠️  Warning: No .gitignore file found${NC}"
        return 0
    fi
    
    # Check if .env is in .gitignore
    if ! grep -q "^\.env$" .gitignore && ! grep -q "^\.env\*" .gitignore; then
        echo -e "${YELLOW}⚠️  Warning: .env not found in .gitignore${NC}"
        echo "Adding .env to .gitignore..."
        echo ".env" >> .gitignore
    fi
    
    echo -e "${GREEN}✓ .gitignore configuration verified${NC}"
    echo ""
}

# Main deployment process
main() {
    # Verify .gitignore first
    verify_gitignore
    
    # Run security checks
    if ! check_for_secrets; then
        exit 1
    fi
    
    # Check if git is initialized
    if [ ! -d .git ]; then
        echo -e "${RED}❌ Error: Git repository not initialized${NC}"
        echo "Run: git init"
        exit 1
    fi
    
    # Check if remote exists
    if ! git remote | grep -q origin; then
        echo -e "${YELLOW}⚠️  No git remote 'origin' found${NC}"
        echo "Please enter your GitHub repository URL:"
        echo "Example: https://github.com/username/repo.git"
        read -p "Repository URL: " REPO_URL
        
        if [ -z "$REPO_URL" ]; then
            echo -e "${RED}❌ No URL provided. Exiting.${NC}"
            exit 1
        fi
        
        git remote add origin "$REPO_URL"
        echo -e "${GREEN}✓ Added remote: $REPO_URL${NC}"
        echo ""
    fi
    
    # Show current status
    echo "📊 Git Status:"
    git status -s
    echo ""
    
    # Check if there are changes to commit
    if [[ -n $(git status -s) ]]; then
        echo "📦 Preparing to commit changes..."
        git add .
        
        # Show what's being committed
        echo ""
        echo "Files to be committed:"
        git diff --cached --name-only | sed 's/^/  - /'
        echo ""
        
        read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
        
        if [ -z "$COMMIT_MSG" ]; then
            COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        
        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✓ Changes committed: $COMMIT_MSG${NC}"
        echo ""
    else
        echo -e "${GREEN}✓ No new changes to commit${NC}"
        echo ""
    fi
    
    # Push to GitHub
    echo "🚢 Pushing to GitHub main branch..."
    echo ""
    
    if git push -u origin main; then
        echo ""
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}✅ Successfully deployed to GitHub!${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        
        # Check if Cloudflare Pages is set up
        echo "🌐 Cloudflare Pages Deployment:"
        echo ""
        echo "If you have Cloudflare Pages connected to this repository,"
        echo "your site will automatically deploy in ~2-3 minutes."
        echo ""
        echo "If not yet set up, visit:"
        echo "  https://dash.cloudflare.com/pages"
        echo ""
        echo "Build settings for Next.js:"
        echo "  - Framework: Next.js (Static HTML Export)"
        echo "  - Build command: npm run build"
        echo "  - Build output: out"
        echo ""
        echo "Your commit: $COMMIT_MSG"
        echo ""
    else
        echo ""
        echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${RED}❌ Failed to push to GitHub${NC}"
        echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo "Possible issues:"
        echo "  - No internet connection"
        echo "  - Repository permissions"
        echo "  - Branch protection rules"
        echo "  - Need to pull remote changes first"
        echo ""
        echo "Try: git pull origin main --rebase"
        echo ""
        exit 1
    fi
}

# Run main function
main

