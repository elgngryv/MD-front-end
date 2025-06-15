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
  const [receptsData, setReceptsData] = useState([
    {
      id: 1,
      receptName: "Recept 1",
      medicinesCount: "1",
      status: "ACTIVE",
    },
    {
      id: 2,
      receptName: "Recept 1",
      medicinesCount: "1",
      status: "ACTIVE",
    },
    {
      id: 3,
      receptName: "Recept 1",
      medicinesCount: "1",
      status: "ACTIVE",
    },
    
  ]);

  const totalReceptsCount = receptsData.length;

  const handleEdit = (id) => {
    navigate(`/recepts/edit/${id}`);
  };

  const handleDelete = (id) => {
    const recept = receptsData.find(r => r.id === id);
    const confirmDelete = window.confirm(
      `${recept.receptName} reseptini silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    // Here you would typically call your delete API
    alert(`${recept.receptName} uğurla silindi.`);
  };

  return (
    <div className="receptsList-container">
      <div className="receptsList-controls-section">
        <div className="receptsList-filters">
          <select className="receptsList-status-dropdown">
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="receptsList-search-box">
            <input
              type="text"
              placeholder="Axtarış"
              className="receptsList-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="receptsList-search-button">
              <CiSearch className="receptsList-search-icon" />
            </button>
          </div>
        </div>
        <div className="receptsList-actions">
          <Link to={"./add"} className="receptsList-add-new-button">
            <span>+</span> Yenisini əlavə et
          </Link>
          <button className="receptsList-download-button">
            <FiDownload className="receptsList-download-icon" />
          </button>
        </div>
      </div>

      <div className="receptsList-table-section">
        <table className="receptsList-table">
          <thead>
            <tr>
              <th>
                <span className='firstElementOfTHS'>
                  <HiOutlineArrowsUpDown className="receptsList-sort-icon" />
                  {totalReceptsCount === 0 ? '0' : `1-${totalReceptsCount}`}
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="receptsList-sort-icon" /> Reseptin adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="receptsList-sort-icon" /> Dərmanları
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="receptsList-sort-icon" /> Status
                </span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {receptsData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.receptName}</td>
                <td><Link to={`/recepts/${row.id}`}>Dərmanlar({row.medicinesCount})</Link></td>
                <td>
                  <span className={`receptsList-status-badge ${row.status === "ACTIVE" ? "active" : "passive"}`}>
                    {row.status === "ACTIVE" ? "Aktiv" : "Passiv"}
                  </span>
                </td>
                <td>
                  <div className="receptsList-action-icons">
                    <FiEdit3 className="receptsList-edit-button" onClick={() => handleEdit(row.id)} />
                    <GoTrash className="receptsList-delete-button" onClick={() => handleDelete(row.id)} />
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