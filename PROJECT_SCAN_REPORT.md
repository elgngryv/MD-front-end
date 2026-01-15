# Proje Tarama Raporu - MD Front-end

## 📊 Genel Bakış

**Proje Adı**: Müasir Stomatologiya (MD Clinic)  
**Tip**: Stomatologiya Klinikası Yönetim Sistemi  
**Framework**: React 19.0.0 + Vite 6.2.0  
**UI Framework**: Ant Design 5.27.6  
**State Management**: Zustand + TanStack Query  
**Styling**: Tailwind CSS 4.1.3 + Custom CSS

---

## 📁 Proje Yapısı

### Ana Dizinler

```
MD-front-end/
├── src/
│   ├── api/              # API çağrıları (60+ dosya)
│   ├── assets/           # Statik dosyalar (icons, images, styles)
│   ├── components/       # Reusable bileşenler (52 dosya)
│   ├── context/          # React Context'ler
│   ├── hooks/            # Custom React hooks (7 dosya)
│   ├── pages/            # Sayfa bileşenleri (235+ dosya)
│   ├── utils/            # Yardımcı fonksiyonlar
│   └── main.jsx          # Ana entry point
├── stores/               # Zustand state management (50+ store)
├── dist/                 # Build çıktısı
└── node_modules/         # Bağımlılıklar
```

---

## 🔧 Teknoloji Stack

### Core Dependencies
- **React**: 19.0.0
- **React DOM**: 19.0.0
- **Vite**: 6.2.0
- **React Router DOM**: 7.5.3

### UI & Styling
- **Ant Design**: 5.27.6
- **Tailwind CSS**: 4.1.3
- **Framer Motion**: 11.0.0 (animasyonlar)
- **React Icons**: 5.5.0
- **React Spinners**: 0.17.0

### Form & Validation
- **React Hook Form**: 7.55.0
- **Yup**: 1.6.1
- **@hookform/resolvers**: 5.0.1

### Data Fetching & State
- **TanStack Query**: 5.73.3
- **Zustand**: 5.0.3
- **Axios**: 1.9.0

### Utilities
- **Date-fns**: 4.1.0
- **React Big Calendar**: 1.19.4
- **React Calendar**: 5.1.0
- **React Toastify**: 11.0.5

### PWA & Optimization
- **Vite PWA Plugin**: 1.2.0
- **Vite Image Optimizer**: 2.0.3
- **Rollup Plugin Visualizer**: 6.0.5

---

## 📄 Dosya İstatistikleri

### React Dosyaları
- **JSX Dosyaları**: 288 dosya
- **JavaScript Dosyaları**: 121 dosya
- **React Import'u Olan Dosyalar**: 287 dosya

### Sayfa Bileşenleri
- **Toplam Sayfa**: 235+ sayfa bileşeni
- **Lazy Loading**: Tüm sayfalar lazy load ediliyor

### API Dosyaları
- **API Endpoint Dosyaları**: 60+ dosya
- **Store Dosyaları**: 50+ store

---

## 🎯 Ana Özellikler

### 1. Hasta Yönetimi (Patient Management)
- Hasta listesi ve detayları
- Hasta ekleme/düzenleme
- Hasta genel bilgileri
- Hasta geçmişi (History)
- Hasta planları (Plans)
- Tedavi kayıtları (Treatment)
- Reçete yönetimi (Prescription)
- X-Ray görüntüleme
- Sigorta yönetimi (Insurance)

**İlgili Dosyalar**:
- `src/pages/Patients/`
- `src/pages/patient/`
- `src/api/patient.js`
- `stores/patiendStore.js`

### 2. Randevu Yönetimi (Appointments)
- Randevu listesi
- Yeni randevu ekleme
- Randevu kartları
- Randevu tipleri

**İlgili Dosyalar**:
- `src/pages/Appointments.jsx`
- `src/pages/AddNewAppointment.jsx`
- `src/api/reservation.js`
- `stores/appointments.js`

