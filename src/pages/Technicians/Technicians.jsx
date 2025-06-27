import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../assets/style/Technicians/technicians.css";

import { CiSearch, CiExport, CiCircleInfo } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import "./tech.css";

import useTechnicianStore from "../../../stores/technicianStore";

function Technicians() {
  const {
    fetchTechnicians,
    removeTechnician,
    exportToExcel,
    searchTechs,
    updateTechStatus,
  } = useTechnicianStore();

  const [technicians, setTechnicians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    loadTechnicians();
  }, []);

  const loadTechnicians = async () => {
    try {
      const data = await fetchTechnicians();
      let list = [];

      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.technicians)) {
        list = data.technicians;
      }

      // Status sahəsi yalnız ACTIVE olduqda enabled true olsun
      const mappedList = list.map((tech) => ({
        ...tech,
        enabled: tech.status === "ACTIVE",
      }));

      setTechnicians(mappedList);

      // Debug üçün konsola statusları çap et
      console.log("Technicians loaded:", mappedList);
    } catch (err) {
      console.error("Texnikləri yükləmək mümkün olmadı:", err);
      setTechnicians([]);
    }
  };

  const getStatus = (tech) => (tech.enabled ? "Aktiv" : "Passiv");

  const toggleStatus = async (tech) => {
    const newStatus = tech.enabled ? "PASSIVE" : "ACTIVE";
    try {
      await updateTechStatus(tech.id, newStatus);
      await loadTechnicians();
    } catch (error) {
      alert("Status dəyişdirilə bilmədi.");
      console.error(error);
    }
  };

  const handleDelete = async (tech) => {
    const confirmDelete = window.confirm(
      `İşçini silmək istədiyinizə əminsiniz? (${tech.username})`
    );
    if (!confirmDelete) return;

    try {
      await removeTechnician(tech.id);
      alert("İşçi uğurla silindi!");
      loadTechnicians();
    } catch (err) {
      alert("Silinmə zamanı xəta baş verdi.");
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    try {
      const filtered = await searchTechs(term);
      let filteredList = [];

      if (Array.isArray(filtered)) {
        filteredList = filtered;
      } else if (Array.isArray(filtered?.technicians)) {
        filteredList = filtered.technicians;
      }

      // Burada da enabled boolean təyin et
      const mappedFiltered = filteredList.map((tech) => ({
        ...tech,
        enabled: tech.status === "ACTIVE",
      }));

      setTechnicians(mappedFiltered);
    } catch (err) {
      console.error("Axtarış zamanı xəta:", err);
    }
  };

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => navigation(`${row.id}`),
      className: "info",
    },
    {
      icon: FiEdit3,
      action: (row) => navigation(`edit/${row.id}`),
      className: "edit",
    },
    {
      icon: GoTrash,
      action: (row) => handleDelete(row),
      className: "delete",
    },
  ];

  return (
    <div className="techniciansPageContainer">
      <div className="techiniciansPageTopPart">
        <div className="leftPartOfTop">
          <select name="" id="">
            <option value="">Seçim edin</option>
            <option value="v2">Opt 2</option>
            <option value="v3">Opt 3</option>
            <option value="v4">Opt 4</option>
          </select>
          <div className="searchBarContainer">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={handleSearch}
            />
            <CiSearch className="searchIconBTN" />
          </div>
        </div>
        <div className="rightPartOfTop">
          <Link className="addNewTechnicianNow" to={"add"}>
            <span>+</span> Yenisini əlavə et
          </Link>
          <button
            className="exportDataOfTechs"
            onClick={() => exportToExcel(technicians)}
            title="Export to Excel">
            <CiExport className="exportDataOfTechsIcon" />
          </button>
        </div>
      </div>

      <div className="techniciansTableWrapper">
        <table className="techniciansTable">
          <thead>
            <tr>
              <th>İstifadəçi adı</th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Adı
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Soyadı
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Ata adı
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> İcazələr
              </th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Mobil nömrə
              </th>
              <th>Qiymətlər</th>
              <th>
                <HiArrowsUpDown className="tableArrowIcon" /> Status
              </th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(technicians) && technicians.length > 0 ? (
              technicians.map((tech) => (
                <tr key={tech.id}>
                  <td className="usernameOfTech">
                    <img
                      src={
                        tech.img
                          ? tech.img
                          : `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                              tech.username
                            )}`
                      }
                      className="imageOfTech"
                      alt={tech.username}
                    />
                    {tech.username}
                  </td>
                  <td>{tech.name}</td>
                  <td>{tech.surname}</td>
                  <td>{tech.patronymic}</td>
                  <td>{tech.permissions?.join(", ")}</td>
                  <td>{tech.phone}</td>
                  <td>
                    <Link className="priceListLinkTech" to={`prices/${tech.id}`}>
                      Qiymətlər
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`status ${
                        tech.enabled ? "active" : "passive"
                      }`}
                      onClick={() => toggleStatus(tech)}
                      style={{ cursor: "pointer" }}
                      title="Statusu dəyişmək üçün klikləyin"
                    >
                      {getStatus(tech)}
                    </span>
                  </td>
                  <td>
                    <div className="icons flex gap-3 cursor-pointer">
                      {icons.map(
                        ({ icon: IconComp, className, action }, idx) => (
                          <IconComp
                            key={idx}
                            className={className}
                            onClick={() => action(tech)}
                          />
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  Heç bir texnik tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Technicians;
