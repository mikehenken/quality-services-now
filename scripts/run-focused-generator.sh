#!/bin/bash
# Runs the new, single-prompt focused logo generator.

set -e

# Your Google Cloud Project is pre-configured
export GOOGLE_CLOUD_PROJECT="api-project-600875470759"

echo "====================================================="
echo "KD'S Pressure Washing - FOCUSED Header Logo Generator"
echo "====================================================="
echo "Project: $GOOGLE_CLOUD_PROJECT"
echo ""

VENV_DIR="venv"
if [ ! -d "$VENV_DIR" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv "$VENV_DIR"
fi

echo "🔄 Activating virtual environment..."
source "$VENV_DIR/bin/activate"

echo "📦 Installing/checking dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✓ Dependencies ready"
echo ""

echo "🔐 Checking Google Cloud authentication..."
if ! gcloud auth application-default print-access-token &> /dev/null; then
    echo "⚠️  Not authenticated. Opening browser for login..."
    gcloud auth application-default login
fi
echo "✓ Authenticated"
echo ""

mkdir -p ../public/logos
echo "✓ Output directory ready: public/logos/"
echo ""

echo "🎨 Generating 4 focused logo variations..."
python3 generate-focused-logo.py

deactivate
echo ""
echo "✅ Done! Check public/logos/ for your new header logos."
echo ""
