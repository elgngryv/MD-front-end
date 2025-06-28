// stores/anamnesisListStore.js
import { create } from "zustand";
import {
  createAnamnesis,
  updateAnamnesis,
  deleteAnamnesis,
  getAnamnesisList,
  getAnamnesisById,
  updateAnamnesisStatus,  // <-- status update API funksiyası olmalıdır
} from "../src/api/anamnes";

const useAnamnesisListStore = create((set) => ({
  anamnesisList: [],
  selectedAnamnesis: null,
  loading: false,
  error: null,

  // Bütün anamnezləri yüklə (id - categoryId ola bilər)
  fetchAnamnesisList: async (categoryId) => {
    set({ loading: true, error: null });
    try {
      const res = await getAnamnesisList(categoryId);
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
    set({ loading: true, error: null });
    try {
      await createAnamnesis(data);
      await useAnamnesisListStore.getState().fetchAnamnesisList();
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Anamnezi yenilə
  editAnamnesis: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesis(id, data);
      await useAnamnesisListStore.getState().fetchAnamnesisList();
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Anamnezi sil
  removeAnamnesis: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteAnamnesis(id);
      await useAnamnesisListStore.getState().fetchAnamnesisList();
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
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

  // Status yenilə (məsələn, "ACTIVE" <-> "PASSIVE")
  updateAnamnesisStatus: async (id, statusData) => {
    set({ loading: true, error: null });
    try {
      await updateAnamnesisStatus(id, statusData); // API-də status update üçün patch/put endpoint olmalıdır
      await useAnamnesisListStore.getState().fetchAnamnesisList();
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useAnamnesisListStore;
