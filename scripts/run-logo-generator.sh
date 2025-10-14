#!/bin/bash
# Quick run script with project already configured

set -e

# Your Google Cloud Project
export GOOGLE_CLOUD_PROJECT="api-project-600875470759"

echo "=============================================="
echo "KD'S Pressure Washing - Logo Generator"
echo "=============================================="
echo "Project: $GOOGLE_CLOUD_PROJECT"
echo ""

# Check for venv
VENV_DIR="venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv "$VENV_DIR"
    echo "✓ Virtual environment created"
fi

# Activate venv
echo "🔄 Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# Install/update dependencies
echo "📦 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✓ Dependencies ready"
echo ""

# Check authentication
echo "🔐 Checking Google Cloud authentication..."
if ! gcloud auth application-default print-access-token &> /dev/null; then
    echo "⚠️  Not authenticated. Opening browser for login..."
    gcloud auth application-default login
fi
echo "✓ Authenticated"
echo ""

# Create output directory
mkdir -p ../public/logos
echo "✓ Output directory ready: public/logos/"
echo ""

echo "🎨 Generating enhanced logo set (non-interactive)..."
python3 generate-logo-enhanced.py

# Deactivate venv
deactivate

echo ""
echo "✅ Done! Check public/logos/ for your new logos"
echo ""

