# KBase Backend Implementation Documentation

**Generated:** December 29, 2025  
**Version:** 1.0.0  
**Author:** GitHub Copilot

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Database Design](#database-design)
6. [API Endpoints](#api-endpoints)
7. [Security Implementation](#security-implementation)
8. [Configuration](#configuration)
9. [Running the Application](#running-the-application)
10. [Testing](#testing)
11. [Docker Deployment](#docker-deployment)
12. [Best Practices Applied](#best-practices-applied)

---

## Project Overview

KBase is a comprehensive knowledge base system where teams can store and manage project information. This document covers the complete backend implementation using Spring Boot.

### Key Features Implemented

- ✅ User Management (CRUD with roles: ADMIN, OWNER, USER)
- ✅ Project Management (CRUD with member collaboration)
- ✅ Document Management (metadata storage for files)
- ✅ JWT-based Authentication
- ✅ Role-based Authorization
- ✅ OpenAPI/Swagger Documentation
- ✅ Global Exception Handling
- ✅ Pagination Support
- ✅ Docker Support

---

## Architecture

The application follows a **layered architecture** pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                     Controller Layer                         │
│  (REST endpoints, request/response handling, validation)     │
├─────────────────────────────────────────────────────────────┤
│                      Service Layer                           │
│  (Business logic, data transformation, transaction mgmt)     │
├─────────────────────────────────────────────────────────────┤
│                    Repository Layer                          │
│  (Data access, JPA queries, custom queries)                  │
├─────────────────────────────────────────────────────────────┤
│                      Entity Layer                            │
│  (JPA entities, database mapping)                            │
├─────────────────────────────────────────────────────────────┤
│                       Database                               │
│  (PostgreSQL / H2)                                           │
└─────────────────────────────────────────────────────────────┘
```

### Cross-cutting Concerns

- **Security Layer**: JWT authentication, role-based access control
- **Exception Handling**: Global exception handler with standardized responses
- **DTO Pattern**: Separate DTOs for requests/responses, preventing entity exposure

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Spring Boot | 3.4.1 |
| Language | Java | 21 |
| Build Tool | Maven | 3.x |
| Database | PostgreSQL / H2 | 15+ / 2.x |
| ORM | Spring Data JPA / Hibernate | 6.x |
| Security | Spring Security | 6.x |
| JWT | jjwt | 0.12.6 |
| API Docs | SpringDoc OpenAPI | 2.7.0 |
| Validation | Jakarta Validation | 3.x |
| Lombok | Lombok | Latest |

---

## Project Structure

```
backend/
├── src/main/java/com/example/kbase_backend/
│   ├── KBaseBackendApplication.java          # Main application entry point
│   │
│   ├── config/
│   │   ├── SecurityConfig.java               # Spring Security configuration
│   │   └── OpenApiConfig.java                # Swagger/OpenAPI configuration
│   │
│   ├── controller/
│   │   ├── AuthController.java               # Authentication endpoints
│   │   ├── UserController.java               # User management endpoints
│   │   ├── ProjectController.java            # Project management endpoints
│   │   ├── DocumentController.java           # Document management endpoints
│   │   └── PingController.java               # Health check endpoints
│   │
│   ├── dto/
│   │   ├── auth/
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   └── AuthResponse.java
│   │   ├── user/
│   │   │   ├── UserDTO.java
│   │   │   ├── CreateUserRequest.java
│   │   │   └── UpdateUserRequest.java
│   │   ├── project/
│   │   │   ├── ProjectDTO.java
│   │   │   ├── CreateProjectRequest.java
│   │   │   ├── UpdateProjectRequest.java
│   │   │   ├── ProjectMemberDTO.java
│   │   │   └── AddMemberRequest.java
│   │   ├── document/
│   │   │   ├── DocumentDTO.java
│   │   │   ├── CreateDocumentRequest.java
│   │   │   └── UpdateDocumentRequest.java
│   │   └── common/
│   │       ├── ApiResponse.java              # Standard API response wrapper
│   │       └── PageMetadata.java             # Pagination metadata
│   │
│   ├── entity/
│   │   ├── User.java                         # User entity
│   │   ├── Project.java                      # Project entity
│   │   ├── ProjectMember.java                # Project membership entity
│   │   ├── ProjectMemberId.java              # Composite key for ProjectMember
│   │   ├── Document.java                     # Document entity
│   │   └── enums/
│   │       ├── UserRole.java                 # ADMIN, OWNER, USER
│   │       └── MemberRole.java               # OWNER, MEMBER
│   │
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java       # Central exception handling
│   │   ├── ResourceNotFoundException.java
│   │   ├── DuplicateResourceException.java
│   │   ├── AuthenticationException.java
│   │   ├── AccessDeniedException.java
│   │   └── BadRequestException.java
│   │
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── ProjectRepository.java
│   │   ├── ProjectMemberRepository.java
│   │   └── DocumentRepository.java
│   │
│   ├── security/
│   │   ├── CustomUserDetailsService.java     # Spring Security UserDetailsService
│   │   ├── JwtTokenProvider.java             # JWT token generation/validation
│   │   ├── JwtAuthenticationFilter.java      # JWT filter for requests
│   │   └── JwtAuthenticationEntryPoint.java  # Unauthorized response handler
│   │
│   └── service/
│       ├── AuthService.java                  # Authentication business logic
│       ├── UserService.java                  # User business logic
│       ├── ProjectService.java               # Project business logic
│       └── DocumentService.java              # Document business logic
│
├── src/main/resources/
│   ├── application.yaml                      # Default configuration (H2)
│   ├── application-local.yaml                # Local PostgreSQL configuration
│   └── application-docker.yaml               # Docker configuration
│
├── src/test/
│   ├── java/                                 # Test classes
│   └── resources/
│       └── application-test.yaml             # Test configuration
│
├── Dockerfile                                # Docker image configuration
├── .dockerignore                             # Docker ignore file
└── pom.xml                                   # Maven dependencies
```

---

## Database Design

### Entity Relationship Diagram

```
┌─────────────────┐
│     USERS       │
│─────────────────│
│ PK: user_id     │
│     email       │──────────────────────────────────────────┐
│     password    │                                          │
│     full_name   │                                          │
│     role        │                                          │
│     is_active   │                                          │
└─────────────────┘                                          │
         │                                                   │
         │ 1:N (owns)                                        │
         ▼                                                   │
┌─────────────────┐           ┌──────────────────┐           │
│    PROJECTS     │◄──────────│ PROJECT_MEMBERS  │───────────┘
│─────────────────│   N:M     │──────────────────│   (joins)
│ PK: project_id  │           │ PK: project_id,  │
│     name        │           │     user_id      │
│     description │           │     role         │
│ FK: owner_id    │           │     is_active    │
│     is_active   │           │     joined_at    │
└─────────────────┘           └──────────────────┘
         │
         │ 1:N (has)
         ▼
┌─────────────────┐
│   DOCUMENTS     │
│─────────────────│
│ PK: document_id │
│     title       │
│     file_name   │
│     file_type   │
│     file_size   │
│     storage_path│
│ FK: project_id  │
│ FK: uploaded_by │
│     is_active   │
└─────────────────┘
```

### Table Specifications

#### Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| user_id | SERIAL | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| full_name | VARCHAR(255) | NOT NULL |
| role | VARCHAR(50) | NOT NULL, CHECK (ADMIN, OWNER, USER) |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | AUTO-UPDATE |

#### Projects Table
| Column | Type | Constraints |
|--------|------|-------------|
| project_id | SERIAL | PRIMARY KEY |
| project_name | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| owner_id | INTEGER | FK → users, NOT NULL, ON DELETE CASCADE |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | AUTO-UPDATE |

#### Project_Members Table
| Column | Type | Constraints |
|--------|------|-------------|
| project_id | INTEGER | PK, FK → projects, ON DELETE CASCADE |
| user_id | INTEGER | PK, FK → users, ON DELETE CASCADE |
| role | VARCHAR(50) | DEFAULT 'MEMBER', CHECK (OWNER, MEMBER) |
| is_active | BOOLEAN | DEFAULT true |
| joined_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

#### Documents Table
| Column | Type | Constraints |
|--------|------|-------------|
| document_id | SERIAL | PRIMARY KEY |
| project_id | INTEGER | FK → projects, NOT NULL, ON DELETE CASCADE |
| uploaded_by | INTEGER | FK → users, NOT NULL |
| title | VARCHAR(255) | |
| file_name | VARCHAR(255) | NOT NULL |
| file_type | VARCHAR(50) | NOT NULL |
| file_size | BIGINT | NOT NULL |
| storage_path | VARCHAR(500) | NOT NULL |
| mime_type | VARCHAR(100) | |
| description | TEXT | |
| is_active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | AUTO-UPDATE |

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/login` | Authenticate user | No |
| POST | `/register` | Register new user | No |
| GET | `/me` | Get current user | Yes |
| GET | `/validate` | Validate token | Yes |

### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all users (paginated) | Yes |
| GET | `/{id}` | Get user by ID | Yes |
| GET | `/role/{role}` | Get users by role | Yes |
| GET | `/search?q=` | Search users | Yes |
| POST | `/` | Create user | Yes (Admin) |
| PUT | `/{id}` | Update user | Yes |
| DELETE | `/{id}` | Delete user (soft) | Yes (Admin) |
| GET | `/check-email?email=` | Check email availability | Yes |

### Projects (`/api/projects`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all projects (paginated) | Yes |
| GET | `/{id}` | Get project by ID | Yes |
| GET | `/owner/{ownerId}` | Get projects by owner | Yes |
| GET | `/member/{userId}` | Get projects by member | Yes |
| GET | `/search?q=` | Search projects | Yes |
| POST | `/` | Create project | Yes |
| PUT | `/{id}` | Update project | Yes |
| DELETE | `/{id}` | Delete project (soft) | Yes |
| GET | `/{projectId}/members` | Get project members | Yes |
| POST | `/{projectId}/members` | Add project member | Yes |
| DELETE | `/{projectId}/members/{userId}` | Remove project member | Yes |
| GET | `/{projectId}/members/{userId}/check` | Check membership | Yes |

### Documents (`/api/documents`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all documents (paginated) | Yes |
| GET | `/{id}` | Get document by ID | Yes |
| GET | `/project/{projectId}` | Get documents by project | Yes |
| GET | `/uploader/{userId}` | Get documents by uploader | Yes |
| GET | `/project/{projectId}/type/{fileType}` | Get documents by file type | Yes |
| GET | `/project/{projectId}/search?q=` | Search documents in project | Yes |
| POST | `/` | Create document | Yes |
| PUT | `/{id}` | Update document | Yes |
| DELETE | `/{id}` | Delete document (soft) | Yes |
| GET | `/project/{projectId}/stats` | Get document statistics | Yes |

### Health (`/api`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/ping` | Simple health check | No |
| GET | `/health` | Detailed health status | No |

---

## Security Implementation

### Authentication Flow

```
1. User sends credentials to /api/auth/login
2. Server validates credentials
3. Server generates JWT token
4. Server returns token + user info
5. Client stores token
6. Client includes token in Authorization header for subsequent requests
7. JwtAuthenticationFilter extracts and validates token
8. If valid, user is authenticated for the request
```

### JWT Token Structure

```json
{
  "sub": "user@example.com",
  "iat": 1703836800,
  "exp": 1703923200
}
```

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| ADMIN | Full system access, user management, can delete users |
| OWNER | Create projects, manage own projects, invite members |
| USER | Access projects as member, upload documents |

### Security Headers

- CORS configured for frontend origins
- CSRF disabled (stateless API)
- Session management: STATELESS

---

## Configuration

### Environment Profiles

| Profile | Database | Use Case |
|---------|----------|----------|
| default | H2 (in-memory) | Quick development/testing |
| local | PostgreSQL (localhost) | Local development with persistent data |
| docker | PostgreSQL (container) | Docker deployment |
| test | H2 (in-memory) | Unit/integration testing |

### Key Configuration Properties

```yaml
# JWT Settings
app:
  jwt:
    secret: <base64-encoded-secret>  # Min 256 bits for HS256
    expiration-ms: 86400000          # 24 hours

# Database (example for PostgreSQL)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/kbase
    username: kbase_user
    password: kbase_password
  jpa:
    hibernate:
      ddl-auto: update              # create-drop for tests

# OpenAPI
springdoc:
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
```

---

## Running the Application

### Prerequisites

- Java 21 (OpenJDK recommended)
- Maven 3.x
- PostgreSQL 15+ (for local/production)
- Docker (optional)

### Development (H2 Database)

```bash
# Run with default profile (H2)
cd backend
mvn spring-boot:run
```

### Development (PostgreSQL)

```bash
# Start PostgreSQL (using Docker)
docker compose -f docker/docker-compose.db.yml up -d

# Run with local profile
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### Build JAR

```bash
cd backend
mvn clean package -DskipTests
java -jar target/kbase-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=local
```

### Access Points

- API Base URL: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs
- H2 Console: http://localhost:8080/h2-console (default profile only)

---

## Testing

### Run Tests

```bash
cd backend
mvn test
```

### Test with Coverage

```bash
mvn test jacoco:report
```

### Manual API Testing

1. Access Swagger UI at http://localhost:8080/swagger-ui.html
2. Register a new user via POST `/api/auth/register`
3. Copy the returned JWT token
4. Click "Authorize" button and enter: `Bearer <token>`
5. Test protected endpoints

### Sample Test Flow

```bash
# 1. Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123","fullName":"Test User"}'

# 2. Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'

# 3. Use token for authenticated requests
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer <your-token>"
```

---

## Docker Deployment

### Build and Run with Docker Compose

```bash
# Build and start all services
docker compose -f docker/docker-compose.yml up --build

# Stop services
docker compose -f docker/docker-compose.yml down
```

### Build Image Only

```bash
cd backend
docker build -t kbase-backend:latest .
```

### Run Container

```bash
docker run -d \
  --name kbase-backend \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=docker \
  -e JWT_SECRET=your-production-secret \
  kbase-backend:latest
```

---

## Best Practices Applied

### Code Quality

- ✅ **Layered Architecture**: Clear separation of concerns
- ✅ **DTO Pattern**: Entities never exposed directly
- ✅ **Dependency Injection**: Constructor injection via @RequiredArgsConstructor
- ✅ **Lombok**: Reduced boilerplate code
- ✅ **Input Validation**: Jakarta Validation annotations
- ✅ **Consistent Naming**: Clear, descriptive names

### Security

- ✅ **Password Hashing**: BCrypt encoder
- ✅ **JWT Authentication**: Stateless, token-based auth
- ✅ **Role-based Authorization**: @PreAuthorize annotations
- ✅ **CORS Configuration**: Controlled cross-origin access
- ✅ **Non-root Docker User**: Security best practice

### API Design

- ✅ **RESTful Conventions**: Proper HTTP methods and status codes
- ✅ **Consistent Response Format**: ApiResponse wrapper
- ✅ **Pagination**: Built-in support for large datasets
- ✅ **Error Handling**: Global exception handler with meaningful messages
- ✅ **API Documentation**: OpenAPI/Swagger integration

### Database

- ✅ **Soft Deletes**: isActive flag instead of hard deletes
- ✅ **Audit Fields**: createdAt, updatedAt timestamps
- ✅ **Indexing**: Indexes on frequently queried columns
- ✅ **Referential Integrity**: Foreign key constraints

### DevOps

- ✅ **Multi-stage Docker Build**: Smaller final image
- ✅ **Health Checks**: Docker and API health endpoints
- ✅ **Profile-based Configuration**: Easy environment switching
- ✅ **Logging Configuration**: Appropriate log levels per environment

---

## Future Enhancements

1. **File Upload Service**: Integration with MinIO/S3 for actual file storage
2. **Email Notifications**: User registration, project invitations
3. **Refresh Tokens**: More secure token rotation
4. **Rate Limiting**: API rate limiting for abuse prevention
5. **Caching**: Redis caching for frequently accessed data
6. **Audit Logging**: Track all data modifications
7. **Full-text Search**: Elasticsearch integration for document search
8. **AI Chatbot**: Integration with RAG system for intelligent Q&A

---

## Support

For questions or issues, please refer to:
- Project Documentation: `docs/` folder
- API Documentation: http://localhost:8080/swagger-ui.html
- Database Schema: `docker/database/01_init.sql`

---

*This documentation was automatically generated as part of the KBase backend implementation.*
