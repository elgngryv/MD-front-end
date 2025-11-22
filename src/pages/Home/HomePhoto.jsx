// src/Home.jsx
import React from "react";
import SmileImg from "../../assets/images/smile.png";

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
          <section className="HeroSection flex w-[80%] justify-center items-center mb-17">
            <h1 className="!text-[85px] ">Xoş gəlmisiniz!</h1>
            <img className="w-20 h-20 ml-4" src={SmileImg} alt="photo"/>
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