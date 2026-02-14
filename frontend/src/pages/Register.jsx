/**
 * Register Page
 * New user registration
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";

export default function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [authError, setAuthError] = useState(null);

  const handleRegister = async (formData) => {
    const result = await register(formData);
    if (result.success) {
      navigate("/user/dashboard");
    } else {
      setAuthError(result.error);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", placeholder: "John Doe" },
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
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "1234567890",
      required: false,
    },
    {
      name: "address",
      label: "Address",
      placeholder: "123 Main Street",
      required: false,
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-secondary to-primary flex items-center justify-center px-4'>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
        <AuthForm
          title='Register'
          onSubmit={handleRegister}
          isLoading={loading}
          error={authError}
          fields={fields}
        />

        <p className='text-center mt-6 text-gray-600'>
          Already have an account?{" "}
          <Link to='/login' className='text-primary font-bold hover:underline'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
