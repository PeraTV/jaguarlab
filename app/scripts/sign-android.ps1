$ErrorActionPreference='Stop'
$projectPath=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$privatePath='F:/Projetos/Onca3D-private'
$toolsPath='F:/Projetos/Onca3D-build/tools'
$env:JAVA_HOME=(Get-ChildItem -LiteralPath "$toolsPath/java" -Directory | Select-Object -First 1).FullName
$env:ONCA_SIGN_PASSWORD=[IO.File]::ReadAllText("$privatePath/android-signing-password.txt").Trim()
try {
  $unsigned=Join-Path $projectPath 'android/app/build/outputs/apk/release/app-release-unsigned.apk'
  $releasePath=Join-Path $projectPath 'release'
  New-Item -ItemType Directory -Force -Path $releasePath | Out-Null
  $version=(Get-Content -Raw -LiteralPath (Join-Path $projectPath 'package.json') | ConvertFrom-Json).version
  $apk=Join-Path $releasePath "JaguarLab-$version-Android.apk"
  & "$toolsPath/android-sdk/build-tools/36.0.0/zipalign.exe" -f -p 4 $unsigned (Join-Path $releasePath 'aligned.apk')
  if($LASTEXITCODE -ne 0){throw 'Falha ao alinhar APK'}
  & "$toolsPath/android-sdk/build-tools/36.0.0/apksigner.bat" sign --ks "$privatePath/android-signing.jks" --ks-key-alias onca3d --ks-pass env:ONCA_SIGN_PASSWORD --key-pass env:ONCA_SIGN_PASSWORD --out $apk (Join-Path $releasePath 'aligned.apk')
  if($LASTEXITCODE -ne 0){throw 'Falha ao assinar APK'}
  & "$toolsPath/android-sdk/build-tools/36.0.0/apksigner.bat" verify --verbose $apk
  if($LASTEXITCODE -ne 0){throw 'Falha ao verificar assinatura'}
  Get-FileHash -LiteralPath $apk -Algorithm SHA256
} finally {Remove-Item Env:ONCA_SIGN_PASSWORD -ErrorAction SilentlyContinue}
