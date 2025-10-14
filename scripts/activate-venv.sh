#!/bin/bash
# Activate the Python virtual environment for logo generation

VENV_DIR="$(dirname "$0")/venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "❌ Virtual environment not found!"
    echo ""
    echo "Please run setup first:"
    echo "  cd scripts"
    echo "  ./setup-and-run.sh"
    echo ""
    exit 1
fi

echo "🔄 Activating virtual environment..."
source "$VENV_DIR/bin/activate"
echo "✓ Virtual environment activated"
echo ""
echo "You can now run:"
echo "  python3 generate-logo.py"
echo "  python3 generate-logo-enhanced.py"
echo ""
echo "To deactivate when done:"
echo "  deactivate"

