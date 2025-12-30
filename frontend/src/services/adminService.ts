import api from './api';
import { ApiResponse } from '@/types';

export interface DatabaseStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalDocuments: number;
  activeDocuments: number;
  totalMemberships: number;
}

export interface AdminUser {
  userId: number;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProject {
  projectId: number;
  projectName: string;
  description: string;
  ownerId: number;
  ownerName: string;
  ownerEmail: string;
  isActive: boolean;
  memberCount: number;
  documentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminDocument {
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

export interface AdminMembership {
  projectId: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  role: string;
  isActive: boolean;
  joinedAt: string;
}

export interface DatabaseOverview {
  users: AdminUser[];
  projects: AdminProject[];
  documents: AdminDocument[];
  projectMembers: AdminMembership[];
  stats: DatabaseStats;
}

export const adminService = {
  getDatabaseOverview: async (): Promise<DatabaseOverview> => {
    const response = await api.get<ApiResponse<DatabaseOverview>>('/admin/database');
    return response.data.result;
  },

  getAllUsers: async (): Promise<AdminUser[]> => {
    const response = await api.get<ApiResponse<AdminUser[]>>('/admin/users');
    return response.data.result;
  },

  getAllProjects: async (): Promise<AdminProject[]> => {
    const response = await api.get<ApiResponse<AdminProject[]>>('/admin/projects');
    return response.data.result;
  },

  getAllDocuments: async (): Promise<AdminDocument[]> => {
    const response = await api.get<ApiResponse<AdminDocument[]>>('/admin/documents');
    return response.data.result;
  },

  getAllMemberships: async (): Promise<AdminMembership[]> => {
    const response = await api.get<ApiResponse<AdminMembership[]>>('/admin/memberships');
    return response.data.result;
  },

  getStats: async (): Promise<DatabaseStats> => {
    const response = await api.get<ApiResponse<DatabaseStats>>('/admin/stats');
    return response.data.result;
  },
};

export default adminService;
