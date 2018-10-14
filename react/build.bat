nuget\nuget.exe restore Mvc.sln
if %errorlevel% neq 0 exit /b %errorlevel%
"C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe" Mvc.sln
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build src-test\Infrastructure.Test\Infrastructure.Test.csproj
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet src-test\Infrastructure.Test\bin\Debug\netcoreapp2\Infrastructure.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build src-test\Web.Test\Web.Test.csproj
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet src-test\Web.Test\bin\Debug\netcoreapp2\Web.Test.dll
pushd src\Web
call npm install -g --cache-min 999999 webpack webpack-cli jest
if %errorlevel% neq 0 exit /b %errorlevel%
call npm link webpack
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install --cache-min 999999 gulp
if %errorlevel% neq 0 exit /b %errorlevel%
call npm install --cache-min 999999
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
dotnet bin\Debug\netcoreapp2\Web.dll
if %errorlevel% neq 0 exit /b %errorlevel%
popd