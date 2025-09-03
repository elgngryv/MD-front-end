import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Icons
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash, GoChevronLeft, GoChevronRight } from "react-icons/go";

// Style
import "../../assets/style/PatientsPage/patientslist.css";

// Components
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";

const initialSearch = {
  name: "",
  surname: "",
  patronymic: "",
  fin: "",
  phone: "",
  gender: "",
  status: "",
};

function PatientsList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://161.97.179.107:5555/api/v1/patient/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const removePatient = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://161.97.179.107:5555/api/v1/patient/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const filteredData = [...data]
    .reverse()
    .filter(
      (item) =>
        (item.name || "")
          .toLowerCase()
          .includes(search.name.toLowerCase()) &&
        (item.surname || "")
          .toLowerCase()
          .includes(search.surname.toLowerCase()) &&
        (item.patronymic || "")
          .toLowerCase()
          .includes(search.patronymic.toLowerCase()) &&
        (item.finCode || "")
          .toLowerCase()
          .includes(search.fin.toLowerCase()) &&
        (item.phone || "")
          .toLowerCase()
          .includes(search.phone.toLowerCase()) &&
        (search.gender ? item.genderStatus === search.gender : true) &&
        (search.status ? item.priceCategoryName === search.status : true)
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => navigate(`patient/${row.id}/general`),
      className: "info",
    },
    {
      icon: GoTrash,
      action: (row) => {
        const confirmed = window.confirm(
          `Silmək istədiyinizə əminsiniz? (${row.name})`
        );
        if (confirmed) {
          removePatient(row.id);
        }
      },
      className: "delete",
    },
  ];

  return (
    <>
      <div className="patientsListWrapper">
        <OrdinaryListHeader
          title="Pasiyentlər"
          addText="Yenisini əlavə et"
          addLink="/patients/add-patient"
          exportLink="/patients/export"
        />
        <div className="patientsListSearch">
          <div className="leftPart">
            <input
              type="text"
              placeholder="Ad"
              value={search.name}
              onChange={(e) => setSearch({ ...search, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Soyad"
              value={search.surname}
              onChange={(e) =>
                setSearch({ ...search, surname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Ata adı"
              value={search.patronymic}
              onChange={(e) =>
                setSearch({ ...search, patronymic: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Fin kodu"
              value={search.fin}
              onChange={(e) => setSearch({ ...search, fin: e.target.value })}
            />
            <input
              type="number"
              placeholder="Mobil nömrə"
              value={search.phone}
              onChange={(e) => setSearch({ ...search, phone: e.target.value })}
            />
          </div>
          <div className="rightPart">
            <select
              value={search.gender}
              onChange={(e) =>
                setSearch({ ...search, gender: e.target.value })
              }
            >
              <option value="">Cinsiyyət</option>
              <option value="MAN">Kişi</option>
              <option value="WOMAN">Qadın</option>
            </select>
            <select
              value={search.status}
              onChange={(e) =>
                setSearch({ ...search, status: e.target.value })
              }
            >
              <option value="">Status</option>
              <option value="Vip">Vip</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
        </div>

        <div className="tableWrapper">
          <table className="employeeTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Ata adı</th>
                <th>Fin kodu</th>
                <th>Cinsiyyət</th>
                <th>Mobil nömrə</th>
                <th>Doğum Tarixi</th>
                <th>Qara siyahı</th>
                <th>Düzəliş</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.patronymic}</td>
                  <td>{item.finCode}</td>
                  <td>{item.genderStatus === "MAN" ? "Kişi" : "Qadın"}</td>
                  <td>{item.phone}</td>
                  <td>{item.dateOfBirth}</td>
                  <td>{item.isBlocked ? "Bəli" : "Xeyr"}</td>
                  <td>
                    <div className="actionsWrapper">
                      {icons.map((iconObj, idx) => {
                        const IconComponent = iconObj.icon;
                        return (
                          <IconComponent
                            key={idx}
                            className={`icon ${iconObj.className}`}
                            onClick={() => iconObj.action(item)}
                          />
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GoChevronLeft />
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GoChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default PatientsList;
