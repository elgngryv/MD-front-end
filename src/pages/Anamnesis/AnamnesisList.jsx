import "../../assets/style/Anamnesis/anamnesislist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Static data for example
const staticAnamnesisData = [
  { id: "1", anamnesisName: "Ümumi Anamnez", anamnesisNo: "001", anamnesisTitle: "Ümumi xəstəlik tarixçəsi", status: "Aktiv" },
  { id: "2", anamnesisName: "Stomatoloji Anamnez", anamnesisNo: "002", anamnesisTitle: "Diş xəstəlikləri tarixçəsi", status: "Aktiv" },
  { id: "3", anamnesisName: "Allergik Anamnez", anamnesisNo: "003", anamnesisTitle: "Allergiya tarixçəsi", status: "Passiv" },
];

function AnamnesisList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anamnesisData] = useState(staticAnamnesisData);

  const filteredData = anamnesisData.filter((row) =>
    row.anamnesisName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `${row.anamnesisName} anamnezini silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    // Here you would typically make an API call to delete
    console.log("Deleting anamnesis:", row.id);
    alert(`${row.anamnesisName} uğurla silindi.`);
  };

  return (
    <div className="anamnesisPageWrapper">
      <div className="anamnesisCategoryQuickSearch">
        <div className="anamnesisCategoryLeftPart">
          <select>
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="searchForNameAnamnesis">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="anamnesisCategoryRightPart">
          <Link to={"./add"}>
            <p className="addNewAnamnesisCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportAnamnesisCategoriesData" />
          </Link>
        </div>
      </div>

      <div className="anamnesisPageTableWrapper">
        <table className="anamnesisPageTable">
          <thead>
            <tr>
              <th > {staticAnamnesisData.length===0?'0':`1-${staticAnamnesisData.length}`}</th>
              <th >
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Anamnezin
                  adı
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
                <td className="anamnesisNameCol">{row.anamnesisName}</td>
                <td>
                  <span
                    className={`statusBadge ${
                      row.status === "Aktiv" ? "active" : "passive"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="anamnesisActionIcons">
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

export default AnamnesisList;