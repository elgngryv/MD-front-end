// api/anamnesisCategory.js
import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createAnamnesisCategory = async (data) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/anamnesis-categories/create`,
    data
  );
  return response.data;
};

export const updateAnamnesisCategory = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/anamnesis-categories/update/${id}`,
    data
  );
  return response.data;
};

export const updateAnamnesisCategoryStatus = async (id, data) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/anamnesis-categories/update/status/${id}`,
    data
  );
  return response.data;
};

export const searchAnamnesisCategories = async (params) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/search`,
    { params }
  );
  return response.data;
};

export const readAnamnesisCategories = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/read`
  );
  return response.data.data; // Return only the data array
};

export const readAnamnesisCategoryById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/anamnesis-categories/read-by-id/${id}`
  );
  return response.data;
};

export const deleteAnamnesisCategory = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/anamnesis-categories/delete/${id}`
  );
  return response.data;
};
