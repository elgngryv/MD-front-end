import React, { useEffect, useState } from "react";
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import "../../assets/style/EmployeesPage/employeespage.css";
import useEmployeeStore from "../../../stores/workerStore";
import { useNavigate, Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";

const EmployeesList = () => {
  // searchResult artıq birbaşa masada istifadə olunur.
  // setSearchResult funksiyasını da Zustanda əlavə edəcəyik.
  const { workers, fetchWorkers, searchWorkers, removeWorker, searchResult, loading, setSearchResult } = useEmployeeStore();

  const [searchParams, setSearchParams] = useState({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    status: "",
  });

  // filteredEmployees state-ini sildik, çünki artıq searchResult istifadə olunacaq.
  // const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  // İlk yüklənmədə və ya workers dəyişdikdə searchResult-u bütün işçilərlə doldurmaq üçün.
  // Bu, axtarış edilmədikdə cədvəlin boş qalmamasını təmin edir.
  useEffect(() => {
    // searchResult boşdursa və searchParams hamısı boşdursa (yəni aktiv axtarış yoxdursa)
    // workers datası varsa, searchResult-u workers ilə doldur.
    if (workers.length > 0 && searchResult.length === 0 && Object.values(searchParams).every(val => !val)) {
        setSearchResult(workers);
    }
  }, [workers, searchResult, setSearchResult, searchParams]);


  const getStatus = (emp) => (emp.enabled ? "Aktiv" : "Passiv");
  const navigation = useNavigate();

  const handleSearch = async () => {
    try {
      const allSearchParamsEmpty = Object.values(searchParams).every((val) => !val);

      if (allSearchParamsEmpty) {
        // Əgər bütün axtarış sahələri boşdursa, bütün işçiləri yenidən çağır
        // və searchResult-u tam siyahı ilə yenilə.
        await fetchWorkers(); // 'workers' state-in aktual olmasını təmin edir
        setSearchResult(workers); // Görünən siyahını bütün işçilərlə yenilə
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
      // searchResult artıq searchWorkers action tərəfindən mağazada yenilənəcək,
      // və cədvəl avtomatik yenidən render olacaq.
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
        const confirmDelete = window.confirm(`İşçini silmək istədiyinizə əminsiniz? (${row.username})`);
        if (confirmDelete) {
          try {
            await removeWorker(row.id);
            alert("İşçi uğurla silindi!");
            // Silmə əməliyyatından sonra siyahını yenilə
            const allSearchParamsEmpty = Object.values(searchParams).every((val) => !val);
            if (allSearchParamsEmpty) {
                // Əgər axtarış yoxdusa, bütün işçiləri yenidən çağır
                await fetchWorkers();
                setSearchResult(workers); // searchResult-u bütün işçilərlə yenilə
            } else {
                // Əgər axtarış aktiv idisə, axtarışı yenidən icra et
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
            <input name="username" placeholder="İstifadəçi adı" value={searchParams.username} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <input name="name" placeholder="Ad" value={searchParams.name} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <input name="surname" placeholder="Soyad" value={searchParams.surname} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <input name="patronymic" placeholder="Ata adı" value={searchParams.patronymic} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <input name="phone" placeholder="Telefon" value={searchParams.phone} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <button className="cursor-pointer" onClick={handleSearch}>
              <CiSearch className="searchBTN" />
            </button>
          </div>
          <div className="rightPart">
            <select className="workersStatusChecker" name="status" value={searchParams.status} onChange={handleInputChange}>
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
                  <th><div className="th-content"><span><HiArrowsUpDown className="tableArrowIcon" /> İstifadəçi adı</span></div></th>
                  <th><div className="th-content"><span><HiArrowsUpDown className="tableArrowIcon" /> Ad</span></div></th>
                  <th><div className="th-content"><span><HiArrowsUpDown className="tableArrowIcon" /> Soyad</span></div></th>
                  <th><div className="th-content"><span><HiArrowsUpDown className="tableArrowIcon" /> Ata adı</span></div></th>
                  <th><div className="th-content"><span><HiArrowsUpDown className="tableArrowIcon" /> Telefon</span></div></th>
                  <th><div className="th-content"><span><HiArrowsUpDown className="tableArrowIcon" /> Rollar</span></div></th>
                  <th><div className="th-content"><span><HiArrowsUpDown className="tableArrowIcon" /> İş qrafiki</span></div></th>
                  <th><div className="th-content"><span>Status</span></div></th>
                  <th><div className="th-content"><span>Düzəliş</span></div></th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((emp) => ( // filteredEmployees əvəzinə searchResult istifadə olunur
                  <tr key={emp.id}>
                    <td>{emp.username}</td>
                    <td>{emp.name}</td>
                    <td>{emp.surname}</td>
                    <td>{emp.patronymic}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.permissions?.join(", ")}</td>
                    <td><Link className="employeeScheduleTableData" to={`work-schedule/${emp.id}`}><CiCalendar className="employeeScheduleTableDataIcon" /> İş qrafiki</Link></td>
                    <td><span className={`status ${emp.enabled ? "active" : "passive"}`}>{getStatus(emp)}</span></td>
                    <td>
                      <div className="icons flex gap-3 cursor-pointer">
                        {icons.map((iconObj, idx) => (
                          <iconObj.icon key={idx} className={iconObj.className} onClick={() => iconObj.action(emp)} />
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