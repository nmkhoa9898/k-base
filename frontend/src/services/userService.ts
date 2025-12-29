import api from './api';
import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  ApiResponse, 
  PagedResponse,
  PageMetadata
} from '@/types';

// Backend response type for paginated user list
interface UserListResponse {
  status: number;
  message: string;
  result: User[];
  metadata: PageMetadata;
  timestamp: string;
}

export const userService = {
  getAll: async (page = 0, size = 10): Promise<PagedResponse<User>> => {
    const response = await api.get<UserListResponse>('/users', {
      params: { page, size },
    });
    // Transform backend response to PagedResponse format
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.result,
      page: response.data.metadata,
      timestamp: response.data.timestamp,
    };
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.result;
  },

  getByEmail: async (email: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/email/${email}`);
    return response.data.result;
  },

  create: async (data: CreateUserRequest): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/users', data);
    return response.data.result;
  },

  update: async (id: number, data: UpdateUserRequest): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.result;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  changePassword: async (id: number, oldPassword: string, newPassword: string): Promise<void> => {
    await api.put(`/users/${id}/password`, { oldPassword, newPassword });
  },
};

export default userService;
