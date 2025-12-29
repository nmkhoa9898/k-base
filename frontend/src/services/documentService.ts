import api from './api';
import { 
  Document, 
  CreateDocumentRequest, 
  UpdateDocumentRequest, 
  ApiResponse, 
  PagedResponse 
} from '@/types';

export const documentService = {
  getAll: async (page = 0, size = 10): Promise<PagedResponse<Document>> => {
    const response = await api.get<PagedResponse<Document>>('/documents', {
      params: { page, size },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Document> => {
    const response = await api.get<ApiResponse<Document>>(`/documents/${id}`);
    return response.data.data;
  },

  getByProject: async (projectId: number, page = 0, size = 10): Promise<PagedResponse<Document>> => {
    const response = await api.get<PagedResponse<Document>>(`/documents/project/${projectId}`, {
      params: { page, size },
    });
    return response.data;
  },

  search: async (query: string, page = 0, size = 10): Promise<PagedResponse<Document>> => {
    const response = await api.get<PagedResponse<Document>>('/documents/search', {
      params: { query, page, size },
    });
    return response.data;
  },

  upload: async (data: CreateDocumentRequest): Promise<Document> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('projectId', data.projectId.toString());
    formData.append('file', data.file);
    if (data.description) {
      formData.append('description', data.description);
    }

    const response = await api.post<ApiResponse<Document>>('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  update: async (id: number, data: UpdateDocumentRequest): Promise<Document> => {
    const response = await api.put<ApiResponse<Document>>(`/documents/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/documents/${id}`);
  },

  download: async (id: number): Promise<Blob> => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default documentService;
