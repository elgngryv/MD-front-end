import { create } from "zustand";
import {
  createPermission as apiCreatePermission,
  fetchPermissions as apiFetchPermissions,
  fetchPermissionById as apiFetchPermissionById,
} from "../src/api/permission";

const usePermissionStore = create((set) => ({
  permissions: [],
  selectedPermission: null,
  loading: false,
  error: null,

  // ✅ Bütün icazələri gətir
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
    }
  },

  // ✅ ID ilə icazə gətir
  fetchPermissionById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetchPermissionById(id);
      set({ selectedPermission: data, loading: false });
    } catch (error) {
      set({ error: error.message || "ID tapılmadı", loading: false });
    }
  },

  // ✅ Yeni permission yarat
  createPermission: async (newPermission) => {
    set({ loading: true, error: null });
    try {
      const created = await apiCreatePermission(newPermission);
      set((state) => ({
        permissions: [...state.permissions, created],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message || "Yaratmaqda xəta", loading: false });
    }
  },
}));

export default usePermissionStore;
