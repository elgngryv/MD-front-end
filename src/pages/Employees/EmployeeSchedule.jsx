"use client";

import { useState, useEffect, useMemo } from "react";
import { FiChevronLeft, FiChevronRight, FiX, FiCalendar } from "react-icons/fi";
import "./EmployeeSchedule.css";

// Həftə günləri və qısa adlar
const weekDays = [
  { key: "MONDAY", label: "B.e" },
  { key: "TUESDAY", label: "Ç.a" },
  { key: "WEDNESDAY", label: "Ç." },
  { key: "THURSDAY", label: "C.a" },
  { key: "FRIDAY", label: "C." },
  { key: "SATURDAY", label: "Ş." },
  { key: "SUNDAY", label: "B." },
];

const azMonths = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "İyun",
  "İyul",
  "Avqust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

// Saatı formatlamaq üçün funksiya
function formatTime(timeStr) {
  if (!timeStr) return "";
  return timeStr.slice(0, 5);
}

// Həftənin bazar ertəsini tap
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

// Həftənin bütün günlərini qaytar
function getWeekDates(startDate) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

// Rəng seçimi üçün funksiya
const blockColors = ["blue", "green", "pink", "red"];
function getBlockColor(idx) {
  return blockColors[idx % blockColors.length];
}

// Generate 30-minute time intervals between two times
function generateTimeIntervals(startTime, endTime) {
  const intervals = [];
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);

  let hour = start[0];
  let minute = start[1];

  while (hour < end[0] || (hour === end[0] && minute < end[1])) {
    intervals.push({
      hour,
      minute,
      timeStr: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`,
    });

    minute += 30;
    if (minute >= 60) {
      hour += 1;
      minute -= 60;
    }
  }

  return intervals;
}

// Get number of 30-min intervals between two times
function getIntervalCount(startTime, endTime) {
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);
  const minutes = end[0] * 60 + end[1] - (start[0] * 60 + start[1]);
  return Math.ceil(minutes / 30);
}

const EmployeeSchedule = () => {
  // Həftənin başlanğıc günü
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [schedules, setSchedules] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Select values
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  // Həftənin günləri və tarixləri
  const weekDates = getWeekDates(weekStart);
  const today = new Date();
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();
  const monthName = azMonths[weekStart.getMonth()];
  const rangeStr = `${weekDates[0].getDate()} ${monthName} - ${weekDates[6].getDate()} ${monthName}`;

  // API-dan məlumatları yüklə
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // İşçiləri yüklə
        const employeesResponse = await fetch(
          "http://195.7.6.10:5555/api/v1/add-worker/read",
          {
            headers,
          }
        );

        if (!employeesResponse.ok) {
          throw new Error(
            `Failed to fetch employees: ${employeesResponse.status}`
          );
        }

        const employeesData = await employeesResponse.json();
        setEmployees(employeesData);

        // Qrafikləri yüklə
        const schedulesResponse = await fetch(
          "http://195.7.6.10:5555/api/v1/workers-work-schedule/read",
          {
            headers,
          }
        );

        if (!schedulesResponse.ok) {
          throw new Error(
            `Failed to fetch schedules: ${schedulesResponse.status}`
          );
        }

        const schedulesData = await schedulesResponse.json();
        setSchedules(schedulesData);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [weekStart]);

  // Həftə dəyişmə funksiyaları
  const handlePrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(getMonday(prev));
  };

  const handleNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(getMonday(next));
  };

  // İşçi select dəyişəndə
  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  // Filterləri sıfırlayan funksiya
  const handleClearFilters = () => {
    setSelectedEmployee("");
    setSelectedRoom("");
  };

  // Hər işçi üçün, hər günə uyğun schedule tap
  function getScheduleForEmployeeAndDay(userId, weekDay) {
    return schedules.find((s) => s.userId === userId && s.weekDay === weekDay);
  }

  // Unique rooms from schedules
  const availableRooms = useMemo(() => {
    const rooms = [...new Set(schedules.map((s) => s.room).filter(Boolean))];
    return rooms.sort();
  }, [schedules]);

  // Filtered employees based on selected filters
  const filteredEmployees = useMemo(() => {
    let result = employees;

    if (selectedEmployee) {
      result = result.filter((e) => e.id === selectedEmployee);
    }

    if (selectedRoom) {
      const employeeIdsWithRoom = schedules
        .filter((s) => s.room === selectedRoom)
        .map((s) => s.userId);
      result = result.filter((e) => employeeIdsWithRoom.includes(e.id));
    }

    return result;
  }, [employees, schedules, selectedEmployee, selectedRoom]);

  if (error) {
    return (
      <div className="schedule-out">
        <div style={{ textAlign: "center", padding: "40px 0", color: "red" }}>
          <h3>Xəta baş verdi</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              background: "#155EEF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}>
            Yenidən yüklə
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-out">
      <div className="schedule-header">
        <div className="search-and-selects">
          <select
            className="ews-filter-select"
            value={selectedEmployee}
            onChange={handleEmployeeChange}>
            <option value="">İşçi seç</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} {emp.surname}
              </option>
            ))}
          </select>
          <select
            className="ews-filter-select"
            style={{ marginLeft: 8 }}
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}>
            <option value="">Otaq</option>
            {availableRooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <button className="ews-filter-btn" onClick={handleClearFilters}>
            <FiX className="ews-filter-btn-icon" />
          </button>
        </div>
        <div className="date-and-navigation">
          <div className="date-display">
            <div className="current-month">
              {monthName} {weekStart.getFullYear()}
            </div>
            <div className="date-range">{rangeStr}</div>
          </div>
          <div className="navigation-controls">
            <button className="nav-button" onClick={handlePrevWeek}>
              <FiChevronLeft />
            </button>
            <button className="nav-button" onClick={handleNextWeek}>
              <FiChevronRight />
            </button>
            <button className="calendar-button">
              <FiCalendar />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <span
            className="spinner"
            style={{
              display: "inline-block",
              width: 32,
              height: 32,
              border: "4px solid #e0e0e0",
              borderTop: "4px solid #155EEF",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ marginTop: "16px", color: "#666" }}>
            Məlumatlar yüklənir...
          </p>
        </div>
      ) : selectedEmployee ? (
        // Time-based vertical schedule for selected employee
        (() => {
          const emp = employees.find((e) => e.id === selectedEmployee);
          if (!emp) return null;

          // Find all schedules for this employee for the week (filtered by room if selected)
          const empSchedules = weekDays.map((d) => {
            const sched = getScheduleForEmployeeAndDay(emp.id, d.key);
            if (selectedRoom && sched && sched.room !== selectedRoom)
              return null;
            return sched;
          });

          // Find min/max time for intervals
          let minHour = 9,
            maxHour = 18; // default values
          empSchedules.forEach((s) => {
            if (s) {
              const startHour = Number.parseInt(s.startTime.split(":")[0]);
              const endHour = Number.parseInt(s.finishTime.split(":")[0]);
              minHour = Math.min(minHour, startHour);
              maxHour = Math.max(maxHour, endHour);
            }
          });

          const intervals = generateTimeIntervals(
            `${String(minHour).padStart(2, "0")}:00`,
            `${String(maxHour + 1).padStart(2, "0")}:00`
          );

          // For each day, track if block is rendered for that day
          const blockRendered = Array(weekDays.length).fill(false);

          return (
            <table className="ews-table">
              <thead>
                <tr>
                  <th style={{ width: 70, background: "#F7F8FA" }}></th>
                  {weekDays.map((d, i) => {
                    const isToday = isSameDay(weekDates[i], today);
                    return (
                      <th
                        key={d.key}
                        className={isToday ? "current-day-header" : ""}>
                        <div
                          className={
                            isToday ? "day-name current-day-name" : "day-name"
                          }>
                          {d.label}
                        </div>
                        <div
                          className={
                            isToday ? "day-date current-day-date" : "day-date"
                          }>
                          {weekDates[i].getDate()}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {intervals.map((interval, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        background: "#F7F8FA",
                        color: "#7D8592",
                        fontWeight: 500,
                        fontSize: 14,
                        textAlign: "right",
                        paddingRight: 10,
                      }}>
                      {interval.timeStr}
                    </td>
                    {weekDays.map((d, dayIdx) => {
                      const sched = empSchedules[dayIdx];
                      if (!sched)
                        return (
                          <td
                            key={d.key}
                            style={{ background: "#F7F8FA" }}></td>
                        );

                      const intervalTime = interval.hour * 60 + interval.minute;
                      const schedStart =
                        Number.parseInt(sched.startTime.split(":")[0]) * 60 +
                        Number.parseInt(sched.startTime.split(":")[1]);
                      const schedEnd =
                        Number.parseInt(sched.finishTime.split(":")[0]) * 60 +
                        Number.parseInt(sched.finishTime.split(":")[1]);

                      if (
                        !blockRendered[dayIdx] &&
                        intervalTime === schedStart
                      ) {
                        const span = getIntervalCount(
                          sched.startTime,
                          sched.finishTime
                        );
                        blockRendered[dayIdx] = true;
                        return (
                          <td
                            key={d.key}
                            rowSpan={span}
                            style={{ verticalAlign: "top", padding: 0 }}>
                            <div
                              className={`ews-schedule-block ews-schedule-block-${getBlockColor(
                                dayIdx
                              )} vertical-view`}
                              style={{ height: 60 * span - 8 }}>
                              <div className="block-doctor">
                                {emp.name} {emp.surname}
                              </div>
                              <div className="block-time">
                                {formatTime(sched.startTime)} -{" "}
                                {formatTime(sched.finishTime)}
                              </div>
                              <div className="block-room">{sched.room}</div>
                            </div>
                          </td>
                        );
                      }

                      if (
                        blockRendered[dayIdx] &&
                        intervalTime > schedStart &&
                        intervalTime < schedEnd
                      ) {
                        return null;
                      }

                      return (
                        <td key={d.key} style={{ background: "#F7F8FA" }}></td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })()
      ) : (
        // Default horizontal view
        <table className="ews-table">
          <thead>
            <tr>
              <th className="text-left">Ad, soyad</th>
              {weekDays.map((d, i) => {
                const isToday = isSameDay(weekDates[i], today);
                return (
                  <th
                    key={d.key}
                    className={isToday ? "current-day-header" : ""}>
                    <div
                      className={
                        isToday ? "day-name current-day-name" : "day-name"
                      }>
                      {d.label}
                    </div>
                    <div
                      className={
                        isToday ? "day-date current-day-date" : "day-date"
                      }>
                      {weekDates[i].getDate()}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="font-medium">
                  {emp.name} {emp.surname}
                </td>
                {weekDays.map((d, dayIdx) => {
                  const sched = getScheduleForEmployeeAndDay(emp.id, d.key);
                  let isRoomMatch = true;
                  if (selectedRoom && sched) {
                    isRoomMatch = sched.room === selectedRoom;
                  }
                  return (
                    <td key={d.key}>
                      {sched ? (
                        <div
                          className={`ews-schedule-block ews-schedule-block-${getBlockColor(
                            dayIdx
                          )}`}
                          style={
                            selectedRoom && !isRoomMatch
                              ? {
                                  minWidth: 120,
                                  margin: "0 auto",
                                  background: "#EEF2F6",
                                  color: "#B0B7C3",
                                }
                              : { minWidth: 120, margin: "0 auto" }
                          }>
                          <div>
                            {formatTime(sched.startTime)} -{" "}
                            {formatTime(sched.finishTime)}
                          </div>
                          <div className="ews-room">{sched.room}</div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeSchedule;
