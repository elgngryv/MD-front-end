import { create } from "zustand";
import {
  createWorker,
  readWorkers,
  getWorkerInfo,
  updateWorker,
  deleteWorker,
  readWorkerStatus,
  searchWorkers,
  fetchWorkersByPermission,
  apiFetchPermissions,
} from "../src/api/add-worker"; 

const useWorkerStore = create((set, get) => ({
  workers: [],
  searchResult: [],
  selectedWorker: null,
  statusList: [],
  permissions: [], 
  loading: false,
  error: null,

  fetchWorkers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readWorkers();
      set({ workers: data, searchResult: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchWorkerStatus: async () => {
    try {
      const data = await readWorkerStatus();
      set({ statusList: data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchWorkerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getWorkerInfo(id);
      set({ selectedWorker: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addWorker: async (workerData) => {
    set({ loading: true, error: null });
    try {
      await createWorker(workerData);
      await get().fetchWorkers();
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  editWorker: async (workerData) => {
    set({ loading: true, error: null });
    try {
      await updateWorker(workerData);
      await get().fetchWorkers();
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  removeWorker: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteWorker(id);
      await get().fetchWorkers();
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  setSearchResult: (data) => set({ searchResult: data }),

  searchWorkers: async (params) => {
    set({ loading: true, error: null });
    try {
      const data = await searchWorkers(params);
      set({ searchResult: data, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchByPermission: async (permissionName) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkersByPermission(permissionName);
      set({ searchResult: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Rol üzrə işçilər gətirilərkən xəta:", error);
    }
  },

  fetchPermissions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetchPermissions();
      set({ permissions: data, loading: false });
    } catch (error) {
      set({
        error: error.message || "İcazələri gətirə bilmədik",
        loading: false,
      });
      console.error("Permissions gətirərkən xəta:", error);
    }
  },
}));

export default useWorkerStore;
