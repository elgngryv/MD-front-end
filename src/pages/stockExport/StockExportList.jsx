import React, { useEffect, useState, useCallback } from "react";
import "../../assets/style/StockExport/stockexportlist.css";
import { CiSearch, CiExport, CiCircleInfo } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useWarehouseRemovalsStore from "../../../stores/warehouseRemovalsStore";

function StockExportList() {
Â  Â  const navigate = useNavigate();
Â  Â  const {
Â  Â  Â  Â  removals,
Â  Â  Â  Â  loading,
Â  Â  Â  Â  error,
Â  Â  Â  Â  fetchAllRemovals,
Â  Â  Â  Â  fetchRemovals,
Â  Â  Â  Â  searchTerm,
Â  Â  Â  Â  setSearchTerm,
Â  Â  Â  Â  fetchWorkerName,
Â  Â  } = useWarehouseRemovalsStore();

Â  Â  useEffect(() => {
Â  Â  Â  Â  fetchAllRemovals();
Â  Â  }, [fetchAllRemovals]);

Â  Â  useEffect(() => {
Â  Â  Â  Â  const processWorkerNames = async () => {
Â  Â  Â  Â  Â  Â  if (!removals || removals.length === 0) return;

Â  Â  Â  Â  Â  Â  const uniqueWorkerIds = [...new Set(removals.map(r => r.personWhoPlacedOrder))].filter(Boolean);
Â  Â  Â  Â  Â  Â  const newNamesToFetch = [];

Â  Â  Â  Â  Â  Â  for (const workerId of uniqueWorkerIds) {
Â  Â  Â  Â  Â  Â  Â  Â  const cachedName = useWarehouseRemovalsStore.getState().workersCache[workerId];
Â  Â  Â  Â  Â  Â  Â  Â  if (!cachedName) {
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  newNamesToFetch.push(workerId);
Â  Â  Â  Â  Â  Â  Â  Â  }
Â  Â  Â  Â  Â  Â  }

Â  Â  Â  Â  Â  Â  await Promise.all(newNamesToFetch.map(id => fetchWorkerName(id)));
Â  Â  Â  Â  };

Â  Â  Â  Â  processWorkerNames();
Â  Â  }, [removals, fetchWorkerName]);

Â  Â  const handleSearch = useCallback(() => {
Â  Â  Â  Â  fetchRemovals();
Â  Â  }, [fetchRemovals]);

Â  Â  const handleExport = useCallback(() => {
Â  Â  Â  Â  console.log("Export button clicked!");
Â  Â  }, []);

Â  Â  const handleInfoClick = useCallback((row) => {
Â  Â  Â  Â  navigate(`/stock/export/info/${row.id}`);
Â  Â  Â  Â  console.log("Info for row:", row);
Â  Â  }, [navigate]);

Â  Â  if (loading) {
Â  Â  Â  Â  return <div className="loading-state">MÉ™lumatlar yÃ¼klÉ™nir...</div>;
Â  Â  }

Â  Â  if (error) {
Â  Â  Â  Â  return <div className="error-state">XÉ™ta: {error}</div>;
Â  Â  }

Â  Â  const tableData = removals.filter(removal => {
Â  Â  Â  Â  const lowerCaseSearchTerm = searchTerm.toLowerCase();
Â  Â  Â  Â  const personName = useWarehouseRemovalsStore.getState().workersCache[removal.personWhoPlacedOrder] || removal.personWhoPlacedOrder;
Â  Â  Â  Â Â 
Â  Â  Â  Â  return (
Â  Â  Â  Â  Â  Â  removal.cabinetName?.toLowerCase().includes(lowerCaseSearchTerm) ||
Â  Â  Â  Â  Â  Â  personName.toLowerCase().includes(lowerCaseSearchTerm) ||
Â  Â  Â  Â  Â  Â  removal.date?.includes(lowerCaseSearchTerm) ||
Â  Â  Â  Â  Â  Â  removal.time?.includes(lowerCaseSearchTerm.substring(0, 5))
Â  Â  Â  Â  );
Â  Â  }).map((item, index) => ({
Â  Â  Â  Â  id: item.id || index+1,
Â  Â  Â  Â  date: item.date,
Â  Â  Â  Â  time: item.time ? item.time.substring(0, 5) : '',
Â  Â  Â  Â  room: item.cabinetName,
Â  Â  Â  Â  personWhoPlacedOrder: useWarehouseRemovalsStore.getState().workersCache[item.personWhoPlacedOrder] || item.personWhoPlacedOrder,
Â  Â  Â  Â  cesidSayi: item.warehouseRemovalProducts ? item.warehouseRemovalProducts.length : 0,
Â  Â  Â  Â  sifarisCount: item.orderAmount,
Â  Â  Â  Â  gonderilenCount: item.sendAmount,
Â  Â  Â  Â  qalanCount: item.remainingAmount,
Â  Â  Â  Â  linkId: item.number,
Â  Â  }));

Â  Â  return (
Â  Â  Â  Â  <div className="stock-export-container">
Â  Â  Â  Â  Â  Â  <div className="search-bar">
Â  Â  Â  Â  Â  Â  Â  Â  <div className="searchBarContainer">
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <input
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  type="text"
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  placeholder="AxtarÄ±ÅŸ..."
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  value={searchTerm}
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  onChange={(e) => setSearchTerm(e.target.value)}
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  />
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <button className="searchIconBTN" onClick={handleSearch}>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <CiSearch />
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </button>
Â  Â  Â  Â  Â  Â  Â  Â  </div>
Â  Â  Â  Â  Â  Â  Â  Â  <button className="download-btn" onClick={handleExport}>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <CiExport />
Â  Â  Â  Â  Â  Â  Â  Â  </button>
Â  Â  Â  Â  Â  Â  </div>

Â  Â  Â  Â  Â  Â  <div className="table-container">
Â  Â  Â  Â  Â  Â  Â  Â  <table>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <thead>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <tr>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  {tableData.length === 0 ? "0" : `1-${tableData.length}`}
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> Tarix
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> Saat
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> Otaq
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> SifariÅŸ verÉ™n
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> Ã‡eÅŸid sayÄ±
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> SifariÅŸ miq.
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> GÃ¶ndÉ™rilÉ™n miq.
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> QalÄ±q miq.
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <HiArrowsUpDown className="tableArrowIcon" /> MÉ™xariclÉ™r
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <span>DÃ¼zÉ™liÅŸ</span>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </th>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </tr>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </thead>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <tbody>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  {tableData.length > 0 ? (
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  tableData.map((row) => (
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <tr key={row.id}>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.id}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.date}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.time}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.room}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.personWhoPlacedOrder}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.cesidSayi}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.sifarisCount}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.gonderilenCount}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>{row.qalanCount}</td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <Link
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  className="stockExportCheckIconContainer"
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  to={`/stock/export/${row.id}`}
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  >
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <FiShoppingBag className="stockExportCheckIcon" />
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </Link>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <div className="icons flex gap-3 cursor-pointer">
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <CiCircleInfo
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  className="info"
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  onClick={() => handleInfoClick(row)}
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  />
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </div>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </tr>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  ))
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  ) : (
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <tr>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  <td colSpan="11" className="text-center py-4">
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  HeÃ§ bir mÉ™lumat tapÄ±lmadÄ±.
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </td>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </tr>
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  )}
Â  Â  Â  Â  Â  Â  Â  Â  Â  Â  </tbody>
Â  Â  Â  Â  Â  Â  Â  Â  </table>
Â  Â  Â  Â  Â  Â  </div>
Â  Â  Â  Â  </div>
Â  Â  );
}

export default StockExportList;