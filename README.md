# KBase - Knowledge Base Management System

A full-stack knowledge base application for managing projects, documents, and team collaboration. Built with Spring Boot, React, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Java 21 (OpenJDK)
- Node.js 18+ and npm
- PostgreSQL 15+ (or Docker)
- Maven

### Development Setup

1. **Start the database** (using Docker):
   ```powershell
   docker compose -f docker/docker-compose.db.yml up -d
   ```

2. **Start the backend**:
   ```powershell
   cd backend
   mvn spring-boot:run -Dspring-boot.run.profiles=local
   ```

3. **Start the frontend**:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api
   - API Health Check: http://localhost:8080/api/ping

### Test Accounts
| Role  | Email                        | Password      |
|-------|------------------------------|---------------|
| Admin | admin@kbase.dev              | Password123!  |
| Owner | john.smith@techcorp.com      | Password123!  |
| User  | alice.taylor@techcorp.com    | Password123!  |

## 📁 Project Structure

```
KBase/
├── backend/          # Spring Boot REST API
│   └── src/main/java/com/example/kbase_backend/
│       ├── config/       # Security & app configuration
│       ├── controller/   # REST endpoints
│       ├── dto/          # Data transfer objects
│       ├── entity/       # JPA entities
│       ├── exception/    # Custom exceptions & handlers
│       ├── repository/   # Data access layer
│       ├── security/     # JWT authentication
│       └── service/      # Business logic
├── frontend/         # React + TypeScript application
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── contexts/     # React contexts (Auth)
│       ├── pages/        # Page components
│       ├── services/     # API client services
│       ├── types/        # TypeScript type definitions
│       └── utils/        # Utility functions
├── docker/           # Docker Compose configurations
├── docs/             # Project documentation
└── scripts/          # Development & deployment scripts
```

## ✨ Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Owner, User)
- Secure password handling with BCrypt

### Project Management
- Create and manage projects
- Add/remove team members
- Project search functionality
- Owner and member role assignments

### Document Management
- Upload documents to projects
- Document metadata and descriptions
- File size and type tracking
- Project-scoped document organization

### Admin Features
- Database overview dashboard
- User management
- System-wide statistics

### User Interface
- Responsive dashboard
- Clean, modern UI with Tailwind CSS
- Real-time form validation
- Loading states and error handling

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 21
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL with JPA/Hibernate
- **Build**: Maven

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Icons**: Lucide React

### Infrastructure
- **Database**: PostgreSQL 15
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (for Docker deployment)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - List users (paginated)
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Projects
- `GET /api/projects` - List projects (paginated)
- `GET /api/projects/my` - Get current user's projects
- `GET /api/projects/search?q=` - Search projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `GET /api/projects/{id}/members` - List project members
- `POST /api/projects/{id}/members` - Add member
- `DELETE /api/projects/{id}/members/{userId}` - Remove member

### Documents
- `GET /api/documents` - List documents (paginated)
- `GET /api/documents/{id}` - Get document by ID
- `GET /api/documents/project/{projectId}` - Get project documents
- `POST /api/documents` - Upload document (multipart)
- `PUT /api/documents/{id}` - Update document
- `DELETE /api/documents/{id}` - Delete document

### Admin
- `GET /api/admin/database-overview` - Database statistics (Admin only)

## 🔧 Configuration

### Backend Profiles
- `default` - H2 in-memory database
- `local` - Local PostgreSQL connection

### Environment Variables
```bash
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/kbase
SPRING_DATASOURCE_USERNAME=kbase_user
SPRING_DATASOURCE_PASSWORD=kbase_password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
```

## 🔒 Security Notes

- Never commit real passwords to source control
- Use environment variables or `.env` files (excluded from git)
- JWT tokens expire after 24 hours by default
- All passwords are hashed with BCrypt

## 📚 Documentation

- [Project Description](docs/project_description.md)
- [Backend Documentation](docs/project_backend.md)
- [Database Schema](docs/project_database.md)
- [Learning Roadmap](docs/learning_roadmap.md)

## 📄 License

This project is for educational purposes.
