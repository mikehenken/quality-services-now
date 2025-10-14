#!/bin/bash
# Interactive logo refinement tool

set -e

export GOOGLE_CLOUD_PROJECT="api-project-600875470759"

echo "=========================================================="
echo "KD'S Pressure Washing - Interactive Logo Refinement"
echo "=========================================================="
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
echo "✓ Output directory ready"
echo ""

python3 interactive-logo-refine.py

deactivate
echo ""
echo "✅ Done!"
echo ""

