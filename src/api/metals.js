import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// ✔ Create
export const createMetals = async (data) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/metalss/create`,
    data
  );
  return response.data;
};

// ✔ Update
export const updateMetals = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/metalss/update/${id}`,
    data
  );
  return response.data;
};

// ✔ Update status
export const updateMetalsStatus = async (id, statusData) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/metalss/update/status/${id}`,
    statusData
  );
  return response.data;
};

// ✔ Search
export const searchMetals = async (params) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/metalss/search`, {
    params,
  });
  return response.data;
};

// ✔ Read all
export const readMetals = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/metalss/read`);
  return response.data;
};

// ✔ Read list (for dropdowns, light fetch)
export const readMetalsList = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/metalss/read-list`);
  return response.data;
};

// ✔ Read by ID
export const readMetalsById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/metalss/read-by-id/${id}`
  );
  return response.data;
};

// ✔ Export to Excel
export const exportMetalsToExcel = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/metalss/export/excel`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

// ✔ Delete
export const deleteMetals = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/metalss/delete/${id}`
  );
  return response.data;
};
