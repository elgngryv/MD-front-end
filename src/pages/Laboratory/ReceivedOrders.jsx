import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Style
import "../../assets/style/LaboratoryPage/sentorders.css";

// Icons
import { CiSearch } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";
import "./sentorders.css";

// Store
import useDentalOrderStore from "../../../stores/dentalOrderStore";

function ReceivedOrders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { orders, loading, error, fetchOrders } = useDentalOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const tableHead = [
    "Göndərən",
    "Pasiyent",
    "Yoxlanılma tarixi",
    "Təhvil tarixi",
    "Status",
  ];

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => navigate(`/details/${row.id}`),
      className: "info-icon",
    },
  ];

  // Tarix formatlama
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("az-AZ");
    } catch (e) {
      return dateString;
    }
  };

  // Status badge məlumatı
  const getStatusInfo = (status) => {
    switch (status) {
      case "PENDING":
        return { text: "Gözləyir", type: "pending" };
      case "IN_PROGRESS":
        return { text: "İşlənir", type: "progress" };
      case "COMPLETED":
        return { text: "Tamamlandı", type: "completed" };
      case "SENT_TO_DOCTOR":
        return { text: "Həkimə göndərilib", type: "hakim" };
      case "SENT_TO_TECHNICIAN":
        return { text: "Texnika göndərilib", type: "texnika" };
      case "ACCEPTED_BY_TECHNICIAN":
        return { text: "Texnik qəbul edib", type: "qebul" };

      default:
        if (status?.includes("Həkim") || status?.includes("DOCTOR")) {
          return { text: "Həkimə göndərilib", type: "hakim" };
        } else if (status?.includes("Texnik") || status?.includes("TECHNIC")) {
          return { text: "Texnika göndərilib", type: "texnika" };
        } else if (status?.includes("qəbul") || status?.includes("ACCEPT")) {
          return { text: "Texnik qəbul edib", type: "qebul" };
        }
        return { text: status || "Gözləyir", type: "pending" };
    }
  };

  // Axtarış filtri
  const filteredData = orders.filter(
    (row) =>
      row.patient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.doctor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.dentalWorkStatus?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="sentOrdersContainer">
        <div className="loading">Yüklənir...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sentOrdersContainer">
        <div className="error">Xəta: {error}</div>
      </div>
    );
  }

  return (
    <div className="sentOrdersContainer">
      <div className="sentOrdersHeader">
        <div className="leftPartHeader">
          <select>
            <option value="">Bütün statuslar</option>
            <option value="Həkimə göndərilib">Həkimə göndərilib</option>
            <option value="Texnika göndərilib">Texnika göndərilib</option>
            <option value="Texnik qəbul edib">Texnik qəbul edib</option>
          </select>

          <div className="searchOrderNow">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className="search-btn" />
          </div>
        </div>
      </div>

      <div className="tableWrapper">
        <table className="labTable">
          <thead>
            <tr>
              <th>{orders.length === 0 ? "0" : `1-${orders.length}`}</th>
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
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={tableHead.length + 1}
                  style={{ textAlign: "center" }}>
                  Heç bir sifariş tapılmadı.
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIndex) => {
                const statusInfo = getStatusInfo(row.dentalWorkStatus);

                return (
                  <tr key={row.id}>
                    <td>{rowIndex + 1}</td>

                    <td>{row.doctor || "-"}</td>

                    <td
                      onClick={() => navigate(`/details/${row.id}`)}
                      className="patinetTD"
                      style={{ cursor: "pointer", color: "#155EEF" }}>
                      {row.patient || "-"}
                    </td>

                    <td>{formatDate(row.checkDate)}</td>
                    <td>{formatDate(row.deliveryDate)}</td>

                    <td>
                      <span className={`status-badge ${statusInfo.type}`}>
                        {statusInfo.text}
                      </span>
                    </td>

                    <td className="actions">
                      <div className="actionsWrapper">
                        {icons.map((iconObj, i) => (
                          <span
                            key={i}
                            onClick={() => iconObj.action(row)}
                            style={{ cursor: "pointer" }}>
                            {React.createElement(iconObj.icon, {
                              className: `icon ${iconObj.className}`,
                            })}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReceivedOrders;
