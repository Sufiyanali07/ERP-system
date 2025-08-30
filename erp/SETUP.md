# ERP System Setup Guide

## Overview
This ERP system includes three comprehensive dashboards: Student, Faculty, and Admin with MongoDB backend integration.

## Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- Git

## Installation Steps

### 1. Install Dependencies
```bash
npm install
npm install mongoose bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/next_erp
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/next_erp
JWT_SECRET=your_jwt_secret_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 3. Database Setup
The system will automatically connect to MongoDB using the schemas in `/src/models/`:
- User.ts - Student, Faculty, Admin profiles
- Fee.ts - Fee management
- Document.ts - Document requests
- Exam.ts - Exam and results management

### 4. Run the Application
```bash
npm run dev
```

## Dashboard Access

### Student Dashboard (`/student-dashboard`)
- Fee payment with receipt generation
- Document request system
- Exam timetable and results
- Academic progress tracking

### Faculty Dashboard (`/faculty-dashboard`)
- Student application management
- Class and attendance tracking
- Assignment management
- Student interaction tools

### Admin Dashboard (`/admin-dashboard`)
- Complete system overview
- Financial tracking and analytics
- Department-wise statistics
- Faculty request management

## Admin Login
- Email: admin@gmail.com
- Password: admin
- Redirects automatically to Admin Dashboard

## Features Implemented

✅ **Authentication System**
- Multi-role login (Student/Faculty/Admin)
- Special admin credential handling
- Automatic dashboard redirection

✅ **Student Dashboard**
- Fee payment with receipt download
- Document request system
- Exam schedule and results
- Academic overview cards

✅ **Faculty Dashboard**
- Student application review
- Class management
- Attendance tracking
- Assignment monitoring

✅ **Admin Dashboard**
- System-wide analytics
- Financial overview with charts
- Department statistics
- Faculty request management

✅ **Backend API**
- MongoDB integration
- Real-time data fetching
- CRUD operations for all entities
- Authentication endpoints

✅ **UI Components**
- Shadcn UI integration
- Responsive design
- Interactive charts (Recharts)
- Modern dashboard layouts

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Student APIs
- `GET /api/student/fees?studentId=` - Get student fees
- `POST /api/student/fees` - Process fee payment
- `GET /api/student/documents?studentId=` - Get documents
- `POST /api/student/documents` - Request document

### Faculty APIs
- `GET /api/faculty/applications` - Get student applications
- `PUT /api/faculty/applications` - Update application status

### Admin APIs
- `GET /api/admin/overview` - System overview statistics

### Exam APIs
- `GET /api/exams` - Get exams and results

## Receipt Generation
- Automatic receipt generation on fee payment
- Downloadable text format
- College branding included
- Transaction ID tracking

## Charts and Analytics
- Monthly fee collection trends
- Fee type distribution (Pie chart)
- Department-wise statistics
- Real-time dashboard metrics

## Next Steps
1. Set up MongoDB database
2. Configure environment variables
3. Run the development server
4. Test all three dashboards
5. Customize as needed for your institution

## Support
For issues or customizations, check the component files in `/src/components/` and API routes in `/src/app/api/`.
