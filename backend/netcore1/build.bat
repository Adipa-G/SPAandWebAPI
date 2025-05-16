dotnet restore
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet test .\src-test\Infrastructure.Test\bin\Debug\net8.0\Infrastructure.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet test .\src-test\Web.Test\bin\Debug\net8.0\Web.Test.dll
if %errorlevel% neq 0 exit /b %errorlevel%
copy .\src\Web\appsettings.json .\src\Web\bin\Debug\net8.0
if %errorlevel% neq 0 exit /b %errorlevel%