// api/patientXrayApi.js
import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createPatientXray = async (data, file) => {
  const formData = new FormData();
  formData.append("date", data.date);
  formData.append("description", data.description);
  formData.append("patientId", data.patientId);
  formData.append("file", file);

  const response = await axiosInstance.post(
    `${API_BASE_URL}/patient-xray/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updatePatientXray = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/patient-xray/update/${id}`,
    data
  );
  return response.data;
};

export const getAllPatientXrays = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/patient-xray/read`);
  return response.data;
};

export const getPatientXrayById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/patient-xray/read-by-id/${id}`
  );
  return response.data;
};

export const deletePatientXray = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/patient-xray/delete/${id}`
  );
  return response.data;
};
