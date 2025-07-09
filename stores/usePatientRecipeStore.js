import { create } from "zustand";
import {
  createPatientRecipe,
  readPatientRecipes,
  updatePatientRecipe,
  deletePatientRecipe,
  readSingleRecipeById, // <--- Yeni funksiyanı import etdik
} from "../src/api/patient-recipe"; // Path-i düzəldin

const usePatientRecipeStore = create((set, get) => ({
  patientRecipes: [],
  selectedPatientRecipe: null,
  loading: false,
  error: null,
  recipeNamesCache: {}, // <--- Resept adlarını cache-ləmək üçün yeni state

  fetchPatientRecipes: async (patientId) => {
    set({ loading: true, error: null });
    try {
      if (!patientId) {
        throw new Error("Patient ID is required to fetch recipes.");
      }
      const data = await readPatientRecipes(patientId);
      set({ patientRecipes: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      console.error("Failed to fetch patient recipes:", err);
    }
  },

  // <--- Yeni action: Tək reseptin adını ID-yə görə gətirir və cache-də saxlayır
  fetchRecipeName: async (recipeId) => {
    const { recipeNamesCache } = get();
    if (recipeNamesCache[recipeId]) {
      return recipeNamesCache[recipeId]; // Cache-də varsa, oradan qaytar
    }

    try {
      const data = await readSingleRecipeById(recipeId);
      // API cavabında resept adı hansı sahədə gəlirsə (məsələn, 'name' və ya 'recipeName')
      // Ləğv olunan cavabınızda bu endpointdən data yox idi, ona görə 'name' fərz edirəm.
      const recipeName = data ? data.name : null; // <--- Buranı API cavabınıza uyğunlaşdırın (məsələn, data.recipeName)

      if (recipeName) {
        set((state) => ({
          recipeNamesCache: {
            ...state.recipeNamesCache,
            [recipeId]: recipeName,
          },
        }));
      }
      return recipeName;
    } catch (err) {
      console.error(`Failed to fetch recipe name for ID ${recipeId}:`, err);
      return null;
    }
  },

  // ... (digər actionlar: addPatientRecipe, editPatientRecipe, removePatientRecipe) ...
  addPatientRecipe: async (recipeData) => {
    set({ loading: true, error: null });
    try {
      await createPatientRecipe(recipeData);
      if (recipeData.patientId) {
        await get().fetchPatientRecipes(recipeData.patientId);
        // Yeni əlavə olunan reseptin adını da cache-ə əlavə etmək üçün,
        // əgər API create cavabında adı qaytarırsa.
        // Əks halda, yeni əlavə olunan item üçün də `fetchRecipeName` çağırıla bilər.
        if(recipeData.recipeId && recipeData.recipeName) { // Fərz edirik ki, recipeData-da recipeId və recipeName var
            set((state) => ({
                recipeNamesCache: {
                    ...state.recipeNamesCache,
                    [recipeData.recipeId]: recipeData.recipeName,
                }
            }));
        }
      } else {
        console.warn("Patient ID missing in recipeData for refreshing list after add.");
      }
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  editPatientRecipe: async (id, recipeData) => {
    set({ loading: true, error: null });
    try {
      await updatePatientRecipe(id, recipeData);
      if (recipeData.patientId) {
        await get().fetchPatientRecipes(recipeData.patientId);
        // Yenilənən reseptin adını da cache-də yenilə
        if(recipeData.recipeId && recipeData.recipeName) {
            set((state) => ({
                recipeNamesCache: {
                    ...state.recipeNamesCache,
                    [recipeData.recipeId]: recipeData.recipeName,
                }
            }));
        }
      } else {
        console.warn("Patient ID missing in recipeData for refreshing list after edit.");
      }
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  removePatientRecipe: async (id, patientId) => {
    set({ loading: true, error: null });
    try {
      await deletePatientRecipe(id);
      if (patientId) {
        await get().fetchPatientRecipes(patientId);
        // Silinən resepti cache-dən də sil
        set((state) => {
            const newCache = { ...state.recipeNamesCache };
            delete newCache[id];
            return { recipeNamesCache: newCache };
        });
      } else {
        console.warn("Patient ID not provided for refreshing recipes after deletion.");
      }
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  setSelectedPatientRecipe: (recipe) => set({ selectedPatientRecipe: recipe }),
}));

export default usePatientRecipeStore;