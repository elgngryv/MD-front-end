import React, { useEffect, useState } from "react";
import "../../assets/style/Anamnesis/anamnesiscategorylist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useAnamnesisCategoryStore from "../../../stores/anamnesisCategoryStore";

const AnamnesisList = () => {
  const navigate = useNavigate();
  const { categories, fetchCategories, deleteCategory, loading, updateCategoryStatus } =
    useAnamnesisCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id) => {
    navigate(`/anamnesis/edit/${id}`);
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `${name} kateqoriyasını silmək istədiyinizə əminsiniz?`
    );
    if (!confirmed) return;

    try {
      await deleteCategory(id);
      alert(`${name} uğurla silindi.`);
    } catch (error) {
      alert("Silinmə zamanı xəta baş verdi.");
    }
  };

  // Statusu kliklə dəyişmək üçün funksiya
  const toggleStatus = async (row) => {
    const newStatus = row.status === "ACTIVE" ? "PASSIVE" : "ACTIVE";
    try {
      await updateCategoryStatus(row.id, { status: newStatus });
    } catch (err) {
      alert("Status dəyişdirilə bilmədi!");
    }
  };

  // Kateqoriyaları axtarışla da filtr et
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="anamnesisList-container">
      <div className="anamnesisList-controls-section">
        <div className="anamnesisList-filters">
          <select
            className="anamnesisList-status-dropdown"
            onChange={(e) => setSearchTerm(e.target.value)} // Burada statusa görə filtr də əlavə edə bilərsən
          >
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
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
          <Link to={"./add"} className="anamnesisList-add-new-button">
            <span>+</span> Yenisini əlavə et
          </Link>
          <button className="anamnesisList-download-button">
            <FiDownload className="anamnesisList-download-icon" />
          </button>
        </div>
      </div>

      <div className="anamnesisList-table-section">
        <table className="anamnesisList-table">
          <thead>
            <tr>
              <th>
                <span className="firstElementOfTHS">
                  <HiOutlineArrowsUpDown />
                  {filteredCategories.length ? `1-${filteredCategories.length}` : "0"}
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown /> Kategoriyanın adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown /> Anamnezlər
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown /> Status
                </span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Yüklənir...</td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="5">Heç bir kateqoriya tapılmadı.</td>
              </tr>
            ) : (
              filteredCategories.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>
                    <Link to={`./anamnesis-details/${row.id}`}>
                      Anamnezləri ({row.anamnesisCount || 0})
                    </Link>
                  </td>
                  <td>
                    <span
                      onClick={() => toggleStatus(row)}
                      style={{ cursor: "pointer" }}
                      className={`anamnesisList-status-badge ${
                        row.status === "ACTIVE" ? "active" : "passive"
                      }`}
                      title="Statusu dəyişmək üçün kliklə"
                    >
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
