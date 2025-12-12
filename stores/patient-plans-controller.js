import { create } from "zustand";
import {
    readCategoryAndOperationItems as apiReadCategoryAndOperationItems,
} from "../src/api/patient-plans-controller";

const usePatientPlansControllerStore = create((set) => ({
    selectedCategoryAndOperationItems: null,
    loading: false,
    error: null,

    fetchCategoryAndOperationItems: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await apiReadCategoryAndOperationItems(id);
            set({ selectedCategoryAndOperationItems: data, loading: false });
        } catch (error) {
            set({
                error: error.message || "Category and operation items reading error",
                loading: false,
            });
        }
    },



}));

export default usePatientPlansControllerStore;
