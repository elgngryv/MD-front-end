import React, { useEffect } from "react";
import SimpleList from "../components/list/SimpleList";
import SearchIcon from "../assets/icons/Search";
import CustomDropdown from "../components/CustomDropdown";
import DownloadIcon from "../assets/icons/Download";
import useWarehouseStoreClinic from "../../stores/warehouseClinic";

const ClinicStock = () => {
  const {
    warehouseData,
    loading,
    error,
    searchTerm,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
    fetchWarehouseData,
    searchWarehouse,
  } = useWarehouseStoreClinic();

  useEffect(() => {
    fetchWarehouseData(); // Fetch initial data when the component mounts
  }, [fetchWarehouseData]);

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
      label: "Məhsulun Sayı",
    },
  ];

  const handleSearch = () => {
    const payload = {
      searchTerm: searchTerm,
      category: selectedCategory,
    };
    searchWarehouse(payload);
  };

  const handleDownload = () => {
    console.log("Download button clicked");
    alert("Download functionality to be implemented.");
  };

  const categoryOptions = [
    { value: "", label: "Bütün Kateqoriyalar" },
    { value: "Dental Materials", label: "Dental Materiallar" },
    { value: "Instruments", label: "Alətlər" },
    { value: "Medication", label: "Dərmanlar" },
  ];

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-3 h-screen"> {/* Added h-screen here */}
      <div className="flex justify-between items-center gap-2 p-2">
        <div className="flex items-center gap-2">
          <CustomDropdown
            options={categoryOptions}
            selectedValue={selectedCategory}
            onSelect={(value) => setSelectedCategory(value)}
          />
          <input
            type="text"
            placeholder="Axtarış..."
            className="w-full p-2 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      {error && <p className="text-center py-4 text-red-500">Xəta baş verdi: {error.message}</p>}
      {!loading && !error && (
        <SimpleList columns={columns} data={warehouseData} />
      )}
    </div>
  );
};

export default ClinicStock;