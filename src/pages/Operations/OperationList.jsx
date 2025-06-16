import React, { useState } from 'react';
import '../../assets/style/Operations/operationcategorylist.css';
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const OperationList = () => {
  const navigate = useNavigate();

  const [operationsData, setOperationsData] = useState([
    {
      id: 1,
      permissionName: "Şift titan(Antijor)",
      code: 49,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 2,
      permissionName: "Müvəqqəti plomb işıq",
      code: 50,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 3,
      permissionName: "Kanalın açılması 4",
      code: 56,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 4,
      permissionName: "Kanalın açılması 3",
      code: 23,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 5,
      permissionName: "Kanalın açılması 2",
      code: 34,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 6,
      permissionName: "Kanalın açılması 1",
      code: 45,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 7,
      permissionName: "1Kanal Lateral",
      code: 21,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 8,
      permissionName: "1Kanal endo",
      code: 22,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 9,
      permissionName: "1Perio lateral",
      code: 56,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Aktiv",
    },
    {
      id: 10,
      permissionName: "1Perio endo",
      code: 56,
      standart: 20.0,
      vip1: 0.0,
      vip2: 0.0,
      vip3: 0.0,
      productUsage: 0,
      status: "Passiv",
    },
  ]);

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
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
              <th>
                <span className='operationsList-table-header-content firstElementOfTHS'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />1-8</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />İcazənin adı</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />Kod</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />Standart</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />VIP1</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />VIP2</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />VIP3</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />Məhsul istifadəsi</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'><HiOutlineArrowsUpDown className="operationsList-sort-icon" />Status</span>
              </th>
              <th>
                <span className='operationsList-table-header-content'>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {operationsData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.permissionName}</td>
                <td>{row.code}</td>
                <td>{row.standart.toFixed(2)}</td>
                <td>{row.vip1.toFixed(2)}</td>
                <td>{row.vip2.toFixed(2)}</td>
                <td>{row.vip3.toFixed(2)}</td>
                <td><Link to={`./operations-details/${row.id}`}>Məhsul istifadəsi ({row.productUsage})</Link></td>
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

export default OperationList;