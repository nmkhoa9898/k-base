import api from './api';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest, 
  ProjectMember,
  AddMemberRequest,
  ApiResponse, 
  PagedResponse 
} from '@/types';

export const projectService = {
  getAll: async (page = 0, size = 10): Promise<PagedResponse<Project>> => {
    const response = await api.get<PagedResponse<Project>>('/projects', {
      params: { page, size },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },

  getMyProjects: async (page = 0, size = 10): Promise<PagedResponse<Project>> => {
    const response = await api.get<PagedResponse<Project>>('/projects/my', {
      params: { page, size },
    });
    return response.data;
  },

  search: async (query: string, page = 0, size = 10): Promise<PagedResponse<Project>> => {
    const response = await api.get<PagedResponse<Project>>('/projects/search', {
      params: { query, page, size },
    });
    return response.data;
  },

  create: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await api.post<ApiResponse<Project>>('/projects', data);
    return response.data.data;
  },

  update: async (id: number, data: UpdateProjectRequest): Promise<Project> => {
    const response = await api.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // Member management
  getMembers: async (projectId: number): Promise<ProjectMember[]> => {
    const response = await api.get<ApiResponse<ProjectMember[]>>(`/projects/${projectId}/members`);
    return response.data.data;
  },

  addMember: async (projectId: number, data: AddMemberRequest): Promise<ProjectMember> => {
    const response = await api.post<ApiResponse<ProjectMember>>(`/projects/${projectId}/members`, data);
    return response.data.data;
  },

  removeMember: async (projectId: number, userId: number): Promise<void> => {
    await api.delete(`/projects/${projectId}/members/${userId}`);
  },

  updateMemberRole: async (projectId: number, userId: number, role: string): Promise<ProjectMember> => {
    const response = await api.put<ApiResponse<ProjectMember>>(
      `/projects/${projectId}/members/${userId}`,
      { role }
    );
    return response.data.data;
  },
};

export default projectService;
