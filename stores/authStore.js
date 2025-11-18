import { create } from "zustand";
import {
  login as loginApi,
  refreshToken as refreshTokenApi,
} from "../src/api/login";

// Token decode helper (JWT içindən userId və ya username çıxartmaq üçün)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    return null;
  }
}

// Check if token is expired
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return true;
    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    return true;
  }
}

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async ({ username, password }) => {
    set({ loading: true, error: null });
    try {
      const response = await loginApi({ username, password });

      // ✅ Backend cavabına uyğun götürürük
      const token = response.tokenPair?.accessToken;
      const refreshToken = response.tokenPair?.refreshToken;

      // Əgər token JWT-dirsə, içindən məlumat çıxara bilərik
      const decoded = parseJwt(token);
      const userId = decoded?.sub || null;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        if (userId) {
          localStorage.setItem("userId", userId);
        }

        set({
          token,
          user: { id: userId, username: decoded?.username || username },
          loading: false,
        });

        return true;
      } else {
        throw new Error("Token tapılmadı");
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    set({ user: null, token: null });
  },

  loadTokenFromStorage: () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      set({ token, user: { id: userId } });
    }
  },

  // Refresh access token using refresh token
  refreshAccessToken: async () => {
    try {
      const refreshTokenValue = localStorage.getItem("refreshToken");
      if (!refreshTokenValue) {
        throw new Error("Refresh token not found");
      }

      const response = await refreshTokenApi(refreshTokenValue);
      const newAccessToken = response.tokenPair?.accessToken;
      const newRefreshToken = response.tokenPair?.refreshToken;

      if (newAccessToken) {
        localStorage.setItem("token", newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        const decoded = parseJwt(newAccessToken);
        const userId = decoded?.sub || null;
        if (userId) {
          localStorage.setItem("userId", userId);
        }

        set({ token: newAccessToken });
        return newAccessToken;
      } else {
        throw new Error("New access token not received");
      }
    } catch (error) {
      console.error("Refresh token failed:", error);
      // Clear tokens and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      set({ token: null, user: null });
      throw error;
    }
  },

  setError: (error) => set({ error }),
}));

export default useAuthStore;
