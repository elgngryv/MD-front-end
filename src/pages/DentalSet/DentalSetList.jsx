import { Link, useNavigate } from "react-router-dom";
import "../../assets/style/DentalSet/dentalsetlist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useState } from "react";

// Static data for example
const staticDentalSetData = [
  { id: 1, setName: "Qarnitur 1", status: "active" },
  { id: 2, setName: "Qarnitur 2", status: "active" },
  { id: 3, setName: "Qarnitur 3", status: "passive" },
];

function DentalSetList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dentalSetData, setDentalSetData] = useState(staticDentalSetData);

  const filteredData = dentalSetData.filter((row) =>
    row.setName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `${row.setName} qarniturunu silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    // Here you would typically make an API call to delete
    console.log("Deleting dental set:", row.id);
    alert(`${row.setName} uğurla silindi.`);
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "passive" : "active";
    const confirmMessage = newStatus === "active" 
      ? "Qarnituru aktiv etmək istədiyinizə əminsiniz?" 
      : "Qarnituru passiv etmək istədiyinizə əminsiniz?";

    if (window.confirm(confirmMessage)) {
      try {
        // Here you would typically make an API call
        const updatedData = dentalSetData.map((dentalSet) =>
          dentalSet.id === id ? { ...dentalSet, status: newStatus } : dentalSet
        );
        setDentalSetData(updatedData);
        alert(`Qarnitur uğurla ${newStatus === "active" ? "aktiv" : "passiv"} edildi!`);
      } catch (error) {
        alert("Status dəyişdirmə zamanı xəta baş verdi!");
      }
    }
  };

  return (
    <div className="dentalSetPageWrapper">
      <div className="dentalSetCategoryQuickSearch">
        <div className="dentalSetCategoryLeftPart">
          <select>
            <option value="">Status</option>
            <option value="active">Aktiv</option>
            <option value="passive">Passiv</option>
          </select>
          <div className="searchForNameDentalSet">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="dentalSetCategoryRightPart">
          <Link to={"./add"}>
            <p className="addNewDentalSetCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportDentalSetCategoriesData" />
          </Link>
        </div>
      </div>

      <div className="dentalSetPageTableWrapper">
        <table className="dentalSetPageTable">
          <thead>
            <tr>
              <th>{staticDentalSetData.length === 0 ? '0' : `1-${staticDentalSetData.length}`}</th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Qarniturun adı
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
                <td className="dentalSetNameCol">{row.setName}</td>
                <td>
                  <span
                    className={`statusBadge ${
                      row.status === "active" ? "active" : "passive"
                    }`}
                    onClick={() => handleStatusChange(row.id, row.status)}
                    style={{ cursor: "pointer" }}
                  >
                    {row.status === "active" ? "Aktiv" : "Passiv"}
                  </span>
                </td>
                <td>
                  <div className="dentalSetActionIcons">
                    <FiEdit3
                      className="editBtn"
                      onClick={() => handleEdit(row)}
                    />
                    <GoTrash
                      className="deleteBtn"
                      onClick={() => handleDelete(row)}
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
}

export default DentalSetList;