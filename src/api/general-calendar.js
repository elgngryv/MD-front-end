import axiosInstance from "./temp-axios-auth"; // Assuming this path is correct

const API_BASE_URL = import.meta.env.VITE_BASE_URL + "/general-calendar";

// 🔽 Bütün həkimləri gətir
export const getDoctors = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/read-doctors`);
  return response.data;
};

// 🔽 Bütün otaqları gətir
export const getRooms = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/read-rooms`);
  return response.data;
};

// 🔽 Yeni təyinat (appointment) yaradılması
export const createAppointment = async (appointmentData) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/new-appointment`,
    appointmentData
  );
  return response.data;
};

// 🔽 Təyinatın yenilənməsi
export const updateAppointment = async (appointmentData) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/update-appointment`,
    appointmentData
  );
  return response.data;
};

// 🔽 Təyinatın silinməsi
export const deleteAppointment = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/delete-appointment/${id}`
  );
  return response.data;
};

// 🔽 Otağa görə pasiyentləri gətir
export const getRoomPatients = async (room) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/selecting-room-viewing-patient/${room}`
  );
  return response.data;
};

// 🔽 Pasiyent haqqında məlumatları gətir (ID-yə görə)
export const getPatientDetails = async (patientId) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/selecting-patient-to-read/${patientId}`
  );
  return response.data;
};

// 🔽 Həkimə görə pasiyentləri gətir
export const getDoctorPatients = async (doctorId) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/selecting-doctor-viewing-patient/${doctorId}`
  );
  return response.data;
};