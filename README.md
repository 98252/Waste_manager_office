# Smart Waste Management System - Complete Setup Guide

## 📋 Project Overview

This is a full-stack web application for managing waste complaints. It features:

- **Frontend:** React.js (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js + MongoDB
- **Authentication:** JWT-based with role-based access control
- **File Upload:** Multer for image uploads
- **Responsive Design:** Mobile-friendly UI

### User Roles

1. **Public User**
   - Register and login
   - Submit waste complaints with images
   - View complaint status
   - Track complaint history

2. **Admin**
   - View all complaints
   - Update complaint status
   - Add admin notes
   - Delete complaints
   - View statistics and analytics

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14+ (download from https://nodejs.org)
- **MongoDB** (local or cloud - https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)

### Step 1: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (already created, but verify)
# Edit .env file with your MongoDB connection string

# Start backend server
npm run dev
# Server runs on http://localhost:5000
```

### Step 2: Setup Frontend

```bash
# Open new terminal window, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### Step 3: Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Register" to create a new account (or use demo credentials)
3. Login with your credentials
4. Explore user or admin dashboard based on role

---

## 🔧 Detailed Setup Instructions

### Backend Setup

#### 1. Install Node.js Dependencies

```bash
cd backend
npm install
```

This installs:

- express: Web framework
- mongoose: MongoDB ORM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- multer: File upload handling
- dotenv: Environment variables
- cors: Cross-origin requests

#### 2. Configure MongoDB

**Option A: Local MongoDB**

```bash
# Install MongoDB Community Edition
# On Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/waste_management`
4. Update `.env` file:
   ```
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/waste_management
   ```

#### 3. Environment Variables (.env file)

```
# Database
MONGO_URI=mongodb://localhost:27017/waste_management

# JWT Secret (change in production!)
JWT_SECRET=your_jwt_secret_key_change_this_in_production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

#### 4. Start Backend

```bash
npm run dev
```

Expected output:

```
╔════════════════════════════════════════════════════════╗
║  Smart Waste Management System - Backend Server       ║
║  Server is running on http://localhost:5000             ║
║  Environment: development                              ║
╚════════════════════════════════════════════════════════╝
```

### Frontend Setup

#### 1. Install React Dependencies

```bash
cd frontend
npm install
```

This installs:

- react: UI library
- react-router-dom: Client-side routing
- axios: HTTP client
- tailwindcss: CSS utility framework

#### 2. Start Development Server

```bash
npm run dev
```

Expected output:

```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

#### 3. Build for Production

```bash
npm run build
```

Creates optimized `dist` folder for deployment.

---

## 📝 API Endpoints

### Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | No            |
| POST   | `/api/auth/login`    | Login user        | No            |
| GET    | `/api/auth/me`       | Get current user  | Yes           |

### Complaint Endpoints

| Method | Endpoint                | Description          | Auth Required                     |
| ------ | ----------------------- | -------------------- | --------------------------------- |
| POST   | `/api/complaints`       | Create complaint     | Yes (User)                        |
| GET    | `/api/complaints`       | Get complaints       | Yes (All for Admin, Own for User) |
| GET    | `/api/complaints/:id`   | Get single complaint | Yes                               |
| PATCH  | `/api/complaints/:id`   | Update status        | Yes (Admin only)                  |
| DELETE | `/api/complaints/:id`   | Delete complaint     | Yes (Admin/Owner)                 |
| GET    | `/api/complaints/stats` | Get statistics       | Yes (Admin only)                  |

### Example API Calls

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Complaint:**

```bash
curl -X POST http://localhost:5000/api/complaints \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "wasteType=Plastic" \
  -F "description=Plastic bags on street" \
  -F "location=Main Street" \
  -F "image=@/path/to/image.jpg"
```

---

## 🧪 Testing with Demo Accounts

Use these credentials to test the application:

### Admin Account

- **Email:** admin@example.com
- **Password:** password123
- **Capabilities:** View all complaints, update status, delete, view stats

### User Account

- **Email:** user@example.com
- **Password:** password123
- **Capabilities:** Submit complaints, view own complaints

**Note:** You can create new accounts via the registration page.

---

## 📁 Project Structure

```
Full Stack Project/
├── backend/
│   ├── config/              # Database configuration
│   │   └── db.js
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   └── complaintController.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   └── complaintRoutes.js
│   ├── middleware/          # Express middleware
│   │   ├── auth.js          # JWT verification
│   │   ├── adminAuth.js     # Admin check
│   │   ├── upload.js        # Multer config
│   │   └── errorHandler.js
│   ├── uploads/             # Uploaded images
│   ├── server.js            # Main entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service
│   │   ├── context/         # Auth context
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.jsx          # Main component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind CSS
│   ├── public/              # Static files
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
```

---

## 🔒 Security Features

1. **Password Hashing:** Bcrypt with salt
2. **JWT Authentication:** Secure token-based auth
3. **Role-Based Access Control:** User vs Admin roles
4. **Request Validation:** Input sanitization
5. **CORS Protection:** Origin verification
6. **File Upload Security:** Type and size validation

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

Solution: Ensure MongoDB is running (`mongod` command)

**Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::5000
```

Solution: Change PORT in .env file or kill process using port 5000

**Module Not Found**

```
Error: Cannot find module 'express'
```

Solution: Run `npm install` in backend directory

### Frontend Issues

**API Connection Error**

```
Cannot reach http://localhost:5000/api
```

Solution: Ensure backend server is running

**Vite Port Conflict**

```
Port 5173 already in use
```

Solution: Vite will automatically use next available port (5174, 5175, etc.)

**Tailwind Not Working**

```
Classes not being applied
```

Solution: Rebuild with `npm run build` or restart dev server

---

## 📚 Key Technologies

### Backend

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password security
- **Multer** - File uploads
- **CORS** - Cross-origin support

### Frontend

- **React** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

---

## 📦 Deployment

### Backend Deployment (Heroku, Render, Railway)

```bash
# Create Procfile in backend
web: node server.js

# Deploy to Heroku
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel, Netlify)

```bash
# Build
npm run build

# Deploy dist folder to Vercel or Netlify
# Or use CLI: vercel deploy
```

---

## 📝 Code Comments

All files include detailed comments explaining:

- Function purposes
- Parameter meanings
- Return values
- API endpoints
- Security considerations

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

---

## 📧 Support

For issues or questions:

1. Check the troubleshooting section
2. Review code comments
3. Check browser console for errors
4. Check server logs

---

## 📄 License

ISC License

---

## 🎉 Congratulations!

Your Smart Waste Management System is now ready to use. Happy coding! ♻️
