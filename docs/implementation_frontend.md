# KBase Frontend Implementation Documentation

**Generated:** December 29, 2025  
**Version:** 1.0.0  
**Author:** GitHub Copilot

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Component Library](#component-library)
6. [State Management](#state-management)
7. [Routing Configuration](#routing-configuration)
8. [API Services](#api-services)
9. [Type System](#type-system)
10. [Styling System](#styling-system)
11. [Running the Application](#running-the-application)
12. [Docker Deployment](#docker-deployment)
13. [Best Practices Applied](#best-practices-applied)

---

## Project Overview

KBase Frontend is a modern React-based single-page application (SPA) that provides the user interface for the KBase knowledge management system. It connects to the Spring Boot backend via REST API calls with JWT-based authentication.

### Key Features Implemented

- ✅ User Authentication (Login/Register with JWT)
- ✅ Role-based Navigation and Access Control
- ✅ Dashboard with Statistics Overview
- ✅ Project Management (CRUD + Members)
- ✅ Document Management (List/View/Upload)
- ✅ User Management (Admin Panel)
- ✅ Responsive Layout Design
- ✅ Reusable UI Component Library
- ✅ Docker Support with Nginx

---

## Architecture

The application follows a **Component-Based Architecture** with separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        Pages Layer                           │
│  (Feature pages, route components, page-level logic)         │
├─────────────────────────────────────────────────────────────┤
│                     Components Layer                         │
│  ┌─────────────────────┐    ┌─────────────────────────────┐ │
│  │   Layout Components │    │      UI Components          │ │
│  │  (Header, Sidebar,  │    │  (Button, Input, Card,      │ │
│  │   MainLayout, etc.) │    │   Modal, Alert, etc.)       │ │
│  └─────────────────────┘    └─────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                      Context Layer                           │
│  (AuthContext - Global authentication state management)      │
├─────────────────────────────────────────────────────────────┤
│                     Services Layer                           │
│  (API client, Auth service, User service, Project service,   │
│   Document service - HTTP communication with backend)        │
├─────────────────────────────────────────────────────────────┤
│                       Types Layer                            │
│  (TypeScript interfaces, type definitions, enums)            │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component → Service → API → Backend
                ↓
           Context Update (if needed)
                ↓
           UI Re-render
```

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 19.2.0 |
| Language | TypeScript | 5.9.3 |
| Build Tool | Vite | 7.2.4 |
| Styling | Tailwind CSS | 4.1.18 |
| Routing | React Router DOM | 7.11.0 |
| HTTP Client | Axios | 1.13.2 |
| Icons | Lucide React | 0.562.0 |
| Linting | ESLint | 9.39.1 |

---

## Project Structure

```
frontend/
├── src/
│   ├── main.tsx                              # Application entry point
│   ├── App.tsx                               # Root component with routing
│   ├── index.css                             # Global styles + Tailwind config
│   ├── vite-env.d.ts                         # Vite type declarations
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── index.ts                      # Layout exports
│   │   │   ├── Header.tsx                    # Top navigation bar
│   │   │   ├── Sidebar.tsx                   # Side navigation menu
│   │   │   ├── MainLayout.tsx                # Protected pages layout
│   │   │   └── AuthLayout.tsx                # Auth pages layout
│   │   │
│   │   └── ui/
│   │       ├── index.ts                      # UI component exports
│   │       ├── Button.tsx                    # Button variants
│   │       ├── Input.tsx                     # Form input with label/error
│   │       ├── Card.tsx                      # Card container components
│   │       ├── LoadingSpinner.tsx            # Loading indicator
│   │       ├── Alert.tsx                     # Alert/notification component
│   │       └── Modal.tsx                     # Modal dialog component
│   │
│   ├── contexts/
│   │   ├── index.ts                          # Context exports
│   │   └── AuthContext.tsx                   # Authentication context
│   │
│   ├── pages/
│   │   ├── index.ts                          # Page exports
│   │   ├── NotFoundPage.tsx                  # 404 page
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx                 # Login form
│   │   │   └── RegisterPage.tsx              # Registration form
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx             # Main dashboard
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectListPage.tsx           # Projects list
│   │   │   ├── CreateProjectPage.tsx         # New project form
│   │   │   └── ProjectDetailPage.tsx         # Project details + members
│   │   │
│   │   ├── documents/
│   │   │   ├── DocumentListPage.tsx          # Documents list
│   │   │   ├── UploadDocumentPage.tsx        # Document upload form
│   │   │   └── DocumentDetailPage.tsx        # Document details
│   │   │
│   │   ├── users/
│   │   │   └── UserListPage.tsx              # User management (admin)
│   │   │
│   │   └── settings/
│   │       └── SettingsPage.tsx              # User settings
│   │
│   ├── services/
│   │   ├── index.ts                          # Service exports
│   │   ├── api.ts                            # Axios instance + interceptors
│   │   ├── authService.ts                    # Authentication API calls
│   │   ├── userService.ts                    # User API calls
│   │   ├── projectService.ts                 # Project API calls
│   │   └── documentService.ts                # Document API calls
│   │
│   ├── types/
│   │   └── index.ts                          # TypeScript type definitions
│   │
│   └── assets/                               # Static assets
│
├── public/                                   # Public static files
├── .env                                      # Production environment
├── .env.development                          # Development environment
├── vite.config.ts                            # Vite configuration
├── tsconfig.json                             # TypeScript configuration
├── tsconfig.app.json                         # App TypeScript config
├── tsconfig.node.json                        # Node TypeScript config
├── eslint.config.js                          # ESLint configuration
├── Dockerfile                                # Docker multi-stage build
├── nginx.conf                                # Nginx production config
├── .dockerignore                             # Docker ignore file
└── package.json                              # Dependencies and scripts
```

---

## Component Library

### UI Components

#### Button
Reusable button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui';

// Variants: primary | secondary | destructive | outline | ghost
// Sizes: sm | md | lg

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Button variant="destructive" disabled>
  Delete
</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `primary` \| `secondary` \| `destructive` \| `outline` \| `ghost` | `primary` | Button style variant |
| size | `sm` \| `md` \| `lg` | `md` | Button size |
| disabled | `boolean` | `false` | Disable button |
| type | `button` \| `submit` \| `reset` | `button` | Button type |
| children | `ReactNode` | - | Button content |

#### Input
Form input with integrated label, error message, and helper text.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Email is required"
  helperText="We'll never share your email"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Input label |
| error | `string` | - | Error message |
| helperText | `string` | - | Helper text below input |
| All standard input props | - | - | Inherits HTML input attributes |

#### Card
Container component for content sections.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

#### Alert
Notification component with multiple variants.

```tsx
import { Alert } from '@/components/ui';

// Variants: default | success | warning | destructive

<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>
```

#### Modal
Dialog component for overlays and confirmations.

```tsx
import { Modal } from '@/components/ui';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Delete"
>
  Are you sure you want to delete this item?
</Modal>
```

#### LoadingSpinner
Animated loading indicator.

```tsx
import { LoadingSpinner } from '@/components/ui';

// Sizes: sm | md | lg

<LoadingSpinner size="lg" />
```

### Layout Components

#### MainLayout
Protected pages wrapper with header and sidebar navigation.

```tsx
// Used automatically via routing
<Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
  <Route path="/dashboard" element={<DashboardPage />} />
</Route>
```

#### AuthLayout
Authentication pages wrapper with branded side panel.

```tsx
// Used automatically via routing
<Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
  <Route path="/login" element={<LoginPage />} />
</Route>
```

#### Header
Top navigation bar with user dropdown and logout.

#### Sidebar
Side navigation menu with role-based menu items.

---

## State Management

### Authentication Context

The `AuthContext` provides global authentication state management.

```tsx
import { useAuth } from '@/contexts';

const MyComponent = () => {
  const {
    user,              // Current user object
    isAuthenticated,   // Boolean: is user logged in
    isLoading,         // Boolean: auth state loading
    login,             // Function: log in user
    register,          // Function: register new user
    logout,            // Function: log out user
    updateUser,        // Function: update user data
  } = useAuth();

  return <div>Welcome, {user?.fullName}</div>;
};
```

#### Context Interface

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}
```

#### Token Storage

- JWT token stored in `localStorage` under key `token`
- User object stored in `localStorage` under key `user`
- Automatic token injection via Axios interceptor
- Automatic logout on 401 responses

---

## Routing Configuration

### Route Structure

| Path | Component | Auth Required | Description |
|------|-----------|---------------|-------------|
| `/` | Redirect | - | Redirects to `/dashboard` |
| `/login` | LoginPage | No (redirect if auth) | User login |
| `/register` | RegisterPage | No (redirect if auth) | User registration |
| `/dashboard` | DashboardPage | Yes | Main dashboard |
| `/projects` | ProjectListPage | Yes | Project list |
| `/projects/new` | CreateProjectPage | Yes | Create project form |
| `/projects/:id` | ProjectDetailPage | Yes | Project details |
| `/projects/:projectId/upload` | UploadDocumentPage | Yes | Upload document |
| `/documents` | DocumentListPage | Yes | All documents list |
| `/documents/:id` | DocumentDetailPage | Yes | Document details |
| `/users` | UserListPage | Yes (admin) | User management |
| `/settings` | SettingsPage | Yes | User settings |
| `/profile` | SettingsPage | Yes | User profile |
| `*` | NotFoundPage | - | 404 page |

### Route Protection

```tsx
// ProtectedRoute: Requires authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
};

// PublicRoute: Redirects to dashboard if authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  
  return children;
};
```

---

## API Services

### Base API Configuration

```typescript
// src/services/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Request interceptor: adds JWT token
// Response interceptor: handles 401 errors
```

### Service Methods

#### Auth Service (`authService.ts`)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `login` | `email, password` | `AuthResponse` | Authenticate user |
| `register` | `RegisterRequest` | `AuthResponse` | Register new user |
| `getMe` | - | `User` | Get current user |
| `validateToken` | - | `{ valid: boolean }` | Validate JWT token |

#### User Service (`userService.ts`)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getUsers` | `page?, size?` | `PagedResponse<User>` | Get paginated users |
| `getUserById` | `id` | `User` | Get user by ID |
| `createUser` | `CreateUserRequest` | `User` | Create new user |
| `updateUser` | `id, UpdateUserRequest` | `User` | Update user |
| `deleteUser` | `id` | `void` | Delete user |
| `searchUsers` | `query, page?, size?` | `PagedResponse<User>` | Search users |

#### Project Service (`projectService.ts`)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getProjects` | `page?, size?` | `PagedResponse<Project>` | Get paginated projects |
| `getProjectById` | `id` | `Project` | Get project by ID |
| `createProject` | `CreateProjectRequest` | `Project` | Create project |
| `updateProject` | `id, UpdateProjectRequest` | `Project` | Update project |
| `deleteProject` | `id` | `void` | Delete project |
| `getProjectMembers` | `projectId` | `ProjectMember[]` | Get project members |
| `addMember` | `projectId, AddMemberRequest` | `ProjectMember` | Add member |
| `removeMember` | `projectId, userId` | `void` | Remove member |
| `getMyProjects` | `page?, size?` | `PagedResponse<Project>` | Get user's projects |

#### Document Service (`documentService.ts`)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getDocuments` | `page?, size?` | `PagedResponse<Document>` | Get all documents |
| `getDocumentById` | `id` | `Document` | Get document by ID |
| `getDocumentsByProject` | `projectId, page?, size?` | `PagedResponse<Document>` | Get project documents |
| `uploadDocument` | `CreateDocumentRequest` | `Document` | Upload document |
| `updateDocument` | `id, UpdateDocumentRequest` | `Document` | Update document |
| `deleteDocument` | `id` | `void` | Delete document |
| `downloadDocument` | `id` | `Blob` | Download file |
| `searchDocuments` | `query, page?, size?` | `PagedResponse<Document>` | Search documents |

---

## Type System

### Core Types

```typescript
// User
interface User {
  userId: number;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type UserRole = 'ADMIN' | 'OWNER' | 'USER';

// Project
interface Project {
  projectId: number;
  projectName: string;
  description: string;
  ownerId: number;
  ownerName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  memberCount?: number;
  documentCount?: number;
}

// Document
interface Document {
  documentId: number;
  title: string;
  description: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  projectId: number;
  projectName: string;
  uploadedById: number;
  uploadedByName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Responses
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface PagedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  page: PageMetadata;
  timestamp: string;
}
```

---

## Styling System

### Tailwind CSS v4 Configuration

The project uses Tailwind CSS v4 with the Vite plugin for zero-config styling.

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-primary: hsl(221.2 83.2% 53.3%);
  --color-primary-foreground: hsl(210 40% 98%);
  --color-secondary: hsl(210 40% 96.1%);
  --color-destructive: hsl(0 84.2% 60.2%);
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(222.2 84% 4.9%);
  --color-border: hsl(214.3 31.8% 91.4%);
  --color-muted: hsl(210 40% 96.1%);
  --color-muted-foreground: hsl(215.4 16.3% 46.9%);
  --color-accent: hsl(210 40% 96.1%);
  --radius: 0.5rem;
}
```

### Color Palette

| Variable | Usage |
|----------|-------|
| `--color-primary` | Primary brand color (blue) |
| `--color-primary-foreground` | Text on primary backgrounds |
| `--color-secondary` | Secondary backgrounds |
| `--color-destructive` | Error/danger states (red) |
| `--color-background` | Page backgrounds |
| `--color-foreground` | Main text color |
| `--color-border` | Border colors |
| `--color-muted` | Muted backgrounds |
| `--color-muted-foreground` | Secondary text |

### Using Custom Colors

```tsx
// Use with Tailwind utility classes
<div className="bg-primary text-primary-foreground">
  Primary styled content
</div>

<button className="bg-destructive hover:bg-destructive/90">
  Delete
</button>
```

---

## Running the Application

### Prerequisites

- Node.js 20+ 
- npm 10+
- Backend running on port 8080

### Development Mode

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start at `http://localhost:3000` (or 3001 if 3000 is occupied).

### Environment Variables

```bash
# .env.development
VITE_API_URL=/api

# .env (production)
VITE_API_URL=/api
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Build for production |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | Run ESLint |

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

---

## Docker Deployment

### Dockerfile (Multi-stage Build)

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to backend
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Building Docker Image

```powershell
# Build image
docker build -t kbase-frontend:latest .

# Run container
docker run -p 80:80 kbase-frontend:latest
```

### Docker Compose Integration

The frontend is designed to work with the project's docker-compose setup:

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

## Best Practices Applied

### Code Organization

- ✅ **Feature-based folder structure**: Pages organized by feature (auth, projects, documents)
- ✅ **Barrel exports**: Index files for clean imports (`import { Button } from '@/components/ui'`)
- ✅ **Path aliases**: `@/` alias for clean imports instead of relative paths
- ✅ **Separation of concerns**: Clear separation between components, services, and types

### TypeScript

- ✅ **Strict typing**: All components and functions are typed
- ✅ **Interface definitions**: All API responses and requests are typed
- ✅ **Type exports**: Centralized type definitions in `types/index.ts`
- ✅ **Generic types**: Reusable `ApiResponse<T>` and `PagedResponse<T>` types

### React Patterns

- ✅ **Functional components**: All components use functional approach with hooks
- ✅ **Custom hooks**: `useAuth` hook for authentication state
- ✅ **Context API**: Global state management for authentication
- ✅ **Composition**: Small, reusable UI components composed into larger ones
- ✅ **Protected routes**: Route guards for authentication

### API Communication

- ✅ **Centralized API client**: Single Axios instance with interceptors
- ✅ **Service layer**: API calls abstracted into service functions
- ✅ **Error handling**: Centralized error handling in Axios interceptors
- ✅ **Token management**: Automatic JWT injection and 401 handling

### Security

- ✅ **JWT storage**: Token stored in localStorage (consider httpOnly cookies for production)
- ✅ **Auto logout**: Automatic logout on token expiration (401)
- ✅ **Protected routes**: Client-side route protection
- ✅ **Role-based UI**: Menu items shown based on user role

### Styling

- ✅ **Utility-first CSS**: Tailwind CSS for rapid development
- ✅ **Design system**: Consistent color palette and spacing
- ✅ **Component classes**: Reusable CSS classes for common components
- ✅ **Responsive design**: Mobile-friendly layouts

### Performance

- ✅ **Code splitting**: React Router handles route-based code splitting
- ✅ **Optimized builds**: Vite production builds with tree-shaking
- ✅ **Asset optimization**: Vite handles asset optimization

### Developer Experience

- ✅ **Hot Module Replacement**: Fast development with Vite HMR
- ✅ **ESLint**: Code quality enforcement
- ✅ **TypeScript strict mode**: Catch errors at compile time
- ✅ **Path aliases**: Clean imports without `../../` chains

---

## Future Improvements

### Recommended Enhancements

1. **Testing**: Add Jest/Vitest with React Testing Library
2. **State Management**: Consider Zustand or TanStack Query for complex state
3. **Form Management**: Add React Hook Form for better form handling
4. **Accessibility**: Add ARIA labels and keyboard navigation
5. **i18n**: Add internationalization support
6. **PWA**: Add service worker for offline support
7. **Error Boundaries**: Add React error boundaries for better error handling
8. **Analytics**: Add usage analytics tracking
9. **Theme Switching**: Add dark mode support
10. **File Previews**: Add preview capability for uploaded documents

---

## Troubleshooting

### Common Issues

#### Port Already in Use
```
Port 3000 is in use, trying another one...
```
Vite automatically finds an available port. Check terminal for the actual URL.

#### API Connection Failed
Ensure the backend is running on port 8080 before starting the frontend.

#### TypeScript Errors
Run `npm run lint` to check for issues. Ensure all imports use the `@/` alias.

#### Tailwind Classes Not Working
The project uses Tailwind v4. Ensure you're using the correct syntax (no `tailwind.config.js` needed).

---

*This documentation was generated for KBase Frontend v1.0.0*
