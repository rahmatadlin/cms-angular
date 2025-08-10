@echo off
echo 🚀 Starting CMS Angular Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found. Please copy env.example to .env and configure it.
    echo    copy backend\env.example backend\.env
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing root dependencies...
    npm install
)

if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
)

echo 🎯 Starting development servers...
echo    Backend: http://localhost:3000
echo    Frontend: http://localhost:4200
echo    Admin Panel: http://localhost:4200/admin
echo.
echo 📋 Default credentials:
echo    Admin: admin@cms.com / admin123
echo    Editor: editor@cms.com / editor123
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start both servers
npm run dev 