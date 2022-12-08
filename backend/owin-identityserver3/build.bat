call "C:\Program Files\Microsoft Visual Studio\2022\Professional\Common7\Tools\VsDevCmd.bat"
.\.nuget\nuget.exe restore .\OwinIdServer3.sln
if %errorlevel% neq 0 exit /b %errorlevel%
MSBuild .\OwinIdServer3.sln
if %errorlevel% neq 0 exit /b %errorlevel%
VSTest.Console.exe "Infrastructure.Test\bin\Debug\Infrastructure.Test.dll" /Logger:trx;LogFileName="Infrastructure.Test.trx" /TestAdapterPath:"Infrastructure.Test\bin\Debug\"
if %errorlevel% neq 0 exit /b %errorlevel%
VSTest.Console.exe "Web.Test\bin\Debug\Web.Test.dll" /Logger:trx;LogFileName="Web.Test.trx" /TestAdapterPath:"Web.Test\bin\Debug\" 
echo if %errorlevel% neq 0 exit /b %errorlevel%