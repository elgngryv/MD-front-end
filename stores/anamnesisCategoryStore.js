import { create } from "zustand";
import {
  createAnamnesisCategory,
  updateAnamnesisCategory,
  updateAnamnesisCategoryStatus,
  searchAnamnesisCategories,
  readAnamnesisCategories,
  readAnamnesisCategoryById,
  deleteAnamnesisCategory,
} from "../src/api/anamnesisCategory";

const useAnamnesisCategoryStore = create((set) => ({
  categories: [],
  categoryDetails: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readAnamnesisCategories();
      set({
        categories: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchCategoryById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await readAnamnesisCategoryById(id);
      set({ categoryDetails: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  addCategory: async (newCategory) => {
    set({ loading: true, error: null });
    try {
      await createAnamnesisCategory(newCategory);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateCategory: async (id, updatedCategory) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesisCategory(id, updatedCategory);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateCategoryStatus: async (id, statusData) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesisCategoryStatus(id, statusData);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteAnamnesisCategory(id);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useAnamnesisCategoryStore;
