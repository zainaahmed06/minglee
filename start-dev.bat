@echo off
echo Starting MingLee App Development Environment

:: Start the backend server in a new terminal
start cmd /k "cd backend && npm install && npm start"

:: Wait a moment for the backend to start up
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

:: Start the Expo development server
echo Starting Expo development server...
npm start

:: If the command reaches this point, both servers have been stopped
echo MingLee development environment has been shut down.