### 3. Stok Yönetimi (Stock Management)
- Stok girişi (Stock Entry)
- Stok çıkışı (Stock Export)
- Stok silme (Stock Delete)
- Stok siparişi (Stock Order)
- Stok import/export
- Ürün kategorileri
- Ürün yönetimi

**İlgili Dosyalar**:
- `src/pages/stockEntry/`
- `src/pages/stockExport/`
- `src/pages/stockImport/`
- `src/pages/stockOrder/`
- `src/api/warehouse-*.js`
- `stores/warehouse*.js`

### 4. Çalışan Yönetimi (Employee Management)
- Çalışan listesi
- Çalışan ekleme/düzenleme
- Çalışan detayları
- Çalışan programı (Schedule)
- Çalışan çalışma programı

**İlgili Dosyalar**:
- `src/pages/Employees/`
- `src/api/add-worker.js`
- `src/api/worker-schedule.js`
- `stores/workerStore.js`

### 5. Diş Yönetimi (Teeth Management)
- Diş listesi
- Diş ekleme/düzenleme
- Operasyon resimleri
- Muayene resimleri
- Diş SVG görselleştirme

**İlgili Dosyalar**:
- `src/pages/Teeth/`
- `src/api/teeth.js`
- `src/api/teeth-operation.js`
- `src/api/teeth-examinaton.js`
- `stores/teethStore.js`

### 6. Operasyon Yönetimi (Operations)
- Operasyon kategorileri
- Operasyon listesi
- Operasyon ekleme/düzenleme

**İlgili Dosyalar**:
- `src/pages/Operations/`
- `src/api/operationsType.js`
- `stores/operationsTypeStore.js`

### 7. Laboratuvar Yönetimi (Laboratory)
- Teknik raporlar
- Gönderilen siparişler
- Alınan siparişler
- Sipariş detayları
- Laboratuvar ödemeleri

**İlgili Dosyalar**:
- `src/pages/Laboratory/`
- `src/api/laboratory-payment.js`
- `stores/laboratoryPaymentStore.js`

### 8. Ürün Kategorileri (Product Categories)
- Kategori yönetimi
- Ürün yönetimi
- Fiyat kategorileri

**İlgili Dosyalar**:
- `src/pages/ProductCategory/`
- `src/pages/PriceCategory/`
- `src/api/productCategories.js`
- `src/api/product-api.js`

### 9. Ayarlar (Settings)
- Genel ayarlar
- Sigorta ayarları
- Renk ayarları
- Kabin ayarları
- İmplant ayarları
- Muayene ayarları
- Diş seti ayarları

**İlgili Dosyalar**:
- `src/pages/settings/`
- `src/pages/GeneralSettings/`

### 10. Diğer Özellikler
- Kuyruk yönetimi (Queue)
- Reçete yönetimi (Recepts)
- İlaç yönetimi (Medicines)
- Teknisyen yönetimi (Technicians)
- Özel listeler (Specialities)
- Anamnez yönetimi (Anamnesis)
- İzin yönetimi (Permissions)
- Raporlar (Reports)
- Siyah liste (Blacklist)

---

## 🏗️ Mimari Yapı

### State Management
- **Zustand**: Global state için (50+ store)
- **TanStack Query**: Server state ve caching için
- **React Context**: Appointment context gibi özel durumlar için

### Routing
- **React Router DOM**: Client-side routing
- **Lazy Loading**: Tüm sayfalar lazy load ediliyor
- **Code Splitting**: Vite manual chunks ile optimize edilmiş

### API Yapısı
- **Axios**: HTTP istekleri için
- **API Dosyaları**: Her modül için ayrı API dosyası
- **Auth**: Token-based authentication

### Build Optimizasyonu
- **Vite**: Hızlı build ve dev server
- **Manual Chunks**: 
  - `vendor-react`: React ekosistemi
  - `vendor-utils`: Utility kütüphaneleri
  - `vendor-other`: Diğer kütüphaneler
- **PWA**: Service worker ve manifest
- **Image Optimization**: Vite image optimizer
- **Bundle Analyzer**: Rollup visualizer

