# Gurukul School Website - Full Stack Implementation Plan

## 1. API Contracts

### Authentication APIs
- `POST /api/auth/register` - User registration (students/parents)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Admin APIs
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user

### Gallery APIs
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Add new image (admin only)
- `DELETE /api/gallery/:id` - Delete image (admin only)

### Admission APIs
- `POST /api/admissions` - Submit admission application
- `GET /api/admissions` - Get all applications (admin only)
- `GET /api/admissions/:id` - Get specific application
- `PUT /api/admissions/:id/status` - Update application status (admin only)

### Contact APIs
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin only)

### Announcements APIs
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (admin only)
- `PUT /api/announcements/:id` - Update announcement (admin only)
- `DELETE /api/announcements/:id` - Delete announcement (admin only)

## 2. Database Models

### User Model
```
- _id: ObjectId
- email: string (unique)
- password: string (hashed)
- name: string
- role: string (user/admin)
- phone: string
- created_at: datetime
```

### Admission Model
```
- _id: ObjectId
- student_name: string
- parent_name: string
- email: string
- phone: string
- grade: string
- dob: date
- address: string
- previous_school: string
- status: string (pending/approved/rejected)
- submitted_at: datetime
```

### Contact Model
```
- _id: ObjectId
- name: string
- email: string
- phone: string
- subject: string
- message: string
- created_at: datetime
```

### Gallery Model
```
- _id: ObjectId
- title: string
- image_url: string
- category: string
- uploaded_by: string (admin email)
- created_at: datetime
```

### Announcement Model
```
- _id: ObjectId
- title: string
- content: string
- category: string
- is_active: boolean
- created_by: string (admin email)
- created_at: datetime
```

## 3. Frontend Pages Structure

### Public Pages (No Auth Required)
- `/` - Home page
- `/about` - About us page
- `/life-at-gos` - Life at GOS page
- `/campuses` - Campuses page
- `/admissions` - Admissions page with form
- `/gallery` - Gallery page
- `/contact` - Contact page with form
- `/login` - Login page
- `/register` - Register page

### Protected Pages (Auth Required)
- `/dashboard` - User dashboard
- `/profile` - User profile page

### Admin Pages (Admin Auth Required)
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - Manage users
- `/admin/admissions` - Manage applications
- `/admin/gallery` - Manage gallery
- `/admin/announcements` - Manage announcements
- `/admin/contacts` - View contact submissions

## 4. Mock Data to Replace

Currently in mock.js:
- Gallery images - Will be fetched from `/api/gallery`
- Stats data - Will be fetched from `/api/admin/dashboard`
- Announcements - Will be fetched from `/api/announcements`

## 5. Authentication Flow

1. User Registration:
   - User fills registration form
   - Backend creates user with hashed password
   - Returns JWT token
   - Frontend stores token in localStorage
   - Redirect to dashboard

2. User Login:
   - User enters credentials
   - Backend validates and returns JWT token
   - Frontend stores token and redirects

3. Protected Routes:
   - Frontend checks for token in localStorage
   - Adds token to Authorization header
   - Backend verifies JWT token
   - Returns user data or 401

## 6. Implementation Steps

### Phase 1: Backend Setup
1. Create authentication middleware
2. Create all models
3. Implement all API endpoints
4. Add JWT token generation/verification
5. Add password hashing (bcrypt)

### Phase 2: Frontend Integration
1. Create AuthContext for state management
2. Build Login/Register pages
3. Create protected route wrapper
4. Build all public pages
5. Build user dashboard
6. Build admin dashboard
7. Integrate all forms with backend APIs

### Phase 3: Testing
1. Test all authentication flows
2. Test all CRUD operations
3. Test admin features
4. Test form submissions
