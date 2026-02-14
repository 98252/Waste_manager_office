#!/bin/bash

# Smart Waste Management System - Automated Setup Script
# This script installs dependencies for both frontend and backend

echo "╔════════════════════════════════════════════════════════╗"
echo "║   Smart Waste Management System - Setup Script        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install from https://nodejs.org"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Setting up Backend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd backend
npm install
echo "✓ Backend dependencies installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found, creating one..."
    cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/waste_management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
EOF
    echo "✓ .env file created"
fi
echo ""

# Setup Frontend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Setting up Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd ../frontend
npm install
echo "✓ Frontend dependencies installed"
echo ""

echo "╔════════════════════════════════════════════════════════╗"
echo "║              ✓ Setup Complete!                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo ""
echo "1. Make sure MongoDB is running:"
echo "   $ mongod"
echo ""
echo "2. Open two terminal windows"
echo ""
echo "3. Terminal 1 - Start Backend:"
echo "   $ cd backend"
echo "   $ npm run dev"
echo ""
echo "4. Terminal 2 - Start Frontend:"
echo "   $ cd frontend"
echo "   $ npm run dev"
echo ""
echo "5. Open http://localhost:5173 in your browser"
echo ""
echo "Demo Credentials:"
echo "  Admin: admin@example.com / password123"
echo "  User: user@example.com / password123"
echo ""
echo "For more information, see README.md"
