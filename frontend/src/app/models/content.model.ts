export interface Content {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  type: 'page' | 'post' | 'section';
  status: 'draft' | 'published' | 'archived';
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags: string[];
  order: number;
  isPublic: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  creator?: User;
  updater?: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ContentRequest {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  type?: 'page' | 'post' | 'section';
  status?: 'draft' | 'published' | 'archived';
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  order?: number;
  isPublic?: boolean;
}

export interface ContentListResponse {
  success: boolean;
  data: {
    content: Content[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface ContentResponse {
  success: boolean;
  data: {
    content: Content;
  };
} 