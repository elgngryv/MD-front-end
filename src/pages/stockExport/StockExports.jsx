// StockExports.jsx
import React, { useEffect, useCallback } from 'react';
import { CiSearch, CiCircleInfo } from 'react-icons/ci';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { FiEdit3 } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import "../../assets/style/StockExport/stockexports.css";
import { useNavigate } from 'react-router-dom';
import useWarehouseRemovalProductsStore from '../../../stores/warehouseRemovalProductsStore'; // Ensure correct path!

function StockExports() {
  const navigate = useNavigate();
  const {
    products,
    loading,
    error,
    fetchAllProducts, // For initial load
    fetchProductsBySearch, // For search functionality
    searchTerm,
    setSearchTerm,
    // createProduct, // Uncomment if you add creation functionality directly in this list
    // updateProduct, // Uncomment if you add update functionality directly in this list
    // You might need a delete API call if GoTrash is to be functional.
  } = useWarehouseRemovalProductsStore();

  // Fetch all products on initial mount
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]); // Dependency array to ensure it only runs once

  const handleSearch = useCallback(() => {
    // This will trigger the fetchProductsBySearch which includes client-side filtering by searchTerm
    fetchProductsBySearch();
  }, [fetchProductsBySearch]);

  const handleDelete = useCallback((id) => {
    // Implement delete logic here. You'll need a DELETE API endpoint.
    console.log("Delete product with ID:", id);
    if (window.confirm(`Are you sure you want to delete item with ID: ${id}?`)) {
      // Example: Call a delete API function from the store
      // deleteWarehouseRemovalProduct(id);
      alert(`Deleting item ${id} (not implemented in API yet)`);
    }
  }, []); // No dependencies for this simple example

  if (loading) {
    return <div className="loading-state">Məlumatlar yüklənir...</div>;
  }

  if (error) {
    return <div className="error-state">Xəta: {error}</div>;
  }

  // Format the data from API response to match table expectations
  // Note: The API response for /search and /read has 'id', 'date', 'time', 'number', 'pendingStatus'.
  // 'Çeşid sayı' (count) is not directly available here; it comes from '/info/{groupId}'.
  // For 'Çeşid sayı', we will use 'number' if it represents the count, or simply show a placeholder.
  // Assuming `id` from the API response is sufficient for the row key.
  const tableData = products.map(item => ({
    id: item.id, // Using 'id' from API response
    date: item.date,
    // The API for `search` and `read` doesn't include 'time' in the response example,
    // but the request body accepts it. If 'time' is available, you'd render it.
    // For now, I'll assume it's not directly in the list response or we parse it from date if combined.
    // If your backend actually returns time in the list, adjust this.
    // For safety, let's use a placeholder or remove it if not available.
    time: item.time ? item.time.substring(0, 5) : 'N/A', // If time is actually returned
    count: item.number, // Assuming 'number' from the response represents 'Çeşid sayı'
    status: item.pendingStatus,
    groupId: item.id // Use 'id' (which is probably the groupId) for info page navigation
  }));

  return (
    <div className="stockExportsContainer">
      <div className="stockExportsSearchBar">
        <div className="stockExportsSearchBarContainer">
          <input
            type="text"
            placeholder="Axtarış"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="stockExportsSearchIcon" onClick={handleSearch}>
            <CiSearch />
          </button>
        </div>
        <button onClick={() => navigate('add')} className="stockExportsAddButton">
          + Yenisini əlavə et
        </button>
      </div>
      
      <div className="stockExportsTableContainer">
        <table>
          <thead>
            <tr>
              <th><span>{tableData.length === 0 ? '0' : `1-${tableData.length}`}</span></th>
              <th><span><HiArrowsUpDown className="stockExportsTableArrowIcon" /> Tarix</span></th>
              <th><span><HiArrowsUpDown className="stockExportsTableArrowIcon" /> Çeşid sayı</span></th>
              <th><span>Status</span></th>
              <th><span>Düzəliş</span></th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.date}</td>
                  <td>{row.count}</td>
                  <td>
                    <div className={`stockExportsStatus ${row.status === 'WAITING' ? 'stockExportsStatusPending' : 'stockExportsStatusActive'}`}>
                      {row.status}
                    </div>
                  </td>
                  <td>
                    <div className="stockExportsIcons">
                      <CiCircleInfo
                        onClick={() => navigate(`detail/${row.groupId}`)} // Use groupId for detail page
                        className="stockExportsInfoIcon"
                      />
                      <FiEdit3
                        className="stockExportsEditIcon"
                        onClick={() => navigate(`edit/${row.groupId}`)} // Use groupId for edit page
                      />
                      <GoTrash
                        className="stockExportsDeleteIcon"
                        onClick={() => handleDelete(row.id)} // Use row.id for delete
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Məlumat tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockExports;