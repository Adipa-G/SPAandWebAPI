dotnet restore
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet src-test\Infrastructure.Test\bin\Debug\netcoreapp2.1\Infrastructure.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet src-test\Web.Test\bin\Debug\netcoreapp2.1\Web.Test.dll
pushd src\Web\app
call npm install -g --prefer-offline @angular/cli
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install --prefer-offline
if %errorlevel% neq 0 exit /b %errorlevel%
call ng build
if %errorlevel% neq 0 exit /b %errorlevel%
call ng test --watch=false
if %errorlevel% neq 0 exit /b %errorlevel%
popd
echo ==================== DONE =======================
echo ==================== STARTING APP =======================
pushd src\Web
dotnet bin\Debug\netcoreapp2.1\Web.dll
if %errorlevel% neq 0 exit /b %errorlevel%
popd