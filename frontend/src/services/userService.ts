import api from './api';
import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  ApiResponse, 
  PagedResponse,
} from '@/types';
import { PagedListResponse, toPagedResponse } from '@/utils';

export const userService = {
  getAll: async (page = 0, size = 10): Promise<PagedResponse<User>> => {
    const response = await api.get<PagedListResponse<User>>('/users', {
      params: { page, size },
    });
    return toPagedResponse(response.data);
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.result;
  },

  // Note: getByEmail endpoint doesn't exist in backend - removed

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
};
