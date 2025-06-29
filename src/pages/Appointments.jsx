import React, { useState, useEffect, useRef } from "react";
import {
  format,
  addDays,
  subWeeks,
  addWeeks,
  startOfWeek,
  isSameDay,
} from "date-fns";
import { az } from "date-fns/locale";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import { TbCalendarPlus } from "react-icons/tb";
import CustomSelect from "../components/CustomSelect.jsx";
import { useNavigate } from "react-router-dom";
import useGeneralCalendarStore from "../../stores/appointments";
import "../assets/style/appointments.css";
import "../assets/style/appointment-left-side.css";

const WEEKDAYS_SHORT = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];
const startTime = "00:00";
const endTime = "23:30";
const intervalMinutes = 30;

const WORK_HOURS = [];
const [startHour, startMinute] = startTime.split(":").map(Number);
const [endHour, endMinute] = endTime.split(":").map(Number);

let currentMinutes = startHour * 60 + startMinute;
const endTotalMinutes = endHour * 60 + endMinute;

while (currentMinutes <= endTotalMinutes) {
  const hour = String(Math.floor(currentMinutes / 60)).padStart(2, "0");
  const minute = String(currentMinutes % 60).padStart(2, "0");
  WORK_HOURS.push(`${hour}:${minute}`);
  currentMinutes += intervalMinutes;
}

const Appointments = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    doctors,
    rooms,
    appointments,
    loading,
    fetchDoctors,
    fetchRooms,
    fetchDoctorPatients,
    fetchRoomPatients,
  } = useGeneralCalendarStore();

  // 1. Fetch doctors & rooms on mount
  useEffect(() => {
    fetchDoctors();
    fetchRooms();
  }, [fetchDoctors, fetchRooms]);

  // 2. Set default doctor and fetch appointments
  useEffect(() => {
    if (doctors.length > 0 && selectedDoctorId === null) {
      const defaultDoctor = doctors[0];
      setSelectedDoctorId(defaultDoctor.doctorId);
      fetchDoctorPatients(defaultDoctor.doctorId);
    }
  }, [doctors, selectedDoctorId, fetchDoctorPatients]);

  // 3. Fetch appointments when doctor changes
  useEffect(() => {
    if (selectedDoctorId) {
      fetchDoctorPatients(selectedDoctorId);
    }
  }, [selectedDoctorId, fetchDoctorPatients]);

  // 4. Fetch appointments when room changes
  useEffect(() => {
    if (selectedRoom) {
      fetchRoomPatients(selectedRoom.value);
    }
  }, [selectedRoom, fetchRoomPatients]);

  const handleRoomChange = (option) => {
    setSelectedRoom(option);
    setSelectedDoctorId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const weekDates = [...Array(7)].map((_, i) => addDays(selectedWeekStart, i));
  const dateRangeText = `${format(weekDates[0], "d MMMM", {
    locale: az,
  })} - ${format(weekDates[6], "d MMMM", { locale: az })}`;

  const goToPreviousWeek = () =>
    setSelectedWeekStart(subWeeks(selectedWeekStart, 1));
  const goToNextWeek = () =>
    setSelectedWeekStart(addWeeks(selectedWeekStart, 1));
  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const selectDate = (date) => {
    setSelectedWeekStart(startOfWeek(date, { weekStartsOn: 1 }));
    setShowCalendar(false);
  };

  return (
    <div className="appointments-container">
      <div className="left-side">
        <div className="select-options-container">
          <CustomSelect
            options={rooms.map((room) => ({
              value: room.room,
              label: room.room,
            }))}
            onChange={handleRoomChange}
            placeholder="Otaq seç"
            value={selectedRoom}
            isClearable
            isSearchable
          />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Həkim axtar..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="doctors-container">
          {loading && <div className="loading-bar">Yüklənir...</div>}
          {!loading &&
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.doctorId}
                className={`doctor-card ${
                  selectedDoctorId === doctor.doctorId ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedDoctorId(doctor.doctorId);
                  setSelectedRoom(null);
                }}>
                <div className="doctor-image-container">
                  <img
                    src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                      doctor.name.replace(" ", "+")
                    )}`}
                    alt={doctor.name}
                    className="doctor-image"
                  />
                </div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-position">{doctor.position}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="right-side">
        <div className="schedule-header">
          <div className="date-and-navigation">
            <div className="date-display">
              <div className="current-month">
                {format(currentDate, "MMMM", { locale: az })}
              </div>
              <div className="date-range">{dateRangeText}</div>
            </div>
            <div className="navigation-controls">
              <button className="calendar-button" onClick={toggleCalendar}>
                <FiCalendar />
              </button>
              <button className="nav-button" onClick={goToPreviousWeek}>
                <IoIosArrowBack />
              </button>
              <button className="nav-button" onClick={goToNextWeek}>
                <IoIosArrowForward />
              </button>
              <button
                className="addNewAppointment"
                onClick={() => navigate("./add")}>
                <TbCalendarPlus className="addNewAppointmentIcon" />
                Yeni randevu əlavə et
              </button>
              {showCalendar && (
                <div className="calendar-dropdown" ref={calendarRef}>
                  {/* SimpleCalendar buraya inteqrasiya edilə bilər */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="schedule-content">
          <div className="schedule-grid">
            <div className="time-column time-header">
              <div className="time-cell"></div>
            </div>

            {weekDates.map((date, i) => (
              <div key={i} className="day-column day-header">
                <div className="day-cell">
                  <div className="day-name">{WEEKDAYS_SHORT[i]}</div>
                  <div
                    className={`day-date ${
                      isSameDay(date, new Date()) ? "active" : ""
                    }`}>
                    {format(date, "d")}
                  </div>
                </div>
              </div>
            ))}

            <div className="time-column">
              {WORK_HOURS.map((time, i) => (
                <div key={i} className="time-cell">
                  {time}
                </div>
              ))}
            </div>

            {weekDates.map((date, dayIndex) => (
              <div key={dayIndex} className="day-column">
                <div className="time-blocks-container">
                  {WORK_HOURS.map((time, timeIndex) => {
                    const appointmentsInSlot = appointments.filter(
                      (appointment) => {
                        const appointmentDate = new Date(appointment.date);
                        const appointmentTime = appointment.time?.slice(0, 5); // HH:mm
                        return (
                          isSameDay(appointmentDate, date) &&
                          appointmentTime === time
                        );
                      }
                    );

                    return (
                      <div
                        key={timeIndex}
                        className="schedule-cell"
                        onClick={() =>
                          navigate("/add-new-appointment", {
                            state: {
                              selectedDateTime: {
                                date: format(date, "yyyy-MM-dd"),
                                time,
                              },
                            },
                          })
                        }>
                        {appointmentsInSlot.map((appointment, i) => (
                          <div key={i} className="appointment-event">
                            {appointment.patientName}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
