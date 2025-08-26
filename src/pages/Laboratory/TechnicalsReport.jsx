import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Style
import "../../assets/style/LaboratoryPage/sentorders.css";

// Icons
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";

// Zustand store-u import edirik
// Əmin olun ki, bu yol sizin layihə strukturunuza uyğundur
import useLaboratoryPaymentStore from "../../../stores/laboratoryPaymentStore";

function TechnicalsReport() {
  const navigate = useNavigate();

  // Zustand store-dan state və action-ları çəkirik
  const { payments, loading, error, fetchPayments, addPayment } =
    useLaboratoryPaymentStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentData, setNewPaymentData] = useState({
    technicianId: "",
    amount: "",
  });
  const [addPaymentError, setAddPaymentError] = useState(null);
  const [addPaymentSuccess, setAddPaymentSuccess] = useState(false);

  // Komponent yükləndikdə ödəniş məlumatlarını çəkirik
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]); // fetchPayments funksiyası dəyişmədikcə yalnız bir dəfə işə düşəcək

  // Cədvəl başlıqları API cavabına uyğunlaşdırıldı
  // API-dən gələn cavabda "username", "firstName", "lastName", "fatherName" sahələri yoxdur,
  // əvəzinə "fullName" var. Buna görə başlıqları dəyişdim.
  const tableHead = ["Tam Ad", "Cəmi borc", "Cəmi ödənən", "Cəmi qalıq"];

  // Ətraflı hissəsi üçün ikonlar
  const icons = [
    {
      icon: CiCircleInfo,
      // API cavabında "id" əvəzinə "technicianId" istifadə olunur
      action: (row) => navigate(`/details/${row.technicianId}`),
      className: "info-icon",
    },
  ];

  // Axtarış filtri: API-dən gələn "fullName" sahəsinə görə filtrləyir
  const filteredData = payments.filter((row) =>
    row.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ödəniş əlavə et modalındakı input dəyişikliklərini idarə edir
  const handleAddPaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  // Ödəniş əlavə et formunun göndərilməsini idarə edir
  const handleAddPaymentSubmit = async (e) => {
    e.preventDefault();
    setAddPaymentError(null); // Əvvəlki xətanı sıfırla
    setAddPaymentSuccess(false); // Əvvəlki uğur mesajını sıfırla
    try {
      // Məbləğin nömrə olduğundan əmin oluruq
      const payload = {
        technicianId: newPaymentData.technicianId,
        amount: parseFloat(newPaymentData.amount), // String dəyəri nömrəyə çevir
      };
      await addPayment(payload); // Zustand action-u çağır
      setAddPaymentSuccess(true); // Uğurlu əməliyyat üçün mesaj
      setNewPaymentData({ technicianId: "", amount: "" }); // Formu təmizlə
      // Modalı bağlamadan əvvəl qısa bir gecikmə verə bilərsiniz
      // setTimeout(() => setShowAddPaymentModal(false), 1500);
      setShowAddPaymentModal(false); // Modalı bağla
    } catch (err) {
      setAddPaymentError(
        "Ödəniş əlavə edilərkən xəta baş verdi: " +
          (err.message || "Bilinməyən xəta")
      );
    }
  };

  return (
    <div className="sentOrdersContainer">
      <div className="sentOrdersHeader">
        <div className="leftPartHeader">
          <div className="searchOrderNow">
            <input
              type="text"
              placeholder="Axtarış (Tam Ad)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className="search-btn" />
          </div>
        </div>
        <div className="rightPartHeader ">
          {/* Ödəniş əlavə et düyməsi */}
          <button
            className="add-payment-btn. flex items-center gap-2 border-2 rounded-full bg-blue-500 text-white cursor-pointer  p-2 border-blue-500 "
            onClick={() => setShowAddPaymentModal(true)}>
            <FaPlus className="plus-icon" /> Ödəniş Əlavə Et
          </button>
          <FiDownload
            className="exportDataNow"
            onClick={() => navigate("/data/export")}
          />
        </div>
      </div>

      {/* Yüklənmə və xəta mesajları */}
      {loading && (
        <p style={{ textAlign: "center", margin: "20px 0", color: "#007bff" }}>
          Məlumatlar yüklənir...
        </p>
      )}
      {error && (
        <p style={{ textAlign: "center", margin: "20px 0", color: "red" }}>
          Xəta: {error}
        </p>
      )}

      <div className="tableWrapper">
        <table className="labTable">
          <thead>
            <tr>
              <th>
                {filteredData.length === 0 ? "0" : `1-${filteredData.length}`}
              </th>
              {tableHead.map((title, idx) => (
                <th key={idx}>
                  <div className="th-content">
                    <HiArrowsUpDown className="arrowsIcon" />
                    <span>{title}</span>
                  </div>
                </th>
              ))}
              {icons.length > 0 && (
                <th>
                  <div className="th-content">
                    <HiArrowsUpDown className="arrowsIcon" />
                    <span>Ətraflı</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Məlumat yoxdursa */}
            {filteredData.length === 0 && !loading && !error ? (
              <tr>
                <td
                  colSpan={tableHead.length + (icons.length > 0 ? 1 : 0) + 1}
                  style={{ textAlign: "center" }}>
                  Heç bir istifadəçi tapılmadı.
                </td>
              </tr>
            ) : (
              // Məlumat varsa, onları göstər
              filteredData.map((row, rowIndex) => (
                // API cavabında technicianId var, onu key kimi istifadə edirik
                <tr key={row.technicianId || rowIndex}>
                  <td>{rowIndex + 1}</td>

                  {/* Tam Ad */}
                  <td>{row.fullName}</td>

                  {/* Cəmi borc */}
                  <td>{row.totalDebt} AZN</td>

                  {/* Cəmi ödənən */}
                  <td>{row.totalPaid} AZN</td>

                  {/* Cəmi qalıq */}
                  <td>{row.totalRemaining} AZN</td>

                  {icons.length > 0 && (
                    <td className="actions">
                      <div className="actionsWrapper">
                        {icons.map((iconObj, iconIdx) => (
                          <span
                            key={iconIdx}
                            onClick={() => iconObj.action(row)}
                            style={{ cursor: "pointer" }}>
                            {React.createElement(iconObj.icon, {
                              className: `icon ${iconObj.className || ""}`,
                            })}
                          </span>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Ödəniş Əlavə Et Modalı */}
      {showAddPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ödəniş Əlavə Et</h2>
            <form onSubmit={handleAddPaymentSubmit}>
              <div className="form-group">
                <label htmlFor="technicianId">Texnik ID:</label>
                <input
                  type="text"
                  id="technicianId"
                  name="technicianId"
                  value={newPaymentData.technicianId}
                  onChange={handleAddPaymentChange}
                  placeholder="Texnik ID (UUID formatında)"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Məbləğ (AZN):</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newPaymentData.amount}
                  onChange={handleAddPaymentChange}
                  placeholder="Məbləğ"
                  step="0.01" // Kəsr ədədlərini dəstəkləmək üçün
                  required
                />
              </div>
              {addPaymentError && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {addPaymentError}
                </p>
              )}
              {addPaymentSuccess && (
                <p style={{ color: "green", marginBottom: "10px" }}>
                  Ödəniş uğurla əlavə edildi!
                </p>
              )}
              <div className="modal-actions">
                <button
                  type="submit"
                  className="submit-btn flex items-center gap-2 border-2 rounded-full bg-blue-500 text-white cursor-pointer  p-2 border-blue-500">
                  Əlavə Et
                </button>
                <button
                  type="button"
                  className="cancel-btn flex items-center gap-2 border-2 rounded-full bg-red-500 text-white cursor-pointer  p-2 border-red-500"
                  onClick={() => {
                    setShowAddPaymentModal(false);
                    setAddPaymentError(null);
                    setAddPaymentSuccess(false);
                    setNewPaymentData({ technicianId: "", amount: "" }); // Modalı bağlayanda formu sıfırla
                  }}>
                  Ləğv Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnicalsReport;
