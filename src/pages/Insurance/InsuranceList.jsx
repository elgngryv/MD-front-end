import "../../assets/style/Insurance/insurancelist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Static data for example
const staticInsuranceData = [
  { id: 1, companyName: "Sığorta 1", deductibleAmount: 100, status: "active" },
  { id: 2, companyName: "Sığorta 2", deductibleAmount: 200, status: "active" },
  { id: 3, companyName: "Sığorta 3", deductibleAmount: 300, status: "passive" },
];

function InsuranceList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [insuranceData, setInsuranceData] = useState(staticInsuranceData);

  const filteredData = insuranceData.filter((row) =>
    row.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`edit/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `${row.companyName} sığortasını silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    // Here you would typically make an API call to delete
    console.log("Deleting insurance:", row.id);
    alert(`${row.companyName} uğurla silindi.`);
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "passive" : "active";
    const confirmMessage = newStatus === "active" 
      ? "Sığortanı aktiv etmək istədiyinizə əminsiniz?" 
      : "Sığortanı passiv etmək istədiyinizə əminsiniz?";

    if (window.confirm(confirmMessage)) {
      try {
        // Here you would typically make an API call
        const updatedData = insuranceData.map((insurance) =>
          insurance.id === id ? { ...insurance, status: newStatus } : insurance
        );
        setInsuranceData(updatedData);
        alert(`Sığorta uğurla ${newStatus === "active" ? "aktiv" : "passiv"} edildi!`);
      } catch (error) {
        alert("Status dəyişdirmə zamanı xəta baş verdi!");
      }
    }
  };

  return (
    <div className="insurancePageWrapper">
      <div className="insuranceCategoryQuickSearch">
        <div className="insuranceCategoryLeftPart">
          <select>
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
          <div className="searchForNameInsurance">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="insuranceCategoryRightPart">
          <Link to={"./add"}>
            <p className="addNewInsuranceCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportInsuranceCategoriesData" />
          </Link>
        </div>
      </div>

      <div className="insurancePageTableWrapper">
        <table className="insurancePageTable">
          <thead>
            <tr>
              <th>{staticInsuranceData.length === 0 ? '0' : `1-${staticInsuranceData.length}`}</th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Sığorta şirkəti
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Azadolma məbləği
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Status
                </span>
              </th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td className="insuranceNameCol">{row.companyName}</td>
                <td>{row.deductibleAmount} ₼</td>
                <td>
                  <span
                    className={`statusBadge ${
                      row.status === "active" ? "active" : "passive"
                    }`}
                    onClick={() => handleStatusChange(row.id, row.status)}
                    style={{ cursor: "pointer" }}
                  >
                    {row.status === "active" ? "Aktiv" : "Passiv"}
                  </span>
                </td>
                <td>
                  <div className="insuranceActionIcons">
                    <FiEdit3
                      className="editBtn"
                      onClick={() => handleEdit(row)}
                    />
                    <GoTrash
                      className="deleteBtn"
                      onClick={() => handleDelete(row)}
                    />
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

export default InsuranceList;