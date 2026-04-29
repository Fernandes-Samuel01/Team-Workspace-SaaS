import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// send cookies with every request
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // ✅ SIGNUP
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      console.log("API_URL:", API_URL);

      const response = await axios.post(
        `${API_URL}/auth/signup`,
        { email, password, name },
        { withCredentials: true }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.log("Signup error:", error);

      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // ✅ VERIFY EMAIL
  verifyEmail: async (verificationCode) => {
    try {
      console.log("API_URL:", API_URL);

      const response = await axios.post(
        `${API_URL}/auth/verify-email`,
        { code: verificationCode },
        { withCredentials: true }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  // ✅ LOGIN
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      console.log("API_URL:", API_URL);

      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      console.log("Login error:", error);

      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
    }
  },

  // ✅ CHECK AUTH
  checkAuth: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/auth/check-auth`,
        { withCredentials: true }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },

  // ✅ LOGOUT
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },

  // ✅ FORGOT PASSWORD
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );

      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  // ✅ RESET PASSWORD
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );

      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },
}));