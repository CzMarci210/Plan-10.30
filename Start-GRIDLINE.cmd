@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 24 LTS from https://nodejs.org then run this file again.
  start "" https://nodejs.org/en/download
  pause
  exit /b 1
)
node -e "if(Number(process.versions.node.split('.')[0])<24)process.exit(1)"
if errorlevel 1 (
  echo Please install Node.js 24 LTS or later, then try again.
  pause
  exit /b 1
)
echo Starting GRIDLINE. Keep this window open while using the server app.
echo Open http://127.0.0.1:3000 in your browser. Press Ctrl+C here to stop.
node launch.cjs
pause
