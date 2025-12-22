param(
  [string]$PgSuperUser = "postgres",
  [string]$PgHost = "localhost",
  [int]$PgPort = 5432,
  [string]$DbName = "kbase",
  [string]$DbUser = "kbase_user",
  [string]$DbPassword = "kbase_password",
  [string]$PsqlBinPath = "C:\Program Files\PostgreSQL\16\bin",
  [string]$PgSuperUserPassword = "AlphaOmega@98"
)

if (Test-Path $PsqlBinPath) {
  $env:PATH = "$PsqlBinPath;" + $env:PATH
  Write-Output "Added '$PsqlBinPath' to PATH"
}

if ($PgSuperUserPassword) {
  $env:PGPASSWORD = $PgSuperUserPassword
  Write-Output "Set PGPASSWORD from parameter (sensitive)."
}

if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
  Write-Error "psql not found. Install PostgreSQL client or add psql to PATH (you can pass -PsqlBinPath)."
  exit 1
}

function Test-Db {
  param($name)
  $out = & psql -U $PgSuperUser -h $PgHost -p $PgPort -tAc "SELECT 1 FROM pg_database WHERE datname='$name';" 2>$null
  return $out.Trim() -eq '1'
}

function Test-Role {
  param($role)
  $out = & psql -U $PgSuperUser -h $PgHost -p $PgPort -tAc "SELECT 1 FROM pg_roles WHERE rolname='$role';" 2>$null
  return $out.Trim() -eq '1'
}

Write-Output "Using Postgres host=$PgHost port=$PgPort superuser=$PgSuperUser"

if (Test-Role $DbUser) {
  Write-Output "Role '$DbUser' already exists."
} else {
  Write-Output "Creating role '$DbUser'..."
  & psql -U $PgSuperUser -h $PgHost -p $PgPort -c "CREATE USER $DbUser WITH PASSWORD '$DbPassword';"
}

if (Test-Db $DbName) {
  Write-Output "Database '$DbName' already exists."
} else {
  Write-Output "Creating database '$DbName' owned by '$DbUser'..."
  & psql -U $PgSuperUser -h $PgHost -p $PgPort -c "CREATE DATABASE $DbName OWNER $DbUser;"
}

Write-Output "Granting privileges to '$DbUser' on database '$DbName'..."
& psql -U $PgSuperUser -h $PgHost -p $PgPort -c "GRANT ALL PRIVILEGES ON DATABASE $DbName TO $DbUser;"

Write-Output "Done."

Write-Output "Tip: you can set environment variable PGPASSWORD to avoid password prompts when running this script."
