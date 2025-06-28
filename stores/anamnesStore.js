import { create } from "zustand";
import {
  createAnamnesis,
  updateAnamnesis,
  deleteAnamnesis,
  getAnamnesisListByCategory,
  getAnamnesisById,
  updateAnamnesisStatus,
} from "../src/api/anamnes";

const useAnamnesisListStore = create((set) => ({
  anamnesisList: [],
  selectedAnamnesis: null,
  loading: false,
  error: null,
  fetchAnamnesisList: async (categoryId) => {
    set({ loading: true, error: null });
    try {
      console.log("Fetching anamnesis for category:", categoryId);
      const res = await getAnamnesisListByCategory(categoryId);
      console.log("API response:", res);

      set({
        anamnesisList: Array.isArray(res.data) ? res.data : [],
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching anamnesis:", error);
      set({ error, loading: false });
    }
  },
  addAnamnesis: async (data) => {
    set({ loading: true, error: null });
    try {
      await createAnamnesis(data);
      await useAnamnesisListStore
        .getState()
        .fetchAnamnesisList(data.anamnesisCategoryId);
      set({ loading: false });
      return true;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  editAnamnesis: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesis(id, data);
      await useAnamnesisListStore
        .getState()
        .fetchAnamnesisList(data.anamnesisCategoryId);
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  removeAnamnesis: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteAnamnesis(id);
      set({ loading: false });
      return true;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  fetchAnamnesisById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await getAnamnesisById(id);
      set({ selectedAnamnesis: res.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateAnamnesisStatus: async (id, statusData) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesisStatus(id, statusData);
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useAnamnesisListStore;
