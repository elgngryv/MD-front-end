import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/CabinetsPage/cabinetspage.css"
import { CiExport } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const mockCabinetItems = [
  { id: 1, name: "Otaq 1", status: "Aktiv" },
  { id: 2, name: "Otaq 2", status: "Aktiv" },
  { id: 3, name: "Otaq 3", status: "Aktiv" },
  { id: 4, name: "Otaq 4", status: "Passiv" },
];



const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

const CabinetsPage = () => {

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredCabinetItems = mockCabinetItems.filter(
    (item) =>
      (status === "" || item.status === status) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );
  const navigate= useNavigate()

  const handleEdit = (id) => {
    navigate(`${id}/edit`);
  };

  const handleDelete = (id) => {
    console.log(`Delete cabinet item with ID: ${id}`);
  };

  return (
    <div className="cabinetsPageWrapper">
        <div className="cabinetsPageContainer">
        <div className="cabinetsPageTopPart">
            <div className="leftPartOfTop">
            <select
                className="cabinetsStatusSelect"
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
            <Link to={'add'} className="addNewCabinetItem">
                <FaPlus /> Yenisini əlavə et
            </Link>
            <Link className="exportDataOfCabinets" title="Export">
                <CiExport size={22} className="exportCabinetDataIcon" />
            </Link>
            </div>
        </div>

        <div className="cabinetsTableWrapper">
            <table className="cabinetsTable">
            <thead>
                <tr>
                <th><span>1-8</span></th>
                <th>
                    <span>
                    <HiArrowsUpDown className="tableArrowIcon" /> Kabinetin adı
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
                {filteredCabinetItems.map((item, idx) => (
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

export default CabinetsPage;
