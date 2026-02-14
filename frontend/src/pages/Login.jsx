/**
 * Login Page
 * User login functionality
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (formData) => {
    const result = await login(formData.email, formData.password);
    if (result.success) {
      // Redirect based on role
      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      setAuthError(result.error);
    }
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4'>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
        <AuthForm
          title='Login'
          onSubmit={handleLogin}
          isLoading={loading}
          error={authError}
          fields={fields}
        />

        <p className='text-center mt-6 text-gray-600'>
          Don't have an account?{" "}
          <Link
            to='/register'
            className='text-primary font-bold hover:underline'
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
