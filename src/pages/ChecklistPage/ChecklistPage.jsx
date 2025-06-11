import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/ChecklistPage/checklistpage.css"
import { CiExport } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const mockChecklistItems = [
  { id: 1, name: "Apikal iltihab 1 kanal", status: "Aktiv" },
  { id: 2, name: "Apikal iltihab 2 kanal", status: "Aktiv" },
  { id: 3, name: "Apikal iltihab 3 kanal", status: "Aktiv" },
  { id: 4, name: "Boş kanal sağ", status: "Aktiv" },
  { id: 5, name: "Boş kanal sol", status: "Aktiv" },
  { id: 6, name: "Çürük bukkal", status: "Aktiv" },
  { id: 7, name: "Çürük distal", status: "Aktiv" },
  { id: 8, name: "Çürük mezial", status: "Aktiv" },
  { id: 9, name: "Çürük MOD", status: "Aktiv" },
  { id: 10, name: "Çürük OD", status: "Passiv" },
  { id: 10, name: "Çürük OD", status: "Passiv" },
  { id: 10, name: "Çürük OD", status: "Passiv" },
  { id: 10, name: "Çürük OD", status: "Passiv" },
  { id: 10, name: "Çürük OD", status: "Passiv" },
  { id: 10, name: "Çürük OD", status: "Passiv" },
];



const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

const ChecklistPage = () => {

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredChecklistItems = mockChecklistItems.filter(
    (item) =>
      (status === "" || item.status === status) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );
  const navigate= useNavigate()

  const handleEdit = (id) => {
    navigate(`${id}/edit`);
  };

  const handleDelete = (id) => {
    console.log(`Delete checklist item with ID: ${id}`);
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
            <Link className="exportDataOfChecklist" title="Export">
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
                    <HiArrowsUpDown className="tableArrowIcon" /> Növün adı
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
                {filteredChecklistItems.map((item, idx) => (
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

export default ChecklistPage;
