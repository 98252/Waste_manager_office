@echo off
REM Smart Waste Management System - Automated Setup Script for Windows
REM This script installs dependencies for both frontend and backend

echo ╔════════════════════════════════════════════════════════╗
echo ║   Smart Waste Management System - Setup Script        ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install from https://nodejs.org
    exit /b 1
)

echo ✓ Node.js version:
node --version
echo ✓ npm version:
npm --version
echo.

REM Setup Backend
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Setting up Backend...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd backend
call npm install
echo ✓ Backend dependencies installed
echo.

REM Check if .env exists
if not exist .env (
    echo ⚠️  .env file not found, creating one...
    (
        echo MONGO_URI=mongodb://localhost:27017/waste_management
        echo JWT_SECRET=your_jwt_secret_key_change_this_in_production
        echo PORT=5000
        echo NODE_ENV=development
    ) > .env
    echo ✓ .env file created
)
echo.

REM Setup Frontend
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Setting up Frontend...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd ..\frontend
call npm install
echo ✓ Frontend dependencies installed
echo.

echo ╔════════════════════════════════════════════════════════╗
echo ║              ✓ Setup Complete!                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo.
echo 1. Make sure MongoDB is running:
echo    mongod
echo.
echo 2. Open two terminal windows
echo.
echo 3. Terminal 1 - Start Backend:
echo    cd backend
echo    npm run dev
echo.
echo 4. Terminal 2 - Start Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 5. Open http://localhost:5173 in your browser
echo.
echo Demo Credentials:
echo   Admin: admin@example.com / password123
echo   User: user@example.com / password123
echo.
echo For more information, see README.md
pause
