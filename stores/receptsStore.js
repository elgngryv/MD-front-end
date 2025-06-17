import { create } from "zustand";
import {
  readAllRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  readRecipeById,
  updateRecipeStatus,
  searchRecipes,
  exportRecipeExcel,
} from "../src/api/recepts";

const useRecipeStore = create((set) => ({
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readAllRecipes();
      set({ recipes: data.data || [], loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  fetchRecipeById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await readRecipeById(id);
      set({ selectedRecipe: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  createNewRecipe: async (recipeData) => {
    set({ loading: true, error: null });
    try {
      await createRecipe(recipeData);
      await useRecipeStore.getState().fetchRecipes();
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  updateRecipeById: async (id, recipeData) => {
    set({ loading: true, error: null });
    try {
      await updateRecipe(id, recipeData);
      await useRecipeStore.getState().fetchRecipes();
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  updateStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      await updateRecipeStatus(id, status);
      await useRecipeStore.getState().fetchRecipes();
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  deleteRecipeById: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteRecipe(id);
      await useRecipeStore.getState().fetchRecipes();
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  searchRecipeList: async (params) => {
    set({ loading: true, error: null });
    try {
      const result = await searchRecipes(params);
      set({ recipes: result.data || [], loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  exportExcel: async () => {
    try {
      const blob = await exportRecipeExcel();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "recipes.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Excel export error", err);
    }
  },
}));

export default useRecipeStore;
