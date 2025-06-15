import "../../assets/style/ReceptsPage/medicineslist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

// Static data for example
const staticMedicinesData = [
  { id: "1", medicineName: "Aspirin", dosage: "500mg", frequency: "Gündə 2 dəfə", status: "ACTIVE" },
  { id: "2", medicineName: "Parol", dosage: "650mg", frequency: "Gündə 3 dəfə", status: "ACTIVE" },
  { id: "3", medicineName: "Vitamin C", dosage: "1000mg", frequency: "Gündə 1 dəfə", status: "PASSIVE" },
];

function MedicinesList() {
  const navigate = useNavigate();
  const { receptId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [medicinesData] = useState(staticMedicinesData);

  const filteredData = medicinesData.filter((row) =>
    row.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `${row.medicineName} dərmanını silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    // Here you would typically make an API call to delete
    console.log("Deleting medicine:", row.id);
    alert(`${row.medicineName} uğurla silindi.`);
  };

  return (
    <div className="medicinesPageWrapper">
      <div className="medicinesCategoryQuickSearch">
        <div className="medicinesCategoryLeftPart">
          <select>
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="searchForNameMedicine">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="medicinesCategoryRightPart">
          <Link to={`add`}>
            <p className="addNewMedicineCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportMedicinesCategoriesData" />
          </Link>
        </div>
      </div>

      <div className="medicinesPageTableWrapper">
        <table className="medicinesPageTable">
          <thead>
            <tr>
              <th>{staticMedicinesData.length === 0 ? '0' : `1-${staticMedicinesData.length}`}</th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Dərmanın adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Doza
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Tezlik
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
            {filteredData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td className="medicineNameCol">{row.medicineName}</td>
                <td>{row.dosage}</td>
                <td>{row.frequency}</td>
                <td>
                  <span className={`statusBadge ${row.status === "ACTIVE" ? "active" : "passive"}`}>
                    {row.status === "ACTIVE" ? "Aktiv" : "Passiv"}
                  </span>
                </td>
                <td>
                  <div className="medicinesActionIcons">
                    <FiEdit3 className="editBtn" onClick={() => handleEdit(row)} />
                    <GoTrash className="deleteBtn" onClick={() => handleDelete(row)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicinesList;