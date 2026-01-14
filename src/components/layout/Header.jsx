// Header.js
import { useState, useEffect } from "react";
import { LuCalendarPlus } from "react-icons/lu";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { FiLock, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/temp-axios-auth";
import useAuthStore from "../../../stores/authStore";

import adminUser from "../../assets/images/header-component-images/adminPFP.jpeg";
import "../../assets/style/header.css";

function Header() {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [workerInfo, setWorkerInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerInfo = async () => {
      if (user?.id && !workerInfo) {
        try {
          const response = await axiosInstance.get(
            `/add-worker/info/${user.id}`
          );
          setWorkerInfo(response.data);
        } catch (error) {
          console.error("Failed to fetch worker data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchWorkerInfo();
  }, [user?.id, workerInfo]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const showNotificationDot = localStorage.getItem("notification") !== "false";

  return (
    <header className="headerContainer">
      <div className="headerElements">
        <Link to={"/appointments/add"}>
          <LuCalendarPlus className="headerCalendarIcon headerIcon" />
        </Link>
        <Link to={"/patients/add-patient"}>
          <AiOutlineUserAdd className="headerIcon" />
        </Link>
        {showNotificationDot && <div className="notificationDot"></div>}
        <div
          className="headerUserProfileLink"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <img src={adminUser} alt="Admin" loading="lazy" decoding="async" />
          <div className="headerRightPart">
            <div className="headerTitle">
              <p className="headerNamePart">
                {loading
                  ? "Yüklənir..."
                  : workerInfo
                  ? `${workerInfo.name} ${workerInfo.surname}`
                  : "Məlumat tapılmadı"}
              </p>
              <p className="headerRolePart">
                {loading
                  ? "Vəzifə"
                  : workerInfo?.permissions?.length > 0
                  ? workerInfo.permissions.join(", ")
                  : "Vəzifə"}
              </p>
            </div>
            <IoIosArrowBack className="headerArrowIcon" />
          </div>

          {menuOpen && (
            <div className="headerDropdownMenu">
              <div className="headerDropdownItem">
                <FiLock className="headerDropdownIcon" />
                <Link to="/change-password">Şifrəni dəyiş</Link>
              </div>
              <div
                className="headerDropdownItem"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                <FiLogOut className="headerDropdownIcon" />
                <span>Çıxış</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;