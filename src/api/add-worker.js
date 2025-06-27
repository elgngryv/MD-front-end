import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createWorker = async (workerData) => {
  try {
    console.log(
      "Creating worker with data:",
      JSON.stringify(workerData, null, 2)
    );

    const response = await axiosInstance.post(
      `${API_BASE_URL}/add-worker/create`,
      workerData
    );

    console.log("Worker created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating worker:", error);

    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    throw error;
  }
};

export const readWorkers = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/add-worker/read`);
    return response.data;
  } catch (error) {
    console.error("Error reading workers:", error);
    throw error;
  }
};

export const readWorkerStatus = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/add-worker/read-status`
    );
    return response.data;
  } catch (error) {
    console.error("Error reading worker status:", error);
    throw error;
  }
};

export const getWorkerInfo = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/add-worker/info/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting worker info:", error);
    throw error;
  }
};

export const updateWorker = async (workerData) => {
  console.log("🔧 Göndərilən worker data:", workerData);

  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/add-worker/update`,
      workerData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating worker:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const searchWorkers = async (searchParams) => {
  try {
    // Axtarış parametrlərini qismən uyğunluq üçün çeviririk
    const transformedParams = {};
    for (const key in searchParams) {
      if (
        searchParams[key] !== undefined &&
        searchParams[key] !== null &&
        searchParams[key] !== ""
      ) {
        // String tipli sahələr üçün ətrafına wildcard (%) əlavə edirik.
        // Bu, backendin SQL LIKE sorğusu ilə qismən uyğunluq etməsini təmin edir.
        if (typeof searchParams[key] === "string") {
          transformedParams[key] = `%${searchParams[key]}%`;
        } else {
          transformedParams[key] = searchParams[key];
        }
      }
    }

    const response = await axiosInstance.post(
      `${API_BASE_URL}/add-worker/search`,
      transformedParams // Çevrilmiş parametrləri göndəririk
    );
    return response.data;
  } catch (error) {
    console.error("Error searching workers:", error);
    throw error;
  }
};

export const deleteWorker = async (id) => {
  try {
    console.log("Attempting to delete worker with id:", id);

    const response = await axiosInstance.delete(
      `${API_BASE_URL}/add-worker/delete/${id}`
    );

    if (response.status === 200) {
      console.log("✅ Worker deleted successfully");
    } else {
      console.error("❌ Worker deletion failed:", response);
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error deleting worker:",
      error.response?.data || error.message
    );
    throw error;
  }
};
