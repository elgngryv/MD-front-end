"use client";

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SimpleListWithStatus from "../../components/list/SimpleListWithStatus";
import SearchIcon from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import useOrdersFromWarehouseStore from "../../../stores/orderFromWarehouseStore";
import useWorkerStore from "../../../stores/workerStore";
import useWarehouseReceiptsStore from "../../../stores/warehouseReceiptsStore";

const StockEntryList = () => {
  const navigate = useNavigate();
  const { orders, loading, error, fetchOrders, searchOrders } =
    useOrdersFromWarehouseStore();
  const { workers, fetchWorkers } = useWorkerStore();
  const { receipts, fetchReceipts } = useWarehouseReceiptsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);

  const statusOptions = [
    { value: "WAITING", label: "Gözləyir" },
    { value: "APPROVED", label: "Təsdiqlənib" },
    { value: "REJECTED", label: "Rədd edildi" },
  ];

  // İşçilərin UUID → ad map-i (useMemo ilə optimizasiya)
  const userMap = useMemo(() => {
    return workers.reduce((acc, w) => {
      acc[w.id] = w.name;
      return acc;
    }, {});
  }, [workers]);

  useEffect(() => {
    fetchOrders();
    fetchWorkers();
    fetchReceipts();
  }, [fetchOrders, fetchWorkers, fetchReceipts]);

  // Filtrlər və axtarış
  const handleStatusFilterChange = (status) => {
    setSelectedStatusFilter(status);
    searchOrders({
      searchTerm,
      pendingStatus: status?.value || null,
    });
  };

  const handleSearch = () => {
    searchOrders({
      searchTerm,
      pendingStatus: selectedStatusFilter?.value || null,
    });
  };

  const handleDownload = () => {
    console.log("Download düyməsi basıldı");
  };

  // Sütunlar
  const columns = [
    { key: "date", label: "↕ Tarix" },
    { key: "time", label: "↕ Saat" },
    { key: "room", label: "↕ Otaq" },
    {
      key: "personWhoPlacedOrder",
      label: "↕ Sifariş verən",
      render: (item) => userMap[item.personWhoPlacedOrder] || "Admin User",
    },
    { key: "orderQuantity", label: "↕ Sifariş miq." },
    { key: "receivedQuantity", label: "↕ Daxil olan miq." },
    {
      key: "pendingStatus",
      label: "↕ Status",
      render: (item) => {
        const statusConfig = {
          WAITING: {
            class: "bg-yellow-100 text-yellow-800 border border-yellow-300",
            text: "Gözləyir",
          },
          APPROVED: {
            class: "bg-green-100 text-green-800 border border-green-300",
            text: "Təsdiqlənib",
          },
          REJECTED: {
            class: "bg-red-100 text-red-800 border border-red-300",
            text: "Rədd edildi",
          },
        };

        const { class: statusClass, text: statusText } = statusConfig[
          item.pendingStatus
        ] || {
          class: "bg-gray-100 text-gray-800 border border-gray-300",
          text: "Bilinmir",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
            {statusText}
          </span>
        );
      },
    },
  ];

  // Məlumatların formatlanması - DÜZƏLDİ
  const formattedData = orders.map((order, receipt, index) => ({
    id: order.id,
    rowNumber: index + 1,
    date: order.date || "-",
    time: order.time?.slice(0, 5) || "-",
    room: order.cabinetName || "-",
    personWhoPlacedOrder: order.personWhoPlacedOrder,
    orderQuantity: order.orderQuantity ?? 0,
    receivedQuantity: order.incomingQuantity ?? 0,
    pendingStatus: receipt.pendingStatus?.toUpperCase() || null,
    products:
      order.outOfTheWarehouseDtos?.map((p) => ({
        productName: p.productName || "-",
        categoryName: p.categoryName || "-",
        orderQuantity: p.orderQuantity || 0,
        sendQuantity: p.sendQuantity || 0,
        remainingQuantity: p.remainingQuantity || 0,
        currentAmount: p.currentAmount || 0,
      })) || [],
  }));
  // Yüklənmə və xəta halları
  if (loading)
    return <div className="text-center py-4">Məlumatlar yüklənir...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Xəta: {error}</div>;

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-1 min-h-screen">
      {/* Axtarış və filterlər */}
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

      {/* Siyahı */}
      <SimpleListWithStatus
        columns={columns}
        data={formattedData}
        enableView={true}
        handleView={(id) => navigate(`/stock/entry/${id}`)}
        handleEdit={(id) => navigate(`/stock/entry/${id}/edit`)}
      />

      {/* Boş nəticə */}
      {formattedData.length === 0 && !loading && !error && (
        <div className="text-center py-4 text-gray-500">Məlumat tapılmadı.</div>
      )}
    </div>
  );
};

export default StockEntryList;
