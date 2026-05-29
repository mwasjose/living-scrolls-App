# Download fonts (WOFF2) for Fira Sans and Noto Serif Hebrew into public/fonts/
Param()

Set-StrictMode -Version Latest

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$outDir = Join-Path $root '..\public\fonts'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

$fonts = @(
  @{ css = 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&display=swap'; prefix='FiraSans' },
  @{ css = 'https://fonts.googleapis.com/css2?family=Noto+Serif+Hebrew:wght@400;700&display=swap'; prefix='NotoSerifHebrew' }
)

foreach ($font in $fonts) {
  Write-Host "Fetching CSS: $($font.css)"
  try {
    $resp = Invoke-WebRequest -Uri $font.css -UseBasicParsing -Headers @{ 'User-Agent' = 'Mozilla/5.0' }
    $css = $resp.Content
  } catch {
    Write-Error ("Failed to download CSS: {0}" -f $_.Exception.Message)
    continue
  }

  $pattern = '(?s)@font-face\s*\{[^}]*?font-weight:\s*(\d+)[^}]*?src:\s*url\((https?://[^)]+?\.(?:woff2|ttf)[^)]*)\)'
  $matches = [regex]::Matches($css, $pattern)
  if ($matches.Count -eq 0) { Write-Warning "No woff2 urls found for $($font.prefix)"; continue }

  foreach ($m in $matches) {
    $weight = $m.Groups[1].Value
    $url = $m.Groups[2].Value
    try { $ext = [System.IO.Path]::GetExtension((New-Object System.Uri($url)).AbsolutePath) } catch { $ext = '.woff2' }
    $fileName = $font['prefix'] + '-' + $weight + $ext
    $outPath = Join-Path $outDir $fileName
    if (Test-Path $outPath) { Write-Host "Already exists: $fileName"; continue }
    Write-Host "Downloading $fileName from $url"
    try {
      Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -Headers @{ 'User-Agent' = 'Mozilla/5.0' }
      Write-Host "Saved: $outPath"
    } catch {
      Write-Error ("Failed to download {0}: {1}" -f $url, $_.Exception.Message)
    }
  }
}

Write-Host "Font download script complete. Place missing fonts manually if any downloads failed."
