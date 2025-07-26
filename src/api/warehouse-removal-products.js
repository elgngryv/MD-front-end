// src/api/warehouse-removal-products.js
import axiosInstance from "./temp-axios-auth"; // Ensure this path is correct!

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Creates a new warehouse removal product entry.
 * @param {object} data - The request body for creation.
 * @returns {Promise<object>} The created warehouse removal product data.
 */
export const createWarehouseRemovalProduct = async (data) => {
  try {
    // Ensure time is sent as "HH:mm:ss" string
    const formattedData = {
      ...data,
      time: data.time && data.time.length === 5 ? `${data.time}:00` : data.time,
    };
    console.log("Creating warehouse removal product with data:", JSON.stringify(formattedData, null, 2));
    const response = await axiosInstance.post(
      `${API_BASE_URL}/warehouse-removal-product/create`,
      formattedData
    );
    console.log("Warehouse removal product created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating warehouse removal product:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};


/**
 * Updates an existing warehouse removal product entry.
 * @param {object} data - The request body for updating.
 * @returns {Promise<object>} The updated warehouse removal product data.
 */
export const updateWarehouseRemovalProduct = async (data) => {
  try {
    // Ensure time is sent as "HH:mm:ss" string
    const formattedData = {
      ...data,
      time: data.time && data.time.length === 5 ? `${data.time}:00` : data.time,
    };
    console.log("Updating warehouse removal product with data:", JSON.stringify(formattedData, null, 2));
    const response = await axiosInstance.put(
      `${API_BASE_URL}/warehouse-removal-product/update`,
      formattedData
    );
    console.log("Warehouse removal product updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating warehouse removal product:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};


/**
 * Searches for warehouse removal products based on provided criteria.
 * Note: The Swagger example only shows 'date' and 'time' for search.
 * @param {object} searchParams - The search criteria.
 * @param {string} [searchParams.date] - Filter by date (e.g., "YYYY-MM-DD").
 * @param {string} [searchParams.time] - Filter by time (e.g., "HH:mm:ss").
 * @returns {Promise<Array<object>>} A list of matching warehouse removal products.
 */
export const searchWarehouseRemovalProducts = async (searchParams) => {
  try {
    const transformedParams = {};
    for (const key in searchParams) {
      if (
        searchParams[key] !== undefined &&
        searchParams[key] !== null &&
        searchParams[key] !== ""
      ) {
        transformedParams[key] = searchParams[key];
      }
    }

    console.log("Searching warehouse removal products with parameters:", JSON.stringify(transformedParams, null, 2));
    const response = await axiosInstance.post(
      `${API_BASE_URL}/warehouse-removal-product/search`,
      transformedParams
    );
    console.log("Warehouse removal product search results received:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error searching warehouse removal products:", error);
    if (error.response) {
      console.error("Search error response data:", error.response.data);
      console.error("Search error response status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

/**
 * Reads all warehouse removal product records.
 * @returns {Promise<Array<object>>} A list of all warehouse removal product records.
 */
export const readAllWarehouseRemovalProducts = async () => {
  try {
    console.log("Reading all warehouse removal products...");
    const response = await axiosInstance.get(`${API_BASE_URL}/warehouse-removal-product/read`);
    console.log("All warehouse removal products received:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error reading all warehouse removal products:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

/**
 * Gets detailed information for a specific warehouse removal product by groupId.
 * @param {string} groupId - The groupId of the warehouse removal product.
 * @returns {Promise<object>} Detailed warehouse removal product information.
 */
export const getWarehouseRemovalProductInfo = async (groupId) => {
  try {
    console.log(`Fetching warehouse removal product info for groupId: ${groupId}`);
    const response = await axiosInstance.get(
      `${API_BASE_URL}/warehouse-removal-product/info/${groupId}`
    );
    console.log("Warehouse removal product info received:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error getting warehouse removal product info for groupId ${groupId}:`, error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};