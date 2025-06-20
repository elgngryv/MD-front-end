import React, { useEffect, useState } from "react";
import { CiSearch, CiCircleInfo, CiExport } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/AdminUsers/adminusers.css";
import { Link, useNavigate } from "react-router-dom";
import useEmployeeStore from "../../../stores/workerStore";

const AdminUser = () => {
  const { workers, fetchWorkers, loading } = useEmployeeStore();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const statusOptions = [
    { value: "", label: "Status" },
    { value: "Aktiv", label: "Aktiv" },
    { value: "Passiv", label: "Passiv" },
  ];

  const filteredUsers = workers
    .filter(
      (user) =>
        Array.isArray(user.permissions) && user.permissions.includes("ADMIN")
    )
    .filter(
      (user) =>
        (status === "" || (user.enabled ? "Aktiv" : "Passiv") === status) &&
        (user.username?.toLowerCase().includes(search.toLowerCase()) ||
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.surname?.toLowerCase().includes(search.toLowerCase()))
    );

  const handleEdit = (id) => navigate(`${id}/edit`);
  const handleInfo = (id) => navigate(`${id}/info`);

  return (
    <div className="adminUsersPageContainer">
      <div className="adminUsersPageTopPart">
        <div className="leftPartOfTop">
          <select
            className="adminUsersStatusSelect"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
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
          <Link to={"add"} className="addNewAdminUserNow">
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
              <th>#</th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> İstifadəçi adı
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Adı
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Soyadı
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> İcazələr
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Mobil nömrə
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Status
              </th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">Yüklənir...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8">İstifadəçi tapılmadı.</td>
              </tr>
            ) : (
              filteredUsers.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td className="usernameOfAdminUser">
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        user.name || "Admin"
                      }&background=random`}
                      className="imageOfAdminUser"
                      alt={user.username}
                    />
                    {user.username}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.permissions?.join(", ") || "—"}</td>
                  <td>{user.phone || "—"}</td>
                  <td>
                    <span
                      className={`status ${
                        user.enabled ? "active" : "passive"
                      }`}>
                      {user.enabled ? "Aktiv" : "Passiv"}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUser;
