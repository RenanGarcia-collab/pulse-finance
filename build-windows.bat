@echo off
setlocal

cd /d "%~dp0"

for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "(Get-Content version.json | ConvertFrom-Json).version"`) do set "APP_VERSION=%%i"
if "%APP_VERSION%"=="" set "APP_VERSION=0.0.0"

if not exist .venv (
  py -m venv .venv
)

call .venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt pyinstaller
pyinstaller --clean PulseFinance.spec

if not exist release mkdir release
if exist release\PulseFinance-Windows.zip del /f /q release\PulseFinance-Windows.zip
powershell -NoProfile -Command "Compress-Archive -Path 'dist\PulseFinance.exe' -DestinationPath ('release\PulseFinance-Windows-' + $env:APP_VERSION + '.zip') -Force"
powershell -NoProfile -Command "Copy-Item ('release\PulseFinance-Windows-' + $env:APP_VERSION + '.zip') 'release\PulseFinance-Windows.zip' -Force"

echo.
echo Build concluido:
echo   dist\PulseFinance.exe
echo   release\PulseFinance-Windows-%APP_VERSION%.zip
echo   release\PulseFinance-Windows.zip
