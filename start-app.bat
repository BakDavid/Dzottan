@echo off
echo Checking for Node.js installation...

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please download and install it from:
    echo https://nodejs.org/
    pause
    exit /b
)

echo Node.js is installed. Version:
node -v

echo Setting up the environment...

REM Check if node_modules folder exists
if not exist node_modules (
    echo Installing dependencies...
    npm init -y
    npm install
)

echo Starting the server...
start http://localhost:3000
node server.js
pause
