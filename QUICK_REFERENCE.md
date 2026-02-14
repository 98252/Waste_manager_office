# ⚡ Quick Reference Guide

## 🎯 Super Quick Start (5 minutes)

### On Windows:

```bash
cd Full\ Stack\ Project
setup.bat
# Then in Terminal 1:
cd backend && npm run dev
# Then in Terminal 2:
cd frontend && npm run dev
# Open http://localhost:5173
```

### On Mac/Linux:

```bash
cd Full\ Stack\ Project
bash setup.sh
# Then in Terminal 1:
cd backend && npm run dev
# Then in Terminal 2:
cd frontend && npm run dev
# Open http://localhost:5173
```

---

## 🔑 Login Credentials

```
🔓 Admin Account
Email: admin@example.com
Password: password123

👤 User Account
Email: user@example.com
Password: password123
```

---

## 📍 Important URLs

| URL                              | Purpose      |
| -------------------------------- | ------------ |
| http://localhost:5173            | Frontend app |
| http://localhost:5000/api        | Backend API  |
| http://localhost:5000/api/health | Health check |

---

## 📦 Commands Cheatsheet

### Backend Commands

```bash
cd backend

# Install dependencies
npm install

# Start dev server (with auto-reload)
npm run dev

# Start production server
npm start
```

### Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗂️ Key Folders

```
backend/
  ├── models/           Database schemas
  ├── controllers/      Business logic
  ├── routes/           API endpoints
  ├── middleware/       Request processing
  └── uploads/          Image storage

frontend/
  ├── src/pages/        Page components
  ├── src/components/   Reusable components
  ├── src/services/     API calls
  ├── src/context/      State management
  └── src/hooks/        Custom hooks
```

---

## 🔌 Main API Endpoints

```
POST /api/auth/register          Create account
POST /api/auth/login             Login
GET  /api/auth/me                Current user

POST /api/complaints             Submit complaint
GET  /api/complaints             Get complaints
PATCH /api/complaints/:id        Update (admin)
DELETE /api/complaints/:id       Delete

GET /api/complaints/stats        Statistics (admin)
```

---

## 🔐 Authentication Header

```
Authorization: Bearer <JWT_TOKEN>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Common Issues & Fixes

| Issue                        | Solution                                    |
| ---------------------------- | ------------------------------------------- |
| "MongoDB connection refused" | Start MongoDB: `mongod`                     |
| "Port already in use"        | Kill process or change PORT in .env         |
| "Cannot find module"         | Run `npm install`                           |
| "CORS error"                 | Check backend .env has correct frontend URL |
| "Image not uploading"        | Check /uploads folder permissions           |
| "Tailwind not working"       | Restart dev server                          |

---

## 🎨 Tailwind CSS Classes Used

```
Colors:
  primary     (Green)
  secondary   (Blue)
  danger      (Red)
  warning     (Orange)
  success     (Green)
  dark        (Dark Gray)
  light       (Light Gray)

Components:
  btn-primary
  btn-secondary
  btn-danger
  input-field
  card
  section-title
  subsection-title
```

---

## 📊 Database Collections

### Users

```javascript
{
  (_id,
    name,
    email,
    password(hashed),
    role(user / admin),
    phone,
    address,
    createdAt,
    updatedAt);
}
```

### Complaints

```javascript
{
  _id, userId, wasteType, description,
  location, latitude, longitude, image,
  status (Pending/In Progress/Completed),
  adminNotes, createdAt, updatedAt
}
```

---

## 🧪 Test Scenarios

### User Flow

1. Register → Dashboard → Submit Complaint → See Status

### Admin Flow

1. Login (admin) → Dashboard (stats) → Manage Complaints → Update Status

### Mobile

1. Check responsive design on iPhone size

---

## 📄 Documentation Files

```
README.md                 ← Start here
ARCHITECTURE.md          ← How it works
BACKEND_SETUP.md        ← Backend guide
FRONTEND_SETUP.md       ← Frontend guide
DEMO_ACCOUNTS.md        ← Test credentials
FILE_LISTING.md         ← File reference
VERIFICATION_CHECKLIST.md ← Testing guide
PROJECT_SUMMARY.md      ← Project overview
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm run build
# Upload dist/ folder to Vercel
```

### Backend (Heroku)

```bash
git push heroku main
```

---

## 🔍 Debugging Tips

### Backend

```bash
# Check server logs
# Look for errors in terminal where npm run dev runs
# Check .env file values
# Verify MongoDB connection
```

### Frontend

```bash
# Check browser console (F12)
# Check Network tab for API calls
# Check Application tab for localStorage token
# Clear cache if issues persist
```

---

## 🎯 File To Edit For Customization

| Feature        | File                                  |
| -------------- | ------------------------------------- |
| Colors/Styling | frontend/tailwind.config.js           |
| Logo/Header    | frontend/src/components/Header.jsx    |
| API Base URL   | frontend/src/services/api.js          |
| Waste Types    | backend/models/Complaint.js           |
| Email/Auth     | backend/controllers/authController.js |
| Port           | backend/.env                          |

---

## 💡 Key Technologies

```
Backend: Node.js, Express, MongoDB, Mongoose
Frontend: React, Vite, Tailwind CSS, Axios
Auth: JWT, Bcrypt
Upload: Multer
```

---

## 🆘 Need Help?

1. Check README.md
2. Check ARCHITECTURE.md
3. Look at code comments
4. Check error message in console
5. Review VERIFICATION_CHECKLIST.md

---

## ✨ Features Quick List

### User Features ✅

- Register/Login
- Submit complaints
- View complaint status
- Upload images
- Mobile-responsive

### Admin Features ✅

- View all complaints
- Update status
- Add notes
- Delete complaints
- View statistics
- See images

### Security ✅

- JWT authentication
- Password hashing
- Role-based access
- File validation
- CORS protection

---

## 🎓 Learning Path

1. Try using the app first (register, submit complaint)
2. Read README.md (understand what it does)
3. Read ARCHITECTURE.md (understand how it works)
4. Look at code files and comments
5. Try modifying something small
6. Build upon the foundation

---

## 📱 Responsive Breakpoints

```
Mobile:   < 768px (1 column)
Tablet:   768px - 1024px (2 columns)
Desktop:  > 1024px (4 columns)
```

---

## 🔄 Request/Response Flow

```
User Action
    ↓
Frontend Component
    ↓
Axios API Call
    ↓
Backend Middleware (Auth, Upload)
    ↓
Controller (Business Logic)
    ↓
MongoDB (Persist Data)
    ↓
Return Response
    ↓
Frontend Shows Result
```

---

## 📊 Status Values

```
✋ Pending       (Newly submitted)
🔄 In Progress  (Admin is working)
✅ Completed    (Resolved)
```

---

## 🎁 What's Included

✅ 40+ Files
✅ 4000+ Lines of Code
✅ Complete Backend with 6 Endpoints
✅ Complete Frontend with 6 Pages
✅ Professional Documentation
✅ Setup Scripts
✅ Demo Accounts
✅ Error Handling
✅ Security Features
✅ Responsive Design

---

## 🏁 Next Steps

```
1. ✅ Run setup
2. ✅ Start servers
3. ✅ Test application
4. ✅ Read code
5. ✅ Make modifications
6. ✅ Deploy (optional)
```

---

**Everything you need is ready! Happy coding! ♻️**

For more details, see README.md
