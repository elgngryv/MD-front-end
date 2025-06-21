import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createAnamnesis = (data) => {
  console.log("Yollanan data:", data); // Debug
  return axiosInstance.post(`${API_BASE_URL}/anamnesis-list/create`, data);
};

export const updateAnamnesis = (id, data) =>
  axiosInstance.put(`${API_BASE_URL}/anamnesis-list/update/${id}`, data);

export const updateAnamnesisStatus = (id, data) =>
  axiosInstance.patch(
    `${API_BASE_URL}/anamnesis-list/update/status/${id}`,
    data
  );

export const deleteAnamnesis = (id) =>
  axiosInstance.delete(`${API_BASE_URL}/anamnesis-list/delete/${id}`);

export const getAnamnesisList = () =>
  axiosInstance.get(`${API_BASE_URL}/anamnesis-list/read`);

export const getAnamnesisById = (id) =>
  axiosInstance.get(`${API_BASE_URL}/anamnesis-list/read-by-id/${id}`);

export const searchAnamnesis = (query) =>
  axiosInstance.get(`${API_BASE_URL}/anamnesis-list/search`, {
    params: { q: query },
  });

export const exportAnamnesisToExcel = () =>
  axiosInstance.get(`${API_BASE_URL}/anamnesis-list/export/excel`, {
    responseType: "blob",
  });
