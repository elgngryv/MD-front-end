import React, { useState } from 'react';
import '../../assets/style/Implants/implantslist.css';
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const ImplantsList = () => {
  const navigate = useNavigate();
  // Nümunə məlumatları (bu real API çağırışı ilə dəyişdirilə bilər)
  const [implantsData, setImplantsData] = useState([
    { id: 1, brandName: "Nobel Active", sizeCount: 0, status: "ACTIVE" },
    { id: 2, brandName: "Straumann", sizeCount: 0, status: "ACTIVE" },
    { id: 3, brandName: "Astra Tech", sizeCount: 0, status: "ACTIVE" },
  ]);

  const totalImplantsCount = implantsData.length;

  const handleEdit = (id) => {
    navigate(`/implants/edit/${id}`);
  };

  return (
    <div className="implantsList-container">
      <div className="implantsList-controls-section">
        <div className="implantsList-filters">
          <select className="implantsList-status-dropdown">
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="implantsList-search-box">
            <input type="text" placeholder="Axtarış" className="implantsList-search-input" />
            <button className="implantsList-search-button">
              <CiSearch className="implantsList-search-icon" />
            </button>
          </div>
        </div>
        <div className="implantsList-actions">
          <Link to={"./add"} className="implantsList-add-new-button">
            <span>+</span> Yenisini əlavə et
          </Link>
          <button className="implantsList-download-button">
            <FiDownload className="implantsList-download-icon" />
          </button>
        </div>
      </div>

      <div className="implantsList-table-section">
        <table className="implantsList-table">
          <thead>
            <tr>
              <th>
                <span className='firstElementOfTHS'><HiOutlineArrowsUpDown className="implantsList-sort-icon" />{totalImplantsCount === 0 ? '0' : `1-${totalImplantsCount}`}</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="implantsList-sort-icon" /> Markanın adı</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="implantsList-sort-icon" /> Ölçüləri</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="implantsList-sort-icon" /> Status</span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {implantsData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.brandName}</td>
                <td><Link to={`./sizes/${row.brandName}`}>Ölçüləri ({row.sizeCount})</Link></td>
                <td>
                  <span className={`implantsList-status-badge ${row.status === "ACTIVE" ? "active" : "passive"}`}>
                    {row.status === "ACTIVE" ? "Aktiv" : "Passiv"}
                  </span>
                </td>
                <td>
                  <div className="implantsList-action-icons">
                    <FiEdit3 className="implantsList-edit-button" onClick={() => handleEdit(row.id)} />
                    <GoTrash className="implantsList-delete-button" onClick={() => console.log('Delete', row.id)} />
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

export default ImplantsList; 