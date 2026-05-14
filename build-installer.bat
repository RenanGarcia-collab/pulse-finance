@echo off
setlocal

cd /d "%~dp0"

for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "(Get-Content version.json | ConvertFrom-Json).version"`) do set "APP_VERSION=%%i"
if "%APP_VERSION%"=="" set "APP_VERSION=0.0.0"

call build-windows.bat
if errorlevel 1 exit /b 1

set "ISCC_PATH=%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe"
if not exist "%ISCC_PATH%" set "ISCC_PATH=%ProgramFiles%\Inno Setup 6\ISCC.exe"

if not exist "%ISCC_PATH%" (
  echo Inno Setup 6 nao encontrado. Instale o Inno Setup e rode novamente.
  exit /b 1
)

"%ISCC_PATH%" /DMyAppVersion=%APP_VERSION% PulseFinance.iss

if exist release\PulseFinance-Installer.exe del /f /q release\PulseFinance-Installer.exe
copy /y release\PulseFinance-Installer-%APP_VERSION%.exe release\PulseFinance-Installer.exe >nul

echo.
echo Instalador concluido:
echo   release\PulseFinance-Installer-%APP_VERSION%.exe
echo   release\PulseFinance-Installer.exe
