# Code Architecture & Understanding Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React/Vite)                  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Pages: Login, Register, UserDashboard, etc.   │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Components: Header, AuthForm, ProtectedRoute   │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Services: API calls via Axios                  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Context: AuthContext for state management      │  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP Requests/Responses
                            ↓
┌─────────────────────────────────────────────────────────┐
│                Backend (Express/MongoDB)                 │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Routes: /api/auth/*, /api/complaints/*         │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Controllers: authController, complaintController│ │
│  ├──────────────────────────────────────────────────┤  │
│  │  Middleware: Auth, Admin, Upload, ErrorHandler  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Models: User, Complaint (MongoDB schemas)      │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Database: MongoDB Atlas or Local               │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🔄 Authentication Flow

```
User Registers/Logs In
         │
         ↓
Frontend sends credentials to /api/auth/login
         │
         ↓
Backend validates credentials against MongoDB
         │
         ↓
Password compared using bcrypt.compare()
         │
         ↓
JWT token generated with user ID and role
         │
         ↓
Frontend receives token and stores in localStorage
         │
         ↓
Token sent in Authorization header for future requests
         │
         ↓
Backend verifies token with jwt.verify()
         │
         ↓
User data extracted from token and attached to request
         │
         ↓
Controller processes request with user context
```

## 📊 Data Flow Example: Submit Complaint

```
1. USER INTERFACE
   └─ User fills form and clicks "Submit"

2. FRONTEND (SubmitComplaint.jsx)
   ├─ Create FormData object
   ├─ Append all fields
   └─ Call complaintAPI.createComplaint(data)

3. API SERVICE (api.js)
   ├─ Axios instance makes POST request
   ├─ Adds JWT token to headers
   └─ Sends to /api/complaints

4. BACKEND MIDDLEWARE
   ├─ CORS middleware allows request
   ├─ Body parser handles multipart/form-data
   └─ Auth middleware verifies JWT token

5. MULTER MIDDLEWARE (upload.js)
   ├─ Validates file type (image only)
   ├─ Checks file size (max 5MB)
   └─ Saves file to /uploads folder

6. CONTROLLER (complaintController.js)
   ├─ Validates required fields
   ├─ Creates Complaint document
   ├─ Saves to MongoDB
   └─ Returns success response

7. FRONTEND (SubmitComplaint.jsx)
   ├─ Receives response
   ├─ Shows success message
   ├─ Clears form
   └─ Redirects to dashboard
```

## 🔐 Role-Based Access Control

### Request Flow

```
Client sends request with JWT token
         │
         ↓
auth middleware (auth.js)
   ├─ Extracts token
   ├─ Verifies signature
   └─ Adds user to req.user

If Admin endpoint:
         │
         ↓
adminAuth middleware (adminAuth.js)
   ├─ Checks if req.user.role === 'admin'
   └─ Allows/Denies request

If allowed:
         │
         ↓
Controller processes request
```

### Routes with Protection

```
Public Routes:
- POST /api/auth/register       (No auth required)
- POST /api/auth/login          (No auth required)

Protected Routes (Any authenticated user):
- GET  /api/auth/me             (Requires token)
- POST /api/complaints          (Requires token)
- GET  /api/complaints          (Requires token)

Admin Only Routes:
- PATCH /api/complaints/:id     (Requires admin token)
- DELETE /api/complaints/:id    (Requires admin token)
- GET /api/complaints/stats     (Requires admin token)
```

## 📚 File-by-File Breakdown

### Backend Files

**server.js**

- Entry point for Express app
- Connects to MongoDB
- Sets up middleware
- Registers routes
- Starts server on port 5000

**config/db.js**

- MongoDB connection using Mongoose
- Error handling for connection failures
- Exports connectDB function

**models/User.js**

- Defines User schema
- Fields: name, email, password, role, phone, address
- Pre-save hook: hashes password before storing
- Method: matchPassword() - compares entered password with hash

**models/Complaint.js**

- Defines Complaint schema
- Fields: userId, wasteType, description, location, image, status
- Timestamps automatically added
- References User model

**controllers/authController.js**

- register(): Creates new user, hashes password, returns JWT
- login(): Finds user, verifies password, returns JWT
- getMe(): Returns current authenticated user

**controllers/complaintController.js**

- createComplaint(): Creates new complaint with image upload
- getComplaints(): Returns all (for admin) or user's complaints
- getComplaint(): Returns single complaint with authorization check
- updateComplaint(): Updates status and notes (admin only)
- deleteComplaint(): Deletes complaint and cleans up image file
- getStats(): Aggregates statistics for dashboard

**middleware/auth.js**

- Extracts JWT from Authorization header
- Verifies token signature
- Adds decoded user data to request
- Returns 401 if token missing/invalid

**middleware/adminAuth.js**

- Checks if user role is 'admin'
- Returns 403 if not admin
- Used after auth middleware

**middleware/upload.js**

- Configures Multer for file uploads
- Validates file types (images only)
- Limits file size (5MB max)
- Stores files in /uploads with unique names

**middleware/errorHandler.js**

- Catches and formats errors
- Handles MongoDB validation errors
- Returns consistent error JSON responses

**routes/authRoutes.js**

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

**routes/complaintRoutes.js**

- POST /api/complaints (with upload)
- GET /api/complaints
- GET /api/complaints/stats
- GET /api/complaints/:id
- PATCH /api/complaints/:id
- DELETE /api/complaints/:id

### Frontend Files

**main.jsx**

- Entry point: ReactDOM.render(App, root)
- Imports and renders App component

**App.jsx**

- Sets up Router with all routes
- Wraps app with AuthProvider
- Defines public, user, admin routes
- Uses ProtectedRoute for security

**index.css**

- Tailwind CSS imports
- Global styles
- Custom component classes (@layer components)

**context/AuthContext.jsx**

- Creates AuthContext
- AuthProvider component manages auth state
- Provides: user, token, loading, login, register, logout

**hooks/useAuth.js**

- Custom hook to use AuthContext
- Throws error if used outside AuthProvider
- Returns all auth context values

**services/api.js**

- Creates Axios instance with base URL
- Request interceptor: adds JWT token to headers
- Response interceptor: handles 401 errors
- Exports authAPI and complaintAPI objects
- Each object has methods for endpoints

**components/Header.jsx**

- Navigation header visible on all pages
- Conditional rendering based on auth state
- Different links for user vs admin
- Logout functionality

**components/AuthForm.jsx**

- Reusable form component
- Props: title, fields, onSubmit, loading, error
- Generic input rendering
- Used by Login and Register pages

**components/ProtectedRoute.jsx**

- HOC (Higher Order Component)
- Checks if user is authenticated
- Checks if user has required role
- Redirects to login if not authorized

**pages/Login.jsx**

- Login form using AuthForm component
- Calls useAuth().login()
- Redirects based on user role
- Shows demo credentials

**pages/Register.jsx**

- Registration form using AuthForm component
- Calls useAuth().register()
- Redirects to user dashboard on success

**pages/UserDashboard.jsx**

- Displays user's complaints in table
- Shows statistics cards
- Fetches data on mount
- Color-coded status badges

**pages/SubmitComplaint.jsx**

- Form to submit new complaint
- File upload for image
- FormData for multipart submission
- Validates required fields

**pages/AdminDashboard.jsx**

- Shows statistics and charts
- Displays waste type breakdown
- Calculates completion rate
- Links to complaints management

**pages/AdminComplaints.jsx**

- Table of all complaints
- Filter by status
- Edit complaint modal
- Inline image preview
- Ability to delete complaints

## 🔌 API Response Format

All endpoints return JSON:

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    /* response data */
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🗄️ Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  wasteType: String (enum: [
    'Plastic', 'Organic', 'Paper',
    'Metal', 'Glass', 'Electronic', 'Other'
  ]),
  description: String (max 500),
  location: String,
  latitude: Number,
  longitude: Number,
  image: String (file path),
  status: String (enum: [
    'Pending', 'In Progress', 'Completed'
  ]),
  adminNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Request/Response Examples

