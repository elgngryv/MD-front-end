import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // PWA plugin
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,ttf}'],
        globIgnores: ['**/stats.html', '**/stats.html.gz'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\/api\/v1\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 saat
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Müasir Stomatologiya',
        short_name: 'MD Clinic',
        description: 'Stomatologiya klinikası yönetim sistemi',
        theme_color: '#155EEF',
        background_color: '#EEF2F6',
        display: 'standalone',
        icons: [
          {
            src: '/src/assets/images/general/logos/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/images/general/logos/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    // Image optimizer
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    // Bundle analyzer
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  base: '/', // Əgər app serverdə root-da (/) açılırsa, dəyişmə
  
  // Build optimizasiyası
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
        
          // Devtools'u exclude et
          if (id.includes('react-query-devtools')) {
            return 'vendor-other';
          }
        
          // ÖNCE React core ve React DOM - mutlaka birlikte
          if (id.includes('/react/') || id.includes('/react-dom/') || 
              id.includes('\\react\\') || id.includes('\\react-dom\\')) {
            return 'vendor-react';
          }
        
          // Sonra React bağımlı kütüphaneleri
          if (
            id.includes('react-router') ||
            id.includes('react-hook-form') ||
            id.includes('@hookform') ||
            id.includes('react-big-calendar') ||
            id.includes('react-calendar') ||
            id.includes('react-toastify') ||
            id.includes('react-select') ||
            id.includes('react-icons') ||
            id.includes('react-spinners') ||
            id.includes('react-color')
          ) {
            return 'vendor-react';
          }
        
          // Ant Design ve bağımlılıkları - React'e bağımlı, vendor-react'ta olmalı
          if (
            id.includes('antd') ||
            id.includes('@ant-design') ||
            id.includes('@emotion/react') ||
            id.includes('@emotion/styled') ||
            id.includes('framer-motion') ||
            id.includes('@mui/material')
          ) {
            return 'vendor-react';
          }
        
          // React Query - React'e bağımlı, vendor-react'a gitmeli
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-react';
          }
        
          // Utility & data libs - React'ten bağımsız
          if (
            id.includes('axios') ||
            id.includes('zustand') ||
            id.includes('yup') ||
            id.includes('date-fns')
          ) {
            return 'vendor-utils';
          }
        
          // Qalan node_modules
          return 'vendor-other';
        },
      },
    },
    chunkSizeWarningLimit: 500, // Daha küçük chunk'lar için uyarı
    cssCodeSplit: true, // CSS-ləri ayrı chunk-lara böl
    sourcemap: false, // Production-da sourcemap yox
    minify: 'terser', // Daha yaxşı minification
    target: 'esnext', // Modern browser support
    // CommonJS modüllerini ES modüllerine dönüştür
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  
  // CSS optimizasiyası
  css: {
    devSourcemap: false,
    // PurgeCSS will be handled by Tailwind CSS v4
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
    include: [
      'react', 
      'react-dom', 
      'react/jsx-runtime',
      'react-router-dom', 
      'antd', 
      '@ant-design/icons'
    ],
    exclude: ['@tanstack/react-query-devtools'],
    // React'in doğru şekilde optimize edilmesini sağla
    esbuildOptions: {
      target: 'esnext',
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'], // React'in tek bir instance'ının kullanılmasını sağla
    // React modüllerinin doğru çözümlenmesini garanti et
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
    },
  },
})
