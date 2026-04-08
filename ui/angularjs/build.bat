call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call npx playwright install chromium
if %errorlevel% neq 0 exit /b %errorlevel%
call npx gulp build
if %errorlevel% neq 0 exit /b %errorlevel%
call npx gulp test
if %errorlevel% neq 0 exit /b %errorlevel%