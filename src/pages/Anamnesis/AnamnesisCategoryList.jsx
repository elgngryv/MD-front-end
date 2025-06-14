import React, { useState } from 'react';
import '../../assets/style/Anamnesis/anamnesiscategorylist.css';
import { CiSearch } from "react-icons/ci"; // Axtarış iconu
import { FiDownload, FiEdit3 } from "react-icons/fi"; // Yükləmə və redaktə iconları
import { GoTrash } from "react-icons/go"; // Silmə iconu
import { HiOutlineArrowsUpDown } from "react-icons/hi2"; // Sıralama iconu
import { Link, useNavigate } from "react-router-dom"; // Link üçün

const AnamnesisList = () => {
  const navigate = useNavigate();
  // Nümunə məlumatları (bu real API çağırışı ilə dəyişdirilə bilər)
  const [anamnesisData, setAnamnesisData] = useState([
    { id: 1, categoryName: "Ürək damar", anamnesisCount: 2,  status: "ACTIVE" },
    { id: 2, categoryName: "Sinir Sistemi", anamnesisCount: 5, status: "ACTIVE" },
    { id: 3, categoryName: "Həzm Sistemi", anamnesisCount: 1,  status: "ACTIVE" },
  ]);

  const totalAnamnesisCount = anamnesisData.length;

  const handleEdit = (id) => {
    navigate(`/anamnesis/edit/${id}`);
  };

  return (
    <div className="anamnesisList-container">
      <div className="anamnesisList-controls-section">
        <div className="anamnesisList-filters">
          <select className="anamnesisList-status-dropdown">
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="anamnesisList-search-box">
            <input type="text" placeholder="Axtarış" className="anamnesisList-search-input" />
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
              <th >
                <span className='firstElementOfTHS'><HiOutlineArrowsUpDown className="anamnesisList-sort-icon" />{totalAnamnesisCount === 0 ? '0' : `1-${totalAnamnesisCount}`}</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="anamnesisList-sort-icon" /> Kategoriyanın adı</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="anamnesisList-sort-icon" /> Anamnezlər</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="anamnesisList-sort-icon" /> Status</span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {anamnesisData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.categoryName}</td>
                <td><Link to={`./anamnesis-details/${row.categoryName}`}>Anamnezləri ({row.anamnesisCount})</Link></td>
                <td>
                  <span className={`anamnesisList-status-badge ${row.status === "ACTIVE" ? "active" : "passive"}`}>
                    {row.status === "ACTIVE" ? "Aktiv" : "Passiv"}
                  </span>
                </td>
                <td>
                  <div className="anamnesisList-action-icons">
                    <FiEdit3 className="anamnesisList-edit-button" onClick={() => handleEdit(row.id)} />
                    <GoTrash className="anamnesisList-delete-button" onClick={() => console.log('Delete', row.id)} />
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

export default AnamnesisList;