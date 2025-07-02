import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URLNODEJS || "http://localhost:8000/api";

const nodeApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

nodeApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default nodeApi;
