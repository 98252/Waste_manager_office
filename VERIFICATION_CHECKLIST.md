# ✅ Installation Checklist & Verification

## 📋 Pre-Installation Requirements

- [ ] Node.js v14+ installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] 2 terminal windows available
- [ ] Browser for testing
- [ ] Text editor (VS Code recommended)

---

## 🔧 Installation Steps

### Step 1: Navigate to Project

```bash
cd "Full Stack Project"
```

- [ ] Confirmed you're in correct directory

### Step 2: Run Setup Script

**Windows:**

```bash
setup.bat
```

**Mac/Linux:**

```bash
bash setup.sh
```

- [ ] Setup script ran without errors
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file created

### Step 3: Verify MongoDB

**Option A: Local MongoDB**

```bash
mongod
```

- [ ] MongoDB is running on localhost:27017

**Option B: MongoDB Atlas**

- [ ] Atlas account created
- [ ] Cluster created
- [ ] Connection string obtained
- [ ] .env MONGO_URI updated

---

## 🚀 Server Startup

### Terminal 1: Start Backend

```bash
cd backend
npm run dev
```

**Expected Output:**

```
╔════════════════════════════════════════════════════════╗
║  Smart Waste Management System - Backend Server       ║
║  Server is running on http://localhost:5000             ║
║  Environment: development                              ║
╚════════════════════════════════════════════════════════╝
```

- [ ] Backend started successfully
- [ ] No errors in console
- [ ] Server ready for requests

### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
```

**Expected Output:**

```
✓ built in XXms
➜  Local:   http://localhost:5173/
```

- [ ] Frontend started successfully
- [ ] No errors in console
- [ ] Vite dev server running

---

## 🌐 Browser Testing

### Open Application

1. [ ] Open http://localhost:5173 in browser
2. [ ] Page loads without errors
3. [ ] See login page

### Initial Page Check

- [ ] Login button visible
- [ ] Register button visible
- [ ] Demo credentials shown (if configured)
- [ ] Page is responsive

---

## 🧪 Functional Testing

### User Registration

```
1. Click "Register"
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Phone: 1234567890
   - Address: 123 Main St
3. Click "Register"
```

- [ ] Registration form accepts input
- [ ] Submit button works
- [ ] No validation errors
- [ ] Redirected to dashboard
- [ ] Browser shows success

### User Login

```
1. Click "Logout"
2. Click "Login"
3. Enter credentials:
   - Email: test@example.com
   - Password: password123
4. Click "Login"
```

- [ ] Login form accepts input
- [ ] Submit button works
- [ ] Credentials validated
- [ ] Redirected to user dashboard
- [ ] User name shown in header

### User Dashboard

- [ ] Page loads with statistics
- [ ] Complaints table visible (empty initially)
- [ ] "Submit Complaint" button visible
- [ ] Navigation links work

### Submit Complaint

```
1. Click "Submit Complaint"
2. Fill form:
   - Type: Plastic
   - Description: Test complaint
   - Location: Main Street
   - Image: Select any image file
