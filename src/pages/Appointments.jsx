import React, { useState, useEffect, useRef } from "react";
import {
  format,
  addDays,
  subWeeks,
  addWeeks,
  startOfWeek,
  isSameDay,
  parse,
  addMinutes,
  differenceInMinutes,
} from "date-fns";
import { az } from "date-fns/locale";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import { TbCalendarPlus } from "react-icons/tb";
import CustomSelect from "../components/CustomSelect.jsx";
import { useNavigate } from "react-router-dom";
import useGeneralCalendarStore from "../../stores/appointments";
import "../assets/style/appointments.css"

const WEEKDAYS_SHORT = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];
const startTime = "06:30";
const endTime = "23:00";
const intervalMinutes = 30;

// İş saatları listini yaratma
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

// Randevu blokları üçün təsadüfi rəng yaratmaq
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 150) + 50;
  const g = Math.floor(Math.random() * 150) + 50;
  const b = Math.floor(Math.random() * 150) + 50;
  return `rgb(${r}, ${g}, ${b}, 0.7)`;
};

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
  const [appointmentColors, setAppointmentColors] = useState({});
  const [debugInfo, setDebugInfo] = useState("");

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

  // Örnek datanı sabit olaraq əlavə edirik
  const sampleData = [
    {
      patientName: "Zena Thompson",
      appointment: "MEETING",
      date: "2024-09-09",
      time: "07:00:00",
      period: "00:30:00",
      cabinetName: "STOM10",
    },
  ];

  useEffect(() => {
    fetchDoctors();
    fetchRooms();
  }, [fetchDoctors, fetchRooms]);

  useEffect(() => {
    if (doctors.length > 0 && selectedDoctorId === null && selectedRoom === null) {
      const defaultDoctor = doctors[0];
      setSelectedDoctorId(defaultDoctor.doctorId);
      fetchDoctorPatients(defaultDoctor.doctorId);
    }
  }, [doctors, selectedDoctorId, selectedRoom]);

  useEffect(() => {
    if (selectedDoctorId) {
      console.log("Fetching doctor patients for ID:", selectedDoctorId);
      setDebugInfo(`Həkim ID: ${selectedDoctorId} üçün randevular yüklənir...`);
      fetchDoctorPatients(selectedDoctorId);
      setSelectedRoom(null);
    }
  }, [selectedDoctorId, fetchDoctorPatients]);

  useEffect(() => {
    if (selectedRoom) {
      console.log("Fetching room patients for:", selectedRoom.value);
      setDebugInfo(`Otaq: ${selectedRoom.value} üçün randevular yüklənir...`);
      fetchRoomPatients(selectedRoom.value);
      setSelectedDoctorId(null);
    }
  }, [selectedRoom, fetchRoomPatients]);

  useEffect(() => {
    console.log("Appointments updated:", appointments);
    setDebugInfo(`${appointments.length} randevu yükləndi`);

    // Sabit datanı appointments ilə birləşdir
    const allAppointments = [...appointments, ...sampleData];
    const newAppointmentColors = {};
    allAppointments.forEach((appointment) => {
      const uniqueKey = `${appointment.patientName}-${appointment.date}-${appointment.time}`;
      if (!appointmentColors[uniqueKey]) {
        newAppointmentColors[uniqueKey] = generateRandomColor();
      }
    });
    setAppointmentColors((prevColors) => ({
      ...prevColors,
      ...newAppointmentColors,
    }));
  }, [appointments]);

  const handleRoomChange = (option) => {
    console.log("Room selected:", option);
    setSelectedRoom(option);
    setSelectedDoctorId(null);
    if (option) {
      fetchRoomPatients(option.value);
    } else if (doctors.length > 0) {
      const defaultDoctor = doctors[0];
      setSelectedDoctorId(defaultDoctor.doctorId);
      fetchDoctorPatients(defaultDoctor.doctorId);
    }
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

  const getAppointmentStyle = (appointment) => {
    try {
      const cellHeightPx = 60;
      const appointmentStartTime = parse(
        appointment.time,
        "HH:mm:ss",
        new Date()
      );

      const [periodHours, periodMinutes, periodSeconds] = appointment.period
        .split(":")
        .map(Number);
      const periodInMinutes =
        periodHours * 60 + periodMinutes + Math.round(periodSeconds / 60);

      const appointmentEndTime = addMinutes(
        appointmentStartTime,
        periodInMinutes
      );

      const scheduleStartTimeAsDate = parse(startTime, "HH:mm", new Date());

      const offsetMinutes = differenceInMinutes(
        appointmentStartTime,
        scheduleStartTimeAsDate
      );

      const totalDurationMinutes = differenceInMinutes(
        appointmentEndTime,
        appointmentStartTime
      );

      const pixelsPerMinute = cellHeightPx / intervalMinutes;

      const top = offsetMinutes * pixelsPerMinute;
      const height = totalDurationMinutes * pixelsPerMinute;

      const uniqueKey = `${appointment.patientName}-${appointment.date}-${appointment.time}`;
      const backgroundColor =
        appointmentColors[uniqueKey] || generateRandomColor();

      return {
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: backgroundColor,
        borderRadius: "4px",
        padding: "5px",
        overflow: "hidden",
        fontSize: "0.85em",
        color: "white",
        fontWeight: "bold",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        left: "1px",
        width: "calc(100% - 2px)",
        position: "absolute",
      };
    } catch (error) {
      console.error("Error calculating appointment style:", error, appointment);
      return {
        display: "none",
      };
    }
  };

  return (
    <div className="appointments-container">
      <div className="left-side">
        <div className="select-options-container">
          <CustomSelect
            options={rooms.map((room) => ({
              value: room.cabinetName,
              label: room.cabinetName,
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
          {!loading && filteredDoctors.length === 0 && (
            <div className="no-doctors">Axtarışa uyğun həkim tapılmadı</div>
          )}
          {!loading &&
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.doctorId}
                className={`doctor-card ${
                  selectedDoctorId === doctor.doctorId ? "selected" : ""
                }`}
                onClick={() => {
                  console.log("Doctor selected:", doctor.doctorId, doctor.name);
                  setSelectedDoctorId(doctor.doctorId);
                  setSelectedRoom(null);
                  fetchDoctorPatients(doctor.doctorId);
                }}
              >
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
                onClick={() => navigate("/appointments/add")}
              >
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

        <div className="debug-info">
          {debugInfo}
          {selectedDoctorId && ` | Seçilmiş həkim ID: ${selectedDoctorId}`}
          {selectedRoom && ` | Seçilmiş otaq: ${selectedRoom.value}`}
          {` | Cəmi randevular: ${appointments.length + sampleData.length}`}
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
                    }`}
                  >
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

            {weekDates.map((date, dayIndex) => {
              const allAppointments = [...appointments, ...sampleData];
              const dayAppointments = allAppointments.filter((appointment) => {
                try {
                  const appointmentDate = parse(
                    appointment.date,
                    "yyyy-MM-dd",
                    new Date()
                  );
                  return isSameDay(appointmentDate, date);
                } catch (error) {
                  console.error(
                    "Error filtering appointments by date:",
                    error,
                    appointment
                  );
                  return false;
                }
              });

              return (
                <div key={dayIndex} className="day-column">
                  <div className="time-blocks-container">
                    {WORK_HOURS.map((time, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="schedule-cell-empty"
                        onClick={() =>
                          navigate("/appointments/add", {
                            state: {
                              selectedDateTime: {
                                date: format(date, "yyyy-MM-dd"),
                                time,
                              },
                            },
                          })
                        }
                      ></div>
                    ))}

                    {dayAppointments.map((appointment, apIndex) => (
                      <div
                        key={`${appointment.patientName}-${appointment.date}-${appointment.time}-${apIndex}`}
                        className="appointment-event-block"
                        style={getAppointmentStyle(appointment)}
                      >
                        <div className="appointment-event-content">
                          {appointment.patientName} <br />
                          <small>
                            {appointment.time?.slice(0, 5)} -{" "}
                            {format(
                              addMinutes(
                                parse(appointment.time, "HH:mm:ss", new Date()),
                                parse(
                                  appointment.period,
                                  "HH:mm:ss",
                                  new Date()
                                ).getHours() * 60 +
                                  parse(
                                    appointment.period,
                                    "HH:mm:ss",
                                    new Date()
                                  ).getMinutes() +
                                  Math.round(
                                    parse(
                                      appointment.period,
                                      "HH:mm:ss",
                                      new Date()
                                    ).getSeconds() / 60
                                  )
                              ),
                              "HH:mm"
                            )}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;