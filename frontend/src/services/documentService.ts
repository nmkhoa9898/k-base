import api from './api';
import { 
  Document, 
  CreateDocumentRequest, 
  UpdateDocumentRequest, 
  ApiResponse, 
  PagedResponse,
} from '@/types';
import { PagedListResponse, toPagedResponse } from '@/utils';

export const documentService = {
  getAll: async (page = 0, size = 10): Promise<PagedResponse<Document>> => {
    const response = await api.get<PagedListResponse<Document>>('/documents', {
      params: { page, size },
    });
    return toPagedResponse(response.data);
  },

  getById: async (id: number): Promise<Document> => {
    const response = await api.get<ApiResponse<Document>>(`/documents/${id}`);
    return response.data.result;
  },

  getByProject: async (projectId: number, page = 0, size = 10): Promise<PagedResponse<Document>> => {
    const response = await api.get<PagedListResponse<Document>>(`/documents/project/${projectId}`, {
      params: { page, size },
    });
    return toPagedResponse(response.data);
  },

  searchInProject: async (projectId: number, query: string, page = 0, size = 10): Promise<PagedResponse<Document>> => {
    const response = await api.get<PagedListResponse<Document>>(`/documents/project/${projectId}/search`, {
      params: { q: query, page, size },
    });
    return toPagedResponse(response.data);
  },

  create: async (data: CreateDocumentRequest): Promise<Document> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('projectId', data.projectId.toString());
    formData.append('file', data.file);
    if (data.description) {
      formData.append('description', data.description);
    }

    const response = await api.post<ApiResponse<Document>>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.result;
  },

  update: async (id: number, data: UpdateDocumentRequest): Promise<Document> => {
    const response = await api.put<ApiResponse<Document>>(`/documents/${id}`, data);
    return response.data.result;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/documents/${id}`);
  },
};
