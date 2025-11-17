import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173, // Geliştirme portu
    open: true, // Otomatik tarayıcı açma
  },
  base: '/',
  build: {
    outDir: "dist", // Derlenen dosyaların çıkış klasörü
    sourcemap: true, // Debug için kaynak haritası
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Vendor kodlarını ayırma
        },
      },
    },
  },
});