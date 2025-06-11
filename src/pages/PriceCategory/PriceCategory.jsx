import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/PriceCategory/pricecategory.css"
import { CiExport } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const mockPriceCategories = [
  { id: 1, name: "Konservativ müayinə", status: "Aktiv" },
  { id: 2, name: "Endodontik müayinə", status: "Aktiv" },
  { id: 3, name: "Ortodontik müayinə", status: "Aktiv" },
  { id: 4, name: "Prostetik müayinə", status: "Aktiv" },
  { id: 5, name: "Cərrahi müayinə", status: "Aktiv" },
  { id: 6, name: "Periodontoloji müayinə", status: "Aktiv" },
  { id: 7, name: "Estetik müayinə", status: "Aktiv" },
  { id: 8, name: "Uşaq stomatologiyası", status: "Aktiv" },
];

const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

const PriceCategory = () => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredPriceCategories = mockPriceCategories.filter(
    (item) =>
      (status === "" || item.status === status) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`${id}/edit`);
  };

  const handleDelete = (id) => {
    console.log(`Delete price category with ID: ${id}`);
  };

  return (
    <div className="priceCategoryWrapper">
      <div className="priceCategoryContainer">
        <div className="priceCategoryTopPart">
          <div className="leftPartOfTop">
            <select
              className="priceCategoryStatusSelect"
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
            <Link to={'add'} className="addNewPriceCategory">
              <FaPlus /> Yeni kateqoriya əlavə et
            </Link>
            <Link className="exportDataOfPriceCategory" title="Export">
              <CiExport size={22} className="exportPriceCategoryDataIcon" />
            </Link>
          </div>
        </div>

        <div className="priceCategoryTableWrapper">
          <table className="priceCategoryTable">
            <thead>
              <tr>
                <th><span>1-8</span></th>
                <th>
                  <span>
                    <HiArrowsUpDown className="tableArrowIcon" /> Kateqoriya adı
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
              {filteredPriceCategories.map((item, idx) => (
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

export default PriceCategory;