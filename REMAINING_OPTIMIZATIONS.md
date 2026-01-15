# 🚀 Kalan Performans Optimizasyonları

## 📋 Genel Bakış

Bu dokümanda, uygulanmış optimizasyonlardan sonra kalan ve gelecekte uygulanabilecek performans iyileştirmeleri listelenmiştir.

---

## 🔴 Yüksek Öncelikli Optimizasyonlar

### 1. **Virtual Scrolling (Büyük Listeler İçin)**

#### ❌ Problem:
- `PatientsList.jsx`, `EmployeesList.jsx` gibi component'lerde 1000+ item olduğunda performans sorunu
- Tüm list item'ları DOM'da render ediliyor
- Scroll performansı düşüyor

#### ✅ Çözüm:
```jsx
// npm install @tanstack/react-virtual
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedList = ({ items }) => {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Her item'ın tahmini yüksekliği
    overscan: 5, // Ekstra render edilecek item sayısı
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
};
```

**Etki**: 1000+ item'lı listelerde %80-90 performans artışı

**Uygulanacak Dosyalar**:
- `src/pages/Patients/PatientsList.jsx`
- `src/pages/Employees/EmployeesList.jsx`
- `src/pages/stockExport/StockExportList.jsx`
- Diğer büyük list component'leri

---

### 2. **React Query Cache Optimizasyonları**

#### ❌ Problem:
- React Query cache ayarları optimize edilmemiş
- `staleTime` ve `cacheTime` değerleri default
- Gereksiz refetch'ler yapılıyor

#### ✅ Çözüm:
```jsx
// src/main.jsx - QueryClient konfigürasyonu
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 dakika (default: 0)
      gcTime: 10 * 60 * 1000, // 10 dakika (eski cacheTime)
      refetchOnWindowFocus: false, // Window focus'ta refetch yapma
      refetchOnReconnect: true, // Bağlantı yenilendiğinde refetch yap
      retry: 1, // Sadece 1 kez retry yap
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

// Hook'larda özel cache ayarları
const { data } = useQuery({
  queryKey: ['patients', search],
  queryFn: () => fetchPatients(search),
  staleTime: 10 * 60 * 1000, // 10 dakika (hasta listesi daha az değişir)
  gcTime: 30 * 60 * 1000, // 30 dakika cache'de tut
});
```

**Etki**: %40-50 daha az API çağrısı, daha hızlı sayfa geçişleri

**Uygulanacak Dosyalar**:
- `src/main.jsx` (QueryClient config)
- `src/hooks/usePatients.js`
- Diğer React Query hook'ları

---

### 3. **Error Boundary Ekleme**

#### ❌ Problem:
- Hata durumlarında tüm uygulama çöküyor
- Kullanıcıya anlamlı hata mesajları gösterilmiyor
- Hata recovery mekanizması yok

#### ✅ Çözüm:
```jsx
// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Error tracking servisine gönder (Sentry, LogRocket vb.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Bir şeyler yanlış gitti</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// src/main.jsx'te kullan
<ErrorBoundary>
  <HashRouter>
    <AnimatedRoutes />
  </HashRouter>
</ErrorBoundary>
```

**Etki**: Daha iyi kullanıcı deneyimi, hata recovery

**Uygulanacak Dosyalar**:
- Yeni: `src/components/ErrorBoundary.jsx`
- `src/main.jsx` (wrap routes)

---

## 🟡 Orta Öncelikli Optimizasyonlar

### 4. **Service Worker / PWA Optimizasyonları**

#### ❌ Problem:
- Offline çalışma yok
- Cache mekanizması yok
- PWA özellikleri yok

#### ✅ Çözüm:
```jsx
// vite.config.js - Vite PWA plugin
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 saat
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
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

**Etki**: Offline çalışma, daha hızlı yükleme, PWA özellikleri

**Gereken Paket**: `npm install -D vite-plugin-pwa`

---

### 5. **Image Format Optimizasyonları (WebP, AVIF)**

#### ❌ Problem:
- Tüm image'ler PNG/JPG formatında
- Büyük dosya boyutları
- Yavaş yükleme

#### ✅ Çözüm:
```jsx
// vite.config.js - Image optimizer plugin
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    // ...
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
  ],
});

// Component'lerde WebP kullan
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <source srcSet="/image.avif" type="image/avif" />
  <img src="/image.jpg" alt="Fallback" loading="lazy" />
