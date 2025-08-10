# CMS Angular - Project Summary

## 🎯 Project Overview

CMS Angular adalah Content Management System yang dibangun dengan **Express.js** (backend) dan **Angular 17** (frontend), menggunakan **PostgreSQL** sebagai database dan **Sequelize** sebagai ORM. Sistem ini memungkinkan pengguna untuk mengelola konten website melalui admin panel yang user-friendly.

## 🏗️ Architecture

### Backend (Express.js + Sequelize + PostgreSQL)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

### Frontend (Angular 17)
- **Framework**: Angular 17 (Standalone Components)
- **UI Library**: Angular Material
- **State Management**: RxJS
- **Routing**: Angular Router
- **Forms**: Reactive Forms
- **HTTP Client**: Angular HttpClient

## 📁 Project Structure

```
cms-angular/
├── backend/                          # Express.js API Server
│   ├── config/
│   │   └── database.js              # Database configuration
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── contentController.js     # Content management
│   │   └── mediaController.js       # File upload management
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication
│   │   └── upload.js                # File upload handling
│   ├── models/
│   │   ├── User.js                  # User model
│   │   ├── Content.js               # Content model
│   │   ├── Media.js                 # Media model
│   │   └── index.js                 # Sequelize setup
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── content.js               # Content routes
│   │   └── media.js                 # Media routes
│   ├── seeders/
│   │   └── initialData.js           # Database seeder
│   ├── uploads/                     # File upload directory
│   ├── tests/                       # Test files
│   ├── server.js                    # Main server file
│   └── seed.js                      # Seeder runner
├── frontend/                        # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── auth/login/      # Login component
│   │   │   │   ├── home/            # Public website
│   │   │   │   ├── admin/           # Admin components
│   │   │   │   └── not-found/       # 404 page
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts  # Authentication service
│   │   │   │   ├── content.service.ts # Content service
│   │   │   │   └── media.service.ts # Media service
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts    # Authentication guard
│   │   │   │   └── role.guard.ts    # Role-based guard
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   └── app.component.ts     # Main app component
│   │   ├── environments/            # Environment configs
│   │   └── styles.scss              # Global styles
│   └── angular.json                 # Angular configuration
├── README.md                        # Main documentation
├── SETUP.md                         # Setup instructions
├── API_DOCUMENTATION.md             # API documentation
└── start.sh                         # Start script
```

## 🚀 Key Features

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, Editor, Viewer)
- ✅ Password hashing with bcrypt
- ✅ Token expiration handling
- ✅ Route protection with guards

### Content Management
- ✅ Create, read, update, delete content
- ✅ Content types: Page, Post, Section
- ✅ Content status: Draft, Published, Archived
- ✅ SEO fields (meta title, description)
- ✅ Content ordering and tagging
- ✅ Rich text content support
- ✅ Featured images

### Media Management
- ✅ File upload (images, documents)
- ✅ Multiple file upload
- ✅ Image metadata (alt text, title, description)
- ✅ File type validation
- ✅ File size limits
- ✅ Public/private media control
- ✅ Image dimensions extraction

### User Interface
- ✅ Responsive design
- ✅ Material Design components
- ✅ Modern UI/UX
- ✅ Loading states
- ✅ Error handling
- ✅ Success notifications
- ✅ Form validation

### Security Features
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ File upload security

### Development Features
- ✅ Hot reload (both frontend and backend)
- ✅ Environment configuration
- ✅ Database seeding
- ✅ Comprehensive logging
- ✅ Error handling
- ✅ Testing setup

## 🔧 Database Schema

### Users Table
- `id` (Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed String)
- `role` (Enum: admin, editor, viewer)
- `isActive` (Boolean)
- `lastLogin` (DateTime)
- `createdAt`, `updatedAt` (Timestamps)

### Contents Table
- `id` (Primary Key)
- `title` (String)
- `slug` (String, Unique)
- `content` (Text)
- `excerpt` (Text)
- `type` (Enum: page, post, section)
- `status` (Enum: draft, published, archived)
- `featuredImage` (String)
- `metaTitle`, `metaDescription` (SEO)
- `tags` (Array)
- `order` (Integer)
- `isPublic` (Boolean)
- `publishedAt` (DateTime)
- `createdBy`, `updatedBy` (Foreign Keys)
- `createdAt`, `updatedAt` (Timestamps)

