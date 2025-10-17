#!/bin/bash

# AI Technology Radar - Quick Start Script
# This script starts a local web server to run the application

echo "🎯 AI Technology Radar - Starting Server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✓ Python 3 found"
    echo ""
    
    # Update manifest.json from markdown files
    echo "📝 Updating manifest.json from markdown files..."
    python3 update-manifest.py
    
    if [ $? -eq 0 ]; then
        echo "✓ Manifest updated successfully"
    else
        echo "⚠️  Warning: Failed to update manifest.json"
        echo "   The app will use existing manifest"
    fi
    
    echo ""
    echo "🚀 Starting server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "-----------------------------------"
    echo ""
    
    # Start Python 3 HTTP server
    python3 -m http.server 8000
    
# Fallback to Python 2
elif command -v python &> /dev/null; then
    echo "✓ Python 2 found"
    echo ""
    
    # Update manifest.json from markdown files
    echo "📝 Updating manifest.json from markdown files..."
    python update-manifest.py
    
    if [ $? -eq 0 ]; then
        echo "✓ Manifest updated successfully"
    else
        echo "⚠️  Warning: Failed to update manifest.json"
        echo "   The app will use existing manifest"
    fi
    
    echo ""
    echo "🚀 Starting server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "-----------------------------------"
    echo ""
    
    # Start Python 2 HTTP server
    python -m SimpleHTTPServer 8000
    
# No Python found
else
    echo "❌ Python not found!"
    echo ""
    echo "Please install Python or use one of these alternatives:"
    echo ""
    echo "  Node.js:  npx http-server -p 8000"
    echo "  PHP:      php -S localhost:8000"
    echo ""
    exit 1
fi
