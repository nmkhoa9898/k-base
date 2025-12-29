import api from './api';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest, 
  ProjectMember,
  AddMemberRequest,
  ApiResponse, 
  PagedResponse,
  PageMetadata
} from '@/types';

// Backend response type for paginated list
interface PagedListResponse<T> {
  status: number;
  message: string;
  result: T[];
  metadata: PageMetadata;
  timestamp: string;
}

// Helper function to transform backend response to PagedResponse format
function toPagedResponse<T>(response: PagedListResponse<T>): PagedResponse<T> {
  return {
    status: response.status,
    message: response.message,
    data: response.result,
    page: response.metadata,
    timestamp: response.timestamp,
  };
}

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
      params: { query, page, size },
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

  updateMemberRole: async (projectId: number, userId: number, role: string): Promise<ProjectMember> => {
    const response = await api.put<ApiResponse<ProjectMember>>(
      `/projects/${projectId}/members/${userId}`,
      { role }
    );
    return response.data.result;
  },
};

export default projectService;
