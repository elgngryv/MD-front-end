import "../../assets/style/Implants/sizeslist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useImplantSizeStore from "../../../stores/ImplantSizeStore";

function SizesList() {
  const navigate = useNavigate();
  const {
    implantSizes,
    loading,
    error,
    fetchImplantSizes,
    removeImplantSize,
    searchImplantSizes,
    searchByStatus,
  } = useImplantSizeStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchImplantSizes();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (statusFilter) {
        searchByStatus({ status: statusFilter });
      } else if (searchTerm) {
        searchImplantSizes({ diameter: searchTerm });
      } else {
        fetchImplantSizes();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, statusFilter]);

  const handleEdit = (row) => {
    navigate(`edit/${row.implantSizeId}`);
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `${row.diameter} ölçüsünü silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    try {
      await removeImplantSize(row.implantSizeId);
      alert(`${row.diameter} uğurla silindi.`);
    } catch (err) {
      alert("Xəta baş verdi: " + err.message);
    }
  };

  return (
    <div className="sizesPageWrapper">
      <div className="sizesCategoryQuickSearch">
        <div className="sizesCategoryLeftPart">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="searchForNameSizes">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="sizesCategoryRightPart">
          <Link to={"./add"}>
            <p className="addNewSizesCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportSizesCategoriesData" />
          </Link>
        </div>
      </div>

      <div className="sizesPageTableWrapper">
        {loading ? (
          <p>Yüklənir...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : implantSizes.length === 0 ? (
          <p>Heç bir ölçü tapılmadı.</p>
        ) : (
          <table className="sizesPageTable">
            <thead>
              <tr>
                <th>{`1-${implantSizes.length}`}</th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Diametir
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Uzunluq
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
              {implantSizes.map((row, index) => (
                <tr key={row.implantSizeId}>
                  <td>{index + 1}</td>
                  <td className="sizesNameCol">{row.diameter}</td>
                  <td>{row.length}</td>
                  <td>
                    <span
                      className={`statusBadge ${
                        row.status === "Aktiv" ? "active" : "passive"
                      }`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="sizesActionIcons">
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
        )}
      </div>
    </div>
  );
}

export default SizesList;
