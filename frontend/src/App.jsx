/**
 * Main App Component
 * Routing and layout management
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* User Routes */}
          <Route
            path='/user/dashboard'
            element={
              <ProtectedRoute requiredRole='user'>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/submit'
            element={
              <ProtectedRoute requiredRole='user'>
                <SubmitComplaint />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path='/admin/dashboard'
            element={
              <ProtectedRoute requiredRole='admin'>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/complaints'
            element={
              <ProtectedRoute requiredRole='admin'>
                <AdminComplaints />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path='/' element={<Navigate to='/login' replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
