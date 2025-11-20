import { create } from "zustand";
import {
  createDentalOrder,
  updateDentalOrder,
  updateTechnicOrderPrice,
  updateDentalOrderStatus,
  readTechnicOrders,
  readDentalOrders,
  readDentalWorkTypes,
  readDentalOrderById,
  deleteDentalOrder,
} from "../src/api/dental-order";

const useDentalOrderStore = create((set) => ({
  orders: [],
  technicOrders: [],
  dentalWorkTypes: [],
  currentOrder: null,
  loading: false,
  error: null,

  // Bütün sifarişləri oxu
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readDentalOrders();
      set({ orders: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Texnik sifarişlərini oxu
  fetchTechnicOrders: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readTechnicOrders();
      set({ technicOrders: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Dental iş növlərini oxu
  fetchDentalWorkTypes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readDentalWorkTypes();
      set({ dentalWorkTypes: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // ID-yə görə sifariş gətir
  fetchOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await readDentalOrderById(id);
      set({ currentOrder: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Yeni sifariş yarat
  addOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const data = await createDentalOrder(orderData);
      set((state) => ({ orders: [...state.orders, data], loading: false }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Mövcud sifarişi yenilə
  editOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateDentalOrder(orderData);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === data.id ? data : o)),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Texnik order qiyməti yenilə
  editTechnicOrderPrice: async (id, priceData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateTechnicOrderPrice(id, priceData);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // STATUS YENİLƏ
// stores/dentalOrderStore.js
changeOrderStatus: async (statusData) => {
  set({ loading: true, error: null });
  try {
    const updatedOrder = await updateDentalOrderStatus(statusData);

    // UI-də dərhal əks etsin
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      ),
      loading: false,
      error: null // Error'u təmizlə
    }));

    return updatedOrder;
  } catch (error) {
    set({ 
      error: error.message || "Xəta baş verdi", // Error mesajını string kimi saxla
      loading: false 
    });
    throw error; // Error'u yenidən throw et ki, komponentdə tuta bilək
  }
},
  // Sifarişi sil
  removeOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteDentalOrder(id);
      set((state) => ({
        orders: state.orders.filter((o) => o.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useDentalOrderStore;
