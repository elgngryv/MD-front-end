// stores/anamnesisListStore.js
import { create } from "zustand";
import {
  createAnamnesis,
  updateAnamnesis,
  deleteAnamnesis,
  getAnamnesisList,
  getAnamnesisById,
} from "../src/api/anamnes";

const useAnamnesisListStore = create((set) => ({
  anamnesisList: [],
  selectedAnamnesis: null,
  loading: false,
  error: null,

  // Bütün anamnezləri yüklə
  fetchAnamnesisList: async (id) => {
    // categoryId parametrini əlavə edirik
    set({ loading: true, error: null });
    try {
      const res = await getAnamnesisList(id); // API-ə categoryId göndəririk
      set({
        anamnesisList: res.data.data || [],
        loading: false,
      });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  // Yeni anamnez əlavə et
  addAnamnesis: async (data) => {
    try {
      await createAnamnesis(data);
      await useAnamnesisListStore.getState().fetchAnamnesisList();
    } catch (error) {
      set({ error });
    }
  },

  // Anamnezi yenilə
  editAnamnesis: async (id, data) => {
    try {
      await updateAnamnesis(id, data);
      await useAnamnesisListStore.getState().fetchAnamnesisList();
    } catch (error) {
      set({ error });
    }
  },

  // Anamnezi sil
  removeAnamnesis: async (id) => {
    try {
      await deleteAnamnesis(id);
      await useAnamnesisListStore.getState().fetchAnamnesisList();
    } catch (error) {
      set({ error });
    }
  },

  // ID-yə görə bir anamnez al
  fetchAnamnesisById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await getAnamnesisById(id);
      set({ selectedAnamnesis: res.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useAnamnesisListStore;
