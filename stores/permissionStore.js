import { create } from "zustand";
import {
  createPermission,
  readPermission,
  readPermissionById,
} from "../src/api/permission";

const usePermissionStore = create((set, get) => ({
  permissions: [],
  permissionInfo: null,
  loading: false,
  error: null,

  create: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await createPermission(data);
      set({ loading: false });
      await get().read({});
      return result;
    } catch (error) {
      set({ loading: false, error });
      throw error;
    }
  },

  // PUT ilə icazələri oxu
  read: async (data) => {
    set({ loading: true, error: null });
    try {
      const permissions = await readPermission(data);
      set({ permissions, loading: false });
    } catch (error) {
      set({ loading: false, error });
    }
  },

  // Id-ə görə icazəni oxu
  readById: async (id) => {
    set({ loading: true, error: null });
    try {
      const info = await readPermissionById(id);
      set({ permissionInfo: info, loading: false });
    } catch (error) {
      set({ loading: false, error });
    }
  },
}));

export default usePermissionStore;
