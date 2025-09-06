// src/Home.jsx
import React from "react";

// Style
import "../../assets/style/home.css";

// Zustand Store importu
  import useSidebarStore from '../../../stores/sidebarStore.js'; // `sidebarStore.js` faylının düzgün yolunu təmin edin

function Home() {
  // useSidebarStore-dan toggleSidebar funksiyasını çəkirik
  const { toggleSidebar } = useSidebarStore();

  return (
    <>
      <div className="HomeWrapper">
        <main className="MainContent">
          <section className="HeroSection">
            <h1>Stomatoloji Klinik CRM-ə Xoş Gəldiniz</h1>
            <p>İşlərinizi asanlaşdıran modern və rahat platforma.</p>
            <p>1.21v</p>
            {/* "Sürətli Əməliyyatlar" düyməsinə klikləyəndə sidebar-ı açmaq/bağlamaq üçün */}
            <button
              className="PrimaryButton"
              onClick={toggleSidebar} // Buraya Zustand store-dan gələn `toggleSidebar` funksiyasını bağlayırıq
            >
              Başlayaq!
            </button>
          </section>

          {/* Burada əlavə bölmələr yarada bilərsiniz, məsələn: */}
          {/*
          <section className="OverviewCards">
            <div className="Card">Pasiyentlər: 1,234</div>
            <div className="Card">Bugünkü Qəbul: 12</div>
            <div className="Card">Gözləyən Tapşırıqlar: 5</div>
          </section>
          */}
        </main>

        <footer className="HomePageFooter">
          <p>&copy; 2025 StomatoCRM. Bütün hüquqlar qorunur.</p>

        </footer>
      </div>
    </>
  );
}

export default Home;