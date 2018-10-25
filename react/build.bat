dotnet restore
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet src-test\Infrastructure.Test\bin\Debug\netcoreapp2.1\Infrastructure.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet src-test\Web.Test\bin\Debug\netcoreapp2.1\Web.Test.dll
pushd src\Web
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
popd
echo ==================== DONE =======================
echo ==================== STARTING APP =======================
pushd src\Web
dotnet bin\Debug\netcoreapp2.1\Web.dll
if %errorlevel% neq 0 exit /b %errorlevel%
popd