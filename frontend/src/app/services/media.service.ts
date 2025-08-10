import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  Media, 
  MediaUploadRequest, 
  MediaListResponse, 
  MediaResponse 
} from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = `${environment.apiUrl}/media`;

  constructor(private http: HttpClient) {}

  getAllMedia(params?: {
    page?: number;
    limit?: number;
    search?: string;
    mimeType?: string;
    isPublic?: boolean;
  }): Observable<MediaListResponse> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<MediaListResponse>(this.apiUrl, { params: httpParams });
  }

  getMediaById(id: number): Observable<MediaResponse> {
    return this.http.get<MediaResponse>(`${this.apiUrl}/${id}`);
  }

  getPublicMedia(params?: {
    mimeType?: string;
    limit?: number;
  }): Observable<{ success: boolean; data: { media: Media[] } }> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<{ success: boolean; data: { media: Media[] } }>(
      `${this.apiUrl}/public`, 
      { params: httpParams }
    );
  }

  uploadFile(file: File, metadata?: {
    alt?: string;
    title?: string;
    description?: string;
    isPublic?: boolean;
  }): Observable<MediaResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata) {
      if (metadata.alt) formData.append('alt', metadata.alt);
      if (metadata.title) formData.append('title', metadata.title);
      if (metadata.description) formData.append('description', metadata.description);
      if (metadata.isPublic !== undefined) formData.append('isPublic', metadata.isPublic.toString());
    }

    return this.http.post<MediaResponse>(`${this.apiUrl}/upload`, formData);
  }

  uploadMultipleFiles(files: File[], isPublic: boolean = true): Observable<{ 
    success: boolean; 
    message: string; 
    data: { media: Media[] } 
  }> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('isPublic', isPublic.toString());

    return this.http.post<{ 
      success: boolean; 
      message: string; 
      data: { media: Media[] } 
    }>(`${this.apiUrl}/upload-multiple`, formData);
  }

  updateMedia(id: number, updates: {
    alt?: string;
    title?: string;
    description?: string;
    isPublic?: boolean;
  }): Observable<MediaResponse> {
    return this.http.put<MediaResponse>(`${this.apiUrl}/${id}`, updates);
  }

  deleteMedia(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }

  // Helper method to get full URL for media
  getMediaUrl(filename: string): string {
    return `${environment.uploadUrl}/${filename}`;
  }

  // Helper method to format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Helper method to check if file is image
  isImage(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  // Helper method to validate file type
  isValidFileType(file: File): boolean {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    return allowedTypes.includes(file.type);
  }

  // Helper method to validate file size (5MB default)
  isValidFileSize(file: File, maxSize: number = 5 * 1024 * 1024): boolean {
    return file.size <= maxSize;
  }
} 