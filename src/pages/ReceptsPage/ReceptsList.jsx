import "../../assets/style/ReceptsPage/receptslist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ReceptsList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Static data for demonstration
  const staticReceptsData = [
    {
      id: 1,
      receptName: "Recept 1",
      medicines: "Aspirin, Parol",
      status: "Aktiv",
    },
    {
      id: 2,
      receptName: "Recept 2",
      medicines: "Vitamin C, D",
      status: "Passiv",
    },
    {
      id: 3,
      receptName: "Recept 3",
      medicines: "Calcium, Magnesium",
      status: "Aktiv",
    },
  ];

  const filteredData = staticReceptsData.filter((row) =>
    row.receptName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/recepts/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `${row.receptName} reseptini silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    // Here you would typically call your delete API
    alert(`${row.receptName} uğurla silindi.`);
  };

  return (
    <div className="receptPageWrapper">
      <div className="receptCategoryQuickSearch">
        <div className="receptCategoryLeftPart">
          <select>
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="searchForNameRecept">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="receptCategoryRightPart">
          <Link to={"./add-new"}>
            <p className="addNewReceptCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportReceptCategoriesData" />
          </Link>
        </div>
      </div>

      <div className="receptPageTableWrapper">
        <table className="receptPageTable">
          <thead>
            <tr>
              <th>
                {staticReceptsData.length === 0
                  ? "0"
                  : `1-${staticReceptsData.length}`}
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Reseptin
                  adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Dərmanları
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
                <td className="receptNameCol">{row.receptName}</td>
                <td>{row.medicines}</td>
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
                  <div className="receptActionIcons">
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

export default ReceptsList;