// StockEntryList.jsx
import React, { useEffect, useState } from "react";
import SimpleListWithStatus from "../../components/list/SimpleListWithStatus";
import SearchIcon from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import { useNavigate } from "react-router-dom";
import useWarehouseReceiptsStore from "../../../stores/warehouseReceiptsStore"; // Yolun düzgün olduğuna əmin olun!

const StockEntryList = () => {
  const navigate = useNavigate();
  const {
    receipts,
    loading,
    error,
    fetchReceipts,
    updateReceiptStatus,
    searchParams,
    setSearchParams,
  } = useWarehouseReceiptsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null); // Dropdown üçün status filteri

  // Status üçün dropdown seçimləri
  const statusOptions = [
    { value: "WAITING", label: "Gözləyir" },
    { value: "APPROVED", label: "Təsdiqləndi" },
    { value: "REJECTED", label: "Rədd edildi" },
    // Digər statusları buraya əlavə edin
  ];

  // Komponent yükləndikdə və ya searchParams dəyişdikdə datanı yüklə
  useEffect(() => {
    fetchReceipts();
  }, [searchParams, fetchReceipts]);

  const columns = [
    {
      key: "date",
      label: "Tarix",
      render: (item) => item.date,
    },
    {
      key: "time",
      label: "Saat",
      // Back-end-dən gələn HH:mm:ss stringini HH:mm kimi göstərmək üçün
      render: (item) => item.time ? item.time.substring(0, 5) : '',
    },
    {
      key: "room",
      label: "Otaq",
    },
    {
      key: "personWhoPlacedOrder",
      label: "Sifariş edən şəxs",
    },
    {
      key: "orderQuantity",
      label: "Sifariş miqdarı",
    },
    {
      key: "sendQuantity",
      label: "Göndərilən miqdar",
    },
    {
      key: "pendingStatus",
      label: "Status",
      render: (item) => {
        let statusClass = "";
        switch (item.pendingStatus) {
          case "WAITING":
            statusClass = "text-yellow-600 bg-yellow-100";
            break;
          case "APPROVED":
            statusClass = "text-green-600 bg-green-100";
            break;
          case "REJECTED":
            statusClass = "text-red-600 bg-red-100";
            break;
          default:
            statusClass = "text-gray-600 bg-gray-100";
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
            {item.pendingStatus === "WAITING" && "Gözləyir"}
            {item.pendingStatus === "APPROVED" && "Təsdiqləndi"}
            {item.pendingStatus === "REJECTED" && "Rədd Edildi"}
            {/* Digər statuslar üçün əlavə şərtlər */}
          </span>
        );
      },
    },
  ];

  const handleStatusFilterChange = (status) => {
    setSelectedStatusFilter(status);
    setSearchParams({ pendingStatus: status?.value || null }); // Zustand store-da axtarış parametrlərini yenilə
  };

  const handleSearch = () => {
    // Cari backend /search endpoint-i yalnız pendingStatus, date, time qəbul edir.
    // Əgər otaq, sifariş edən şəxs və s. üzrə axtarış etmək istəyirsinizsə, backend API-niz genişləndirilməlidir.
    fetchReceipts(); // Cari axtarış parametrləri ilə yenidən yüklə
  };

  const handleDownload = () => {
    console.log("Download düyməsi basıldı");
    // Databazadan məlumatların exportu üçün ayrı bir API endpoint-ə ehtiyac ola bilər.
  };

  const handleStatusClick = async (id, currentStatus) => {
    const newStatus = currentStatus === "WAITING" ? "APPROVED" : "WAITING"; // Nümunə: statusu dəyişdir
    if (window.confirm(`Əminsiniz ki, qəbz ${id} statusunu "${newStatus}" olaraq dəyişmək istəyirsiniz?`)) {
      await updateReceiptStatus(id, newStatus);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Məlumatlar yüklənir...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Xəta: {error}</div>;
  }

  // API-dən gələn datanı SimpleListWithStatus komponentinin gözlədiyi formata çeviririk
  const formattedData = receipts.map(receipt => ({
    id: receipt.id,
    date: receipt.date,
    time: receipt.time, // İndi "HH:mm:ss" kimi bir stringdir
    room: receipt.room,
    personWhoPlacedOrder: receipt.personWhoPlacedOrder,
    orderQuantity: receipt.orderQuantity,
    sendQuantity: receipt.sendQuantity,
    pendingStatus: receipt.pendingStatus,
  }));

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-1 min-h-screen">
      <div className="flex justify-between items-center gap-2 p-2">
        <div className="flex items-center gap-2">
          <CustomDropdown
            options={statusOptions}
            value={selectedStatusFilter}
            onChange={handleStatusFilterChange}
            placeholder="Status seçin"
          />
          <input
            type="text"
            placeholder="Axtarış..."
            className="w-full p-2 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2" onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
        <div className="flex items-center gap-8">
          <button className="p-2" onClick={handleDownload}>
            <DownloadIcon />
          </button>
        </div>
      </div>

      <SimpleListWithStatus
        columns={columns}
        data={formattedData}
        enableView={true}
        handleView={(id) => {
          navigate("/stock/entry/" + id); // Routing yolunu tənzimləyin
        }}
        handleEdit={(id) => {
          navigate("/stock/entry/" + id + "/edit"); // Routing yolunu tənzimləyin
        }}
        // item obyektini də keçiririk ki, handleStatusClick içində statusu əldə edə bilək
        handleStatusClick={(id, item) => handleStatusClick(id, item.pendingStatus)}
      />

      {formattedData.length === 0 && !loading && !error && (
        <div className="text-center py-4 text-gray-500">
          Məlumat tapılmadı.
        </div>
      )}
    </div>
  );
};

export default StockEntryList;