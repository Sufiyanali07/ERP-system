# ERP Backend API

A comprehensive Express.js backend for the ERP (Enterprise Resource Planning) system with MongoDB database, JWT authentication, and real-time features using Socket.io.

## Features

- **Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Role-based access control (Student, Faculty, Admin)
  - Password hashing with bcrypt
  - Account lockout after failed attempts
  - Password reset functionality

- **Real-time Features**
  - Socket.io integration for live updates
  - Real-time notifications
  - Live attendance updates
  - Assignment submissions tracking
  - Grade updates notifications

- **Security**
  - Helmet.js for security headers
  - CORS configuration
  - Rate limiting
  - Input validation with express-validator
  - Environment-based configuration

- **Database Models**
  - User management with role-based profiles
  - Student profiles with academic information
  - Faculty profiles with teaching assignments
  - Class management with enrollment
  - Assignment system with submissions
  - Attendance tracking
  - Grade management with CGPA calculation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy `.env` file and update the following variables:
   
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/erp_system
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/erp_system
   
   # JWT Secrets (Change these in production!)
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_REFRESH_SECRET=your_refresh_token_secret_here
   
   # Email Configuration (for notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start the server**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /signup` - Register new user
- `POST /login` - User login
- `POST /refresh-token` - Refresh access token
- `POST /logout` - User logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token

### User Management (`/api/users`)

- `GET /profile` - Get current user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user by ID
- `PUT /:id/status` - Update user status (Admin only)
- `DELETE /:id` - Delete user (Admin only)

### Student Management (`/api/students`)

- `GET /` - Get all students (Faculty/Admin)
- `GET /:id` - Get student by ID
- `PUT /:id` - Update student profile
- `POST /:id/enroll-class` - Enroll student in class
- `DELETE /:id/unenroll-class/:classId` - Unenroll from class

### Faculty Management (`/api/faculty`)

- `GET /` - Get all faculty (Admin only)
- `GET /:id` - Get faculty by ID
- `PUT /:id` - Update faculty profile
- `POST /:id/assign-class` - Assign class to faculty
- `DELETE /:id/unassign-class/:classId` - Unassign class

### Class Management (`/api/classes`)

- `GET /` - Get all classes
- `GET /:id` - Get class by ID
- `POST /` - Create new class (Admin only)
- `PUT /:id` - Update class (Admin only)
- `DELETE /:id` - Delete class (Admin only)

### Assignment Management (`/api/assignments`)

- `GET /` - Get assignments
- `GET /:id` - Get assignment by ID
- `POST /` - Create assignment (Faculty/Admin)
- `PUT /:id` - Update assignment (Faculty/Admin)
- `POST /:id/submit` - Submit assignment (Student)
- `PUT /:id/grade/:submissionId` - Grade submission (Faculty/Admin)

### Attendance Management (`/api/attendance`)

- `GET /` - Get attendance records
- `POST /` - Mark attendance (Faculty/Admin)
- `PUT /:id` - Update attendance (Faculty/Admin)
- `GET /student/:studentId` - Get student attendance summary

### Grade Management (`/api/grades`)

- `GET /` - Get grades
- `POST /` - Create/Update grade (Faculty/Admin)
- `GET /student/:studentId` - Get student grades
- `GET /class/:classId` - Get class grades (Faculty/Admin)
- `DELETE /:id` - Delete grade (Faculty/Admin)

## Real-time Events

### Socket.io Events

**Client to Server:**
- `join-role` - Join role-based room (student, faculty, admin)
- `join-room` - Join specific room (class, department)
- `send-notification` - Send notification to room
- `attendance-update` - Update attendance
- `grade-update` - Update grades
- `assignment-submitted` - Assignment submission

**Server to Client:**
- `notification` - General notifications
- `attendance-updated` - Attendance changes
- `grade-updated` - Grade changes
- `new-submission` - New assignment submission
- `assignment-graded` - Assignment graded
- `user-login` - User login event
- `profile-updated` - Profile updates

## Database Schema

### User Model
- Basic user information (name, email, role)
- Authentication data (password, tokens)
- Profile references (student/faculty/admin)

### Student Model
- Academic information (roll number, semester, CGPA)
- Personal details (guardian info, medical info)
- Fee information and status
- Enrolled classes

### Faculty Model
- Professional information (designation, department)
- Assigned classes and subjects
- Office hours and research areas
- Performance metrics

### Class Model
- Class details (name, subject, schedule)
- Faculty assignment
- Enrolled students
- Academic year and semester

### Assignment Model
- Assignment details and instructions
- Submissions with grading
- Due dates and status
- File attachments

### Attendance Model
- Daily attendance records
- Student-wise status (present/absent/late)
- Class and faculty information

### Grade Model
- Student grades for different exam types
- Marks, percentage, and letter grades
- CGPA calculation support

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if any
}
```

## Security Features

- **Password Security**: Bcrypt hashing with configurable rounds
- **JWT Security**: Separate access and refresh tokens
- **Rate Limiting**: Configurable request limits per IP
- **Account Security**: Automatic lockout after failed attempts
- **Input Validation**: Comprehensive validation using express-validator
- **CORS**: Configured for frontend domain

## Development

### Running Tests
```bash
npm test
```

### Code Structure
```
backend/
├── models/          # MongoDB schemas
├── routes/          # API route handlers
├── middleware/      # Custom middleware
├── server.js        # Main server file
├── package.json     # Dependencies
└── .env            # Environment variables
```

### Adding New Features

1. Create model in `models/` directory
2. Add routes in `routes/` directory
3. Update `server.js` to include new routes
4. Add appropriate middleware for authentication/validation

## Production Deployment

1. **Environment Variables**: Update all secrets and database URLs
2. **Database**: Use MongoDB Atlas or properly configured MongoDB instance
3. **Security**: Enable all security features and update CORS settings
4. **Monitoring**: Add logging and monitoring solutions
5. **SSL**: Use HTTPS in production

## Support

For issues and questions:
1. Check the API documentation
2. Review error messages and logs
3. Ensure proper authentication and authorization
4. Verify database connectivity

## License

MIT License - see LICENSE file for details.
