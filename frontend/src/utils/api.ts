/**
 * Utility functions for API response handling
 */

import { PageMetadata, PagedResponse } from '@/types';

/**
 * Standard backend response format for paginated lists
 */
export interface PagedListResponse<T> {
  status: number;
  message: string;
  result: T[];
  metadata: PageMetadata;
  timestamp: string;
}

/**
 * Transform backend paged list response to frontend PagedResponse format
 * @param response - Backend response with result array and metadata
 * @returns Normalized PagedResponse
 */
export function toPagedResponse<T>(response: PagedListResponse<T>): PagedResponse<T> {
  return {
    status: response.status,
    message: response.message,
    data: response.result,
    page: response.metadata,
    timestamp: response.timestamp,
  };
}
