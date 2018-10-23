dotnet restore
if %errorlevel% neq 0 exit /b %errorlevel%
"C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe" Mvc.sln
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build src-test\Infrastructure.Test\Infrastructure.Test.csproj
if %errorlevel% neq 0 exit /b %errorlevel%
.\src-test\Infrastructure.Test\bin\Debug\net46\Infrastructure.Test.exe
if %errorlevel% neq 0 exit /b %errorlevel%
dotnet build src-test\Web.Test\Web.Test.csproj
if %errorlevel% neq 0 exit /b %errorlevel%
.\src-test\Web.Test\bin\Debug\net46\Web.Test.exe
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
bin\Debug\net46\Web.exe
if %errorlevel% neq 0 exit /b %errorlevel%
popd