import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Icons
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

// Style
import "../../assets/style/Metals/metals.css";

// Store
import useMetalStore from "../../../stores/metalsStore";

function Metal() {
  const navigate = useNavigate();
  const { metals, fetchMetals, deleteMetal, loading, error } = useMetalStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchMetals();
  }, [fetchMetals]);

  // Backend status -> UI label mapping
  const statusLabels = {
    ACTIVE: "Aktiv",
    PASSIVE: "Passiv",
  };

  // Filtrlənmiş data
  const filteredData = metals.filter((metal) => {
    const name = metal.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const nameMatches = name.includes(search);

    // statusFilter dəyərlərini backend statusları ilə eyniləşdiririk
    const statusMatches = statusFilter ? metal.status === statusFilter : true;

    return nameMatches && statusMatches;
  });

  const handleEdit = (metal) => {
    navigate(`/edit-metal/${metal.id}`);
  };

  const handleDelete = async (metal) => {
    if (window.confirm(`${metal.name} silinsin?`)) {
      await deleteMetal(metal.id);
    }
  };

  return (
    <div className="metalContainer">
      <div className="metalContainerTopPart">
        <div className="leftPart">
          {/* Backend status dəyərlərini seçirik */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="metalQuickSearch">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchMetalIcon" />
          </div>
        </div>
        <div className="rightPart">
          <Link className="addMetal" to={"/add-metal"}>
            <IoMdAdd className="addMetalIcon" /> Yenisini əlavə et
          </Link>
          <button
            className="exportmetal"
            onClick={() => alert("Export funksiyası əlavə olunacaq")}
          >
            <FiDownload className="exportmetalIcon" />
          </button>
        </div>
      </div>

      {loading && <p>Yüklənir...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Xəta baş verdi: {error.message || error.toString()}
        </p>
      )}

      <div className="metalTableWrapper">
        <table className="metalTable">
          <thead>
            <tr>
              <th>{filteredData.length !== 0 ? `1-${filteredData.length}` : 0}</th>
              <th className="MetalName">
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Metalın adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Status
                </span>
              </th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Məlumat tapılmadı
                </td>
              </tr>
            ) : (
              filteredData.map((metal, index) => (
                <tr key={metal.id}>
                  <td>{index + 1}</td>
                  <td className="MetalName">{metal.name}</td>
                  <td>
                    <span
                      className={`statusBadge ${
                        metal.status === "ACTIVE" ? "active" : "passive"
                      }`}
                    >
                      {statusLabels[metal.status] || metal.status}
                    </span>
                  </td>
                  <td>
                    <div className="actionIcons">
                      <FiEdit3
                        className="editBtn"
                        onClick={() => handleEdit(metal)}
                      />
                      <GoTrash
                        className="deleteBtn"
                        onClick={() => handleDelete(metal)}
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
}

export default Metal;
