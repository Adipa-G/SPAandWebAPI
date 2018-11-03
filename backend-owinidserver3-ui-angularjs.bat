echo ==================== UI =======================
pushd ui\angularjs
call build.bat
popd
echo ==================== Backend =======================
pushd backend\owin-identityserver3
call build.bat
popd
rmdir /s /q backend\owin-identityserver3\Web\www
if %errorlevel% neq 0 exit /b %errorlevel%
mkdir backend\owin-identityserver3\Web\www
if %errorlevel% neq 0 exit /b %errorlevel%
xcopy ui\angularjs\dist backend\owin-identityserver3\Web\www /s /e
if %errorlevel% neq 0 exit /b %errorlevel%
echo ==================== DONE =======================
echo ==================== STARTING APP =======================
pushd backend\owin-identityserver3\Web
"C:\Program Files\IIS Express\iisexpress.exe" /port:5000 /path:"D:\GitHub\SPAandWebAPI\backend\owin-identityserver3\Web"
if %errorlevel% neq 0 exit /b %errorlevel%
popd