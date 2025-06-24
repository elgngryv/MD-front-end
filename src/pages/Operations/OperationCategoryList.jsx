import React, { useEffect } from "react";
import "../../assets/style/Operations/operationcategorylist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useOperationTypesStore from "../../../stores/operationsTypeStore";

const OperationCategoryList = () => {
  const navigate = useNavigate();

  // Store-dan state və funksiyaları çəkmək
  const { operationTypes, loading, error, fetchAll, remove } =
    useOperationTypesStore();

  // Komponent mount olanda data yüklə
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleEdit = (id) => {
    navigate(`/operations/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Əməliyyat kateqoriyasını silmək istədiyinizə əminsiniz?")
    ) {
      try {
        await remove(id);
      } catch (err) {
        alert("Silərkən xəta baş verdi!");
      }
    }
  };

  // Status-un istifadəçi üçün oxunaqlı formata çevrilməsi
  const formatStatus = (status) => {
    if (!status) return "";
    if (status.toUpperCase() === "ACTIVE") return "Aktiv";
    if (status.toUpperCase() === "PASSIVE") return "Passiv";
    return status;
  };

  return (
    <div className="operationsList-container">
      <div className="operationsList-controls-section">
        <div className="operationsList-filters">
          <select className="operationsList-status-dropdown">
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="operationsList-search-box">
            <input
              type="text"
              placeholder="Axtarış"
              className="operationsList-search-input"
              // Axtarış funksionallığını əlavə etmək istəyirsənsə burada əlavə et
            />
            <button className="operationsList-search-button">
              <CiSearch className="operationsList-search-icon" />
            </button>
          </div>
        </div>
        <div className="operationsList-actions">
          <Link to={"./add"} className="operationsList-add-new-button">
            <span>+</span> Yenisini əlavə et
          </Link>
          <button className="operationsList-download-button">
            <FiDownload className="operationsList-download-icon" />
          </button>
        </div>
      </div>

      <div className="operationsList-table-section">
        {loading && <p>Yüklənir...</p>}
        {error && (
          <p style={{ color: "red" }}>
            Xəta baş verdi: {error.message || error.toString()}
          </p>
        )}
        {!loading && !error && operationTypes.length === 0 && (
          <p>Məlumat tapılmadı.</p>
        )}

        {!loading && !error && operationTypes.length > 0 && (
          <table className="operationsList-table">
            <thead>
              <tr>
                <th>
                  <span className="firstElementOfTHS">
                    <HiOutlineArrowsUpDown className="operationsList-sort-icon" />
                    {`1-${operationTypes.length}`}
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="operationsList-sort-icon" />{" "}
                    İcazənin adı
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="operationsList-sort-icon" />{" "}
                    Əməliyyatların sayı
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="operationsList-sort-icon" />{" "}
                    Status
                  </span>
                </th>
                <th>
                  <span>Düzəliş</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {operationTypes.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.categoryName}</td>
                  <td>
                    <Link to={`/operations/${row.id}`}>
                      Əməliyyatların sayı ({row.opTypeItemCount || 0})
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`operationsList-status-badge ${
                        row.status === "ACTIVE" ? "active" : "passive"
                      }`}>
                      {formatStatus(row.status)}
                    </span>
                  </td>
                  <td>
                    <div className="operationsList-action-icons">
                      <FiEdit3
                        className="operationsList-edit-button"
                        onClick={() => handleEdit(row.id)}
                      />
                      <GoTrash
                        className="operationsList-delete-button"
                        onClick={() => handleDelete(row.id)}
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
};

export default OperationCategoryList;