3. Click "Submit Complaint"
```

- [ ] Form accepts all inputs
- [ ] Image upload works
- [ ] Form validates
- [ ] Complaint submitted successfully
- [ ] Redirected to dashboard
- [ ] New complaint appears in table

### View Complaint Details

- [ ] Click on complaint row
- [ ] Can see full details
- [ ] Image preview works
- [ ] Status badge displays correctly
- [ ] Location shows correctly

### Admin Features (Login as admin@example.com)

1. [ ] Login with admin credentials
2. [ ] Redirected to admin dashboard
3. [ ] Statistics cards visible
4. [ ] Numbers displayed correctly
5. [ ] Charts/breakdowns shown

### Admin - View All Complaints

```
1. Click "All Complaints"
2. View complaint table
```

- [ ] All complaints displayed
- [ ] User details shown
- [ ] Status filters work
- [ ] Edit button appears
- [ ] Delete button appears

### Admin - Update Complaint

```
1. Click "Edit" on a complaint
2. Change status to "In Progress"
3. Add note: "Test note"
4. Click "Update"
```

- [ ] Modal opens
- [ ] Image preview visible
- [ ] Form fields editable
- [ ] Status changes
- [ ] Notes saved
- [ ] Update successful
- [ ] Table refreshes

### Admin - Delete Complaint

```
1. Click "Delete" on a complaint
2. Confirm deletion
```

- [ ] Confirmation dialog appears
- [ ] Complaint deleted
- [ ] Table updates immediately

### Responsive Design

- [ ] Resize browser to mobile size
- [ ] Layout adjusts properly
- [ ] Buttons clickable
- [ ] Form readable
- [ ] Navigation works
- [ ] Images scale correctly

---

## 🔒 Security Verification

### JWT Token Storage

1. [ ] Open browser DevTools (F12)
2. [ ] Go to Application > Local Storage
3. [ ] Verify token is stored
4. [ ] Token is not exposed in URL
5. [ ] Token sent in Authorization header

### Password Security

- [ ] Passwords not visible in code
- [ ] Passwords hashed in database
- [ ] Password requires minimum 6 characters
- [ ] Same password for different users produces different hash

### Authentication Verification

1. [ ] Copy JWT token from localStorage
2. [ ] Logout
3. [ ] Manually add token back
4. [ ] Refresh page - should still be logged in
5. [ ] Delete token
6. [ ] Refresh page - redirects to login

---

## 🐛 Error Handling Test

### Test Invalid Login

```
Email: nonexistent@example.com
Password: wrong
```

- [ ] Error message displays
- [ ] Not redirected
- [ ] Can retry

### Test Missing Required Fields

```
Leave fields empty
Click Submit
```

- [ ] Validation errors show
- [ ] Form not submitted

### Test File Upload Errors

```
1. Try uploading non-image file
2. Try uploading file > 5MB
```

- [ ] Error message displays
- [ ] File not uploaded

### Test API Error

```
1. Stop backend server
2. Try to login
3. Observe error handling
```

- [ ] Error message shown
- [ ] Graceful error handling
- [ ] No application crash

---

## 📊 Database Verification

### Check MongoDB Connection

```bash
# In MongoDB shell
use waste_management
db.users.find()
db.complaints.find()
```

- [ ] Users collection exists
- [ ] Complaints collection exists
- [ ] Data populated correctly

### Verify Data Structure

- [ ] User has: name, email, password, role
- [ ] Complaint has: wasteType, description, location, status, image
- [ ] Timestamps present on both

---

## 📁 File System Verification

### Backend

```bash
ls backend/
```

- [ ] server.js exists
- [ ] .env exists
- [ ] package.json exists
- [ ] node_modules created (after npm install)

### Backend Folders

- [ ] models/ folder exists with User.js, Complaint.js
- [ ] controllers/ folder exists with correct files
- [ ] routes/ folder exists with correct files
- [ ] middleware/ folder exists with correct files
- [ ] uploads/ folder exists (created by app)

### Frontend

- [ ] src/ folder exists
- [ ] public/ folder exists
- [ ] node_modules created (after npm install)
- [ ] package.json exists

### Frontend Structure

- [ ] src/components/ has Header, AuthForm, ProtectedRoute
- [ ] src/pages/ has all 6 pages
- [ ] src/services/ has api.js
- [ ] src/context/ has AuthContext.jsx
- [ ] src/hooks/ has useAuth.js

---

## 🎨 UI Verification

### Colors and Styling

- [ ] Header is dark color
- [ ] Buttons have correct colors
- [ ] Status badges use proper colors (yellow, blue, green)
- [ ] Hover effects work on buttons
- [ ] Input fields have proper styling
- [ ] Forms centered and readable

### Typography

- [ ] Headers are bold and larger
- [ ] Body text is readable
- [ ] Font is consistent
- [ ] Text contrast is good

### Layout

- [ ] Grid layout works on desktop
- [ ] Single column on mobile
- [ ] Padding/margins consistent
- [ ] No overflow issues
- [ ] Cards have shadow

---

## 🔄 API Integration Verification

### Check API Calls in DevTools

1. [ ] Open DevTools (F12)
2. [ ] Go to Network tab
3. [ ] Perform actions
4. [ ] Check requests/responses:

- [ ] POST /api/auth/register (201)
- [ ] POST /api/auth/login (200)
- [ ] GET /api/auth/me (200)
- [ ] POST /api/complaints (201)
- [ ] GET /api/complaints (200)
- [ ] PATCH /api/complaints/:id (200)
- [ ] DELETE /api/complaints/:id (200)
- [ ] GET /api/complaints/stats (200)

### Verify Response Format

- [ ] All responses include success field
- [ ] Errors include message
- [ ] Data structure matches documentation
- [ ] Status codes correct

---

## ⚡ Performance Checks

### Load Times

- [ ] Pages load in < 2 seconds
- [ ] Buttons respond immediately
- [ ] No lag on interactions

### Image Handling

- [ ] Images load correctly
- [ ] Images resize properly
- [ ] No broken image icons
- [ ] File upload shows progress

---

## 📝 Documentation Verification

- [ ] README.md exists and readable
- [ ] ARCHITECTURE.md explains system
- [ ] BACKEND_SETUP.md has instructions
- [ ] FRONTEND_SETUP.md has instructions
- [ ] DEMO_ACCOUNTS.md shows test credentials
- [ ] CODE comments are present
- [ ] All files have header comments

---

## 🎓 Code Review

### Backend Code

- [ ] Each file has purpose comments
- [ ] Functions have documentation
- [ ] Error handling present
- [ ] Validation implemented
- [ ] No console.log spam

### Frontend Code

- [ ] Components are functional
- [ ] Props are validated
- [ ] State management clean
- [ ] API calls error handled
- [ ] Loading states present

---

## 🚀 Final Checklist

- [ ] All installation steps completed
- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] Can login with demo account
- [ ] Can create new account
- [ ] Can submit complaint
- [ ] Can view complaints
- [ ] Admin can update status
- [ ] Admin can view statistics
- [ ] UI is responsive
- [ ] All features working
- [ ] Documentation complete

---

## ✅ All Tests Passed?

If all items are checked:

## 🎉 Congratulations!

Your Smart Waste Management System is ready!

### What To Do Next:

1. Explore the codebase
2. Read the documentation
3. Test more scenarios
4. Make customizations
5. Deploy when ready

### Common Customizations:

- [ ] Change logo/branding
- [ ] Modify waste types
- [ ] Adjust styling/colors
- [ ] Add more fields to forms
- [ ] Implement additional features

---

**System Status: ✅ FULLY OPERATIONAL**

For issues, check troubleshooting in README.md

Happy coding! ♻️
