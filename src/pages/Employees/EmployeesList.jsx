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
    status: "",
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
      Object.values(searchParams).every((val) => !val)
    ) {
      setSearchResult(workers);
    }
  }, [workers, searchResult, setSearchResult, searchParams]);

  const getStatus = (emp) => (emp.enabled ? "Aktiv" : "Passiv");
  const navigation = useNavigate();

  const handleSearch = async () => {
    try {
      const allSearchParamsEmpty = Object.values(searchParams).every(
        (val) => !val
      );

      if (allSearchParamsEmpty) {
        await fetchWorkers();
        setSearchResult(workers);
        setCurrentPage(1); // reset page
        return;
      }

      const enabled =
        searchParams.status === "Aktiv"
          ? true
          : searchParams.status === "Passiv"
          ? false
          : undefined;

      await searchWorkers({
        username: searchParams.username || undefined,
        name: searchParams.name || undefined,
        surname: searchParams.surname || undefined,
        patronymic: searchParams.patronymic || undefined,
        phone: searchParams.phone || undefined,
        enabled,
      });

      setCurrentPage(1); // reset page
    } catch (error) {
      console.error("Axtarış xətası:", error);
      alert("Axtarış zamanı xəta baş verdi");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              (val) => !val
            );
            if (allSearchParamsEmpty) {
              await fetchWorkers();
              setSearchResult(workers);
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

  // Pagination hesablamaları
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = searchResult.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

  return (
    <>
<<<<<<< HEAD
    <div className="employeeListPageContainer"> 
      <div className="employeesListWrapper">
=======
      <div className="employeesListWrapper  ">
>>>>>>> 548667b490832379e4c7a3d68987f2292ac8d76f
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
              name="status"
              value={searchParams.status}
              onChange={handleInputChange}>
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
                          <HiArrowsUpDown className="tableArrowIcon" /> İş
                          qrafiki
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

              {/* Pagination düymələri */}
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
    </div>
    </>
  );
};

export default EmployeesList;
