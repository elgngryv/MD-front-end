// stores/usePatientXrayStore.js
import { create } from "zustand";
import {
  createPatientXray,
  updatePatientXray,
  getAllPatientXrays,
  getPatientXrayById,
  deletePatientXray,
} from "../src/api/patient-xray";

const usePatientXrayStore = create((set, get) => ({
  xrays: [],
  selectedXray: null,
  loading: false,
  error: null,

  fetchXrays: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllPatientXrays();
      set({ xrays: data, loading: false });
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  fetchXrayById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getPatientXrayById(id);
      set({ selectedXray: data, loading: false });
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  createXray: async (xrayData, file) => {
    set({ loading: true, error: null });
    try {
      const newXray = await createPatientXray(xrayData, file);
      set((state) => ({
        xrays: [...state.xrays, newXray],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  updateXray: async (id, xrayData) => {
    set({ loading: true, error: null });
    try {
      const updatedXray = await updatePatientXray(id, xrayData);
      set((state) => ({
        xrays: state.xrays.map((x) => (x.id === id ? updatedXray : x)),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  deleteXray: async (id) => {
    set({ loading: true, error: null });
    try {
      await deletePatientXray(id);
      set((state) => ({
        xrays: state.xrays.filter((x) => x.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  clearSelectedXray: () => set({ selectedXray: null }),
}));

export default usePatientXrayStore;
