// src/components/Redirecter.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

function Redirecter({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
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
          console.warn("Access token expired. Attempting to refresh...");

          // Refresh tokenın da expire olub-olmadığını yoxla
          try {
            const refreshPayload = JSON.parse(atob(refreshToken.split(".")[1]));
            const isRefreshExpired = refreshPayload.exp * 1000 < Date.now();

            if (isRefreshExpired) {
              console.warn(
                "Refresh token also expired. Redirecting to login..."
              );
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("userId");
              navigate("/login", { replace: true });
              return;
            }
          } catch (refreshErr) {
            console.error("Invalid refresh token:", refreshErr);
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            navigate("/login", { replace: true });
            return;
          }

          // Refresh token hələ də validdirsə, access tokeni yenilə
          try {
            const authStore = useAuthStore.getState();
            await authStore.refreshAccessToken();
            console.log("Access token refreshed successfully");
            // Token yeniləndi, davam et
          } catch (refreshError) {
            console.error("Failed to refresh access token:", refreshError);
            // Refresh uğursuz oldu, logout et
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            navigate("/login", { replace: true });
          }
        }
      } catch (err) {
        console.error("Invalid token:", err);
        navigate("/login", { replace: true });
      }
    };

    checkAndRefreshToken();
  }, [navigate]);

  return <>{children}</>;
}

export default Redirecter;
