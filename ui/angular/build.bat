pushd app
call npm install -g --prefer-offline @angular/cli@16.2.16
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call ng build
if %errorlevel% neq 0 exit /b %errorlevel%
call ng test --watch=false
if %errorlevel% neq 0 exit /b %errorlevel%
popd