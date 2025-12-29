import api from './api';
import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  ApiResponse, 
  PagedResponse 
} from '@/types';

export const userService = {
  getAll: async (page = 0, size = 10): Promise<PagedResponse<User>> => {
    const response = await api.get<PagedResponse<User>>('/users', {
      params: { page, size },
    });
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  getByEmail: async (email: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/email/${email}`);
    return response.data.data;
  },

  create: async (data: CreateUserRequest): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/users', data);
    return response.data.data;
  },

  update: async (id: number, data: UpdateUserRequest): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  changePassword: async (id: number, oldPassword: string, newPassword: string): Promise<void> => {
    await api.put(`/users/${id}/password`, { oldPassword, newPassword });
  },
};

export default userService;
