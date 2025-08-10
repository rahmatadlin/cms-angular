# API Documentation - CMS Angular

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "admin@cms.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": 1,
      "name": "Administrator",
      "email": "admin@cms.com",
      "role": "admin",
      "isActive": true,
      "lastLogin": "2024-01-01T12:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET /auth/me
Get current user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Administrator",
      "email": "admin@cms.com",
      "role": "admin",
      "isActive": true,
      "lastLogin": "2024-01-01T12:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### POST /auth/logout
Logout user (token invalidation).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful."
}
```

#### POST /auth/change-password
Change user password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully."
}
```

### Content Management

#### GET /content
Get all content with pagination and filters.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search in title, content, or slug
- `type` (string): Filter by content type (page, post, section)
- `status` (string): Filter by status (draft, published, archived)
- `isPublic` (boolean): Filter by public status

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Welcome to Our Website",
        "slug": "welcome",
        "content": "<h1>Welcome...</h1>",
        "excerpt": "Welcome to our website...",
        "type": "page",
        "status": "published",
        "featuredImage": "image-123.jpg",
        "metaTitle": "Welcome Page",
        "metaDescription": "Welcome to our website",
        "tags": ["welcome", "homepage"],
        "order": 0,
        "isPublic": true,
        "publishedAt": "2024-01-01T12:00:00.000Z",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T12:00:00.000Z",
        "creator": {
          "id": 1,
          "name": "Administrator",
          "email": "admin@cms.com"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

#### GET /content/:id
Get content by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": {
      "id": 1,
      "title": "Welcome to Our Website",
      "slug": "welcome",
      "content": "<h1>Welcome...</h1>",
      "excerpt": "Welcome to our website...",
      "type": "page",
      "status": "published",
      "featuredImage": "image-123.jpg",
      "metaTitle": "Welcome Page",
      "metaDescription": "Welcome to our website",
      "tags": ["welcome", "homepage"],
      "order": 0,
      "isPublic": true,
      "publishedAt": "2024-01-01T12:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z",
      "creator": {
        "id": 1,
        "name": "Administrator",
        "email": "admin@cms.com"
      },
      "updater": {
        "id": 1,
        "name": "Administrator",
        "email": "admin@cms.com"
      }
    }
  }
}
```

#### POST /content
Create new content.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "New Article",
  "slug": "new-article",
  "content": "<h1>Article Content</h1>",
  "excerpt": "Article excerpt",
  "type": "post",
  "status": "draft",
  "featuredImage": "image-456.jpg",
  "metaTitle": "New Article",
  "metaDescription": "Description for SEO",
  "tags": ["article", "news"],
  "order": 0,
  "isPublic": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content created successfully.",
  "data": {
    "content": {
      "id": 2,
      "title": "New Article",
      "slug": "new-article",
      "content": "<h1>Article Content</h1>",
      "excerpt": "Article excerpt",
      "type": "post",
      "status": "draft",
      "featuredImage": "image-456.jpg",
      "metaTitle": "New Article",
      "metaDescription": "Description for SEO",
      "tags": ["article", "news"],
      "order": 0,
      "isPublic": true,
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z",
      "creator": {
        "id": 1,
        "name": "Administrator",
        "email": "admin@cms.com"
      }
    }
  }
}
```

