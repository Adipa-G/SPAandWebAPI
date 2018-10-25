dotnet restore
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet .\src-test\Infrastructure.Test\bin\Debug\netcoreapp2.1\Infrastructure.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet .\src-test\Web.Test\bin\Debug\netcoreapp2.1\Web.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
pushd src\Web
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
echo ==================== DONE =======================
echo ==================== STARTING APP =======================
dotnet bin\Debug\netcoreapp2.1\Web.dll
if %errorlevel% neq 0 exit /b %errorlevel%
popd