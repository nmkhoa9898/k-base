// User types
export interface User {
  userId: number;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'ADMIN' | 'OWNER' | 'USER';

export interface CreateUserRequest {
  email: string;
  password: string;
  fullName: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  fullName?: string;
  role?: UserRole;
  isActive?: boolean;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  role?: UserRole;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

// Project types
export interface Project {
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

export interface CreateProjectRequest {
  projectName: string;
  description?: string;
}

export interface UpdateProjectRequest {
  projectName?: string;
  description?: string;
}

export interface ProjectMember {
  userId: number;
  email: string;
  fullName: string;
  role: MemberRole;
  joinedAt: string;
}

export type MemberRole = 'OWNER' | 'MEMBER';

export interface AddMemberRequest {
  userId: number;
  role?: MemberRole;
}

// Document types
export interface Document {
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

export interface CreateDocumentRequest {
  title: string;
  description?: string;
  projectId: number;
  file: File;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PagedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  page: PageMetadata;
  timestamp: string;
}

export interface PageMetadata {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Form validation types
export interface FormError {
  field: string;
  message: string;
}