#### PUT /content/:id
Update existing content.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Article",
  "status": "published",
  "content": "<h1>Updated Content</h1>"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content updated successfully.",
  "data": {
    "content": {
      "id": 2,
      "title": "Updated Article",
      "slug": "new-article",
      "content": "<h1>Updated Content</h1>",
      "status": "published",
      "publishedAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  }
}
```

#### DELETE /content/:id
Delete content.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Content deleted successfully."
}
```

### Public Content (No Authentication Required)

#### GET /content/public
Get public published content.

**Query Parameters:**
- `type` (string): Filter by content type
- `limit` (number): Number of items to return (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Welcome to Our Website",
        "slug": "welcome",
        "content": "<h1>Welcome...</h1>",
        "excerpt": "Welcome to our website...",
        "type": "page",
        "status": "published",
        "featuredImage": "image-123.jpg",
        "tags": ["welcome", "homepage"],
        "order": 0,
        "isPublic": true,
        "publishedAt": "2024-01-01T12:00:00.000Z",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "creator": {
          "id": 1,
          "name": "Administrator"
        }
      }
    ]
  }
}
```

#### GET /content/public/:slug
Get public content by slug.

**Response:**
```json
{
  "success": true,
  "data": {
    "content": {
      "id": 1,
      "title": "Welcome to Our Website",
      "slug": "welcome",
      "content": "<h1>Welcome...</h1>",
      "excerpt": "Welcome to our website...",
      "type": "page",
      "status": "published",
      "featuredImage": "image-123.jpg",
      "tags": ["welcome", "homepage"],
      "order": 0,
      "isPublic": true,
      "publishedAt": "2024-01-01T12:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "creator": {
        "id": 1,
        "name": "Administrator"
      }
    }
  }
}
```

### Media Management

#### GET /media
Get all media with pagination and filters.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `search` (string): Search in filename, alt, title, or description
- `mimeType` (string): Filter by MIME type (e.g., "image" for all images)
- `isPublic` (boolean): Filter by public status

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": 1,
        "filename": "image-123.jpg",
        "originalName": "hero-image.jpg",
        "mimeType": "image/jpeg",
        "size": 1024000,
        "path": "./uploads/image-123.jpg",
        "alt": "Hero image",
        "title": "Hero Image",
        "description": "Main hero image for homepage",
        "width": 1920,
        "height": 1080,
        "isPublic": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "uploader": {
          "id": 1,
          "name": "Administrator",
          "email": "admin@cms.com"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 50,
      "itemsPerPage": 20
    }
  }
}
```

#### POST /media/upload
Upload single file.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file` (File): The file to upload
- `alt` (string, optional): Alt text for images
- `title` (string, optional): Title for the media
- `description` (string, optional): Description
- `isPublic` (boolean, optional): Public status (default: true)

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully.",
  "data": {
    "media": {
      "id": 1,
      "filename": "image-123.jpg",
      "originalName": "hero-image.jpg",
      "mimeType": "image/jpeg",
      "size": 1024000,
      "path": "./uploads/image-123.jpg",
      "alt": "Hero image",
      "title": "Hero Image",
      "description": "Main hero image for homepage",
      "width": 1920,
      "height": 1080,
      "isPublic": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "uploader": {
        "id": 1,
        "name": "Administrator",
        "email": "admin@cms.com"
      }
    }
  }
}
```

#### POST /media/upload-multiple
Upload multiple files.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `files` (File[]): Array of files to upload
- `isPublic` (boolean, optional): Public status for all files (default: true)

**Response:**
```json
{
  "success": true,
  "message": "3 files uploaded successfully.",
  "data": {
    "media": [
      {
        "id": 1,
        "filename": "image-123.jpg",
        "originalName": "hero-image.jpg",
        "mimeType": "image/jpeg",
        "size": 1024000,
        "isPublic": true,
        "uploader": {
          "id": 1,
          "name": "Administrator",
          "email": "admin@cms.com"
        }
      }
    ]
  }
}
```

#### PUT /media/:id
Update media metadata.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "alt": "Updated alt text",
  "title": "Updated title",
  "description": "Updated description",
  "isPublic": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Media updated successfully.",
  "data": {
    "media": {
      "id": 1,
      "alt": "Updated alt text",
      "title": "Updated title",
      "description": "Updated description",
      "isPublic": false,
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  }
}
```

#### DELETE /media/:id
Delete media file.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Media deleted successfully."
}
```

### Public Media (No Authentication Required)

#### GET /media/public
Get public media files.

**Query Parameters:**
- `mimeType` (string): Filter by MIME type (e.g., "image" for all images)
- `limit` (number): Number of items to return (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": 1,
        "filename": "image-123.jpg",
        "originalName": "hero-image.jpg",
        "mimeType": "image/jpeg",
        "size": 1024000,
        "alt": "Hero image",
        "title": "Hero Image",
        "width": 1920,
        "height": 1080,
        "isPublic": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "uploader": {
          "id": 1,
          "name": "Administrator"
        }
      }
    ]
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error.",
  "errors": [
    "Title is required",
    "Email must be a valid email address"
  ]
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Authorization Error (403)
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Content not found."
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error."
}
```

## File Upload Limits

- **Maximum file size**: 5MB (configurable via `MAX_FILE_SIZE`)
- **Maximum files per upload**: 10 files
- **Allowed file types**:
  - Images: JPEG, JPG, PNG, GIF, WebP
  - Documents: PDF, TXT, DOC, DOCX

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: Rate limit information is included in response headers

## CORS

The API supports CORS for the configured origin (default: http://localhost:4200).

## Health Check

#### GET /health
Check API health status.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development"
}
``` 