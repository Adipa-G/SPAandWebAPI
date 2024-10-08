call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call npm run build
if %errorlevel% neq 0 exit /b %errorlevel%
call npm test
if %errorlevel% neq 0 exit /b %errorlevel%