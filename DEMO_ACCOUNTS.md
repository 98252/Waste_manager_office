# Smart Waste Management System - Demo Account Setup

## 🎯 Quick Test Guide

### Admin Test Account

```
Email: admin@example.com
Password: password123
```

### User Test Account

```
Email: user@example.com
Password: password123
```

## 📋 What to Test

### As Regular User:

1. ✅ Login with user account
2. ✅ View personal dashboard (My Complaints)
3. ✅ Click "Submit Complaint"
4. ✅ Fill form with:
   - Waste Type: Select any option
   - Description: "Test complaint description"
   - Location: "Test Location"
   - Image: Upload any image (optional)
5. ✅ Submit complaint
6. ✅ See complaint in dashboard
7. ✅ Check status updates
8. ✅ Logout

### As Admin:

1. ✅ Login with admin account
2. ✅ View Admin Dashboard (see statistics)
3. ✅ Click "All Complaints"
4. ✅ Filter by status
5. ✅ Click "Edit" on a complaint
6. ✅ Update status to "In Progress"
7. ✅ Add admin notes
8. ✅ Save changes
9. ✅ View statistics breakdown
10. ✅ Logout

## 🔑 Creating Your Own Test Accounts

1. Click "Register" on login page
2. Fill in details:
   - Name: Your name
   - Email: your@email.com
   - Password: Choose secure password
   - Phone: Optional
   - Address: Optional
3. Click "Register"
4. You'll be logged in automatically
5. Start submitting complaints!

## 🎨 UI Features to Explore

- ✨ Responsive design (try on mobile/tablet)
- 🎨 Color-coded status badges
- 📊 Interactive statistics charts
- 📁 Image preview in admin panel
- 🔄 Real-time data updates
- 🎯 Smooth animations and transitions

## 📱 Test on Different Devices

- Desktop: http://localhost:5173
- Mobile: Visit from phone on same network
- Tablet: Test responsive design

## 🚀 Performance Tips

- Clear browser cache if having issues
- Use Chrome DevTools to check network
- Check browser console for errors
- Monitor backend logs for API issues

## ✅ All Features Verified

- [x] Authentication (register/login)
- [x] JWT token handling
- [x] User role separation
- [x] Complaint creation with image
- [x] Complaint listing
- [x] Status updates
- [x] Admin statistics
- [x] Responsive design
- [x] Error handling
- [x] Protected routes

## 🎓 Learning Points

Study the following to understand the codebase:

1. **Backend Authentication:**
   - `/backend/controllers/authController.js` - Login/Register logic
   - `/backend/middleware/auth.js` - JWT verification

2. **Frontend State Management:**
   - `/frontend/src/context/AuthContext.jsx` - Global auth state
   - `/frontend/src/hooks/useAuth.js` - Custom hook

3. **API Integration:**
   - `/frontend/src/services/api.js` - Axios configuration
   - Check how components call API functions

4. **Route Protection:**
   - `/frontend/src/components/ProtectedRoute.jsx` - Route guarding
   - Check `App.jsx` for route definitions

---

**Enjoy exploring your Smart Waste Management System! ♻️**
