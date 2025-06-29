import { create } from "zustand";
import { login as loginApi } from "../src/api/login";

// Token içindən userId çıxaran helper
function getUserIdFromToken(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload.sub;
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
      const token = response.tokenPair?.accessToken;
      const refreshToken = response.tokenPair?.refreshToken;
      const userId = getUserIdFromToken(token);

      if (token && userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);

        set({
          token,
          user: { id: userId, username },
          loading: false,
        });

        return true;
      } else {
        throw new Error("Token və ya userId tapılmadı");
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
    if (token && userId) {
      set({ token, user: { id: userId } });
    }
  },

  setError: (error) => set({ error }),
}));

export default useAuthStore;
