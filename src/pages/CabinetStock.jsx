import React, { useEffect } from "react";
import SimpleList from "../components/list/SimpleList";
import SearchIcon from "../assets/icons/Search";
import CustomDropdown from "../components/CustomDropdown";
import DownloadIcon from "../assets/icons/Download";
import useWarehouseStockRoomStore from "../../stores/warehouseStockRoom";

const CabinetStock = () => {
  const {
    cabinetStockData,
    loading,
    error,
    roomName,
    categoryName,
    productName,
    productNo,
    setRoomName,
    setCategoryName,
    setProductName,
    setProductNo,
    searchRoomStock,
  } = useWarehouseStockRoomStore();

  useEffect(() => {
    searchRoomStock();
  }, [searchRoomStock]);

  const columns = [
    {
      key: "category",
      label: "Kategoriyası",
    },
    {
      key: "name",
      label: "Məhsulun adı",
    },
    {
      key: "code",
      label: "Məhsulun kodu",
    },
    {
      key: "quantity",
      label: "Mədaxil",
    },
    {
      key: "quantity",
      label: "İstifadə",
    },
    {
      key: "quantity",
      label: "Qalıq",
    },
  ];

  const handleSearch = () => {
    searchRoomStock();
  };

  const handleDownload = () => {
    console.log("Download button clicked");
    alert("Download functionality needs to be implemented.");
  };

  const roomOptions = [
    { value: "", label: "Bütün Otaqlar" },
    { value: "STOM1", label: "Stomatoloji Otaq 1" },
    { value: "STOM2", label: "Stomatoloji Otaq 2" },
  ];

  const categoryOptions = [
    { value: "", label: "Bütün Kateqoriyalar" },
    { value: "Dental Materials", label: "Dental Materiallar" },
    { value: "Instruments", label: "Alətlər" },
    { value: "Medication", label: "Dərmanlar" },
  ];

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-1 h-screen">
      <div className="flex flex-wrap justify-between items-center gap-2 p-2">
        {/* Adjusted this div to better control wrapping behavior */}
        <div className="flex items-center gap-2 ">
          {/* Otaq Adı Dropdown */}
          <CustomDropdown
            options={roomOptions}
            value={roomName}
            onChange={(option) => setRoomName(option.value)}
            placeholder="Otaq Seçin..."
          />
          {/* Kateqoriya Adı Dropdown */}
          <CustomDropdown
            options={categoryOptions}
            value={categoryName}
            onChange={(option) => setCategoryName(option.value)}
            placeholder="Kateqoriya Seçin..."
          />
          {/* Məhsul Adı Girişi */}
          <input
            type="text"
            placeholder="Məhsulun adı..."
            // Removed w-full and flex-grow to prevent excessive widening on smaller screens
            // Added min-w-[150px] for a minimum width
            className="p-2 rounded-lg border border-gray-300 min-w-[150px]"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          {/* Məhsul Kodu Girişi */}
          <input
            type="number"
            placeholder="Məhsulun kodu..."
            // Removed w-full and flex-grow
            // Added min-w-[150px]
            className="p-2 rounded-lg border border-gray-300 min-w-[150px]"
            value={productNo}
            onChange={(e) => setProductNo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className="p-2 border border-gray-300 rounded-lg" onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
        <button className="p-2 border border-gray-300 rounded-lg" onClick={handleDownload}>
          <DownloadIcon />
        </button>
      </div>

      {loading && <p className="text-center py-4">Məlumatlar yüklənir...</p>}
      {error && <p className="text-center py-4 text-red-500">Xəta baş verdi: {error.message || error}</p>}
      {!loading && !error && (
        <SimpleList columns={columns} data={cabinetStockData} />
      )}
    </div>
  );
};

export default CabinetStock;