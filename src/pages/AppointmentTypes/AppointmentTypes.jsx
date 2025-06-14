import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/AppointmentTypes/appointmenttypes.css";
import { CiExport } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAppointmentTypeStore from "../../../stores/appointment-type-store";

const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

const AppointmentTypes = () => {
  const {
    appointmentTypes = [],
    loading,
    error,
    fetchAppointmentTypes,
    fetchAppointmentTypeById,
    removeAppointmentType,
    searchAppointmentTypes,
  } = useAppointmentTypeStore();
  
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentTypes();
  }, [fetchAppointmentTypes]);

  const filteredAppointmentTypes = (appointmentTypes || []).filter(
    (type) =>
      (status === "" || (type?.status || "") === status) &&
      (type?.appointmentTypeName || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu randevu tipini silmək istədiyinizə əminsinizmi?")) {
      await removeAppointmentType(id);
    }
  };

  const handleSearch = async () => {
    if (search.trim()) {
      await searchAppointmentTypes({ search });
    } else {
      await fetchAppointmentTypes();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="appointmentTypesPageContainer">
      <div className="appointmentTypesPageTopPart">
        <div className="leftPartOfTop">
          <select
            className="appointmentTypesStatusSelect"
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
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <CiSearch className="searchIconBTN" onClick={handleSearch} />
          </div>
        </div>
        <div className="rightPartOfTop">
          <Link to={"add"} className="addNewAppointmentType">
            <FaPlus /> Yenisini əlavə et
          </Link>
          <Link className="exportDataOfAppointmentTypes" title="Export">
            <CiExport size={22} className="exportAppointmentTypeDataIcon" />
          </Link>
        </div>
      </div>

      <div className="appointmentTypesTableWrapper">
        <table className="appointmentTypesTable">
          <thead>
            <tr>
              <th>
                <span>1-{filteredAppointmentTypes.length}</span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Randevu tipinin
                  adı
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Müddət
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
            {filteredAppointmentTypes.map((type, idx) => (
              <tr key={type?.id || idx}>
                <td>{idx + 1}</td>
                <td>{type?.appointmentTypeName || ""}</td>
                <td>{type?.time ? type.time.slice(0, 5) : ""}</td> {/* Saat:dəqiqə göstərilməsi */}
                <td>
                  <span
                    className={`status ${
                      (type?.status || "") === "Aktiv" ? "active" : "passive"
                    }`}
                  >
                    {type?.status || ""}
                  </span>
                </td>
                <td>
                  <div className="icons flex gap-3 cursor-pointer">
                    <FiEdit3
                      className="edit"
                      onClick={() => handleEdit(type?.id)}
                    />
                    <GoTrash
                      className="delete"
                      onClick={() => handleDelete(type?.id)}
                    />
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

export default AppointmentTypes;
