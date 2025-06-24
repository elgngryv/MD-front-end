import "../../assets/style/Technicians/techniciansprices.css";
import { CiSearch } from "react-icons/ci";
import { LuPencilLine } from "react-icons/lu";
import { PiExport } from "react-icons/pi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

function TechniciansPrices() {
  const [isEditing, setIsEditing] = useState(false);
  const [operations, setOperations] = useState([
    {
      id: 1,
      name: "A Əməliyyat - A Əməliyyatı",
      price: "",
    },
    {
      id: 2,
      name: "B Əməliyyat - B Əməliyyatı",
      price: "",
    },
    {
      id: 3,
      name: "C Əməliyyat - C Əməliyyatı",
      price: "",
    },
    {
      id: 4,
      name: "D Əməliyyat - D Əməliyyatı",
      price: "",
    },
    {
      id: 5,
      name: "E Əməliyyat - E Əməliyyatı",
      price: "",
    },
  ]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handlePriceChange = (id, value) => {
    setOperations((prev) =>
      prev.map((op) => (op.id === id ? { ...op, price: value } : op))
    );
  };

  return (
    <div className="techniciansPricesPage">
      <div className="techniciansPricesPageTopPart">
        <div className="searchPriceNow">
          <input type="text" placeholder="Axtarış" />
          <CiSearch className="search-btn" />
        </div>
        <div className="topPartIconsWrapper">
          {isEditing ? (
            <MdOutlineDone
              className="verifyIcon"
              onClick={handleEditToggle}
              title="Təsdiqlə"
            />
          ) : (
            <LuPencilLine
              className="penIconForTopPartIcon"
              onClick={handleEditToggle}
              title="Redaktə et"
            />
          )}
          <Link className="exportDataNowTech">
            <PiExport className="exportDataNowIcon" />
          </Link>
        </div>
      </div>

      <div className="techniciansPricesTableWrapper">
        <table className="techniciansTable">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  <span>
                    <HiArrowsUpDown className="tableArrowIcon" />{" "}
                    {operations.length === 0 ? "0" : `1-${operations.length}`}
                  </span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Əməliyyat</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Qiymət</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr key={op.id}>
                <td>{op.id}</td>
                <td className="operationColumn">{op.name}</td>
                <td className="priceEditData">
                  {isEditing ? (
                    <input
                      type="text"
                      value={op.price}
                      onChange={(e) => handlePriceChange(op.id, e.target.value)}
                      className="editableInput"
                    />
                  ) : (
                    <span className="priceText">{op.price || "-"}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechniciansPrices;
