import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "/api/v1";

const getToken = () => {
  return localStorage.getItem("token");
};

export const createPatient = async (patientData) => {
  try {
    const token = getToken();

    // ✅ Düzgün field adları ilə data hazırlayın
    const dataToSend = {
      ...patientData,
      finCode: patientData.finCode === "" ? null : patientData.finCode,
      // doctorId olduğu kimi qalsın, çünki backend doctorId gözləyir
      // doctor_id əlavə etməyin və doctorId silməyin
    };

    // ❌ BUNU SİLİN - doctorId silməyin
    // delete dataToSend.doctorId;

    console.log("API-ya göndərilən data:", JSON.stringify(dataToSend, null, 2));

    const response = await axios.post(
      `${BASE_URL}/patient/create`,
      dataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Pasiyent əlavə edilərkən xəta baş verdi:", error);
    throw error;
  }
};

export const editPatient = async (patientData) => {
  try {
    const token = getToken();

    // Prepare data for backend - ensure finCode is null if empty
    const dataToSend = {
      ...patientData,
      finCode: patientData.finCode === "" ? null : patientData.finCode,
    };

    const response = await axios.put(`${BASE_URL}/patient/update`, dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Pasiyent məlumatları yenilənərkən xəta baş verdi:", error);
    throw error;
  }
};

export const readPatients = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/patient/read`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Pasiyentlər oxunarkən xəta baş verdi:", error);
    throw error;
  }
};

export const readPatientById = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/patient/read-by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`ID ${id} olan pasiyent oxunarkən xəta baş verdi:`, error);
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    const token = getToken();
    await axios.delete(`${BASE_URL}/patient/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`ID ${id} olan pasiyent uğurla silindi.`);
  } catch (error) {
    console.error(`ID ${id} olan pasiyent silinərkən xəta baş verdi:`, error);
    throw error;
  }
};

export const searchPatients = async (params) => {
  try {
    const token = getToken();
    const response = await axios.post(`${BASE_URL}/patient/search`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Pasiyent axtarışı zamanı xəta baş verdi:", error);
    throw error;
  }
};

export const exportPatientsToExcel = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/patient/export/excel`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "patients.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Pasiyentlər Excel-ə ixrac edilərkən xəta baş verdi:", error);
    throw error;
  }
};
