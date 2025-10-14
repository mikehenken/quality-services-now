#!/bin/bash
# Generates the Concrete Cleaning service image using Vertex AI Imagen.

set -e

cd "$(dirname "$0")"

# Your Google Cloud Project is pre-configured
export GOOGLE_CLOUD_PROJECT="api-project-600875470759"

echo "====================================================="
echo "KD'S Pressure Washing - Concrete Cleaning Generator"
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

mkdir -p ../public/service-images
echo "✓ Output directory ready: public/service-images/"
echo ""

echo "🎨 Generating Concrete Cleaning image (4 variations)..."
python3 generate-concrete-cleaning.py

deactivate
echo ""
echo "✅ Done! Check public/service-images/ for your new images."
echo ""

