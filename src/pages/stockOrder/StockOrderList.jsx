import { useState, useEffect } from "react";
import SimpleList from "../../components/list/SimpleList";
import SearchIcon from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import { useNavigate } from "react-router-dom";
import useOrderFromWarehouseStore from "../../../stores/orderFromWarehouseStore";
import useWorkerStore from "../../../stores/workerStore";

const StockOrder = () => {
  const navigate = useNavigate();
  const { orders, error, fetchOrders } = useOrderFromWarehouseStore();
  const { workers, fetchWorkers } = useWorkerStore();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { value: "all", label: "Bütün kateqoriyalar" },
    { value: "pending", label: "Gözləyən" },
    { value: "completed", label: "Tamamlanmış" },
    { value: "cancelled", label: "Ləğv edilmiş" },
  ];

  const columns = [
    { key: "date", label: "Tarix" },
    { key: "time", label: "Saat" },
    { key: "room", label: "Otaq" },
    { key: "quantity", label: "Məhsul sayı" },
    { key: "personWhoPlacedOrder", label: "Sifariş verən" },
  ];

  useEffect(() => {
    fetchOrders();
    fetchWorkers();
  }, []);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleDelete = async (id) => {
    if (window.confirm("Bu sifarişi silmək istədiyinizə əminsiniz?")) {
      try {
        await useOrderFromWarehouseStore.getState().deleteOrder(id);
        alert("Sifariş uğurla silindi!");
      } catch (error) {
        alert("Sifarişi silmək mümkün olmadı: " + (error.message || error));
      }
    }
  };

  useEffect(() => {
    let filtered = [...orders];

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.room?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.number?.toString().includes(searchTerm)
      );
    }

    if (selectedCategory && selectedCategory.value !== "all") {
      filtered = filtered.filter(
        (order) => order.status === selectedCategory.value
      );
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, selectedCategory]);

  const getWorkerNameById = (id) => {
    const worker = workers.find((w) => w.id === id);
    if (!worker) {
      console.warn(`Worker not found for id: ${id}`);
      return "Anonim";
    }
    return `${worker.name} ${worker.surname}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    const date = new Date(`1970-01-01T${timeString}`);
    return date.toLocaleTimeString("az-AZ", { hour: "2-digit", minute: "2-digit" });
  };

  const formattedOrders = filteredOrders.map((order) => {
    const totalQuantity = Number(order.sumQuantity || order.quantity || 0);
    return {
      id: order.id || "-",
      date: order.date ? new Date(order.date).toLocaleDateString("az-AZ") : "-",
      time: order.time
        ? formatTime(order.time)
        : order.date
        ? new Date(order.date).toLocaleTimeString("az-AZ", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
      room: order.room || "-",
      quantity: totalQuantity,
      personWhoPlacedOrder: getWorkerNameById(order.personWhoPlacedOrder),
    };
  });

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-1">
      <div className="flex justify-between items-center gap-2 p-2">
        <div className="flex items-center gap-2 w-full">
          <CustomDropdown
            options={categories}
            value={selectedCategory || categories[0]}
            onChange={setSelectedCategory}
            placeholder="Kateqoriya seçin"
          />
          <input
            type="text"
            placeholder="Axtarış..."
            className="w-full p-2 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-[#155EEF] text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/stock/order/add")}
          >
            Yenisini əlavə et
          </button>
          <button>
            <DownloadIcon />
          </button>
        </div>
      </div>

      {error ? (
        <div className="text-red-500 p-4 text-center">Xəta baş verdi: {error}</div>
      ) : (
        <SimpleList
          columns={columns}
          data={formattedOrders}
          enableDelete={true}
          enableEdit={true}
          enableView={true}
          handleView={(id) => navigate(`/stock/order/detail/${id}`)}
          handleEdit={(id) => navigate(`/stock/order/edit/${id}`)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StockOrder;
