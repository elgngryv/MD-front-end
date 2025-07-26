// src/components/Redirecter.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom V6+ üçün `useHistory` əvəzinə `useNavigate` istifadə olunur

function Redirecter({ children }) {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // 1. LocalStorage-da token, refreshToken və user məlumatlarının olub-olmadığını yoxlayırıq
  //   const token = localStorage.getItem('token');
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   const user = localStorage.getItem('userId'); // User məlumatını da yoxlamaq yaxşıdır

  //   // Əgər bunlardan hər hansı biri yoxdursa, və ya boş stringdirsə
  //   if (!token || token === '' || !refreshToken || refreshToken === '' || !user || user === '') {
  //     console.warn("Unauthorized access detected: Token, Refresh Token, or User data missing. Redirecting to /401.");
  //     // İstifadəçini /401 səhifəsinə yönləndiririk
  //     // navigate('/401', { replace: true }); // replace: true ilə geri düyməsini basanda bu səhifəyə dönməsini əngəlləyir
  //     // Müvəqqəti olaraq `/login` və ya `/unauthorized` kimi bir səhifəyə yönləndirmək daha məntiqlidir,
  //     // çünki 401 adətən bir səhifə deyil, HTTP status kodudur.
  //     // Tutaq ki, sizdə `/unauthorized` adlı bir səhifə var.
  //     navigate('/login', { replace: true });
  //   }
  // }, [navigate]); // navigate funksiyası dəyişdikdə `useEffect` yenidən işə düşməlidir (baxmayaraq ki, adətən dəyişməz)

  // // Əgər istifadəçi səlahiyyətlidirsə, "children" elementlərini render edirik.
  // // Yəni tətbiqinizin qalan hissəsi görünür.
  // return <>{children}</>;
}

export default Redirecter;