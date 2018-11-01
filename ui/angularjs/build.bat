call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp copy-libs
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp copy-templates
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp sass
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp copyAppJS
if %errorlevel% neq 0 exit /b %errorlevel%
call gulp test
if %errorlevel% neq 0 exit /b %errorlevel%