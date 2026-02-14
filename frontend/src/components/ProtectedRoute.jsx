/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-2xl font-bold text-primary'>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