### Media Table
- `id` (Primary Key)
- `filename` (String)
- `originalName` (String)
- `mimeType` (String)
- `size` (Integer)
- `path` (String)
- `alt`, `title`, `description` (Metadata)
- `width`, `height` (Image dimensions)
- `isPublic` (Boolean)
- `uploadedBy` (Foreign Key)
- `createdAt`, `updatedAt` (Timestamps)

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `POST /api/auth/change-password` - Change password

### Content Management
- `GET /api/content` - Get all content (with filters)
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content
- `GET /api/content/public` - Get public content
- `GET /api/content/public/:slug` - Get public content by slug

### Media Management
- `GET /api/media` - Get all media (with filters)
- `GET /api/media/:id` - Get media by ID
- `POST /api/media/upload` - Upload single file
- `POST /api/media/upload-multiple` - Upload multiple files
- `PUT /api/media/:id` - Update media metadata
- `DELETE /api/media/:id` - Delete media
- `GET /api/media/public` - Get public media

## 👥 User Roles & Permissions

### Admin
- ✅ Full access to all features
- ✅ User management
- ✅ Content management
- ✅ Media management
- ✅ System settings

### Editor
- ✅ Create and edit content
- ✅ Upload and manage media
- ✅ Publish/unpublish content
- ❌ Delete content
- ❌ User management

### Viewer
- ✅ View content
- ✅ View media
- ❌ Create/edit content
- ❌ Upload media

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v12+)
- Angular CLI

### Quick Start
```bash
# Clone repository
git clone <repo-url>
cd cms-angular

# Setup database
sudo -u postgres psql
CREATE DATABASE cms_angular;
CREATE USER cms_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE cms_angular TO cms_user;
\q

# Configure environment
cp backend/env.example backend/.env
# Edit backend/.env with your database settings

# Install dependencies and start
npm run install:all
npm run seed
npm run dev
```

### Default Users
- **Admin**: admin@cms.com / admin123
- **Editor**: editor@cms.com / editor123

## 📱 Access Points

- **Public Website**: http://localhost:4200
- **Admin Panel**: http://localhost:4200/admin
- **API Base**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm install --production
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build:prod
# Deploy dist/cms-angular/ folder
```

## 📚 Documentation

- **README.md** - Main project documentation
- **SETUP.md** - Detailed setup instructions
- **API_DOCUMENTATION.md** - Complete API reference

## 🔄 Development Workflow

1. **Setup**: Follow SETUP.md instructions
2. **Development**: Use `npm run dev` for hot reload
3. **Database**: Use `npm run seed` to reset data
4. **Testing**: Run tests with `npm test`
5. **Build**: Use `npm run build` for production

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **Material Design**: Modern, accessible components
- **Dark/Light Theme**: Configurable themes
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error messages
- **Form Validation**: Real-time validation
- **Notifications**: Success/error notifications

## 🔒 Security Considerations

- **JWT Tokens**: Secure authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin security
- **Rate Limiting**: Prevent abuse
- **File Upload Security**: Type and size validation
- **SQL Injection Prevention**: Parameterized queries

## 📈 Performance Features

- **Database Indexing**: Optimized queries
- **Pagination**: Large dataset handling
- **Image Optimization**: Automatic resizing
- **Caching**: HTTP caching headers
- **Compression**: Gzip compression
- **Lazy Loading**: Angular route lazy loading

## 🔧 Configuration

### Environment Variables
- Database connection settings
- JWT secret and expiration
- File upload limits
- CORS origins
- Server ports

### Customization Points
- Theme colors and styling
- File upload restrictions
- User roles and permissions
- Content types and statuses
- API rate limits

## 🎯 Future Enhancements

- **Rich Text Editor**: WYSIWYG content editor
- **Image Gallery**: Advanced media management
- **User Management**: Admin user CRUD
- **Analytics**: Content performance tracking
- **SEO Tools**: Advanced SEO features
- **Multi-language**: Internationalization
- **API Documentation**: Swagger/OpenAPI
- **Webhooks**: External integrations
- **Backup System**: Automated backups
- **Monitoring**: Health monitoring

## 📞 Support

For issues and questions:
1. Check the documentation files
2. Review console logs
3. Verify environment configuration
4. Test database connectivity
5. Check network and ports

---

**CMS Angular** - A modern, secure, and scalable content management system built with Express.js and Angular 17. 