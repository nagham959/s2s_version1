param(
  [string]$GhcrOwner = $env:GHCR_OWNER,
  [string]$Tag = $env:TAG,
  [string]$FrontendApiBaseUrl = $(if ($env:FRONTEND_API_BASE_URL) { $env:FRONTEND_API_BASE_URL } else { "https://api.s2sai.online" }),
  [string]$Image = $env:FRONTEND_IMAGE,
  [switch]$SkipPush
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($GhcrOwner) -and [string]::IsNullOrWhiteSpace($Image)) {
  throw "Set GHCR_OWNER first, for example: `$env:GHCR_OWNER='hedra-nabil'"
}

$RootDir = Resolve-Path (Join-Path $PSScriptRoot "..")

if ([string]::IsNullOrWhiteSpace($Tag)) {
  try {
    $Tag = git -C $RootDir rev-parse --short HEAD 2>$null
  } catch {
    $Tag = $null
  }

  if ([string]::IsNullOrWhiteSpace($Tag)) {
    $Tag = Get-Date -Format "yyyyMMddHHmmss"
  }
}

if ([string]::IsNullOrWhiteSpace($Image)) {
  $GhcrOwner = $GhcrOwner.ToLowerInvariant()
  $Image = "ghcr.io/$GhcrOwner/s2sai-frontend:$Tag"
}

$Image = $Image.ToLowerInvariant()

function Invoke-Docker {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)

  & docker @Args
  if ($LASTEXITCODE -ne 0) {
    throw "docker $($Args -join ' ') failed with exit code $LASTEXITCODE"
  }
}

Invoke-Docker build `
  -f (Join-Path $RootDir "Dockerfile") `
  --build-arg "VITE_API_BASE_URL=$FrontendApiBaseUrl" `
  -t $Image `
  $RootDir

if (-not $SkipPush) {
  Invoke-Docker push $Image
}

Write-Output "FRONTEND_IMAGE=$Image"
