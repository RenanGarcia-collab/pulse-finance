#ifndef MyAppVersion
  #define MyAppVersion "1.0.0"
#endif
#define MyAppName "Pulse Finance"
#define MyAppPublisher "Renan Moreira Luz"
#define MyAppExeName "PulseFinance.exe"

[Setup]
AppId={{D8F1A498-58F6-4B7F-9D73-4B764D1A4B5E}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
OutputDir=release
OutputBaseFilename=PulseFinance-Installer-{#MyAppVersion}
Compression=lzma
SolidCompression=yes
WizardStyle=modern
ArchitecturesInstallIn64BitMode=x64compatible
UninstallDisplayIcon={app}\{#MyAppExeName}
CloseApplications=yes
SetupIconFile=branding\PulseFinance.ico
WizardImageFile=branding\wizard-image.bmp
WizardSmallImageFile=branding\wizard-small.bmp

[Languages]
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Tasks]
Name: "desktopicon"; Description: "Criar atalho na area de trabalho"; GroupDescription: "Atalhos:"

[Files]
Source: "dist\PulseFinance.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Abrir Pulse Finance"; Flags: nowait postinstall skipifsilent

[Messages]
brazilianportuguese.BeveledLabel=Pulse Finance

[Code]
procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usUninstall then
  begin
    MsgBox(
      'Os dados financeiros do Pulse Finance ficam salvos na pasta do usuario em %LOCALAPPDATA%\Pulse Finance e nao serao apagados pela desinstalacao.',
      mbInformation,
      MB_OK
    );
  end;
end;
