import { create } from "zustand";
import {
  createAnamnesisCategory,
  updateAnamnesisCategory,
  updateAnamnesisCategoryStatus,
  searchAnamnesisCategories,
  readAnamnesisCategories,
  readAnamnesisCategoryList,
  readAnamnesisCategoryById,
  exportAnamnesisCategoriesToExcel,
  deleteAnamnesisCategory,
} from "../src/api/anamnesisCategory";

const useAnamnesisCategoryStore = create((set) => ({
  categories: [],
  categoryDetails: null,
  loading: false,
  error: null,

  // GET all categories
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await readAnamnesisCategories();
      set({ categories: Array.isArray(data) ? data : [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // GET one by ID
  fetchCategoryById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await readAnamnesisCategoryById(id);
      set({ categoryDetails: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // CREATE
  addCategory: async (newCategory) => {
    set({ loading: true, error: null });
    try {
      await createAnamnesisCategory(newCategory);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // UPDATE
  updateCategory: async (id, updatedCategory) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesisCategory(id, updatedCategory);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // UPDATE STATUS
  updateCategoryStatus: async (id, statusData) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesisCategoryStatus(id, statusData);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // DELETE
  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteAnamnesisCategory(id);
      await useAnamnesisCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // EXPORT TO EXCEL
  exportToExcel: async () => {
    try {
      const response = await exportAnamnesisCategoriesToExcel();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "anamnesis-categories.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      set({ error });
    }
  },

  // SEARCH
  searchCategories: async (searchParams) => {
    set({ loading: true, error: null });
    try {
      const result = await searchAnamnesisCategories(searchParams);
      set({ categories: result, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useAnamnesisCategoryStore;
