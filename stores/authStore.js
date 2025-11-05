import { create } from "zustand";
import { login as loginApi } from "../src/api/login";

// Token decode helper (JWT içindən userId və ya username çıxartmaq üçün)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    return null;
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

  setError: (error) => set({ error }),
}));

export default useAuthStore;
