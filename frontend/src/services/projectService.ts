import api from './api';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest, 
  ProjectMember,
  AddMemberRequest,
  ApiResponse, 
  PagedResponse,
} from '@/types';
import { PagedListResponse, toPagedResponse } from '@/utils';

export const projectService = {
  getAll: async (page = 0, size = 10): Promise<PagedResponse<Project>> => {
    const response = await api.get<PagedListResponse<Project>>('/projects', {
      params: { page, size },
    });
    return toPagedResponse(response.data);
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.result;
  },

  getMyProjects: async (page = 0, size = 10): Promise<PagedResponse<Project>> => {
    const response = await api.get<PagedListResponse<Project>>('/projects/my', {
      params: { page, size },
    });
    return toPagedResponse(response.data);
  },

  search: async (query: string, page = 0, size = 10): Promise<PagedResponse<Project>> => {
    const response = await api.get<PagedListResponse<Project>>('/projects/search', {
      params: { q: query, page, size },
    });
    return toPagedResponse(response.data);
  },

  create: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await api.post<ApiResponse<Project>>('/projects', data);
    return response.data.result;
  },

  update: async (id: number, data: UpdateProjectRequest): Promise<Project> => {
    const response = await api.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.result;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // Member management
  getMembers: async (projectId: number): Promise<ProjectMember[]> => {
    const response = await api.get<ApiResponse<ProjectMember[]>>(`/projects/${projectId}/members`);
    return response.data.result;
  },

  addMember: async (projectId: number, data: AddMemberRequest): Promise<ProjectMember> => {
    const response = await api.post<ApiResponse<ProjectMember>>(`/projects/${projectId}/members`, data);
    return response.data.result;
  },

  removeMember: async (projectId: number, userId: number): Promise<void> => {
    await api.delete(`/projects/${projectId}/members/${userId}`);
  },
};
