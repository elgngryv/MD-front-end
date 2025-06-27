import React, { useEffect, useState, useRef } from "react"; // Import useRef
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import "../../assets/style/EmployeesPage/employeespage.css";
import useEmployeeStore from "../../../stores/workerStore"; // Renamed for clarity in this context
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";

const EmployeesList = () => {
  const { workers, fetchWorkers, searchWorkers, removeWorker, loading } =
    useEmployeeStore();

  const [searchParams, setSearchParams] = useState({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    status: "",
  });

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const searchTimeoutRef = useRef(null); // Ref to hold the debounce timeout

  // Initial fetch of workers
  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  // Update filteredEmployees when workers data changes (after initial fetch or search)
  useEffect(() => {
    setFilteredEmployees(workers);
  }, [workers]);

  const getStatus = (emp) => (emp.enabled ? "Aktiv" : "Passiv");
  const navigation = useNavigate();

  // Function to perform the search
  const performSearch = async (currentSearchParams) => {
    try {
      // If all search fields are empty, fetch all workers
      if (Object.values(currentSearchParams).every((val) => !val)) {
        await fetchWorkers();
        return;
      }

      // Convert status to boolean for API
      const enabled =
        currentSearchParams.status === "Aktiv"
          ? true
          : currentSearchParams.status === "Passiv"
          ? false
          : undefined;

      // Call search API
      await searchWorkers({
        username: currentSearchParams.username || undefined,
        name: currentSearchParams.name || undefined,
        surname: currentSearchParams.surname || undefined,
        patronymic: currentSearchParams.patronymic || undefined,
        phone: currentSearchParams.phone || undefined,
        enabled,
      });
      // The searchWorkers action in the store already updates the 'workers' state
      // which in turn updates filteredEmployees via the useEffect above.
    } catch (error) {
      console.error("Search error:", error);
      alert("Axtarış zamanı xəta baş verdi");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If the changed input is 'username', apply debouncing
    if (name === "username") {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        performSearch({ ...searchParams, [name]: value }); // Use the updated value
      }, 500); // Debounce time: 500ms
    }
  };

  const handleSearchButtonClick = () => {
    // Clear any pending debounce timeout when the search button is clicked
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    performSearch(searchParams);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Clear any pending debounce timeout when Enter is pressed
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      performSearch(searchParams);
    }
  };

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => navigation(`employee/${row.id}`),
      className: "info",
    },
    {
      icon: FiEdit3,
      action: (row) => navigation(`edit-employee/${row.id}`),
      className: "edit",
    },
    {
      icon: GoTrash,
      action: async (row) => {
        const confirmDelete = window.confirm(
          `İşçini silmək istədiyinizə əminsiniz? (${row.username})`
        );
        if (confirmDelete) {
          try {
            await removeWorker(row.id);
            alert("İşçi uğurla silindi!");
          } catch (err) {
            alert("Silinmə zamanı xəta baş verdi.");
          }
        }
      },
      className: "delete",
    },
  ];

  return (
    <>
      <div className="employeesListWrapper">
        <OrdinaryListHeader
          title="İşçilər"
          addText="Yenisini əlavə et"
          addLink="/employees/employee-add"
          exportLink="/employees/export"
        />

        <div className="patientsListSearch">
          <div className="leftPart">
            <input
              name="username"
              placeholder="İstifadəçi adı"
              value={searchParams.username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <input
              name="name"
              placeholder="Ad"
              value={searchParams.name}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <input
              name="surname"
              placeholder="Soyad"
              value={searchParams.surname}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <input
              name="patronymic"
              placeholder="Ata adı"
              value={searchParams.patronymic}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <input
              name="phone"
              placeholder="Telefon"
              value={searchParams.phone}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button className="cursor-pointer" onClick={handleSearchButtonClick}>
              <CiSearch className="searchBTN" />
            </button>
          </div>
          <div className="rightPart">
            <select
              className="workersStatusChecker"
              name="status"
              value={searchParams.status}
              onChange={handleInputChange}
            >
              <option value="">Hamısı</option>
              <option value="Aktiv">Aktiv</option>
              <option value="Passiv">Passiv</option>
            </select>
          </div>
        </div>

        <div className="employeesTableWrapper">
          {loading ? (
            <p>Yüklənir...</p>
          ) : (
            <table className="employeesTable">
              <thead>
                <tr>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> İstifadəçi
                        adı
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> Ad
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> Soyad
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> Ata adı
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> Telefon
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> Rollar
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> İş qrafiki
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>Status</span>
                    </div>
                  </th>
                  <th>
                    <div className="th-content">
                      <span>Düzəliş</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.username}</td>
                    <td>{emp.name}</td>
                    <td>{emp.surname}</td>
                    <td>{emp.patronymic}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.permissions?.join(", ")}</td>
                    <td>
                      <Link
                        className="employeeScheduleTableData"
                        to={`work-schedule/${emp.id}`}
                      >
                        <CiCalendar className="employeeScheduleTableDataIcon" />{" "}
                        İş qrafiki
                      </Link>
                    </td>
                    <td>
                      <span
                        className={`status ${
                          emp.enabled ? "active" : "passive"
                        }`}
                      >
                        {getStatus(emp)}
                      </span>
                    </td>
                    <td>
                      <div className="icons flex gap-3 cursor-pointer">
                        {icons.map((iconObj, idx) => (
                          <iconObj.icon
                            key={idx}
                            className={iconObj.className}
                            onClick={() => iconObj.action(emp)}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeesList;