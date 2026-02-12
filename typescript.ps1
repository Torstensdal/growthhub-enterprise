<#
.SYNOPSIS
GitHub Sync & Deploy for GrowthHub Enterprise

.DESCRIPTION
- Git commit & push
- npm install
- Lokal build (TypeScript + Vite)
- Stopper ved build-fejl og logger fejl
- Logger alt output til fil
- Beregnet til at køres fra .bat så PS vindue forbliver åbent
#>

# -------------------------------
# Opsæt repo og log
# -------------------------------
$localDir = "C:\Users\Kaj T. Sørensen\OneDrive\Dokumenter\GitHub\growthhub-enterprise"
$log = "$localDir\github-sync-deploy.log"

Write-Output "📄 Logfile: $log" | Tee-Object -FilePath $log -Append
Write-Output "📂 Repo directory: $localDir" | Tee-Object -FilePath $log -Append

# Skift til repo
try {
    Set-Location $localDir
} catch {
    Write-Error "Failed to set location to $localDir. $_"
    pause
    exit 1
}

# -------------------------------
# Check for ændringer og commit
# -------------------------------
$changes = git status --porcelain
if ($changes) {
    Write-Output "📌 Changes detected. Adding and committing..." | Tee-Object -FilePath $log -Append
    try {
        git add . 2>&1 | Tee-Object -FilePath $log -Append
        git commit -m "Sync & deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" 2>&1 | Tee-Object -FilePath $log -Append
    } catch {
        Write-Error "Git commit failed: $_"
        pause
        exit 1
    }
} else {
    Write-Output "ℹ️ No changes to commit." | Tee-Object -FilePath $log -Append
}

# -------------------------------
# Push til GitHub
# -------------------------------
try {
    Write-Output "⬆️ Pushing to GitHub..." | Tee-Object -FilePath $log -Append
    git push origin main 2>&1 | Tee-Object -FilePath $log -Append
} catch {
    Write-Error "Git push failed: $_"
    pause
    exit 1
}

# -------------------------------
# Installer npm dependencies
# -------------------------------
try {
    Write-Output "📦 Installing npm dependencies..." | Tee-Object -FilePath $log -Append
    npm install 2>&1 | Tee-Object -FilePath $log -Append
} catch {
    Write-Error "npm install failed: $_"
    pause
    exit 1
}

# -------------------------------
# Byg projektet lokalt med stop ved TypeScript-fejl
# -------------------------------
Write-Output "⚙️ Building project..." | Tee-Object -FilePath $log -Append

npm run build 2>&1 | Tee-Object -FilePath $log -Append
$exitCode = $LASTEXITCODE

if ($exitCode -ne 0) {
    Write-Error "❌ Build failed! Check log $log for TypeScript errors."
    pause
    exit $exitCode
}

# -------------------------------
# Vercel info kun hvis build lykkes
# -------------------------------
Write-Output "🚀 Deployment to Vercel triggers automatically on GitHub push." | Tee-Object -FilePath $log -Append
Write-Output "✅ GitHub sync & deploy script complete!" | Tee-Object -FilePath $log -Append
Write-Output "📄 See $log for details" | Tee-Object -FilePath $log -Append

# -------------------------------
# Pause før lukning (så PS-vinduet holder sig åbent)
# -------------------------------
Write-Output "`nPress any key to exit..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
