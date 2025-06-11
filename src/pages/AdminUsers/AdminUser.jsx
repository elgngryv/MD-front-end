import React, { useState } from "react";
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus, FaDownload } from "react-icons/fa";
import "../../assets/style/AdminUsers/adminusers.css"
import { CiExport } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const AdminUser = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const mockUsers = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "Admin",
      name: "Admin",
      surname: "User",
      permission: "Tam icazə",
      phone: "(050) xxx xx xx",
      status: "Aktiv",
    },
    ...Array(7).fill({
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      username: "Dr.elmira",
      name: "Elmira",
      surname: "Aliyeva",
      permission: "Tam icazə",
      phone: "(050) xxx xx xx",
      status: "Passiv",
    }).map((item, i) => ({ ...item, id: i + 2 })),
  ];

  const statusOptions = [
    { value: "", label: "Status" },
    { value: "Aktiv", label: "Aktiv" },
    { value: "Passiv", label: "Passiv" },
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      (status === "" || user.status === status) &&
      (
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.surname.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleEdit = (userId) => {
    navigate(`${userId}/edit`);
  };

  const handleInfo = (userId) => {
    navigate(`${userId}/info`);
  };

  return (
    <div className="adminUsersPageContainer">
      <div className="adminUsersPageTopPart">
        <div className="leftPartOfTop">
          <select
            className="adminUsersStatusSelect"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="searchBarContainer">
            <input
              type="text"
              placeholder="Axtarış"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch className="searchIconBTN" />
          </div>
        </div>
        <div className="rightPartOfTop">
          <Link to={'add'} className="addNewAdminUserNow">
            <FaPlus /> Yenisini əlavə et
          </Link>
          <Link className="exportDataOfAdminUsers" title="Export">
            <CiExport size={22} className="exportAdminDataIcon" />
          </Link>
        </div>
      </div>

      <div className="adminUsersTableWrapper">
        <table className="adminUsersTable">
          <thead>
            <tr>
              <th><span>1-8</span></th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> İstifadəçi adı
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Adı
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Soyadı
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> İcazələr
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Mobil nömrə
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Status
                </span>
              </th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td className="usernameOfAdminUser">
                  <img
                    src={user.avatar}
                    className="imageOfAdminUser"
                    alt={user.username}
                  />
                  {user.username}
                </td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.permission}</td>
                <td>{user.phone}</td>
                <td>
                  <span
                    className={`status ${
                      user.status === "Aktiv" ? "active" : "passive"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="icons flex gap-3 cursor-pointer">
                    <CiCircleInfo 
                      className="info" 
                      onClick={() => handleInfo(user.id)}
                    />
                    <FiEdit3 
                      className="edit" 
                      onClick={() => handleEdit(user.id)}
                    />
                    <GoTrash className="delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUser;