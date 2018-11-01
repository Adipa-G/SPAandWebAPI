call npm install -g --prefer-offline webpack webpack-cli jest
if %errorlevel% neq 0 exit /b %errorlevel%
call npm link webpack
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install --prefer-offline gulp
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp copy-libs
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp copy-templates
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp sass
if %errorlevel% neq 0 exit /b %errorlevel%
call npm run-script build
if %errorlevel% neq 0 exit /b %errorlevel%
call npm test
if %errorlevel% neq 0 exit /b %errorlevel%