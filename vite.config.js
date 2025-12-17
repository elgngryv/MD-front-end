import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/', // Əgər app serverdə root-da (/) açılırsa, dəyişmə
  
  // Build optimizasiyası
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['antd', '@ant-design/icons'],
          'vendor-utils': ['axios', '@tanstack/react-query'],
          'vendor-animation': ['framer-motion'],
          'vendor-calendar': ['react-big-calendar', 'react-calendar'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'yup'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true, // CSS-ləri ayrı chunk-lara böl
    sourcemap: false, // Production-da sourcemap yox
    minify: 'terser', // Daha yaxşı minification
  },
  
  // CSS optimizasiyası
  css: {
    devSourcemap: false,
  },
  
  server: {
    proxy: {
      '/api': {
        target: 'http://62.84.178.128:5555',
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: [
      'sat-documentation-investigators-pubs.trycloudflare.com',
      'grey-al-congratulations-seo.trycloudflare.com'
    ]
  },
  
  // Optimizasiya
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@tanstack/react-query-devtools'],
  },
})
