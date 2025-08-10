# CMS Angular - Content Management System

Sebuah Content Management System (CMS) yang dibangun menggunakan Express.js untuk backend dan Angular untuk frontend, dengan PostgreSQL sebagai database dan Sequelize sebagai ORM.

## 🚀 Fitur Utama

- **Authentication & Authorization**: Login/logout dengan JWT
- **Content Management**: Kelola konten teks dan gambar
- **Image Upload**: Upload dan kelola gambar dengan multer
- **Responsive Design**: Interface yang responsif untuk berbagai device
- **Real-time Updates**: Update konten secara real-time

## 📁 Struktur Proyek

```
cms-angular/
├── backend/                 # Express.js API Server
│   ├── config/             # Konfigurasi database
│   ├── controllers/        # Controller untuk API endpoints
│   ├── middleware/         # Custom middleware
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── uploads/            # Folder untuk upload gambar
│   └── server.js           # Entry point server
├── frontend/               # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Angular components
│   │   │   ├── services/   # Angular services
│   │   │   ├── guards/     # Route guards
│   │   │   └── models/     # TypeScript interfaces
│   │   └── assets/         # Static assets
│   └── angular.json
└── README.md
```

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** & **Express.js** - Server framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Multer** - File upload
- **CORS** - Cross-origin resource sharing
- **bcryptjs** - Password hashing

### Frontend
- **Angular 17** - Frontend framework
- **Angular Material** - UI components
- **RxJS** - Reactive programming
- **Angular Router** - Navigation
- **Angular Forms** - Form handling

## 📋 Prerequisites

Sebelum menjalankan proyek, pastikan Anda telah menginstall:

- **Node.js** (v18 atau lebih baru)
- **npm** atau **yarn**
- **PostgreSQL** (v12 atau lebih baru)
- **Angular CLI** (`npm install -g @angular/cli`)

## 🚀 Instalasi dan Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd cms-angular
```

### 2. Setup Database PostgreSQL
```bash
# Login ke PostgreSQL
sudo -u postgres psql

# Buat database
CREATE DATABASE cms_angular;

# Buat user (opsional)
CREATE USER cms_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE cms_angular TO cms_user;

# Keluar dari psql
\q
```

### 3. Setup Backend
```bash
cd backend
npm install

# Copy file environment
cp .env.example .env

# Edit file .env dengan konfigurasi database Anda
nano .env
```

Konfigurasi `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cms_angular
DB_USER=cms_user
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### 4. Setup Frontend
```bash
cd ../frontend
npm install
```

### 5. Jalankan Aplikasi

#### Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
ng serve
```

#### Production Mode
```bash
# Build frontend
cd frontend
ng build --prod

# Jalankan backend
cd ../backend
npm start
```

## 📖 API Documentation

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Content Management
- `GET /api/content` - Get all content
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content
- `POST /api/upload` - Upload image

### Website Content
- `GET /api/website/content` - Get public website content
- `GET /api/website/images` - Get public images

## 🔐 Default Admin Account

Setelah menjalankan migrasi database, Anda dapat login dengan:

- **Email**: admin@cms.com
- **Password**: admin123

## 📱 Penggunaan

### CMS (Admin Panel)
1. Buka `http://localhost:4200/admin`
2. Login dengan kredensial admin
3. Kelola konten website melalui dashboard

### Website (Public)
1. Buka `http://localhost:4200`
2. Lihat konten yang telah dikelola melalui CMS

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
ng test
```

## 📦 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
ng build --prod
# Deploy folder dist/ ke web server
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🆘 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Periksa [Issues](../../issues) untuk solusi yang sudah ada
2. Buat issue baru jika masalah belum ada
3. Hubungi tim development

## 🔄 Changelog

### v1.0.0
- Initial release
- Basic CMS functionality
- Authentication system
- Content management
- Image upload
- Responsive design