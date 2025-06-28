// AnamnesisList.js
import React, { useEffect, useState } from "react";
import "../../assets/style/Anamnesis/anamnesiscategorylist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAnamnesisListStore from "../../../stores/anamnesStore";

const AnamnesisList = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const {
    anamnesisList,
    fetchAnamnesisList,
    removeAnamnesis,
    loading,
    updateAnamnesisStatus,
  } = useAnamnesisListStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (categoryId) {
      fetchAnamnesisList(categoryId);
    }
  }, [categoryId]);

  const handleEdit = (id) => {
    navigate(`/anamnesis/anamnesis-details/${categoryId}/edit/${id}`);
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `${name} anamnezini silmək istədiyinizə əminsiniz?`
    );
    if (!confirmed) return;

    try {
      await removeAnamnesis(id);
      fetchAnamnesisList(categoryId);
      alert(`${name} uğurla silindi.`);
    } catch (error) {
      alert("Silinmə zamanı xəta baş verdi.");
    }
  };

  const toggleStatus = async (row) => {
    const newStatus = row.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await updateAnamnesisStatus(row.id, { status: newStatus });
      fetchAnamnesisList(categoryId);
    } catch (err) {
      alert("Status dəyişdirilə bilmədi!");
    }
  };

  const filteredAnamnesis = anamnesisList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="anamnesisList-container">
      <div className="anamnesisList-controls-section">
        <div className="anamnesisList-filters">
          <select
            className="anamnesisList-status-dropdown"
            onChange={(e) => setSearchTerm(e.target.value)}>
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="INACTIVE">Passiv</option>
          </select>
          <div className="anamnesisList-search-box">
            <input
              type="text"
              placeholder="Axtarış"
              className="anamnesisList-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="anamnesisList-search-button">
              <CiSearch className="anamnesisList-search-icon" />
            </button>
          </div>
        </div>
        <div className="anamnesisList-actions">
          <Link
            to={`/anamnesis/anamnesis-details/${categoryId}/add`}
            className="anamnesisList-add-new-button">
            <span>+</span> Yeni anamnez əlavə et
          </Link>
        </div>
      </div>

      <div className="anamnesisList-table-section">
        <table className="anamnesisList-table">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown /> Anamnezin adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown /> Status
                </span>
              </th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Yüklənir...</td>
              </tr>
            ) : filteredAnamnesis.length === 0 ? (
              <tr>
                <td colSpan="4">Heç bir anamnez tapılmadı.</td>
              </tr>
            ) : (
              filteredAnamnesis.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>
                    <span
                      onClick={() => toggleStatus(row)}
                      style={{ cursor: "pointer" }}
                      className={`anamnesisList-status-badge ${
                        row.status === "ACTIVE" ? "active" : "passive"
                      }`}
                      title="Statusu dəyişmək üçün kliklə">
                      {row.status === "ACTIVE" ? "Aktiv" : "Passiv"}
                    </span>
                  </td>
                  <td>
                    <div className="anamnesisList-action-icons">
                      <FiEdit3
                        className="anamnesisList-edit-button"
                        onClick={() => handleEdit(row.id)}
                      />
                      <GoTrash
                        className="anamnesisList-delete-button"
                        onClick={() => handleDelete(row.id, row.name)}
                      />
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

export default AnamnesisList;
