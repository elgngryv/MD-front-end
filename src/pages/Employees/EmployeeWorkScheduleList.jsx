import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import useWorkersScheduleStore from "../../../stores/workersScheduleStore";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

import "../../assets/style/EmployeesPage/employeeworkschedulelist.css";

function LoadingSpinner() {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      </div>
    </div>
  );
}

const weekDays = [
  { key: "MONDAY", label: "Bazar ertəsi" },
  { key: "TUESDAY", label: "Çərşənbə axşamı" },
  { key: "WEDNESDAY", label: "Çərşənbə" },
  { key: "THURSDAY", label: "Cümə axşamı" },
  { key: "FRIDAY", label: "Cümə" },
  { key: "SATURDAY", label: "Şənbə" },
  { key: "SUNDAY", label: "Bazar" },
];

function EmployeeWorkScheduleList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    schedules,
    loading,
    error,
    fetchSchedules,
    removeSchedule,
  } = useWorkersScheduleStore();

  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Filtered schedules by selected day
  const filteredSchedules = selectedDay
    ? schedules.filter((s) => s.weekDay === selectedDay)
    : schedules;

  const handleEdit = (item) => {
    const scheduleId = typeof item === "object" ? item.id : item;
    navigate(`/employees/work-schedule/${scheduleId}/edit`);
  };

  const handleDelete = (schedule) => {
    if (window.confirm("Qrafiki silmək istədiyinizə əminsiniz?")) {
      removeSchedule(schedule.id);
    }
  };

  return (
    <div className="employeeWorkScheduleList">
      <div className="ews-table-controls-bar" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 24px 0 24px'}}>
        <select
          className="ews-filter-select"
          value={selectedDay}
          onChange={e => setSelectedDay(e.target.value)}
        >
          <option value="">Həftənin Günü</option>
          {weekDays.map((d) => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
        <Link to={"./add"} className="anamnesisList-add-new-button">
          <span>+</span> Yenisini əlavə et
        </Link>
      </div>
      <div className="ews-table-wrapper">
        <table className="ews-table">
          <thead>
            <tr>
              <th>
                <span className="firstElementOfTHS">
                  <HiOutlineArrowsUpDown />
                  {filteredSchedules.length ? `1-${filteredSchedules.length}` : "0"}
                </span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown /> Həftənin Günü</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown /> Kabinet</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown /> Başlama saatı</span>
              </th>
              <th>
                <span><HiOutlineArrowsUpDown /> Bitış saatı</span>
              </th>
              <th>
                <span>Düzəliş</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Yüklənir...</td>
              </tr>
            ) : filteredSchedules.length === 0 ? (
              <tr>
                <td colSpan="6">Heç bir qrafik tapılmadı.</td>
              </tr>
            ) : (
              filteredSchedules.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{weekDays.find(d => d.key === row.weekDay)?.label || row.weekDay}</td>
                  <td>{row.room}</td>
                  <td>{formatTime(row.startTime)}</td>
                  <td>{formatTime(row.finishTime)}</td>
                  <td>
                    <div className="anamnesisList-action-icons">
                      <FiEdit3
                        className="anamnesisList-edit-button"
                        onClick={() => handleEdit(row)}
                      />
                      <GoTrash
                        className="anamnesisList-delete-button"
                        onClick={() => handleDelete(row)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {error && <p className="errorText">Xəta baş verdi: {error.message}</p>}
    </div>
  );
}

function formatTime(timeStr) {
  // timeStr can be string or object
  if (!timeStr) return "";
  if (typeof timeStr === "string") return timeStr.slice(0, 5);
  if (typeof timeStr === "object" && timeStr.hour !== undefined && timeStr.minute !== undefined) {
    return `${String(timeStr.hour).padStart(2, "0")}:${String(timeStr.minute).padStart(2, "0")}`;
  }
  return "";
}

export default EmployeeWorkScheduleList;
