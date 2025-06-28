import React, { useEffect, useState } from "react";
import "../../assets/style/Anamnesis/anamnesislist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAnamnesisListStore from "../../../stores/anamnesStore";

function AnamnesisList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    anamnesisList,
    fetchAnamnesisList,
    removeAnamnesis,
    updateAnamnesisStatus,
    loading,
    error,
  } = useAnamnesisListStore();

  useEffect(() => {
    fetchAnamnesisList();
  }, []);

  const filteredData = anamnesisList.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `${row.name} anamnezini silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    await removeAnamnesis(row.id);
    alert(`${row.name} uğurla silindi.`);
  };

  // Status toggle funksiyası
  const toggleStatus = async (row) => {
    const newStatus = row.status === "ACTIVE" ? "PASSIVE" : "ACTIVE";
    await updateAnamnesisStatus(row.id, { status: newStatus });
  };

  return (
    <div className="anamnesisPageWrapper">
      <div className="anamnesisCategoryQuickSearch">
        <div className="anamnesisCategoryLeftPart">
          <select>
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="searchForNameAnamnesis">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="anamnesisCategoryRightPart">
          <Link to={"./add"}>
            <p className="addNewAnamnesisCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportAnamnesisCategoriesData" />
          </Link>
        </div>
      </div>

      {loading && <p>Yüklənir...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Xəta baş verdi: {error.message || error.toString()}
        </p>
      )}

      <div className="anamnesisPageTableWrapper">
        <table className="anamnesisPageTable">
          <thead>
            <tr>
              <th>
                {anamnesisList.length === 0 ? "0" : `1-${anamnesisList.length}`}
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Anamnezin adı
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
                <td className="anamnesisNameCol">{row.name}</td>
                <td>
                  <span
                    onClick={() => toggleStatus(row)}
                    style={{ cursor: "pointer" }}
                    className={`statusBadge ${
                      row.status === "ACTIVE" ? "active" : "passive"
                    }`}
                    title="Statusu dəyişmək üçün klikləyin"
                  >
                    {row.status === "ACTIVE" ? "Aktiv" : "Passiv"}
                  </span>
                </td>
                <td>
                  <div className="anamnesisActionIcons">
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
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={4}>Axtarışa uyğun anamnez tapılmadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnamnesisList;
