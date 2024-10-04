pushd app
call npm install -g --prefer-offline @angular/cli@18.2.7
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call ng build
if %errorlevel% neq 0 exit /b %errorlevel%
call ng test --watch=false
if %errorlevel% neq 0 exit /b %errorlevel%
popd