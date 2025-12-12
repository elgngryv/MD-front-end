import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// ✔ read category and operation items
export const readCategoryAndOperationItems = async (id) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/patient-plans/read-category-and-operations/0`
  );
  return response.data;
};