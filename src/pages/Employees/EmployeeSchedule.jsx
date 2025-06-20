import React, { useState, useMemo } from "react";
import { FiChevronLeft, FiChevronRight, FiX, FiCalendar } from "react-icons/fi";
import "../../assets/style/employee-schedule.css";

// Həftə günləri və qısa adlar
const weekDays = [
  { key: "MONDAY", label: "B.e" },
  { key: "TUESDAY", label: "Ç.a" },
  { key: "WEDNESDAY", label: "Ç." },
  { key: "THURSDAY", label: "C.a" },
  { key: "FRIDAY", label: "C." },
  { key: "SATURDAY", label: "Ş." },
  { key: "SUNDAY", label: "B." }
];
const azMonths = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
  "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
];

// Saatı formatlamaq üçün funksiya
function formatTime(time) {
  if (!time) return "";
  const h = String(time.hour).padStart(2, "0");
  const m = String(time.minute).padStart(2, "0");
  return `${h}:${m}`;
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

// Mock data for select options
// TODO: Replace mockEmployees with API data from backend (e.g., /api/employees)
const mockEmployees = [
  { value: "1", label: "Rüstəm Məmmədov" },
  { value: "2", label: "Günel Əliyeva" },
  { value: "3", label: "Sərxan Rüstəmov" },
  { value: "4", label: "Karim Məmmədov" },
  { value: "5", label: "Aytac Karimova" },
  { value: "6", label: "İlaha Əliyeva" },
  { value: "7", label: "Murad Quliyev" },
  { value: "8", label: "Nigar Həsənova" },
  { value: "9", label: "Elvin Məmmədli" },
];
const mockRooms = [
  // TODO: Replace mockRooms with API data from backend (e.g., /api/rooms)
  { value: "STOM 1", label: "STOM 1" },
  { value: "STOM 2", label: "STOM 2" },
  { value: "STOM 3", label: "STOM 3" },
];

// MOCK DATA TEST - Select Optionda olan həkimlərə görə çoxaldılmış
// TODO: Replace mockSchedules with API data from backend (e.g., /api/schedules?week=...)
const baseSchedules = [
  // Hər həkim üçün bir neçə gün və otaq üçün nümunə cədvəl
  {
    weekDay: "MONDAY",
    room: "STOM 1",
    startTime: { hour: 9, minute: 0, second: 0, nano: 0 },
    finishTime: { hour: 14, minute: 0, second: 0, nano: 0 }
  },
  {
    weekDay: "TUESDAY",
    room: "STOM 2",
    startTime: { hour: 10, minute: 0, second: 0, nano: 0 },
    finishTime: { hour: 15, minute: 0, second: 0, nano: 0 }
  },
  {
    weekDay: "WEDNESDAY",
    room: "STOM 3",
    startTime: { hour: 8, minute: 30, second: 0, nano: 0 },
    finishTime: { hour: 13, minute: 0, second: 0, nano: 0 }
  },
  {
    weekDay: "THURSDAY",
    room: "STOM 1",
    startTime: { hour: 11, minute: 0, second: 0, nano: 0 },
    finishTime: { hour: 16, minute: 0, second: 0, nano: 0 }
  },
  {
    weekDay: "FRIDAY",
    room: "STOM 2",
    startTime: { hour: 9, minute: 0, second: 0, nano: 0 },
    finishTime: { hour: 14, minute: 0, second: 0, nano: 0 }
  },
  {
    weekDay: "SATURDAY",
    room: "STOM 3",
    startTime: { hour: 12, minute: 0, second: 0, nano: 0 },
    finishTime: { hour: 17, minute: 0, second: 0, nano: 0 }
  },
  {
    weekDay: "SUNDAY",
    room: "STOM 1",
    startTime: { hour: 10, minute: 0, second: 0, nano: 0 },
    finishTime: { hour: 13, minute: 0, second: 0, nano: 0 }
  }
];

// mockEmployees-dakı hər bir həkim üçün schedule-lar yaradılır
let idCounter = 1;
const mockSchedules = mockEmployees.flatMap((emp, empIdx) => {
  // Hər həkim üçün fərqli günlərdə fərqli otaqlarda schedule-lar yaradaq
  // Hər həkim üçün 3-5 gün schedule olsun, random seçək
  const daysForThisEmp = weekDays
    .map((d, i) => ({ ...d, idx: i }))
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 4); // 4-6 gün arası

  return daysForThisEmp.map((day, i) => {
    // Otaq və saatları random seçək
    const base = baseSchedules[(empIdx + i) % baseSchedules.length];
    return {
      id: idCounter++,
      weekDay: day.key,
      room: base.room,
      userId: emp.value,
      name: emp.label.split(" ")[0],
      surname: emp.label.split(" ").slice(1).join(" "),
      startTime: base.startTime,
      finishTime: base.finishTime
    };
  });
});

