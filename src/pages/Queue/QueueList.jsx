import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import "../../assets/style/QueuePage/queuelist.css";
import useReservationStore from "../../../stores/reservationStore";

function QueueList() {
  const [searchName, setSearchName] = useState("");
  const [searchSurname, setSearchSurname] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const {
    reservations,
    fetchReservations,
    removeReservation,
    searchReservations,
    fetchReservationById,
    loading,
    error,
  } = useReservationStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleSearch = async () => {
    const filters = {
      patientName: searchName,
      patientSurname: searchSurname,
      mobilePhone: searchPhone,
      doctorName: searchDoctor,
      status: searchStatus,
    };
    await searchReservations(filters);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu rezervasiyanı silmək istədiyinizə əminsiniz?")) {
      await removeReservation(id);
    }
  };
  const handleEdit = (id) => {
    navigate(`/queue/edit-queue/${id}`);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5); // Extract HH:MM from HH:MM:SS
  };

  const filteredReservations = reservations.filter((reservation) => {
    const fullName = reservation.patient || "";
    const nameParts = fullName.toLowerCase().split(" ");
    const name = nameParts[0] || "";
    const surname = nameParts.slice(1).join(" ") || "";

    return (
      name.includes(searchName.toLowerCase()) &&
      surname.includes(searchSurname.toLowerCase()) &&
      (reservation.mobilePhone || "").includes(searchPhone) &&
      (reservation.doctor || "")
        .toLowerCase()
        .includes(searchDoctor.toLowerCase()) &&
      (reservation.status || "")
        .toLowerCase()
        .includes(searchStatus.toLowerCase())
    );
  });

  return (
    <div className="queuePageContainer">
      <OrdinaryListHeader
        title="Növbə gözləyənlər"
        addText="Yenisini əlavə et"
        addLink="/queue/add-new"
        exportLink="/queue/export"
      />

      <div className="queueSearchInputs">
        <div className="leftPart">
          <input
            type="text"
            placeholder="Ad"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Soyad"
            value={searchSurname}
            onChange={(e) => setSearchSurname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobil nömrə"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Həkim adı"
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
          />
          <CiSearch className="searchBTN" onClick={handleSearch} />
        </div>
        <div className="rightPart">
          <select
            className="workersStatusChecker"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="ACTIVE">Aktiv</option>
            <option value="PASSIVE">Passiv</option>
          </select>
        </div>
      </div>

      <div className="queueListWrapper">
        {loading && <div className="loading-message">Yüklənir...</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="queueListTableWrapper">
          <table className="queueListTable">
            <thead>
              <tr>
                <th>Pasiyent</th>
                <th>Mobil nömrə</th>
                <th>Həkim</th>
                <th>Başlama tarixi</th>
                <th>Bitiş tarixi</th>
                <th>Başlama saatı</th>
                <th>Bitiş saatı</th>
                <th>Status</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>
                    <div className="queueListAvatarNameWrapper">
                      {reservation.patient}
                    </div>
                  </td>
                  <td>{reservation.mobilePhone}</td>
                  <td>{reservation.doctor}</td>
                  <td>{reservation.startDate}</td>
                  <td>{reservation.endDate}</td>
                  <td>{formatTime(reservation.startTime)}</td>
                  <td>{formatTime(reservation.endTime)}</td>
                  <td>
                    <span
                      className={`queueListStatus ${
                        reservation.status === "ACTIVE" ? "active" : "passive"
                      }`}>
                      {reservation.status === "ACTIVE" ? "Aktiv" : "Passiv"}
                    </span>
                  </td>
                  <td>
                    <div className="queueListActionsWrapper">
                      <FiEdit3
                        className="queueListIcon edit"
                        onClick={() => handleEdit(reservation.id)}
                      />
                      <GoTrash
                        className="queueListIcon delete"
                        onClick={() => handleDelete(reservation.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filteredReservations.length === 0 && (
            <div className="queueListNoResults">Nəticə tapılmadı.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QueueList;
