echo ==================== UI =======================
pushd ui\angular
call build.bat
popd
echo ==================== Backend =======================
pushd backend\netcore
call build.bat
popd
rmdir /s /q backend\netcore\src\Web\app
if %errorlevel% neq 0 exit /b %errorlevel%
mkdir backend\netcore\src\Web\app
if %errorlevel% neq 0 exit /b %errorlevel%
xcopy ui\angular\app\dist\angular-auth-app backend\netcore\src\Web\app /s /e
if %errorlevel% neq 0 exit /b %errorlevel%
echo ==================== DONE =======================
echo ==================== STARTING APP =======================
pushd backend\netcore\src\Web
dotnet bin\Debug\netcoreapp2.1\Web.dll
if %errorlevel% neq 0 exit /b %errorlevel%
popd