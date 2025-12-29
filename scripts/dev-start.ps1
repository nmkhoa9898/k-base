<#
.SYNOPSIS
    KBase Development Environment Startup Script
    
.DESCRIPTION
    This script starts the complete KBase development environment:
    1. Destroys existing Docker containers and volumes (fresh start)
    2. Builds and starts PostgreSQL, Backend, and Frontend services
    3. Waits for all services to be healthy
    4. Opens the application in the default browser

.PARAMETER Rebuild
    Force rebuild all Docker images

.PARAMETER NoBrowser
    Don't automatically open browser

.EXAMPLE
    .\dev-start.ps1
    
.EXAMPLE
    .\dev-start.ps1 -Rebuild -NoBrowser
#>

param(
    [switch]$Rebuild,
    [switch]$NoBrowser
)

# Colors for output
function Write-Step($Message) {
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Write-Success($Message) {
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Failure($Message) {
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Info($Message) {
    Write-Host "[INFO] $Message" -ForegroundColor Yellow
}

# Banner
Write-Host ""
Write-Host "=========================================================" -ForegroundColor Magenta
Write-Host "           KBase Development Environment                 " -ForegroundColor Magenta
Write-Host "                Starting Services                        " -ForegroundColor Magenta
Write-Host "=========================================================" -ForegroundColor Magenta
Write-Host ""

# Get script directory and set working directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$dockerDir = Join-Path $scriptDir "..\docker"

if (-not (Test-Path $dockerDir)) {
    Write-Failure "Docker directory not found at: $dockerDir"
    exit 1
}

Set-Location $dockerDir
Write-Info "Working directory: $(Get-Location)"

# Check Docker is running
Write-Step "Checking Docker..."
try {
    $dockerInfo = docker info 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not responding"
    }
    Write-Success "Docker is running"
} catch {
    Write-Failure "Docker is not running. Please start Docker Desktop and try again."
    exit 1
}

# Stop and remove existing containers
Write-Step "Stopping existing containers..."
docker-compose -f docker-compose.dev.yml down -v 2>&1 | Out-Null
Write-Success "Cleaned up existing containers and volumes"

# Build images
Write-Step "Building Docker images..."
$buildArgs = @("-f", "docker-compose.dev.yml", "build")
if ($Rebuild) {
    $buildArgs += "--no-cache"
    Write-Info "Forcing rebuild (no cache)"
}

$buildOutput = docker-compose @buildArgs 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Failure "Failed to build Docker images"
    Write-Host $buildOutput
    exit 1
}
Write-Success "Docker images built successfully"

# Start services
Write-Step "Starting services..."
docker-compose -f docker-compose.dev.yml up -d 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Failure "Failed to start services"
    exit 1
}
Write-Success "Services starting..."

# Wait for PostgreSQL
Write-Step "Waiting for PostgreSQL to be ready..."
$maxAttempts = 30
$attempt = 0
while ($attempt -lt $maxAttempts) {
    $attempt++
    $health = docker inspect --format='{{.State.Health.Status}}' kbase-db-dev 2>&1
    if ($health -eq "healthy") {
        Write-Success "PostgreSQL is ready"
        break
    }
    Write-Host "." -NoNewline
    Start-Sleep -Seconds 2
}
if ($attempt -eq $maxAttempts) {
    Write-Failure "PostgreSQL failed to start"
    docker logs kbase-db-dev
    exit 1
}

# Wait for Backend
Write-Step "Waiting for Backend to be ready (this may take a minute)..."
$maxAttempts = 60
$attempt = 0
while ($attempt -lt $maxAttempts) {
    $attempt++
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/api/ping" -UseBasicParsing -TimeoutSec 5 2>&1
        if ($response.StatusCode -eq 200) {
            Write-Success "Backend is ready"
            break
        }
    } catch {
        Write-Host "." -NoNewline
        Start-Sleep -Seconds 3
    }
}
if ($attempt -eq $maxAttempts) {
    Write-Failure "Backend failed to start"
    Write-Host "`nBackend logs:"
    docker logs kbase-backend-dev --tail 50
    exit 1
}

# Wait for Frontend
Write-Step "Waiting for Frontend to be ready..."
$maxAttempts = 30
$attempt = 0
while ($attempt -lt $maxAttempts) {
    $attempt++
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5 2>&1
        if ($response.StatusCode -eq 200) {
            Write-Success "Frontend is ready"
            break
        }
    } catch {
        Write-Host "." -NoNewline
        Start-Sleep -Seconds 2
    }
}
if ($attempt -eq $maxAttempts) {
    Write-Failure "Frontend failed to start"
    docker logs kbase-frontend-dev --tail 50
    exit 1
}

# Print success message
Write-Host ""
Write-Host "=========================================================" -ForegroundColor Green
Write-Host "        All services started successfully!               " -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Services running at:"
Write-Host "  - Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "  - Backend:   http://localhost:8080" -ForegroundColor Cyan
Write-Host "  - Database:  localhost:5432" -ForegroundColor Cyan
Write-Host ""

Write-Host "Test Accounts (Password: " -NoNewline
Write-Host "Password123!" -ForegroundColor Yellow -NoNewline
Write-Host ")"
Write-Host "  +----------+--------------------------------+---------------------+"
Write-Host "  | Role     | Email                          | Description         |"
Write-Host "  +----------+--------------------------------+---------------------+"
Write-Host "  | ADMIN    | admin@kbase.dev                | Full system access  |"
Write-Host "  | OWNER    | john.smith@techcorp.com        | Project owner       |"
Write-Host "  | USER     | alice.taylor@techcorp.com      | Regular user        |"
Write-Host "  +----------+--------------------------------+---------------------+"
Write-Host ""

Write-Host "Useful commands:"
Write-Host "  - Stop all:    docker-compose -f docker/docker-compose.dev.yml down"
Write-Host "  - View logs:   docker-compose -f docker/docker-compose.dev.yml logs -f"
Write-Host "  - Restart:     docker-compose -f docker/docker-compose.dev.yml restart"
Write-Host ""

# Open browser
if (-not $NoBrowser) {
    Write-Info "Opening browser..."
    Start-Process "http://localhost:3000"
}
