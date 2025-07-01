// Header.js
import { useState, useEffect } from "react";
import { LuCalendarPlus } from "react-icons/lu";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { FiLock, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

import useAuthStore from "../../../stores/authStore";
import useWorkerStore from "../../../stores/workerStore";

import adminUser from "../../assets/images/header-component-images/adminPFP.jpeg";
import "../../assets/style/header.css";

localStorage.setItem("notification", "true");

function Header() {
  const { user, logout } = useAuthStore();
  const { selectedWorker, fetchWorkerById } = useWorkerStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const showNotificationDot = localStorage.getItem("notification") !== "false";

  useEffect(() => {
    if (user?.id) {
      fetchWorkerById(user.id);
    }
  }, [user?.id, fetchWorkerById]);

  return (
    <header className="headerContainer">
      <div className="headerElements">
        <Link to={"/appointments/add"}>
          <LuCalendarPlus className="headerCalendarIcon headerIcon" />
        </Link>
        <Link to={"/patients/add-patient"}>
          <AiOutlineUserAdd className="headerIcon" />
        </Link>

        <div
          className="headerUserProfileLink"
          onClick={() => setMenuOpen((prev) => !prev)}>
          <img src={adminUser} alt="Admin" />
          <div className="headerRightPart">
            <div className="headerTitle">
              <p className="headerNamePart">
                {selectedWorker
                  ? `${selectedWorker.name} ${selectedWorker.surname}`
                  : "Yüklənir..."}
              </p>
              <p className="headerRolePart">
                {selectedWorker?.permissions?.length > 0
                  ? selectedWorker.permissions.join(", ")
                  : "Vəzifə"}
              </p>
            </div>
            <IoIosArrowBack className="headerArrowIcon" />
          </div>

          {menuOpen && (
            <div className="headerDropdownMenu">
              <div className="headerDropdownItem">
                <FiLock className="headerDropdownIcon" />
                <Link to="/change-password">Şifrəmi dəyiş</Link>
              </div>
              <div
                className="headerDropdownItem"
                onClick={() => {
                  logout();
                  window.location.href = "/login";
                }}
                style={{ cursor: "pointer" }}>
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
