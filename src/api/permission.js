import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

// Yeni permission yaratmaq (POST)
export const createPermission = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/permission/create`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Permission yaratmaqda xəta:", error);
    throw error;
  }
};
export const fetchPermissions = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/permission/read`);
    return response.data;
  } catch (error) {
    console.error("İcazələri oxumaqda xəta:", error);
    throw error;
  }
};

// GET ilə id-ə görə icazə oxumaq (info)
export const fetchPermissionById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/permission/info/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`ID ilə icazə tapılmadı: ${id}`, error);
    throw error;
  }
};
