// src/store/useWorkerStore.js (Assuming this path for import)
import { create } from "zustand";
import {
  createWorker,
  readWorkers,
  getWorkerInfo,
  updateWorker,
  deleteWorker,
  readWorkerStatus,
  searchWorkers, // Ensure this import path is correct
} from "../src/api/add-worker"; // Corrected relative path assumption

const useWorkerStore = create((set, get) => ({ // Added 'get' to access other state actions
  workers: [],
  searchResult: [], // This will be the main data source for your table after a search
  selectedWorker: null,
  statusList: [],
  loading: false,
  error: null,

  fetchWorkers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readWorkers();
      set({ workers: data, searchResult: data, loading: false }); // Also update searchResult on initial fetch
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
    set({ loading: true, error: null }); // Set loading for individual worker fetch too
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
      await get().fetchWorkers(); // Use get() to call other actions in the store
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; // Re-throw to allow component to catch and display specific error
    }
  },

  editWorker: async (workerData) => {
    set({ loading: true, error: null });
    try {
      await updateWorker(workerData);
      await get().fetchWorkers(); // Use get() to call other actions in the store
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; // Re-throw to allow component to catch and display specific error
    }
  },

  removeWorker: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteWorker(id);
      await get().fetchWorkers(); // Use get() to call other actions in the store
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; // Re-throw to allow component to catch and display specific error
    }
  },

  // This action allows direct manipulation of searchResult if needed
  setSearchResult: (data) => set({ searchResult: data }),

  searchWorkers: async (params) => {
    set({ loading: true, error: null });
    try {
      // Ensure params are correctly formatted from the component
      const data = await searchWorkers(params);
      set({ searchResult: data, loading: false });
      // If the search is empty or returns all workers, you might want to also update 'workers'
      // This depends on whether 'workers' should always represent *all* workers or just a base list.
      // For a table that *only* displays search results, 'searchResult' is sufficient.
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; // Re-throw to allow component to catch and display specific error
    }
  },
}));

export default useWorkerStore;