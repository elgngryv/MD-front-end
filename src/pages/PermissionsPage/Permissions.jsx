import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";

// Style
import "../../assets/style/PermissionPage/permissionslist.css";

// Libraries
import { Link } from "react-router-dom";

// Store
import usePermissionStore from "../../../stores/permissionStore";

const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

function Permissions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const { permissions, fetchPermissions, loading, error } =
    usePermissionStore();

  useEffect(() => {
    fetchPermissions();
  }, []);

  const filteredData = permissions.filter(
    (row) =>
      (status === "" || row.status === status) &&
      row.permissionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/edit-permission/${row.id}`);
  };

  const handleDelete = (row) => {
    alert(`Silindi: ${row.permissionName}`);
  };

  const handleInfo = (row) => {
    navigate(`/permission-info/${row.id}`);
  };

  return (
    <div className="permissionsContainer">
      <div className="permissionsContainerTopPart">
        <div className="leftPart">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="permissionsQuickSearch">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
            />
            <CiSearch className="searchPermissionIcon" />
          </div>
        </div>
        <div className="rightPart">
          <Link className="addPermission" to={"/add-permission"}>
            <IoMdAdd className="addPermissionIcon" /> Yenisini əlavə et
          </Link>
          <Link className="exportPermissions">
            <FiDownload className="exportPermissionsIcon" />
          </Link>
        </div>
      </div>

      <div className="permissionsTableWrapper">
        {loading ? (
          <p>Yüklənir...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Xəta: {error}</p>
        ) : (
          <table className="permissionsTable">
            <thead>
              <tr>
                <th>
                  <span>1-{filteredData.length}</span>
                </th>
                <th className="permissionName">
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> İcazənin
                    adı
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Status
                  </span>
                </th>
                <th>Düzəliş</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td className="permissionName">{row.permissionName}</td>
                  <td>
                    <span
                      className={`statusBadge ${
                        row.status === "Aktiv" ? "active" : "passive"
                      }`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="actionIcons flex gap-3 cursor-pointer">
                      <CiCircleInfo
                        size={20}
                        className="info"
                        onClick={() => handleInfo(row)}
                      />
                      <FiEdit3
                        className="editBtn"
                        onClick={() => handleEdit(row)}
                      />
                      <GoTrash
                        className="deleteBtn"
                        onClick={() => handleDelete(row)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Permissions;