</picture>
```

**Etki**: %50-70 daha küçük image dosyaları, daha hızlı yükleme

**Gereken Paket**: `npm install -D vite-plugin-image-optimizer`

---

### 6. **Bundle Analyzer ile Detaylı Analiz**

#### ❌ Problem:
- Hangi paketlerin bundle size'ı artırdığı bilinmiyor
- Duplicate dependencies tespit edilemiyor
- Unused code tespit edilemiyor

#### ✅ Çözüm:
```bash
# npm install -D rollup-plugin-visualizer
```

```js
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ...
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
});
```

**Kullanım**: `npm run build` sonrası `dist/stats.html` dosyası açılır

**Etki**: Bundle size analizi, optimize edilecek alanların tespiti

---

### 7. **CSS Optimizasyonları**

#### ❌ Problem:
- Unused CSS'ler bundle'a dahil
- Critical CSS inline değil
- CSS minification optimize edilmemiş

#### ✅ Çözüm:
```js
// vite.config.js
import { purgecss } from '@fullhuman/postcss-purgecss';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
          safelist: ['html', 'body'], // Silinmemesi gereken class'lar
        }),
      ],
    },
  },
});
```

**Etki**: %30-50 daha küçük CSS bundle

**Gereken Paket**: `npm install -D @fullhuman/postcss-purgecss`

---

### 8. **Font Optimizasyonları**

#### ⚠️ Mevcut Durum:
- Google Fonts preload var ama optimize edilebilir
- Font-display: swap yok
- Font subsetting yok

#### ✅ Çözüm:
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font-display: swap ekle -->
<link 
  rel="preload" 
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap&subset=latin" 
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
>

<!-- Fallback font -->
<style>
  body {
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-display: swap; /* Font yüklenene kadar fallback göster */
  }
</style>
```

**Etki**: Daha hızlı font yükleme, daha iyi FCP (First Contentful Paint)

---

## 🟢 Düşük Öncelikli / Gelecek Optimizasyonlar

### 9. **Web Workers (Büyük Hesaplamalar İçin)**

#### ❌ Problem:
- Büyük data işlemeleri main thread'i blokluyor
- UI freeze oluyor

#### ✅ Çözüm:
```js
// src/workers/dataProcessor.worker.js
self.onmessage = function(e) {
  const { data, operation } = e.data;
  
  // Büyük hesaplama
  const result = processLargeData(data, operation);
  
  self.postMessage(result);
};

// Component'te kullan
const worker = new Worker(new URL('../workers/dataProcessor.worker.js', import.meta.url));

worker.postMessage({ data: largeData, operation: 'filter' });
worker.onmessage = (e) => {
  setProcessedData(e.data);
};
```

**Etki**: Main thread'i bloklamayan hesaplamalar

**Kullanım Senaryoları**:
- Büyük listelerin filtrelenmesi
- Complex data transformations
- Image processing

---

### 10. **Zustand Persist Optimizasyonları**

#### ❌ Problem:
- Store'lar localStorage'a persist edilmiyor
- Sayfa yenilendiğinde state kayboluyor
- Selective persistence yok

#### ✅ Çözüm:
```js
// stores/patientStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const usePatientStore = create(
  persist(
    (set) => ({
      patients: [],
      selectedPatient: null,
      // ...
    }),
    {
      name: 'patient-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        // Sadece belirli state'leri persist et
        selectedPatient: state.selectedPatient,
      }),
    }
  )
);
```

**Etki**: Sayfa yenilendiğinde state korunur, daha iyi UX

---

### 11. **Prefetching / Preloading Optimizasyonları**

#### ❌ Problem:
- Route'lar lazy load ediliyor ama prefetch yok
- Kullanıcı muhtemelen tıklayacağı link'ler önceden yüklenmiyor

#### ✅ Çözüm:
```jsx
// Link component'lerinde prefetch
<Link 
  to="/patients" 
  onMouseEnter={() => {
    // Mouse üzerine gelince prefetch
    import('./pages/Patients/PatientsList');
  }}
>
  Patients
</Link>

// Veya React Router'ın prefetch özelliği
import { usePrefetch } from '@tanstack/react-query';

const prefetchPatients = usePrefetch(['patients']);
```

**Etki**: Daha hızlı sayfa geçişleri

---

### 12. **API Response Compression**

#### ❌ Problem:
- API response'ları compress edilmiyor
- Büyük JSON response'ları yavaş

