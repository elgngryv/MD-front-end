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
    fetchByPermission,
    permissions,
    fetchPermissions,
  } = useEmployeeStore();

  const [searchParams, setSearchParams] = useState({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    enabled: "",
  });

  const [selectedPermission, setSelectedPermission] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigation = useNavigate();

  useEffect(() => {
    fetchWorkers();
    fetchPermissions();
  }, [fetchWorkers, fetchPermissions]);

  useEffect(() => {
    if (
      workers.length > 0 &&
      searchResult.length === 0 &&
      Object.values(searchParams).every(
        (val) => val === "" || val === undefined
      )
    ) {
      setSearchResult(workers);
    }
  }, [workers, searchResult, setSearchResult, searchParams]);

  const getStatus = (emp) => (emp.enabled ? "Aktiv" : "Passiv");

  const handlePermissionChange = async (e) => {
    const perm = e.target.value;
    setSelectedPermission(perm);

    if (perm === "") {
      setSearchResult(workers);
    } else {
      await fetchByPermission(perm);
      setCurrentPage(1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    // Reset other search parameters if a specific one is being typed
    // This is optional but can improve UX
    if (name !== 'enabled' && selectedPermission) {
      setSelectedPermission("");
    }
    
    // Use a timeout to debounce the search, preventing API calls on every keystroke
    setTimeout(() => {
      handleSearch({ ...searchParams, [name]: value });
    }, 300);
  };
  
  const handleSearch = async (currentParams) => {
    try {
      const allSearchParamsEmpty = Object.values(currentParams).every(
        (val) => val === "" || val === undefined
      );

      if (allSearchParamsEmpty && !selectedPermission) {
        await fetchWorkers();
        const updatedWorkers = useEmployeeStore.getState().workers;
        setSearchResult(updatedWorkers);
        setCurrentPage(1);
        return;
      }
      
      const enabledBoolean =
        currentParams.enabled === "true"
          ? true
          : currentParams.enabled === "false"
          ? false
          : undefined;

      await searchWorkers({
        username: currentParams.username || undefined,
        name: currentParams.name || undefined,
        surname: currentParams.surname || undefined,
        patronymic: currentParams.patronymic || undefined,
        phone: currentParams.phone || undefined,
        enabled: enabledBoolean,
      });

      setCurrentPage(1);
    } catch (error) {
      console.error("Axtarış xətası:", error);
      alert("Axtarış zamanı xəta baş verdi");
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
              handleSearch(searchParams);
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
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchParams)}
          />
          <input
            name="name"
            placeholder="Ad"
            value={searchParams.name}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchParams)}
          />
          <input
            name="surname"
            placeholder="Soyad"
            value={searchParams.surname}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchParams)}
          />
          <input
            name="patronymic"
            placeholder="Ata adı"
            value={searchParams.patronymic}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchParams)}
          />
          <input
            name="phone"
            placeholder="Telefon"
            value={searchParams.phone}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchParams)}
          />
          <button className="cursor-pointer" onClick={() => handleSearch(searchParams)}>
            <CiSearch className="searchBTN" />
          </button>
        </div>

        <div className="rightPart">
          <select value={selectedPermission} onChange={handlePermissionChange}>
            <option value="">Hamısı</option>
            {permissions.map((perm) => (
              <option key={perm.id} value={perm.permissionName}>
                {perm.permissionName}
              </option>
            ))}
          </select>

          <select
            className="workersStatusChecker"
            name="enabled"
            value={searchParams.enabled}
            onChange={handleInputChange}>
            <option value="">Hamısı</option>
            <option value="true">Aktiv</option>
            <option value="false">Passiv</option>
          </select>
        </div>
      </div>

      <div className="employeesTableWrapper">
        {loading ? (
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
            </div>
          </div>
        ) : (
          <>
            <table className="employeesTable">
              <thead>
                <tr>
                  <th>
                    <div className="th-content">
                      <span>
                        <HiArrowsUpDown className="tableArrowIcon" /> İstifadəçi adı
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
  );
};

export default EmployeesList;