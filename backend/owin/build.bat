call "C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\Common7\Tools\VsDevCmd.bat"
.\.nuget\nuget.exe restore .\Owin.sln
if %errorlevel% neq 0 exit /b %errorlevel%
MSBuild .\Owin.sln
if %errorlevel% neq 0 exit /b %errorlevel%
VSTest.Console.exe "Infrastructure.Test\bin\Debug\Infrastructure.Test.dll" /TestAdapterPath:"Infrastructure.Test\bin\Debug\"
if %errorlevel% neq 0 exit /b %errorlevel%
VSTest.Console.exe "Web.Test\bin\Debug\Web.Test.dll" /TestAdapterPath:"Web.Test\bin\Debug\"
echo if %errorlevel% neq 0 exit /b %errorlevel%