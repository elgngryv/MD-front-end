import React from 'react';
import { CiSearch, CiCircleInfo } from 'react-icons/ci';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { FiEdit3 } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import "../../assets/style/StockExport/stockexports.css";

function StockExports() {
  const mockData = [
    {
      id: 1,
      date: '16.03.2025', 
      type: 'Type 1',
      count: 2,
      status: 'Delivered'
    }
  ];

  return (
    <div className="stockExportsContainer">
      <div className="stockExportsSearchBar">
        <div className="stockExportsSearchBarContainer">
          <input type="text" placeholder="Axtarış" />
          <CiSearch className="stockExportsSearchIcon" />
        </div>
        <button className="stockExportsAddButton">
          + Yenisini əlavə et
        </button>
      </div>
      
      <div className="stockExportsTableContainer">
        <table>
          <thead>
            <tr>
              <th><span>№</span></th>
              <th><span><HiArrowsUpDown className="stockExportsTableArrowIcon" /> Tarix</span></th>
              <th><span><HiArrowsUpDown className="stockExportsTableArrowIcon" /> Çeşid sayı</span></th>
              <th><span>Status</span></th>
              <th><span>Düzəliş</span></th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>{row.count}</td>
                <td>
                  <div className="stockExportsStatus stockExportsStatusActive">
                    {row.status}
                  </div>
                </td>
                <td>
                  <div className="stockExportsIcons">
                    <CiCircleInfo className="stockExportsInfoIcon" />
                    <FiEdit3 className="stockExportsEditIcon" />
                    <GoTrash className="stockExportsDeleteIcon" />
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

export default StockExports;