### Register Request

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Create Complaint Request

```http
POST /api/complaints
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: multipart/form-data

{
  "wasteType": "Plastic",
  "description": "Plastic bags on the street",
  "location": "Main Street",
  "latitude": "40.7128",
  "longitude": "-74.0060",
  "image": <file>
}
```

**Response:**

```json
{
  "success": true,
  "message": "Complaint submitted successfully",
  "complaint": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "wasteType": "Plastic",
    "description": "Plastic bags on the street",
    "location": "Main Street",
    "image": "/uploads/image-1234567890.jpg",
    "status": "Pending",
    "createdAt": "2024-02-14T10:30:00Z"
  }
}
```

## 🧪 Testing Endpoints

Use Postman or curl to test:

```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123"}'

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'

# 3. Get token from login response, then:
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

## 🎯 Key Concepts to Understand

1. **JWT Tokens:** Stateless authentication, client stores token
2. **Middleware:** Functions that process requests before controllers
3. **Mongoose Hooks:** Pre/post operations on data
4. **Context API:** Global state management in React
5. **Protected Routes:** Components that check auth before rendering
6. **Multer:** Handles multipart/form-data uploads
7. **Axios Interceptors:** Pre/post request processing
8. **Async/Await:** Handling asynchronous operations
9. **Error Handling:** Try-catch and error middleware
10. **CORS:** Allowing cross-origin requests

---

This architecture provides a scalable, secure, and maintainable full-stack application! 🚀
