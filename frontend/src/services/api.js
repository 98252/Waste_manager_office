import axios from "axios";

// Create Axios instance with base URL from environment variables
const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ==================
// Auth Endpoints
// ==================

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
};

// ==================
// Complaint Endpoints
// ==================

export const complaintAPI = {
  createComplaint: (data) =>
    API.post("/complaints", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getComplaints: () => API.get("/complaints"),
  getComplaint: (id) => API.get(`/complaints/${id}`),
  updateComplaint: (id, data) => API.patch(`/complaints/${id}`, data),
  deleteComplaint: (id) => API.delete(`/complaints/${id}`),
  getStats: () => API.get("/complaints/stats"),
};

export default API;
