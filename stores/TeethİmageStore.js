import { create } from "zustand";
import nodeApi from "../src/api/nodeApi";

const useTeethImageStore = create((set) => ({
  teethImages: [],
  loading: false,
  error: null,

  fetchTeethImages: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await nodeApi.get("/teeth-images");
      set({ teethImages: data, loading: false });
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  uploadTeethImage: async (file) => {
    console.log("uploadTeethImage başladı");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Cloudinary cavabı:", data);

      if (!res.ok) {
        throw new Error(data.error?.message || "Cloudinary yükləmə xətası");
      }

      console.log("Şəkil Cloudinary-yə yükləndi:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("uploadTeethImage xətası:", error);
      throw new Error(error.message || "Şəkil yükləmə uğursuz oldu!");
    }
  },

  createTeethImage: async (file) => {
    set({ loading: true, error: null });
    try {
      // 1. Şəkli Cloudinary-yə yüklə
      const url = await useTeethImageStore.getState().uploadTeethImage(file);
      console.log("Yüklənmiş şəkil URL:", url);

      // 2. Backend-ə URL-i JSON olaraq göndər
      const { data } = await nodeApi.post("/teeth-images", { image: url });
      console.log("Backenddən cavab:", data);

      set((state) => ({
        teethImages: [...state.teethImages, data.data],
        loading: false,
      }));

      return data;
    } catch (err) {
      console.error("createTeethImage xətası:", err);
      set({ error: err.message || "Xəta baş verdi", loading: false });
      throw err;
    }
  },

  updateTeethImage: async (id, newImageUrl) => {
    set({ loading: true, error: null });
    try {
      const { data } = await nodeApi.put(`/teeth-images/${id}`, {
        image: newImageUrl,
      });
      set((state) => ({
        teethImages: state.teethImages.map((img) =>
          img._id === id ? data.data : img
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  deleteTeethImage: async (id) => {
    set({ loading: true, error: null });
    try {
      await nodeApi.delete(`/teeth-images/${id}`);
      set((state) => ({
        teethImages: state.teethImages.filter((img) => img._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },
}));

export default useTeethImageStore;
