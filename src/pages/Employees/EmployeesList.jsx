import React, { useEffect, useState } from "react";
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import { CiSearch, CiCircleInfo, CiCalendar } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import "../../assets/style/EmployeesPage/employeespage.css";
import useEmployeeStore from "../../../stores/workerStore";
import { useNavigate, Link } from "react-router-dom";
import "./EmployeList.css";

const EmployeesList = () => {
  const {
    workers,
    fetchWorkers,
    searchWorkers,
    removeWorker,
    searchResult,
    loading,
    setSearchResult,
  } = useEmployeeStore();

  const [searchParams, setSearchParams] = useState({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    enabled: "", // Changed from 'status' to 'enabled'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  useEffect(() => {
    if (
      workers.length > 0 &&
      searchResult.length === 0 &&
      Object.values(searchParams).every((val) => val === "" || val === undefined) // Adjusted check for empty search params
    ) {
      setSearchResult(workers);
    }
  }, [workers, searchResult, setSearchResult, searchParams]);

  const getStatus = (emp) => (emp.enabled ? "Aktiv" : "Passiv");
  const navigation = useNavigate();

  const handleSearch = async () => {
    try {
      // Check if all search parameters are empty (including the new 'enabled' field)
      const allSearchParamsEmpty = Object.values(searchParams).every(
        (val) => val === "" || val === undefined
      );

      if (allSearchParamsEmpty) {
        await fetchWorkers();
        const updatedWorkers = useEmployeeStore.getState().workers;
        setSearchResult(updatedWorkers);
        setCurrentPage(1); // reset page
        return;
      }

      // Convert 'enabled' string value from select to boolean or undefined
      const enabledBoolean =
        searchParams.enabled === "true"
          ? false
          : searchParams.enabled === "true"
          ? true
          : undefined;

      await searchWorkers({
        username: searchParams.username || undefined,
        name: searchParams.name || undefined,
        surname: searchParams.surname || undefined,
        patronymic: searchParams.patronymic || undefined,
        phone: searchParams.phone || undefined,
        enabled: enabledBoolean, // Use the converted boolean value
      });

      setCurrentPage(1); // reset page
    } catch (error) {
      console.error("Axtarış xətası:", error);
      alert("Axtarış zamanı xəta baş verdi");
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));

    // To ensure the state is updated before running the check for all empty,
    // we can use the callback form of setSearchParams or use a setTimeout
    // for immediate search after state update.
    // For simplicity, we'll re-evaluate based on the *new* state for the debounce.
    const newSearchParams = { ...searchParams, [name]: value };

    // Trigger search immediately if the input is cleared
    // Check if ALL search parameters are now empty (considering the new value)
    if (Object.values(newSearchParams).every((val) => val === "" || val === undefined)) {
        await fetchWorkers();
        const updatedWorkers = useEmployeeStore.getState().workers;
        setSearchResult(updatedWorkers);
        setCurrentPage(1);
    } else {
        // Debounce search for other changes (typing, clearing just one field)
        setTimeout(() => {
            handleSearch();
        }, 300); // Increased debounce to 300ms for better user experience
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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

            const allSearchParamsEmpty = Object.values(searchParams).every(
              (val) => val === "" || val === undefined
            );

            if (allSearchParamsEmpty) {
              await fetchWorkers();
              const updatedWorkers = useEmployeeStore.getState().workers;
              setSearchResult(updatedWorkers);
            } else {
              handleSearch();
            }
          } catch (err) {
            alert("Silinmə zamanı xəta baş verdi.");
          }
        }
      },
      className: "delete",
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = searchResult.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

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
            <button className="cursor-pointer" onClick={handleSearch}>
              <CiSearch className="searchBTN" />
            </button>
          </div>
          <div className="rightPart">
            <select
              className="workersStatusChecker"
              name="enabled" // Changed name to 'enabled'
              value={searchParams.enabled}
              onChange={handleInputChange}>
              <option value="">Hamısı</option>
              <option value="true">Aktiv</option> {/* Value is "true" string */}
              <option value="false">Passiv</option> {/* Value is "false" string */}
            </select>
          </div>
        </div>

        <div className="employeesTableWrapper">
          {loading ? (
            <p>Yüklənir...</p>
          ) : (
            <>
              <table className="employeesTable">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <span>
                          <HiArrowsUpDown className="tableArrowIcon" />{" "}
                          İstifadəçi adı
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
                          <CiCalendar className="tableArrowIcon" /> İş qrafiki
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
                  {currentEmployees.map((emp) => (
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
                          to={`work-schedule/${emp.id}`}>
                          <CiCalendar className="employeeScheduleTableDataIcon" />{" "}
                          İş qrafiki
                        </Link>
                      </td>
                      <td>
                        <span
                          className={`status ${
                            emp.enabled ? "active" : "passive"
                          }`}>
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

              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`pagination-button ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeesList;