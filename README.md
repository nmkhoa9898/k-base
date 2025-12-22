# KBase - Knowledge Base System

A comprehensive full-stack knowledge base application built with Spring Boot (backend), React (frontend), and PostgreSQL (database).

## Project Structure

- `backend/` - Spring Boot REST API
- `frontend/` - React web application
- `database/` - PostgreSQL schemas and migrations
- `docs/` - Project documentation and requirements
- `docker/` - Docker configurations
- `scripts/` - Build and deployment scripts

## Getting Started

See `docs/learning_roadmap.md` for detailed setup instructions.

## Backend — Run locally

Prerequisites:
- Java 21 (OpenJDK) installed and `JAVA_HOME` set
- Maven installed (`mvn` available)
- (Optional) Docker, if running PostgreSQL with compose

Build and run (packaged jar):

```powershell
mvn -f backend -DskipTests package
Start-Process -FilePath 'java' -ArgumentList '-jar','backend\\target\\kbase-backend-0.0.1-SNAPSHOT.jar' -NoNewWindow -PassThru
```

Run in development (Spring Boot run):

```powershell
mvn -f backend spring-boot:run
```

Test the ping endpoint:

```powershell
Invoke-RestMethod 'http://localhost:8080/api/ping'
# Expected output: pong
```

Stop the running backend:

```powershell
Get-Process -Name java | Stop-Process -Force
# Or stop the specific process ID that is running the jar
```

Notes:
- By default the project includes an in-memory H2 database for development; to use PostgreSQL, update `backend/src/main/resources/application.yaml` with your `spring.datasource.*` settings or start Postgres via `docker compose` and update the settings accordingly.
- If Docker Compose is used, run `docker compose -f docker/docker-compose.yml up -d` to start services and `docker compose -f docker/docker-compose.yml down` to stop them.

## Features

- User authentication and authorization
- Project and document management
- File upload and storage
- Search functionality
- Optional AI-powered features

## Technologies

- Backend: Java 17/21, Spring Boot 3.x
- Frontend: React, TypeScript
- Database: PostgreSQL
- Containerization: Docker
- IDE: VS Code (recommended)