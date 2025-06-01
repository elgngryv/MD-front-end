import { useState, useEffect, useRef, useCallback } from "react";
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  getDay,
} from "date-fns";
import { az } from "date-fns/locale";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import axios from "axios";
import "../../assets/style/employee-schedule.css";
import SidebarMenu from "../../components/SidebarMenu.jsx";
import CustomSelect from "../../components/CustomSelect.jsx";

const WORK_HOURS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const WEEKDAYS_SHORT = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];
const API_BASE_URL = "http://159.89.3.81:5555/api/v1";

function EmployeeSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    startOfWeek(currentDate, { weekStartsOn: 1 })
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scheduleRef = useRef(null);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch doctors from API
  const fetchDoctors = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/general-calendar/read-doctors`
      );
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors");
      console.error("Error fetching doctors:", err);
    }
  }, []);

  // Fetch schedules from API
  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/workers-work-schedule/read`
      );
      setSchedules(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch schedules");
      console.error("Error fetching schedules:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search schedules by weekday
  const searchSchedules = async (weekDay) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/workers-work-schedule/search`,
        {
          weekDay: weekDay,
        }
      );
      setSchedules(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to search schedules");
      console.error("Error searching schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchSchedules();
  }, [fetchDoctors, fetchSchedules]);

  // Həftəlik tarix aralığını hesablama
  const weekDates = [...Array(7)].map((_, i) => addDays(selectedWeekStart, i));

  // Ekranda görüntüləyəcəyimiz tarix aralığı mətni
  const dateRangeText = `${format(weekDates[0], "d MMMM", {
    locale: az,
  })} - ${format(weekDates[6], "d MMMM", { locale: az })}`;

  // Əvvəlki həftəyə keçmə
  const goToPreviousWeek = () => {
    const newWeekStart = subWeeks(selectedWeekStart, 1);
    setSelectedWeekStart(newWeekStart);
  };

  // Növbəti həftəyə keçmə
  const goToNextWeek = () => {
    const newWeekStart = addWeeks(selectedWeekStart, 1);
    setSelectedWeekStart(newWeekStart);
  };

  // Tarix seçimi üçün kalendar toggle
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Kalendarda tarix seçimi
  const selectDate = (date) => {
    const newWeekStart = startOfWeek(date, { weekStartsOn: 1 });
    setSelectedWeekStart(newWeekStart);
    setShowCalendar(false);
  };

  // Həkim seçimi dəyişdikdə
  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
    setSelectedDoctorId(selectedOption ? selectedOption.value : null);
  };

  // Otaq seçimi dəyişdikdə
  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
  };

  // Həkimlər üçün options
  const doctorOptions = doctors.map((doctor) => ({
    value: doctor.doctorId,
    label: `${doctor.name} ${doctor.surname}`,
  }));

  // Otaqlar üçün options (API-dən gəlmədiyi üçün statik)
  const roomOptions = [
    { value: "STOM1", label: "Otaq 1" },
    { value: "STOM2", label: "Otaq 2" },
    { value: "STOM3", label: "Otaq 3" },
    { value: "STOM4", label: "Otaq 4" },
    { value: "STOM5", label: "Otaq 5" },
    { value: "STOM6", label: "Otaq 6" },
    { value: "STOM7", label: "Otaq 7" },
  ];

  // Həftə gününü API formatına çevir
  const getApiWeekDay = (date) => {
    const day = getDay(date);
    switch (day) {
      case 0:
        return "SUNDAY";
      case 1:
        return "MONDAY";
      case 2:
        return "TUESDAY";
      case 3:
        return "WEDNESDAY";
      case 4:
        return "THURSDAY";
      case 5:
        return "FRIDAY";
      case 6:
        return "SATURDAY";
      default:
        return "MONDAY";
    }
  };

  // İşçi bloklarını hazırlamaq üçün funksiya
  const prepareEmployeeBlocks = () => {
    const allBlocks = [];
    let blockIdCounter = 0;

    // Hər gün üçün
    weekDates.forEach((date, dayIndex) => {
      const apiWeekDay = getApiWeekDay(date);
      const formattedDate = format(date, "yyyy-MM-dd");

      // Bu günün cədvəllərini tap
      const daySchedules = schedules.filter((s) => s.weekDay === apiWeekDay);

      // Əgər həkim seçilibsə, yalnız onun cədvəlini göstər
      const filteredSchedules = selectedDoctorId
        ? daySchedules.filter((s) => s.userId === selectedDoctorId)
        : daySchedules;

      // Hər bir cədvəl üçün blok yarat
      filteredSchedules.forEach((schedule) => {
        const doctor = doctors.find((d) => d.doctorId === schedule.userId);
        if (!doctor) return;

        const startTime = schedule.startTime.split(":").slice(0, 2).join(":");
        const finishTime = schedule.finishTime.split(":").slice(0, 2).join(":");

        const startIndex = WORK_HOURS.indexOf(startTime);
        let endIndex = WORK_HOURS.indexOf(finishTime);

        if (startIndex === -1 || endIndex === -1) return;

        if (endIndex === -1) {
          // Əgər bitiş vaxtı siyahıda yoxdursa, ən sonuncu saatı götür
          endIndex = WORK_HOURS.length;
        }

        allBlocks.push({
          id: `block-${blockIdCounter++}`,
          employeeId: schedule.userId,
          employee: {
            id: schedule.userId,
            name: schedule.name,
            surname: schedule.surname,
            position: "Doctor",
          },
          dayIndex,
          date: formattedDate,
          startIndex,
          endIndex,
          startTime,
          endTime: finishTime,
          timeRange: [startIndex, endIndex],
          displayName: `${schedule.name} ${schedule.surname} (${startTime} - ${finishTime})`,
          room: schedule.room,
          column: 0,
          width: 100,
          zIndex: 2,
        });
      });
    });

    return allBlocks;
  };

  const employeeBlocks = prepareEmployeeBlocks();

  // Kənara klik edəndə seçimi ləğv etmək üçün useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedBlock = event.target.closest(".employee-full-block");
      if (!clickedBlock) {
        setSelectedBlockId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Blok klik hadisəsini idarə etmək üçün funksiya
  const handleBlockClick = (blockId, event) => {
    event.stopPropagation();
    setSelectedBlockId(selectedBlockId === blockId ? null : blockId);
  };

  // Həkimin iş saatlarını yoxlamaq üçün funksiya
  const isDoctorWorking = (doctorId, date, time) => {
    const apiWeekDay = getApiWeekDay(date);
    const schedule = schedules.find(
      (s) => s.userId === doctorId && s.weekDay === apiWeekDay
    );

    if (!schedule) return false;

    const startTime = schedule.startTime.split(":").slice(0, 2).join(":");
    const finishTime = schedule.finishTime.split(":").slice(0, 2).join(":");

    const timeHours = Number(time.split(":")[0]);
    const timeMinutes = Number(time.split(":")[1]);
    const timeValue = timeHours * 60 + timeMinutes;

    const startTimeHours = Number(startTime.split(":")[0]);
    const startTimeMinutes = Number(startTime.split(":")[1]);
    const startTimeValue = startTimeHours * 60 + startTimeMinutes;

    const endTimeHours = Number(finishTime.split(":")[0]);
    const endTimeMinutes = Number(finishTime.split(":")[1]);
    const endTimeValue = endTimeHours * 60 + endTimeMinutes;

    return timeValue >= startTimeValue && timeValue < endTimeValue;
  };

  // Sadə Kalendar Komponenti
  const SimpleCalendar = ({ onSelectDate }) => {
    const [calendarDate, setCalendarDate] = useState(new Date());

    const firstDay = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      1
    );
    const startDayOfMonth = getDay(firstDay);
    const daysInMonth = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth() + 1,
      0
    ).getDate();

    const prevMonth = () => {
      setCalendarDate(
        new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1)
      );
    };

    const nextMonth = () => {
      setCalendarDate(
        new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1)
      );
    };

    const handleDateSelect = (day) => {
      const selectedDate = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        day
      );
      onSelectDate(selectedDate);
    };

    const calendarHeader = format(calendarDate, "MMMM yyyy", { locale: az });

    const days = [];
    for (let i = 0; i < startDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        new Date().getDate() === i &&
        new Date().getMonth() === calendarDate.getMonth() &&
        new Date().getFullYear() === calendarDate.getFullYear();

      days.push(
        <div
          key={i}
          className={`calendar-day ${isToday ? "today" : ""}`}
          onClick={() => handleDateSelect(i)}>
          {i}
        </div>
      );
    }

    return (
      <div className="simple-calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>
            <IoIosArrowBack />
          </button>
          <div>{calendarHeader}</div>
          <button onClick={nextMonth}>
            <IoIosArrowForward />
          </button>
        </div>
        <div className="calendar-weekdays">
          {WEEKDAYS_SHORT.map((day, index) => (
            <div key={index} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">{days}</div>
      </div>
    );
  };

  return (
    <div className="employee-schedule-container">
      {/* Yuxarı hissə - Header */}
      <div className="schedule-header">
        <div className="search-and-selects">
          {/* Həkimlər və otaqlar  */}
          <div className="select-options-container">
            <CustomSelect
              options={doctorOptions}
              onChange={handleDoctorChange}
              placeholder="Həkim seç"
              value={selectedDoctor}
              isClearable={true}
              isSearchable={true}
              className="doctor-select"
            />
            <CustomSelect
              options={roomOptions}
              onChange={handleRoomChange}
              placeholder="Otaq seç"
              value={selectedRoom}
              isClearable={true}
              isSearchable={true}
              className="room-select"
            />
          </div>
          {/* Həkimlər və otaqlar End */}
        </div>

        <div className="date-and-navigation">
          <div className="date-display">
            {/* <div className="current-month">{format(currentDate, 'MMMM yyyy', { locale: az })}</div> */}
            <div className="date-range ">{dateRangeText}</div>
          </div>

          <div className="navigation-controls">
            <button className="nav-button" onClick={goToPreviousWeek}>
              <IoIosArrowBack />
            </button>
            <button className="nav-button" onClick={goToNextWeek}>
              <IoIosArrowForward />
            </button>
            <button className="calendar-button" onClick={toggleCalendar}>
              <FiCalendar />
            </button>

            {/* Açılan Kalendar */}
            {showCalendar && (
              <div className="calendar-dropdown">
                <SimpleCalendar onSelectDate={selectDate} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Əsas məzmun - Kalendar görünüşü */}
      <div className="schedule-out" ref={scheduleRef}>
        {loading && <div className="loading-indicator">Yüklənir...</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="schedule-content">
          <div className="schedule-grid">
            {/* İlk sətr - Həftə günləri və tarixlər */}
            <div className="time-column time-header">
              <div className="time-cell"></div>
            </div>

            {weekDates.map((date, index) => (
              <div key={index} className="day-column day-header">
                <div className="day-cell">
                  <div className="day-name">{WEEKDAYS_SHORT[index]}</div>
                  <div
                    className={`day-date ${
                      format(date, "yyyy-MM-dd") ===
                      format(new Date(), "yyyy-MM-dd")
                        ? "active"
                        : ""
                    }`}>
                    {format(date, "d")}
                  </div>
                </div>
              </div>
            ))}

            {/* Saat sütunu */}
            <div className="time-column">
              {WORK_HOURS.map((time, index) => (
                <div key={index} className="time-cell">
                  {time}
                </div>
              ))}
            </div>

            {/* Günlər və iş saatları */}
            {weekDates.map((date, dayIndex) => (
              <div key={dayIndex} className="day-column">
                <div className="time-blocks-container">
                  {/* Hər saat üçün xanalar */}
                  {WORK_HOURS.map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                      className={`schedule-cell ${
                        selectedDoctorId &&
                        isDoctorWorking(selectedDoctorId, date, time)
                          ? "doctor-working"
                          : ""
                      }`}></div>
                  ))}

                  {/* İşçi blokları */}
                  {employeeBlocks
                    .filter((block) => block.dayIndex === dayIndex)
                    .map((block) => {
                      const topPosition = block.startIndex * 60;
                      const height = (block.endIndex - block.startIndex) * 60;
                      const isSelected = selectedBlockId === block.id;

                      return (
                        <div
                          key={block.id}
                          className={`employee-full-block employee-color-${
                            block.employeeId % 5
                          } ${isSelected ? "selected" : ""}`}
                          style={{
                            top: `${topPosition}px`,
                            height: `${height}px`,
                            width: `${block.width}%`,
                            zIndex: isSelected ? 1000 : block.zIndex,
                          }}
                          title={`${block.displayName}\nOtaq: ${block.room}`}
                          onClick={(e) => handleBlockClick(block.id, e)}>
                          <div className="block-time">
                            {block.startTime} - {block.endTime}
                          </div>
                          <div className="employee-name">
                            {block.employee.name} {block.employee.surname}
                          </div>
                          <div className="employee-room">{block.room}</div>
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
}

export default EmployeeSchedule;
