# Configura credenciales para el chat de Evernear.
# Opción recomendada en local: clave gratis de Google AI Studio.

param(
  [string]$GoogleApiKey
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$envPath = Join-Path $root ".env.local"

function Upsert-EnvLine {
  param([string]$Name, [string]$Value)
  $line = "$Name=$Value"
  if (Test-Path $envPath) {
    $content = Get-Content $envPath -Raw
    if ($content -match "(?m)^$Name=") {
      $content = [regex]::Replace($content, "(?m)^$Name=.*$", $line)
    } else {
      $content = $content.TrimEnd() + "`n$line`n"
    }
    Set-Content -Path $envPath -Value $content -NoNewline
  } else {
    Set-Content -Path $envPath -Value "$line`n"
  }
}

if ($GoogleApiKey) {
  Upsert-EnvLine "GOOGLE_GENERATIVE_AI_API_KEY" $GoogleApiKey
  Upsert-EnvLine "GOOGLE_GENERATIVE_AI_MODEL" "gemini-2.5-flash"
  Write-Host "Listo: Google Gemini configurado en .env.local"
  Write-Host "Reiniciá npm run dev y probá el chat."
  exit 0
}

Write-Host "Opción A (recomendada): clave gratis de Google"
Write-Host "  1. Abrí https://aistudio.google.com/apikey"
Write-Host "  2. Ejecutá: .\scripts\setup-ai-chat.ps1 -GoogleApiKey TU_CLAVE"
Write-Host ""
Write-Host "Opción B: Vercel AI Gateway (requiere tarjeta para créditos)"
Write-Host "  npx vercel login"
Write-Host "  npx vercel ai-gateway api-keys create --name evernear-local --non-interactive"
Write-Host "  Pegá la clave vck_... en .env.local como AI_GATEWAY_API_KEY"
