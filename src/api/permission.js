import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/permission`;

// Yeni permission yaratmaq (POST)
export const createPermission = async (data) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/create`, data);
  return response.data;
};

// PUT ilə icazələri oxumaq (read)
export const readPermission = async (data) => {
  const response = await axiosInstance.put(`${API_BASE_URL}/read`, data);
  return response.data;
};

// GET ilə id-ə görə icazə oxumaq (info)
export const readPermissionById = async (id) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/info/${id}`);
  return response.data;
};
