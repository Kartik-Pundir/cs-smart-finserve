#!/bin/bash

echo "🚀 CS Smart Finserve - Setup Script"
echo "===================================="
echo ""

# Fix npm permissions
echo "📦 Fixing npm permissions..."
sudo chown -R $(whoami) ~/.npm

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the project:"
echo "  npm run dev"
echo ""
echo "Frontend will run on: http://localhost:8000"
echo "Backend will run on: http://localhost:5000"
