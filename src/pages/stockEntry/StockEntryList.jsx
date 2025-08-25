"use client";

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SimpleListWithStatus from "../../components/list/SimpleListWithStatus";
import SearchIcon from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import useOrdersFromWarehouseStore from "../../../stores/orderFromWarehouseStore";
import useWarehouseReceiptsStore from "../../../stores/warehouseReceiptsStore";

const StockEntryList = () => {
  const navigate = useNavigate();
  const { orders, loading, error, fetchOrders, searchOrders } =
    useOrdersFromWarehouseStore();
  const { receipts, fetchReceipts } = useWarehouseReceiptsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [workerDetails, setWorkerDetails] = useState({});
  const [workerDetailsLoaded, setWorkerDetailsLoaded] = useState(false);

  const statusOptions = [
    { value: "WAITING", label: "Gözləyir" },
    { value: "APPROVED", label: "Təsdiqlənib" },
    { value: "REJECTED", label: "Rədd edildi" },
  ];

  // Fetch worker details from API
  const fetchWorkerDetails = async (workerId) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      console.error("No token found in localStorage");
      return "Bilinmir";
    }

    try {
      const response = await fetch(
        `http://161.97.179.107:5555/api/v1/add-worker/info/${workerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const worker = await response.json();
      console.log(`Worker data for ID ${workerId}:`, worker);
      return worker?.name && worker?.surname
        ? `${worker.name} ${worker.surname}`
        : "Bilinmir";
    } catch (err) {
      console.error(`Failed to fetch worker ${workerId}:`, err);
      return "Bilinmir";
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      console.log("Fetching initial data...");
      setWorkerDetailsLoaded(false); // Reset loading state
      await Promise.all([fetchOrders(), fetchReceipts()]); // Fetch orders and receipts concurrently
      console.log("Orders fetched. Orders count:", orders.length);

      if (orders.length > 0) {
        const uniqueWorkerIds = [
          ...new Set(orders.map((o) => o.personWhoPlacedOrder)),
        ];
        console.log("Unique worker IDs to fetch:", uniqueWorkerIds);

        const newWorkerDetails = { ...workerDetails };

        for (const workerId of uniqueWorkerIds) {
          if (!newWorkerDetails[workerId]) {
            console.log(`Fetching details for worker ID: ${workerId}`);
            const workerName = await fetchWorkerDetails(workerId);
            newWorkerDetails[workerId] = workerName;
          }
        }

        setWorkerDetails(newWorkerDetails);
        console.log("Updated workerDetails cache:", newWorkerDetails);
        setWorkerDetailsLoaded(true); // Mark worker details as loaded
      } else {
        setWorkerDetailsLoaded(true); // No orders, so no workers to fetch
      }
    };

    fetchInitialData();
  }, [fetchOrders, fetchReceipts]); // Removed 'orders' from dependencies

  const handleStatusFilterChange = (status) => {
    console.log("Status filter changed to:", status?.value);
    setSelectedStatusFilter(status);
    setWorkerDetailsLoaded(false); // Reset loading state for new data
    searchOrders({
      searchTerm,
      pendingStatus: status?.value || null,
    }).then(() => {
      // Fetch worker details after searchOrders updates orders
      const uniqueWorkerIds = [
        ...new Set(orders.map((o) => o.personWhoPlacedOrder)),
      ];
      console.log("Unique worker IDs after search:", uniqueWorkerIds);

      const fetchWorkerNames = async () => {
        const newWorkerDetails = { ...workerDetails };

        for (const workerId of uniqueWorkerIds) {
          if (!newWorkerDetails[workerId]) {
            console.log(`Fetching details for worker ID: ${workerId}`);
            const workerName = await fetchWorkerDetails(workerId);
            newWorkerDetails[workerId] = workerName;
          }
        }

        setWorkerDetails(newWorkerDetails);
        console.log("Updated workerDetails cache after search:", newWorkerDetails);
        setWorkerDetailsLoaded(true);
      };

      fetchWorkerNames();
    });
  };

  const handleSearch = () => {
    console.log("Search button clicked with term:", searchTerm);
    setWorkerDetailsLoaded(false); // Reset loading state for new data
    searchOrders({
      searchTerm,
      pendingStatus: selectedStatusFilter?.value || null,
    }).then(() => {
      // Fetch worker details after searchOrders updates orders
      const uniqueWorkerIds = [
        ...new Set(orders.map((o) => o.personWhoPlacedOrder)),
      ];
      console.log("Unique worker IDs after search:", uniqueWorkerIds);

      const fetchWorkerNames = async () => {
        const newWorkerDetails = { ...workerDetails };

        for (const workerId of uniqueWorkerIds) {
          if (!newWorkerDetails[workerId]) {
            console.log(`Fetching details for worker ID: ${workerId}`);
            const workerName = await fetchWorkerDetails(workerId);
            newWorkerDetails[workerId] = workerName;
          }
        }

        setWorkerDetails(newWorkerDetails);
        console.log("Updated workerDetails cache after search:", newWorkerDetails);
        setWorkerDetailsLoaded(true);
      };

      fetchWorkerNames();
    });
  };

  const handleDownload = () => {
    console.log("Download button clicked");
  };

  const columns = [
    { key: "date", label: "↕ Tarix" },
    { key: "time", label: "↕ Saat" },
    { key: "room", label: "↕ Otaq" },
    {
      key: "personWhoPlacedOrder",
      label: "↕ Sifariş verən",
      render: (item) => {
        const name = workerDetails[item.personWhoPlacedOrder];
        console.log(
          `Rendering worker ID ${
            item.personWhoPlacedOrder
          }: ${name || "Yüklənir..."}`
        );
        return name || "Yüklənir...";
      },
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

        const { class: statusClass, text: statusText } =
          statusConfig[item.pendingStatus] || {
            class: "bg-gray-100 text-gray-800 border border-gray-300",
            text: "Bilinmir",
          };

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
          >
            {statusText}
          </span>
        );
      },
    },
  ];

  const formattedData = useMemo(() => {
    if (!workerDetailsLoaded) return []; // Return empty array until worker details are loaded

    return orders.map((order, index) => {
      const receipt = receipts.find((r) => r.id === order.receiptId);
      return {
        id: order.id,
        rowNumber: index + 1,
        date: order.date || "-",
        time: order.time?.slice(0, 5) || "-",
        room: order.cabinetName || "-",
        personWhoPlacedOrder: order.personWhoPlacedOrder,
        orderQuantity: order.orderQuantity ?? 0,
        receivedQuantity: order.incomingQuantity ?? 0,
        pendingStatus: (receipt?.pendingStatus || "Unknown")?.toUpperCase(),
        products:
          order.outOfTheWarehouseDtos?.map((p) => ({
            productName: p.productName || "-",
            categoryName: p.categoryName || "-",
            orderQuantity: p.orderQuantity || 0,
            sendQuantity: p.sendQuantity || 0,
            remainingQuantity: p.remainingQuantity || 0,
            currentAmount: p.currentAmount || 0,
          })) || [],
      };
    });
  }, [orders, receipts, workerDetailsLoaded]);

  if (loading || !workerDetailsLoaded)
    return <div className="text-center py-4">Məlumatlar yüklənir...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Xəta: {error}</div>;

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
        handleView={(id) => navigate(`/stock/entry/${id}`)}
        handleEdit={(id) => navigate(`/stock/entry/${id}/edit`)}
      />

      {formattedData.length === 0 && !loading && !error && (
        <div className="text-center py-4 text-gray-500">Məlumat tapılmadı.</div>
      )}
    </div>
  );
};

export default StockEntryList;