---

## 🎨 UI/UX Özellikleri

### Layout
- **Ana Layout**: `src/components/layout/Layout.jsx`
- **Hasta Layout**: `src/components/layout/PatientLayout.jsx`
- **Header**: `src/components/layout/Header.jsx`
- **Sidebar**: `src/components/SidebarMenu.jsx`

### Animasyonlar
- **Framer Motion**: Sayfa geçişleri ve animasyonlar
- **AnimatePresence**: Route değişimlerinde animasyon

### Bileşenler
- **Error Boundary**: Hata yakalama
- **Loading Spinner**: Yükleme göstergesi
- **Virtualized Table**: Büyük listeler için
- **Tooth Selector**: Diş seçici
- **Optimized Image**: Optimize edilmiş resim bileşeni

---

## 🔐 Güvenlik & Auth

- **Auth Store**: `stores/authStore.js`
- **Token Management**: LocalStorage'dan token yükleme
- **Protected Routes**: Redirecter bileşeni ile
- **API Auth**: Axios interceptor ile token ekleme

---

## 📱 PWA Özellikleri

- **Service Worker**: Otomatik güncelleme
- **Manifest**: App metadata
- **Cache Strategy**: NetworkFirst API cache
- **Offline Support**: Workbox ile

---

## 🚀 Build & Deploy

### Build Komutları
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # ESLint check
```

### Build Çıktısı
- **Output**: `dist/` klasörü
- **Stats**: `dist/stats.html` (bundle analizi)
- **PWA Files**: `dist/sw.js`, `dist/manifest.webmanifest`

---

## 📊 Bundle Analizi

### Vendor Chunks (vite.config.js)

1. **vendor-react** (React Ekosistemi)
   - react
   - react-dom
   - react-router-dom
   - antd
   - @ant-design/icons
   - framer-motion
   - react-hook-form
   - react-big-calendar
   - react-calendar

2. **vendor-utils** (Utility Kütüphaneleri)
   - axios
   - zustand
   - @tanstack/react-query
   - yup
   - date-fns

3. **vendor-other** (Diğer Kütüphaneler)
   - Kalan tüm node_modules

---

## ⚠️ Önemli Notlar

### React 19 Uyumluluğu
- **@ant-design/v5-patch-for-react-19**: Ant Design'ın React 19 ile uyumluluğu için patch
- **React 19 Features**: Concurrent features kullanılıyor

### Performance Optimizasyonları
- **Lazy Loading**: Tüm sayfalar
- **Code Splitting**: Manual chunks
- **Image Optimization**: Vite plugin
- **CSS Code Split**: Ayrı CSS chunk'ları
- **Tree Shaking**: Otomatik

### Browser Support
- **Target**: `esnext` (modern browsers)
- **Source Maps**: Production'da kapalı
- **Minification**: Terser

---

## 🔍 Öneriler

### 1. Vendor React Chunk
- **ÖNERİLMEZ**: `id.includes('react')` kontrolünü kaldırmayın
- React core ve React DOM birlikte olmalı
- Ayrı chunk'lara bölmek performans kaybına neden olur

### 2. Bundle Optimizasyonu
- Ant Design büyük bir kütüphane, ayrı chunk'a alınabilir
- React Router ayrı chunk'a alınabilir
- Ama React core ve React DOM ASLA ayrılmamalı

### 3. Code Quality
- ESLint yapılandırılmış
- React hooks kuralları aktif
- TypeScript'e geçiş düşünülebilir

---

## 📝 Sonuç

Bu proje, kapsamlı bir stomatologiya klinikası yönetim sistemidir. React 19, Vite, Ant Design ve modern state management araçları kullanılarak geliştirilmiştir. Proje, lazy loading, code splitting ve PWA özellikleri ile optimize edilmiştir.

**Toplam Dosya Sayısı**: 500+ dosya  
**React Bileşenleri**: 288 JSX dosyası  
**API Endpoints**: 60+ API dosyası  
**State Stores**: 50+ Zustand store

