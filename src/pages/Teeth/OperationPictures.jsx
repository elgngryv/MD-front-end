import React, { useEffect, useMemo } from "react";
import { FiEdit3, FiDownload } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { PiWarningCircleLight } from "react-icons/pi";
import { HiArrowsUpDown } from "react-icons/hi2";
import "../../assets/style/Teeth/operationpictures.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTeethStore from "../../../stores/teethStore";

const OperationPictures = () => {
  const navigate = useNavigate();
  const { id: teethId } = useParams();

  const { teeth, fetchTeeth, loading, error } = useTeethStore();

  useEffect(() => {
    fetchTeeth();
  }, [fetchTeeth]);

  // Dişi tap və onun operations array-ini götür
  const filteredOperations = useMemo(() => {
    if (!teethId || !teeth.length) return [];
    const tooth = teeth.find((t) => String(t.id) === String(teethId));
    return tooth?.operations || [];
  }, [teeth, teethId]);

  const handleEdit = (id) => () => {
    navigate(`edit/${id}`);
  };

  const handleInfo = (id) => () => {
    navigate(`info/${id}`);
  };

  return (
    <div className="operationPictures-container">
      <div className="operationPictures-controls-section">
        <div style={{ width: 250 }}>
          <div className="operationPictures-search-box">
            <input
              type="text"
              placeholder="Axtarış"
              className="operationPictures-search-input"
            />
            <button className="operationPictures-search-button">
              <CiSearch className="operationPictures-search-icon" />
            </button>
          </div>
        </div>
        <div className="operationPictures-actions">
          <Link to={"add"} className="operationPictures-add-new-button">
            + Yenisini əlavə et
          </Link>
          <button className="operationPictures-download-button">
            <FiDownload className="operationPictures-download-icon" />
          </button>
        </div>
      </div>

      <div className="operationPictures-table-section">
        <table className="operationPictures-table">
          <thead>
            <tr>
              <th>
                <span className="operationPictures-firstElementOfTHS">
                  <HiArrowsUpDown style={{ marginRight: 4 }} />
                  {filteredOperations.length === 0
                    ? "0"
                    : `1-${filteredOperations.length}`}
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown style={{ marginRight: 4 }} /> Əməliyyat adı
                </span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOperations.map((row, idx) => (
              <tr key={row.id}>
                <td>{idx + 1}</td>
                <td>{row.operationName}</td>
                <td>
                  <div className="operationPictures-action-icons">
                    <PiWarningCircleLight
                      onClick={handleInfo(row.id)}
                      className="operationPictures-warning-button"
                    />
                    <FiEdit3
                      onClick={handleEdit(row.id)}
                      className="operationPictures-edit-button"
                    />
                    <GoTrash className="operationPictures-delete-button" />
                  </div>
                </td>
              </tr>
            ))}
            {/* Boş sətirlər vizual stabillik üçün */}
            {Array.from({
              length: Math.max(0, 8 - filteredOperations.length),
            }).map((_, i) => (
              <tr key={"empty-" + i}>
                <td>&nbsp;</td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p style={{ textAlign: "center" }}>Yüklənir...</p>}
        {error && (
          <p style={{ textAlign: "center", color: "red" }}>
            Xəta: {error.message || "Naməlum xəta"}
          </p>
        )}
      </div>
    </div>
  );
};

export default OperationPictures;
