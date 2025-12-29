# KBase Development Scripts

This folder contains scripts for running the KBase development environment.

## Quick Start

```powershell
# Start everything (database, backend, frontend)
.\scripts\dev-start.ps1

# Stop everything
.\scripts\dev-stop.ps1
```

## Scripts

### `dev-start.ps1`

Starts the complete development environment with Docker Compose:

1. **Destroys existing containers and volumes** - Ensures a fresh start
2. **Creates fresh PostgreSQL database** - With schema and seed data
3. **Starts Spring Boot backend** - Waits for health check
4. **Starts React frontend** - With Nginx reverse proxy
5. **Opens browser automatically** - Points to http://localhost:3000

**Options:**
- `-Rebuild` - Force rebuild all Docker images (no cache)
- `-NoBrowser` - Don't automatically open the browser

**Examples:**
```powershell
# Normal start
.\scripts\dev-start.ps1

# Force rebuild images
.\scripts\dev-start.ps1 -Rebuild

# Start without opening browser
.\scripts\dev-start.ps1 -NoBrowser
```

### `dev-stop.ps1`

Stops all development containers.

**Options:**
- `-RemoveVolumes` - Also remove database volumes

**Examples:**
```powershell
# Stop containers (keep data for next start)
.\scripts\dev-stop.ps1

# Stop and remove all data
.\scripts\dev-stop.ps1 -RemoveVolumes
```

## Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | React application |
| Backend | http://localhost:8080 | Spring Boot API |
| Swagger UI | http://localhost:8080/swagger-ui.html | API documentation |
| Database | localhost:5432 | PostgreSQL |

## Test Accounts

All accounts use the password: **`Password123!`**

| Role | Email | Description |
|------|-------|-------------|
| ADMIN | admin@kbase.dev | Full system administrator access |
| ADMIN | sarah.admin@kbase.dev | Secondary admin account |
| OWNER | john.smith@techcorp.com | Project owner/team lead |
| OWNER | emily.johnson@techcorp.com | Project owner |
| OWNER | michael.chen@techcorp.com | Project owner |
| USER | alice.taylor@techcorp.com | Regular team member |
| USER | bob.anderson@techcorp.com | Regular team member |
| USER | carol.martinez@techcorp.com | Regular team member |

## Database Information

The development environment seeds the database with:
- **20 users** (2 admins, 5 owners, 13 regular users)
- **12 projects** (10 active, 2 archived)
- **50+ documents** across all projects
- **Realistic project memberships**

## Manual Docker Commands

```powershell
# Navigate to docker directory
cd docker

# Start services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# View specific service logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop services
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes
docker-compose -f docker-compose.dev.yml down -v

# Rebuild specific service
docker-compose -f docker-compose.dev.yml build backend

# Restart specific service
docker-compose -f docker-compose.dev.yml restart backend
```

## Troubleshooting

### Backend won't start
1. Check if PostgreSQL is healthy: `docker logs kbase-db-dev`
2. Check backend logs: `docker logs kbase-backend-dev`
3. Ensure port 8080 is not in use

### Frontend shows API errors
1. Ensure backend is running and healthy
2. Check nginx proxy configuration in `frontend/nginx.conf`
3. Check frontend logs: `docker logs kbase-frontend-dev`

### Database connection issues
1. Verify PostgreSQL is running: `docker ps | grep kbase-db`
2. Check database logs: `docker logs kbase-db-dev`
3. Try connecting manually: `docker exec -it kbase-db-dev psql -U kbase_user -d kbase`

### Clean restart
```powershell
# Stop everything and remove all data
.\scripts\dev-stop.ps1 -RemoveVolumes

# Start fresh
.\scripts\dev-start.ps1 -Rebuild
```
