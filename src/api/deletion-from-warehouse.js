// src/api/deletionFromWarehouseApi.js
// temp-axios-auth.js faylından konfiqurasiya olunmuş axiosInstance-i import edirik.
// Bu yolun öz layihənizdə düzgün olduğuna əmin olun!
import axiosInstance from "./temp-axios-auth";

// API_BASE_URL dəyişəninə və 'instance' obyektinin yaradılmasına artıq ehtiyac yoxdur,
// çünki axiosInstance artıq bütün lazımi konfiqurasiyaları (baseURL, headers, token və s.) özündə saxlayır.
// const instance = axios.create({ ... }); // Bu bloku silin və ya kommentə alın!

/**
 * Anbardan silinmə əməliyyatlarının siyahısını oxuyur.
 * @returns {Promise<Array<object>>} Anbardan silinmə əməliyyatlarının siyahısı.
 * @throws {Error} API çağırışı uğursuz olarsa xəta atır.
 */
export const readDeletionsFromWarehouse = async () => {
    try {
        // Birbaşa import edilmiş axiosInstance istifadə edirik
        const response = await axiosInstance.get('/deletion-from-warehouse/read');
        return response.data;
    } catch (error) {
        console.error("Error fetching all deletions from warehouse:", error);
        throw error;
    }
};

/**
 * Yeni bir anbardan silinmə əməliyyatı yaradır.
 * @param {object} data - Yaradılacaq anbardan silinmə əməliyyatının məlumatları.
 * @returns {Promise<object>} Yaradılmış əməliyyatın məlumatları.
 * @throws {Error} API çağırışı uğursuz olarsa xəta atır.
 */
export const createDeletionFromWarehouse = async (data) => {
    try {
        // Birbaşa import edilmiş axiosInstance istifadə edirik
        const response = await axiosInstance.post('/deletion-from-warehouse/create', data);
        return response.data;
    } catch (error) {
        console.error("Error creating deletion from warehouse:", error);
        throw error;
    }
};

/**
 * ID-yə görə müəyyən bir anbardan silinmə əməliyyatının məlumatlarını gətirir.
 * @param {number} id - Anbardan silinmə əməliyyatının ID-si.
 * @returns {Promise<object>} Əməliyyatın məlumatları.
 * @throws {Error} API çağırışı uğursuz olarsa xəta atır.
 */
export const getDeletionFromWarehouseInfo = async (id) => {
    try {
        // Birbaşa import edilmiş axiosInstance istifadə edirik
        const response = await axiosInstance.get(`/deletion-from-warehouse/info/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching deletion from warehouse info for ID ${id}:`, error);
        throw error;
    }
};

/**
 * Mövcud bir anbardan silinmə əməliyyatını yeniləyir.
 * @param {object} data - Yenilənəcək əməliyyatın məlumatları.
 * @returns {Promise<object>} Yenilənmiş əməliyyatın məlumatları.
 * @throws {Error} API çağırışı uğursuz olarsa xəta atır.
 */
export const updateDeletionFromWarehouse = async (data) => {
    try {
        // Birbaşa import edilmiş axiosInstance istifadə edirik
        const response = await axiosInstance.put('/deletion-from-warehouse/update', data);
        return response.data;
    } catch (error) {
        console.error("Error updating deletion from warehouse:", error);
        throw error;
    }
};

/**
 * ID-yə görə müəyyən bir anbardan silinmə əməliyyatını silir.
 * @param {number} id - Silinəcək əməliyyatın ID-si.
 * @returns {Promise<object>} Silmə əməliyyatının cavabı.
 * @throws {Error} API çağırışı uğursuz olarsa xəta atır.
 */
export const deleteDeletionFromWarehouse = async (id) => {
    try {
        // Birbaşa import edilmiş axiosInstance istifadə edirik
        const response = await axiosInstance.delete(`/deletion-from-warehouse/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting deletion from warehouse with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Anbardan silinmə əməliyyatlarında axtarış edir.
 * @param {object} filters - Axtarış üçün filtrlər.
 * @returns {Promise<Array<object>>} Axtarış nəticələri.
 * @throws {Error} API çağırışı uğursuz olarsa xəta atır.
 */
export const searchDeletionsFromWarehouse = async (filters) => {
    try {
        // Birbaşa import edilmiş axiosInstance istifadə edirik
        const response = await axiosInstance.post('/deletion-from-warehouse/search', filters);
        return response.data;
    } catch (error) {
        console.error("Error searching deletions from warehouse:", error);
        throw error;
    }
};