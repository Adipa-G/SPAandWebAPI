pushd app
call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call npx playwright install chromium
if %errorlevel% neq 0 exit /b %errorlevel%
call npx ng build
if %errorlevel% neq 0 exit /b %errorlevel%
call npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox
if %errorlevel% neq 0 exit /b %errorlevel%
popd