// Generate 30-minute time intervals between two times (inclusive start, exclusive end)
function generateTimeIntervals(startHour, endHour) {
  const intervals = [];
  let hour = startHour;
  let minute = 0;
  while (hour < endHour || (hour === endHour && minute === 0)) {
    intervals.push({ hour, minute });
    minute += 30;
    if (minute === 60) {
      hour += 1;
      minute = 0;
    }
    if (hour > endHour || (hour === endHour && minute > 0)) break;
  }
  return intervals;
}

// Helper to compare time objects
function isTimeInRange(time, start, end) {
  const t = time.hour * 60 + time.minute;
  const s = start.hour * 60 + start.minute;
  const e = end.hour * 60 + end.minute;
  return t >= s && t < e;
}

// Helper: get number of 30-min intervals between two times
function getIntervalCount(start, end) {
  const s = start.hour * 60 + start.minute;
  const e = end.hour * 60 + end.minute;
  return Math.ceil((e - s) / 30);
}

const EmployeeSchedule = () => {
  // Həftənin başlanğıc günü
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  // TODO: schedules should come from backend API, filtered by weekStart
  const schedules = mockSchedules;

  // Select values
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [loading, setLoading] = useState(false);

  // Həftənin günləri və tarixləri
  const weekDates = getWeekDates(weekStart);
  const today = new Date();
  const isSameDay = (d1, d2) => d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  const monthName = azMonths[weekStart.getMonth()];
  const rangeStr = `${weekDates[0].getDate()} ${monthName} - ${weekDates[6].getDate()} ${monthName}`;

  // Həftə dəyişmə funksiyaları
  // TODO: When week changes, fetch new schedule data from backend
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

  // Unikal işçilər (unique employees from schedule data)
  // TODO: If backend returns employees separately, use that list directly
  const employees = useMemo(() => {
    const map = new Map();
    (schedules || []).forEach(s => {
      const key = s.userId;
      if (!map.has(key)) {
        map.set(key, {
          userId: s.userId,
          name: s.name,
          surname: s.surname
        });
      }
    });
    return Array.from(map.values());
  }, [schedules]);

  // Filtered employees for table (based on selectedEmployee)
  // TODO: If backend supports filtering by employee, do it server-side
  const filteredEmployees = useMemo(() => {
    if (!selectedEmployee) return employees;
    return employees.filter(e => e.userId === selectedEmployee);
  }, [employees, selectedEmployee]);

  // Hər işçi üçün, hər günə uyğun schedule tap
  // TODO: Replace with backend query or filter from API data
  function getScheduleForEmployeeAndDay(userId, weekDay) {
    return (schedules || []).find(
      s => s.userId === userId && s.weekDay === weekDay
    );
  }

  // İşçi select dəyişəndə loading göstər
  // TODO: Remove artificial loading if backend is fast
  const handleEmployeeChange = (e) => {
    const value = e.target.value;
    setLoading(true);
    setTimeout(() => {
      setSelectedEmployee(value);
      setLoading(false);
    }, 400);
  };

  // Filterləri sıfırlayan funksiya (clear filters)
  const handleClearFilters = () => {
    setSelectedEmployee("");
    setSelectedRoom("");
  };

  return (
    <div className="schedule-out">
      <div className="schedule-header">
        <div className="search-and-selects">
          <select
            className="ews-filter-select"
            value={selectedEmployee}
            onChange={handleEmployeeChange}
          >
            <option value="">İşçi seç</option>
            {mockEmployees.map(emp => (
              <option key={emp.value} value={emp.value}>{emp.label}</option>
            ))}
          </select>
          <select
            className="ews-filter-select"
            style={{ marginLeft: 8 }}
            value={selectedRoom}
            onChange={e => setSelectedRoom(e.target.value)}
          >
            <option value="">Otaq</option>
            {mockRooms.map(room => (
              <option key={room.value} value={room.value}>{room.label}</option>
            ))}
          </select>
          {/* Filterləri sıfırlamaq üçün düymə (clear filters button) */}
          <button className="ews-filter-btn" onClick={handleClearFilters}>
            <FiX className="ews-filter-btn-icon" />
          </button>
        </div>
        <div className="date-and-navigation">
          <div className="date-display">
            <div className="current-month">{monthName} {weekStart.getFullYear()}</div>
            <div className="date-range">{rangeStr}</div>
          </div>
          <div className="navigation-controls">
            <button className="nav-button" onClick={handlePrevWeek}><FiChevronLeft /></button>
            <button className="nav-button" onClick={handleNextWeek}><FiChevronRight /></button>
            <button className="calendar-button"><FiCalendar /></button>
          </div>
        </div>
      </div>
      <div className="schedule-content">
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <span className="spinner" style={{
              display: "inline-block",
              width: 32,
              height: 32,
              border: "4px solid #e0e0e0",
              borderTop: "4px solid #155EEF",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
          </div>
        ) : selectedEmployee ? (
          // Time-based vertical schedule for selected employee
          (() => {
            // Find the selected employee's schedules for the week
            const emp = filteredEmployees[0];
            // Find all schedules for this employee for the week (filtered by room if selected)
            const empSchedules = weekDays.map((d, i) => {
              const sched = getScheduleForEmployeeAndDay(emp.userId, d.key);
              if (selectedRoom && sched && sched.room !== selectedRoom) return null;
              return sched;
            });
            // Find min/max time for intervals (default 09:00-14:30)
            let minHour = 9, maxHour = 14;
            empSchedules.forEach(s => {
              if (s) {
                minHour = Math.min(minHour, s.startTime.hour);
                maxHour = Math.max(maxHour, s.finishTime.hour);
              }
            });
            const intervals = generateTimeIntervals(minHour, maxHour + 1);
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
                          className={isToday ? "current-day-header" : ""}
                        >
                          <div className={isToday ? "day-name current-day-name" : "day-name"}>{d.label}</div>
                          <div className={isToday ? "day-date current-day-date" : "day-date"}>{weekDates[i].getDate()}</div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {intervals.map((interval, idx) => (
                    <tr key={idx}>
                      <td style={{ background: "#F7F8FA", color: "#7D8592", fontWeight: 500, fontSize: 14, textAlign: "right", paddingRight: 10 }}>
                        {String(interval.hour).padStart(2, "0")}:{String(interval.minute).padStart(2, "0")}
                      </td>
                      {weekDays.map((d, dayIdx) => {
                        const sched = empSchedules[dayIdx];
                        // If no schedule for this day, render empty cell
                        if (!sched) return <td key={d.key} style={{ background: "#F7F8FA" }}></td>;
                        // If this is the start time, render the block with rowspan
                        const intervalMinutes = interval.hour * 60 + interval.minute;
                        const schedStart = sched.startTime.hour * 60 + sched.startTime.minute;
                        const schedEnd = sched.finishTime.hour * 60 + sched.finishTime.minute;
                        if (!blockRendered[dayIdx] && intervalMinutes === schedStart) {
                          const span = getIntervalCount(sched.startTime, sched.finishTime);
                          blockRendered[dayIdx] = true;
                          return (
                            <td key={d.key} rowSpan={span} style={{ verticalAlign: "top", padding: 0 }}>
                              <div
                                className={`ews-schedule-block ews-schedule-block-${getBlockColor(dayIdx)} vertical-view`}
                                style={{ height: 60 * span - 8 }}
                              >
                                <div className="block-doctor">{emp.name} {emp.surname}</div>
                                <div className="block-time">{formatTime(sched.startTime)} - {formatTime(sched.finishTime)}</div>
                                <div className="block-room">{sched.room}</div>
                              </div>
                            </td>
                          );
                        }
                        // If this interval is inside the block but not the start, skip cell (rowspan covers it)
                        if (blockRendered[dayIdx] && intervalMinutes > schedStart && intervalMinutes < schedEnd) {
                          return null;
                        }
                        // Otherwise, empty cell
                        return <td key={d.key} style={{ background: "#F7F8FA" }}></td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()
        ) : (
          <table className="ews-table">
            <thead>
              <tr>
                <th className="text-left">Ad, soyad</th>
                {weekDays.map((d, i) => {
                  const isToday = isSameDay(weekDates[i], today);
                  return (
                    <th
                      key={d.key}
                      className={isToday ? "current-day-header" : ""}
                    >
                      <div className={isToday ? "day-name current-day-name" : "day-name"}>{d.label}</div>
                      <div className={isToday ? "day-date current-day-date" : "day-date"}>{weekDates[i].getDate()}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, empIdx) => (
                <tr key={emp.userId}>
                  <td className="font-medium">{emp.name} {emp.surname}</td>
                  {weekDays.map((d, dayIdx) => {
                    const sched = getScheduleForEmployeeAndDay(emp.userId, d.key);
                    // Determine if this cell should be highlighted or faded
                    let isRoomMatch = true;
                    if (selectedRoom && sched) {
                      isRoomMatch = sched.room === selectedRoom;
                    }
                    return (
                      <td key={d.key}>
                        {sched ? (
                          <div
                            className={`ews-schedule-block ews-schedule-block-${getBlockColor(dayIdx)}`}
                            style={
                              selectedRoom && !isRoomMatch
                                ? {
                                    minWidth: 120,
                                    margin: "0 auto",
                                    background: "#EEF2F6",
                                    color: "#B0B7C3"
                                  }
                                : { minWidth: 120, margin: "0 auto" }
                            }
                          >
                            <div>{formatTime(sched.startTime)} - {formatTime(sched.finishTime)}</div>
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
    </div>
  );
};

export default EmployeeSchedule;