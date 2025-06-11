import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/AppointmentTypes/appointmenttypes.css"
import { CiExport } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const mockAppointmentTypes = [
  {
    id: 1,
    name: "Aparat kontrol",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 2,
    name: "Breketin təkrar yapışdırılması",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 3,
    name: "Damaq müalicəsi",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 4,
    name: "Dişin çəkilməsi",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 5,
    name: "İmplant əməliyyatı",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 6,
    name: "İşlərin təhvili",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 7,
    name: "Kanal müalicəsi",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 8,
    name: "Kanal yuma",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 9,
    name: "Korreksiya",
    duration: "00:15",
    status: "Aktiv",
  },
  {
    id: 10,
    name: "Körpü primerkası",
    duration: "00:15",
    status: "Passiv",
  },
  {
    id: 11,
    name: "Müalicə",
    duration: "00:15",
    status: "Passiv",
  },
  {
    id: 12,
    name: "Müayinə",
    duration: "00:15",
    status: "Passiv",
  },

];

const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

const AppointmentTypes = () => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredAppointmentTypes = mockAppointmentTypes.filter(
    (type) =>
      (status === "" || type.status === status) &&
      type.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    // Nəzərə alın: Buraya react-router-dom ilə yönləndirmə əlavə edə bilərsiniz,
    navigate(`${id}/edit`);
  };

  const handleDelete = (id) => {
    console.log(`Delete appointment type with ID: ${id}`);
  };
const navigate = useNavigate()



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
            />
            <CiSearch className="searchIconBTN" />
          </div>
        </div>
        <div className="rightPartOfTop">
          <Link to={'add'} className="addNewAppointmentType">
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
              <th><span>1-8</span></th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Randevu tipinin adı
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
              <tr key={type.id}>
                <td>{idx + 1}</td>
                <td>{type.name}</td>
                <td>{type.duration}</td>
                <td>
                  <span
                    className={`status ${
                      type.status === "Aktiv" ? "active" : "passive"
                    }`}
                  >
                    {type.status}
                  </span>
                </td>
                <td>
                  <div className="icons flex gap-3 cursor-pointer">
                    <FiEdit3 className="edit" onClick={() => handleEdit(type.id)} />
                    <GoTrash className="delete" onClick={() => handleDelete(type.id)} />
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
