dotnet restore
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet .\src-test\Infrastructure.Test\bin\Debug\netcoreapp2.1\Infrastructure.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet .\src-test\Web.Test\bin\Debug\netcoreapp2.1\Web.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%