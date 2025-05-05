@echo off
echo Installing dependencies...
call npm install

echo Building the project...
call npm run build

echo Starting the server...
call npm start

echo Open your browser and navigate to http://localhost:3000
pause 