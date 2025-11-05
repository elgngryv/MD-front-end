import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://62.84.178.128:5555/api/v1";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error.message);
    throw error;
  }
};
