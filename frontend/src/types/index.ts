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
  accessToken: string;
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
  ownerEmail?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  memberCount?: number;
  documentCount?: number;
}

export interface CreateProjectRequest {
  projectName: string;
  description?: string;
  ownerId: number;
}

export interface UpdateProjectRequest {
  projectName?: string;
  description?: string;
}

// Backend uses different field names for ProjectMember
export interface ProjectMember {
  projectId?: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  role: MemberRole;
  isActive?: boolean;
  joinedAt: string;
}

export type MemberRole = 'OWNER' | 'MEMBER';

export interface AddMemberRequest {
  userId: number;
  role?: MemberRole;
}

// Document types - match backend DocumentDTO
export interface Document {
  documentId: number;
  projectId: number;
  projectName: string;
  uploadedById: number;
  uploadedByName: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  mimeType: string;
  description: string;
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
  status: number;
  message: string;
  result: T;
  timestamp: string;
}

export interface PagedResponse<T> {
  status: number;
  message: string;
  data: T[];
  page: PageMetadata;
  timestamp: string;
}

// Backend PageMetadata uses 'page' and 'size', not 'currentPage' and 'pageSize'
export interface PageMetadata {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
