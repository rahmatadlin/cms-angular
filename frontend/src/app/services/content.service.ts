import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  Content, 
  ContentRequest, 
  ContentListResponse, 
  ContentResponse 
} from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = `${environment.apiUrl}/content`;

  constructor(private http: HttpClient) {}

  getAllContent(params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    status?: string;
    isPublic?: boolean;
  }): Observable<ContentListResponse> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<ContentListResponse>(this.apiUrl, { params: httpParams });
  }

  getContentById(id: number): Observable<ContentResponse> {
    return this.http.get<ContentResponse>(`${this.apiUrl}/${id}`);
  }

  getContentBySlug(slug: string): Observable<ContentResponse> {
    return this.http.get<ContentResponse>(`${this.apiUrl}/public/${slug}`);
  }

  getPublicContent(params?: {
    type?: string;
    limit?: number;
  }): Observable<{ success: boolean; data: { content: Content[] } }> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<{ success: boolean; data: { content: Content[] } }>(
      `${this.apiUrl}/public`, 
      { params: httpParams }
    );
  }

  createContent(content: ContentRequest): Observable<ContentResponse> {
    return this.http.post<ContentResponse>(this.apiUrl, content);
  }

  updateContent(id: number, content: Partial<ContentRequest>): Observable<ContentResponse> {
    return this.http.put<ContentResponse>(`${this.apiUrl}/${id}`, content);
  }

  deleteContent(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }

  // Helper method to generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Helper method to format content for display
  formatContent(content: string): string {
    // This is a simple formatter - you might want to use a proper HTML sanitizer
    return content.replace(/\n/g, '<br>');
  }

  // Helper method to get content excerpt
  getExcerpt(content: string, maxLength: number = 150): string {
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength) + '...';
  }
} 