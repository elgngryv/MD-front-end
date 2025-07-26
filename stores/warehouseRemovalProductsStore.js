// src/store/warehouseRemovalProductsStore.js
import { create } from 'zustand';
import {
  createWarehouseRemovalProduct,
  updateWarehouseRemovalProduct,
  searchWarehouseRemovalProducts,
  readAllWarehouseRemovalProducts,
  getWarehouseRemovalProductInfo
} from '../src/api/warehouse-removal-products'; // Ensure correct path!

const useWarehouseRemovalProductsStore = create((set, get) => ({
  products: [],
  selectedProductDetails: null,
  loading: false,
  error: null,
  searchParams: {
    date: new Date().toISOString().split('T')[0], // Default to current date (YYYY-MM-DD)
    time: '00:00:00' // HH:mm:ss string
  },
  searchTerm: '',

  setSearchParams: (params) => set((state) => ({
    searchParams: { ...state.searchParams, ...params }
  })),

  setSearchTerm: (term) => set({ searchTerm: term }),

  // Fetches all warehouse removal products (for initial load or general list)
  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readAllWarehouseRemovalProducts();
      set({ products: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch all warehouse removal products:", err);
      set({ error: "An error occurred while fetching warehouse removal products.", loading: false });
    }
  },

  // Fetches products based on search parameters (currently date and time in API)
  fetchProductsBySearch: async () => {
    set({ loading: true, error: null });
    try {
      const params = get().searchParams;
      // Ensure time is in "HH:mm:ss" format for backend
      const formattedParams = {
        ...params,
        time: params.time && params.time.length === 5 ? `${params.time}:00` : params.time
      };

      const data = await searchWarehouseRemovalProducts(formattedParams);

      // Client-side filtering if `searchTerm` is present
      const filteredData = data.filter(product => {
        const lowerCaseSearchTerm = get().searchTerm.toLowerCase();
        return (
          product.id?.toString().includes(lowerCaseSearchTerm) ||
          product.date?.includes(lowerCaseSearchTerm) ||
          product.time?.includes(lowerCaseSearchTerm.substring(0, 5)) ||
          product.pendingStatus?.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.number?.toString().includes(lowerCaseSearchTerm)
        );
      });
      
      set({ products: filteredData, loading: false });
    } catch (err) {
      console.error("Failed to fetch warehouse removal products by search:", err);
      set({ error: "An error occurred while searching warehouse removal products.", loading: false });
    }
  },

  fetchProductDetails: async (groupId) => {
    set({ loading: true, error: null, selectedProductDetails: null });
    try {
      const details = await getWarehouseRemovalProductInfo(groupId);
      set({ selectedProductDetails: details, loading: false });
    } catch (err) {
      console.error(`Failed to fetch details for product groupId ${groupId}:`, err);
      set({ error: `Failed to fetch details for product groupId ${groupId}.`, loading: false });
    }
  },

  createProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await createWarehouseRemovalProduct(data);
      // After creation, you might want to re-fetch the list or add the new item
      get().fetchAllProducts(); // Re-fetch to update the list
      set({ loading: false });
      return newProduct;
    } catch (err) {
      console.error("Failed to create warehouse removal product:", err);
      set({ error: "Failed to create warehouse removal product.", loading: false });
      throw err; // Re-throw to handle in component
    }
  },

  updateProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      const updatedProduct = await updateWarehouseRemovalProduct(data);
      // After update, re-fetch the list or update individual item in state
      get().fetchAllProducts(); // Re-fetch to update the list
      set({ loading: false });
      return updatedProduct;
    } catch (err) {
      console.error("Failed to update warehouse removal product:", err);
      set({ error: "Failed to update warehouse removal product.", loading: false });
      throw err; // Re-throw to handle in component
    }
  },

  clearSelectedProductDetails: () => set({ selectedProductDetails: null }),
}));

export default useWarehouseRemovalProductsStore;