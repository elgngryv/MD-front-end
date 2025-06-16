import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// CREATE
export const createAnamnesisCategory = async (data) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/anamnesis-categories/create`,
    data
  );
  return response.data;
};

// UPDATE by ID
export const updateAnamnesisCategory = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/anamnesis-categories/update/${id}`,
    data
  );
  return response.data;
};

// UPDATE STATUS by ID
export const updateAnamnesisCategoryStatus = async (id, data) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/anamnesis-categories/update/status/${id}`,
    data
  );
  return response.data;
};

// SEARCH
export const searchAnamnesisCategories = async (params) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/search`,
    { params }
  );
  return response.data;
};

// READ
export const readAnamnesisCategories = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/read`
  );
  return response.data;
};

// READ LIST
export const readAnamnesisCategoryList = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/read-list`
  );
  return response.data;
};

// READ BY ID
export const readAnamnesisCategoryById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/read-by-id/${id}`
  );
  return response.data;
};

// EXPORT TO EXCEL
export const exportAnamnesisCategoriesToExcel = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/export/excel`,
    {
      responseType: "blob",
    }
  );
  return response;
};

// DELETE BY ID
export const deleteAnamnesisCategory = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/anamnesis-categories/delete/${id}`
  );
  return response.data;
};
