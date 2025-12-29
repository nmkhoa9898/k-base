<#
.SYNOPSIS
    KBase Development Environment Stop Script
    
.DESCRIPTION
    This script stops all KBase development containers and optionally removes volumes.

.PARAMETER RemoveVolumes
    Also remove database volumes (fresh start next time)

.EXAMPLE
    .\dev-stop.ps1
    
.EXAMPLE
    .\dev-stop.ps1 -RemoveVolumes
#>

param(
    [switch]$RemoveVolumes
)

function Write-ColorOutput($ForegroundColor, $Message) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-Host ""
Write-ColorOutput "Yellow" "Stopping KBase development environment..."
Write-Host ""

# Get script directory and set working directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$dockerDir = Join-Path $scriptDir "..\docker"

Set-Location $dockerDir

if ($RemoveVolumes) {
    Write-Host "Stopping containers and removing volumes..."
    docker-compose -f docker-compose.dev.yml down -v
} else {
    Write-Host "Stopping containers (keeping volumes)..."
    docker-compose -f docker-compose.dev.yml down
}

Write-Host ""
Write-ColorOutput "Green" "KBase development environment stopped."
Write-Host ""
