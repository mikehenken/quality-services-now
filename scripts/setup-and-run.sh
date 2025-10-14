#!/bin/bash
# Setup and run logo generation

set -e

echo "=============================================="
echo "KD'S Pressure Washing - Logo Generator Setup"
echo "=============================================="
echo ""

# Check if GOOGLE_CLOUD_PROJECT is set
if [ -z "$GOOGLE_CLOUD_PROJECT" ]; then
    echo "⚠️  GOOGLE_CLOUD_PROJECT environment variable not set"
    echo ""
    echo "Please set it before running:"
    echo "  export GOOGLE_CLOUD_PROJECT='your-project-id'"
    echo ""
    exit 1
fi

echo "✓ Using Google Cloud Project: $GOOGLE_CLOUD_PROJECT"
echo ""

# Check for Python 3
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"
echo ""

# Setup virtual environment
VENV_DIR="venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv "$VENV_DIR"
    echo "✓ Virtual environment created"
else
    echo "✓ Virtual environment already exists"
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source "$VENV_DIR/bin/activate"
echo "✓ Virtual environment activated"
echo ""

# Install/upgrade dependencies
echo "📦 Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✓ Dependencies installed"
echo ""

# Check authentication
echo "🔐 Checking Google Cloud authentication..."
if ! gcloud auth application-default print-access-token &> /dev/null; then
    echo "⚠️  Not authenticated. Running authentication..."
    gcloud auth application-default login
fi
echo "✓ Authenticated"
echo ""

# Create output directory
mkdir -p ../public/logos
echo "✓ Output directory ready: public/logos/"
echo ""

# Ask which script to run
echo "Which logo generation script would you like to run?"
echo ""
echo "  1) generate-logo.py (4 variations, single style)"
echo "  2) generate-logo-enhanced.py (8+ variations, multiple styles) [RECOMMENDED]"
echo ""
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        echo ""
        echo "Running generate-logo.py..."
        python3 generate-logo.py
        ;;
    2)
        echo ""
        echo "Running generate-logo-enhanced.py..."
        python3 generate-logo-enhanced.py
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✓ Done! Check public/logos/ for your new logos"

