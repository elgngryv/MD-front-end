// src/components/Redirecter.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirecter({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("userId");

    // Əgər heç token yoxdursa → login-ə yönləndir
    if (!token || !refreshToken || !user) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      // JWT tokenin ortasındakı hissəsini (payload) parse edirik
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now(); // exp saniyədir, Date.now ms

      if (isExpired) {
        console.warn("Token expired. Redirecting to /login...");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
}

export default Redirecter;