#### ✅ Çözüm:
```js
// Backend'de gzip compression aktif olmalı
// Frontend'de axios interceptor ile kontrol

axiosInstance.interceptors.response.use(
  (response) => {
    // Response zaten compress edilmiş olmalı
    return response;
  },
  // ...
);
```

**Not**: Bu genellikle backend'de yapılır, frontend'de sadece kontrol edilir.

**Etki**: %60-80 daha küçük response size

---

### 13. **React 19 Concurrent Features**

#### ⚠️ Mevcut Durum:
- React 19 kullanılıyor ama concurrent features tam kullanılmıyor

#### ✅ Çözüm:
```jsx
// useTransition hook ile non-urgent updates
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

const handleSearch = (value) => {
  setSearch(value); // Urgent update
  
  startTransition(() => {
    // Non-urgent update
    setFilteredData(filterData(value));
  });
};

// useDeferredValue ile deferred updates
import { useDeferredValue } from 'react';

const deferredSearch = useDeferredValue(search);
```

**Etki**: Daha smooth UI, daha iyi performans

---

### 14. **Monitoring ve Analytics**

#### ❌ Problem:
- Performans metrikleri toplanmıyor
- Kullanıcı deneyimi analiz edilmiyor
- Hata tracking yok

#### ✅ Çözüm:
```jsx
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Analytics servisine gönder
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

**Etki**: Performans metrikleri, kullanıcı deneyimi analizi

**Önerilen Servisler**:
- Google Analytics
- Sentry (Error tracking)
- LogRocket (Session replay)
- Vercel Analytics

---

## 📊 Öncelik Matrisi

| Optimizasyon | Öncelik | Etki | Zorluk | Süre |
|-------------|---------|------|--------|------|
| Virtual Scrolling | 🔴 Yüksek | Yüksek | Orta | 4-6 saat |
| React Query Cache | 🔴 Yüksek | Yüksek | Düşük | 2-3 saat |
| Error Boundary | 🔴 Yüksek | Orta | Düşük | 1-2 saat |
| Service Worker/PWA | 🟡 Orta | Yüksek | Yüksek | 1-2 gün |
| Image Optimization | 🟡 Orta | Yüksek | Orta | 3-4 saat |
| Bundle Analyzer | 🟡 Orta | Orta | Düşük | 1 saat |
| CSS Optimization | 🟡 Orta | Orta | Orta | 2-3 saat |
| Font Optimization | 🟡 Orta | Düşük | Düşük | 30 dk |
| Web Workers | 🟢 Düşük | Orta | Yüksek | 1 gün |
| Zustand Persist | 🟢 Düşük | Düşük | Düşük | 2-3 saat |
| Prefetching | 🟢 Düşük | Orta | Orta | 3-4 saat |
| API Compression | 🟢 Düşük | Yüksek | Düşük | Backend |
| React 19 Features | 🟢 Düşük | Orta | Orta | 1 gün |
| Monitoring | 🟢 Düşük | Yüksek | Orta | 1 gün |

---

## 🎯 Önerilen Uygulama Sırası

### Faz 1: Hızlı Kazanımlar (1-2 Gün)
1. ✅ React Query Cache Optimizasyonları
2. ✅ Error Boundary Ekleme
3. ✅ Bundle Analyzer ile Analiz
4. ✅ Font Optimizasyonları

### Faz 2: Orta Vadeli (3-5 Gün)
1. ✅ Virtual Scrolling (Büyük Listeler)
2. ✅ Image Format Optimizasyonları
3. ✅ CSS Optimizasyonları
4. ✅ Zustand Persist

### Faz 3: Uzun Vadeli (1-2 Hafta)
1. ✅ Service Worker / PWA
2. ✅ Web Workers
3. ✅ Prefetching Optimizasyonları
4. ✅ Monitoring ve Analytics

---

## 📝 Notlar

- **Öncelik**: Yüksek öncelikli optimizasyonlar önce uygulanmalı
- **Test**: Her optimizasyon sonrası performans testleri yapılmalı
- **Monitoring**: Optimizasyonların etkisi ölçülmeli
- **Documentation**: Yapılan değişiklikler dokümante edilmeli

---

## 🔗 İlgili Dokümanlar

- [PERFORMANCE_ANALYSIS.md](./PERFORMANCE_ANALYSIS.md) - İlk performans analizi
- [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md) - Uygulanan optimizasyonların özeti

---

**Son Güncelleme**: 2024
**Durum**: Kalan optimizasyonlar listesi

