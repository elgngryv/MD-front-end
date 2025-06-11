import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/ColorsPage/colorspage.css"; // Updated import path
import { CiExport } from "react-icons/ci";
import { Link } from "react-router-dom"; // Added Link for potential navigation
import { useNavigate } from 'react-router-dom';

const mockColorsItems = [
  { id: 1, name: 'A1', status: 'Aktiv' },
  { id: 2, name: 'A2', status: 'Aktiv' },
  { id: 3, name: 'A3', status: 'Aktiv' },
  { id: 4, name: 'A3,5', status: 'Aktiv' },
  { id: 5, name: 'B1', status: 'Aktiv' },
  { id: 6, name: 'B1', status: 'Aktiv' },
  { id: 7, name: 'B1', status: 'Aktiv' },
  { id: 8, name: 'B1', status: 'Aktiv' },
  { id: 9, name: 'B1', status: 'Aktiv' },
  { id: 10, name: 'B1', status: 'Passiv' },
];

const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

const ColorsPage = () => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredColorsItems = mockColorsItems.filter(
    (item) =>
      (status === "" || item.status === status) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate()
  const handleEdit = (id) => {
    navigate(`${id}/edit`); // Uncomment if you have react-router-dom navigate setup
  };

  const handleDelete = (id) => {
    console.log(`Delete color item with ID: ${id}`);
  };

  return (
    <div className="checkListPageWrapper">
      <div className="checklistPageContainer">
        <div className="checklistPageTopPart">
          <div className="leftPartOfTop">
            <select
              className="checklistStatusSelect"
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
            <Link to={'add'} className="addNewChecklistItem">
              <FaPlus /> Yenisini əlavə et
            </Link>
            <Link to={'export'} className="exportDataOfChecklist" title="Export">
              <CiExport size={22} className="exportChecklistDataIcon" />
            </Link>
          </div>
        </div>

        <div className="checklistTableWrapper">
          <table className="checklistTable">
            <thead>
              <tr>
                <th><span>1-8</span></th>
                <th>
                  <span>
                    <HiArrowsUpDown className="tableArrowIcon" /> Rəngin adı
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
              {filteredColorsItems.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <span
                      className={`status ${
                        item.status === "Aktiv" ? "active" : "passive"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="icons flex gap-3 cursor-pointer">
                      <FiEdit3 className="edit" onClick={() => handleEdit(item.id)} />
                      <GoTrash className="delete" onClick={() => handleDelete(item.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ColorsPage;