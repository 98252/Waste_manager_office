/**
 * Authentication Context
 * Manages user authentication state globally
 */

import { createContext, useState, useEffect, useCallback } from "react";
import { authAPI } from "../services/api";

// Create context
export const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Register user
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Login user
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
