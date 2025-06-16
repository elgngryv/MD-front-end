import React, { useState } from 'react';
import '../../assets/style/Operations/operationcategorylist.css';
import { CiSearch } from "react-icons/ci"; // Axtarış iconu
import { FiDownload, FiEdit3 } from "react-icons/fi"; // Yükləmə və redaktə iconları
import { GoTrash } from "react-icons/go"; // Silmə iconu
import { HiOutlineArrowsUpDown } from "react-icons/hi2"; // Sıralama iconu
import { Link, useNavigate } from "react-router-dom"; // Link üçün

const OperationCategoryList = () => {
  const navigate = useNavigate();
  // Nümunə məlumatları (bu real API çağırışı ilə dəyişdirilə bilər)
  const [operationsData, setOperationsData] = useState([
    { id: 1, permissionName: "salam", operationCount: 0, status: "Aktiv" },
    { id: 2, permissionName: "Endodontiya", operationCount: 41, status: "Aktiv" },
    { id: 3, permissionName: "İmplantologiya", operationCount: 39, status: "Aktiv" },
    { id: 4, permissionName: "Ortopediya", operationCount: 29, status: "Aktiv" },
    { id: 5, permissionName: "Gigiyena", operationCount: 10, status: "Aktiv" },
    { id: 6, permissionName: "Terapiya", operationCount: 11, status: "Aktiv" },
    { id: 7, permissionName: "Uşaq stomatologiyası", operationCount: 28, status: "Aktiv" },
    { id: 8, permissionName: "Paradontologiya", operationCount: 0, status: "Aktiv" },
    { id: 9, permissionName: "Ortodontiya", operationCount: 0, status: "Aktiv" },
  ]);

  const totalOperationsCount = operationsData.length;

  const handleEdit = (id) => {
    navigate(`/operations/edit/${id}`);
  };

  return (
    <div className="operationsList-container">
      <div className="operationsList-controls-section">
        <div className="operationsList-filters">
          <select className="operationsList-status-dropdown">
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="operationsList-search-box">
            <input type="text" placeholder="Axtarış" className="operationsList-search-input" />
            <button className="operationsList-search-button">
              <CiSearch className="operationsList-search-icon" />
            </button>
          </div>
        </div>
        <div className="operationsList-actions">
          <Link to={"./add"} className="operationsList-add-new-button">
            <span>+</span> Yenisini əlavə et
          </Link>
          <button className="operationsList-download-button">
            <FiDownload className="operationsList-download-icon" />
          </button>
        </div>
      </div>

      <div className="operationsList-table-section">
        <table className="operationsList-table">
          <thead>
            <tr>
              <th >
                <span className='firstElementOfTHS'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />{totalOperationsCount === 0 ? '0' : `1-${totalOperationsCount}`}</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="operationsList-sort-icon" /> İcazənin adı</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="operationsList-sort-icon" /> Əməliyyatların siyahısı</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown className="operationsList-sort-icon" /> Status</span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {operationsData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.permissionName}</td>
                <td><Link to={`./${row.permissionName}`}>Əməliyyatların siyahısı ({row.operationCount})</Link></td>
                <td>
                  <span className={`operationsList-status-badge ${row.status === "Aktiv" ? "active" : "passive"}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="operationsList-action-icons">
                    <FiEdit3 className="operationsList-edit-button" onClick={() => handleEdit(row.id)} />
                    <GoTrash className="operationsList-delete-button" onClick={() => console.log('Delete', row.id)} />
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

export default OperationCategoryList; 