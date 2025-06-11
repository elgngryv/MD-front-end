import React from "react";
import "../../assets/style/StockExport/stockexportlist.css";
import { CiSearch, CiExport, CiCircleInfo } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

function StockExportList() {
  const mockData = [
    {
      id: 1,
      date: "16.03.2025",
      time: "00:00",
      otaq: "Otaq 1",
      admin: "Admin User",
      cesidSayi: 2,
      sifarisCount: 4,
      gonderilenCount: 5,
      qalanCount: 1,
    },
    {
      id: 2,
      date: "16.03.2025",
      time: "00:00",
      otaq: "Otaq 2",
      admin: "Admin User",
      cesidSayi: 2,
      sifarisCount: 7,
      gonderilenCount: 6,
      qalanCount: 1,
    },
    {
      id: 3,
      date: "16.03.2025",
      time: "00:00",
      otaq: "Otaq 3",
      admin: "Admin User",
      cesidSayi: 2,
      sifarisCount: 80,
      gonderilenCount: 70,
      qalanCount: 20,
    },
  ];

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => console.log("Info:", row),
      className: "info",
    },
  ];

  return (
    <div className="stock-export-container">
      <div className="search-bar">
        <div className="searchBarContainer">
          <input type="text" placeholder="Axtarış" />
          <CiSearch className="searchIconBTN" />
        </div>
        <button className="download-btn">
          <CiExport />
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <span>
                  {mockData.length === 0 ? "0" : `1-${mockData.length}`}
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Tarix
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Saat
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Otaq
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Sifariş verən
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Çeşid sayı
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Sifariş miq.
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Göndərilən miq.
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Qalıq miq.
                </span>
              </th>
              <th>
                <span>
                  <HiArrowsUpDown className="tableArrowIcon" /> Məxariclər
                </span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.otaq}</td>
                <td>{row.admin}</td>
                <td>{row.cesidSayi}</td>
                <td>{row.sifarisCount}</td>
                <td>{row.gonderilenCount}</td>
                <td>{row.qalanCount}</td>
                <td>
                  <Link
                    className="stockExportCheckIconContainer"
                    to={`/stock/export/${row.date}`}>
                    <FiShoppingBag className="stockExportCheckIcon" />
                  </Link>
                </td>
                <td>
                  <div className="icons flex gap-3 cursor-pointer">
                    {icons.map((iconObj, idx) => (
                      <iconObj.icon
                        key={idx}
                        className={iconObj.className}
                        onClick={() => iconObj.action(row)}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockExportList;
