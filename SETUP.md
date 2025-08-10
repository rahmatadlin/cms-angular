# Setup Instructions - CMS Angular

## Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (v18 or newer)
- **npm** or **yarn**
- **PostgreSQL** (v12 or newer)
- **Angular CLI** (`npm install -g @angular/cli`)

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd cms-angular

# Install all dependencies (backend + frontend)
npm run install:all
```

### 2. Database Setup

```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE cms_angular;
CREATE USER cms_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE cms_angular TO cms_user;
\q
```

### 3. Environment Configuration

```bash
# Copy environment file
cp backend/env.example backend/.env

# Edit the environment file
nano backend/.env
```

Update the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cms_angular
DB_USER=cms_user
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=development
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
CORS_ORIGIN=http://localhost:4200
```

### 4. Database Seeding

```bash
# Run the seeder to create initial data
npm run seed
```

This will create:
- Admin user: `admin@cms.com` / `admin123`
- Editor user: `editor@cms.com` / `editor123`
- Sample content pages and posts

### 5. Start Development Servers

```bash
# Start both backend and frontend in development mode
npm run dev
```

This will start:
- Backend API: http://localhost:3000
- Frontend: http://localhost:4200

## Manual Setup (Alternative)

If you prefer to set up each part separately:

### Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env file with your database settings
npm run seed:run
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Accessing the Application

### Public Website
- **URL**: http://localhost:4200
- **Description**: Public-facing website showing published content

### Admin Panel
- **URL**: http://localhost:4200/admin
- **Login**: Use the demo credentials created by the seeder

### API Documentation
- **Health Check**: http://localhost:3000/api/health
- **API Base**: http://localhost:3000/api

## Default Users

After running the seeder, you can login with:

### Admin User
- **Email**: admin@cms.com
- **Password**: admin123
- **Role**: Full access to all features

### Editor User
- **Email**: editor@cms.com
- **Password**: editor123
- **Role**: Can create and edit content, upload media

## Project Structure

```
cms-angular/
├── backend/                 # Express.js API Server
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── uploads/            # File uploads
│   ├── seeders/            # Database seeders
│   └── server.js           # Main server file
├── frontend/               # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Angular components
│   │   │   ├── services/   # Angular services
│   │   │   ├── guards/     # Route guards
│   │   │   └── models/     # TypeScript interfaces
│   │   └── environments/   # Environment configs
│   └── angular.json        # Angular configuration
└── README.md               # Main documentation
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database and user exist

2. **Port Already in Use**
   - Backend: Change `PORT` in `.env`
   - Frontend: Use `ng serve --port 4201`

3. **CORS Errors**
   - Verify `CORS_ORIGIN` in backend `.env`
   - Check that frontend URL matches

4. **File Upload Issues**
   - Ensure `uploads` directory exists
   - Check file size limits in `.env`
   - Verify file type restrictions

### Development Tips

1. **Hot Reload**: Both backend and frontend support hot reloading
2. **Database Changes**: Use `npm run seed` to reset database
3. **Environment**: Use `NODE_ENV=development` for detailed logging
4. **Testing**: Run `npm test` to execute all tests

## Production Deployment

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
# Deploy dist/cms-angular/ folder to web server
```

### Environment Variables for Production
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_PASSWORD=your_production_password
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://yourdomain.com
```

## Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all prerequisites are installed
3. Ensure database is properly configured
4. Check network connectivity and ports
5. Review the README.md for additional information 