/**
 * Navigation Header Component
 * Displays navbar with links based on user role
 */

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className='bg-dark text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        {/* Logo */}
        <Link
          to='/'
          className='text-2xl font-bold text-primary hover:text-green-400'
        >
          ♻️ Waste Manager
        </Link>

        {/* Navigation Links */}
        <nav className='flex gap-6 items-center'>
          {!isAuthenticated ? (
            <>
              <Link
                to='/login'
                className='hover:text-primary transition font-medium'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='bg-primary px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium'
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <Link
                    to='/admin/dashboard'
                    className='hover:text-primary transition font-medium'
                  >
                    Dashboard
                  </Link>
                  <Link
                    to='/admin/complaints'
                    className='hover:text-primary transition font-medium'
                  >
                    All Complaints
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to='/user/dashboard'
                    className='hover:text-primary transition font-medium'
                  >
                    My Complaints
                  </Link>
                  <Link
                    to='/user/submit'
                    className='hover:text-primary transition font-medium'
                  >
                    Submit Complaint
                  </Link>
                </>
              )}

              {/* User Info Dropdown */}
              <div className='flex items-center gap-3'>
                <span className='text-sm'>Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className='bg-danger px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium'
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
