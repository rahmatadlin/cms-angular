#!/bin/bash

# CMS Angular - Start Script
echo "🚀 Starting CMS Angular Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Please copy env.example to .env and configure it."
    echo "   cp backend/env.example backend/.env"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Check if database is seeded
echo "🔍 Checking database..."
cd backend
if ! node -e "
const { User } = require('./models');
(async () => {
  try {
    await require('./models').sequelize.authenticate();
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('Database is empty. Running seeder...');
      require('./seed.js');
    } else {
      console.log('Database already has data.');
    }
  } catch (error) {
    console.error('Database error:', error.message);
    process.exit(1);
  }
})();
" 2>/dev/null; then
    echo "❌ Database connection failed. Please check your .env configuration."
    exit 1
fi
cd ..

# Start the application
echo "🎯 Starting development servers..."
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:4200"
echo "   Admin Panel: http://localhost:4200/admin"
echo ""
echo "📋 Default credentials:"
echo "   Admin: admin@cms.com / admin123"
echo "   Editor: editor@cms.com / editor123"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start both servers
npm run dev 