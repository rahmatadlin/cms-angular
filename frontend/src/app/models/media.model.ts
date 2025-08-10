export interface Media {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  alt?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  uploader?: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface MediaUploadRequest {
  file: File;
  alt?: string;
  title?: string;
  description?: string;
  isPublic?: boolean;
}

export interface MediaListResponse {
  success: boolean;
  data: {
    media: Media[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface MediaResponse {
  success: boolean;
  data: {
    media: Media;
  };
} 