import React, { useState, useRef, useEffect } from "react";
import "../../assets/style/QueuePage/addqueue.css";
import CustomDropdown from "../../components/CustomDropdown";
import DropdownMenuChecklist from "../../components/DropdownChecklist";
import acceptForm from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelForm from "../../assets/images/EmployeesPage/cancelProcess.png";
import { RiUserForbidLine } from "react-icons/ri";
import usePatientStore from "../../../stores/patiendStore";
import useCalendarStore from "../../../stores/calendarStore";
import useReservationStore from "../../../stores/reservationStore";

function AddQueue() {
  const { patients, fetchPatients } = usePatientStore();
  const { doctors, fetchDoctors } = useCalendarStore();
  const { addReservation } = useReservationStore();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchPatients();
        await fetchDoctors();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchPatients, fetchDoctors]);

  const formattedPatients = patients.map((patient) => ({
    value: patient.id,
    label: `${patient.name} ${patient.surname} (${patient.finCode})`,
    labelText: `${patient.name} ${patient.surname} (${patient.finCode})`,
    icon: patient.isBlocked ? (
      <RiUserForbidLine
        style={{ color: "red", fontSize: "18px", marginLeft: "auto" }}
      />
    ) : null,
  }));

  const formattedDoctors = doctors.map((doctor) => ({
    value: doctor.doctorId,
    label: `${doctor.name} ${doctor.surname} (${doctor.username})`,
    labelText: `${doctor.name} ${doctor.surname} (${doctor.username})`,
  }));

  const handlePatientChange = (option) => {
    setSelectedPatient(option);
  };

  const handleDoctorChange = (option) => {
    setSelectedDoctor(option);
  };

  const handleDaysSelect = (days) => {
    setSelectedDays(days);
  };

  const formatTime = (t) => {
    return t && t.length === 5 ? `${t}:00` : "00:00:00";
  };

  const handleSubmit = async () => {
    if (!selectedPatient || !selectedDoctor || !selectedDays.length) {
      setError("Zəhmət olmasa bütün məlumatları doldurun");
      return;
    }

    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    const startTime = formatTime(startTimeRef.current.value);
    const endTime = formatTime(endTimeRef.current.value);

    if (!startDate || !endDate || !startTime || !endTime) {
      setError("Zəhmət olmasa tarix və saatları doldurun");
      return;
    }

    const payload = {
      startDate,
      endDate,
      startTime,
      endTime,
      doctorId: selectedDoctor.value,
      patientId: selectedPatient.value,
      weekDays: selectedDays.map((day) =>
        typeof day === "string" ? day.toUpperCase() : day.value.toUpperCase()
      ),
      validDateRange: true,
      validTimeRange: true,
    };

    console.log("🚀 GÖNDƏRİLƏN PAYLOAD:", payload);

    try {
      setLoading(true);
      await addReservation(payload);

      // Reset
      setSelectedPatient(null);
      setSelectedDoctor(null);
      setSelectedDays([]);
      startDateRef.current.value = "";
      endDateRef.current.value = "";
      startTimeRef.current.value = "";
      endTimeRef.current.value = "";

      alert("Rezervasiya uğurla yaradıldı!");
    } catch (err) {
      console.error("❌ Xəta:", err.response?.data || err.message);
      setError("Rezervasiya zamanı xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addQueuePageContainer">
      <div className="addQueuePageWrapper">
        {error && <div className="error-message">{error}</div>}

        <div className="queuePageWrapperInputRow">
          <div className="queuePageWrapperInput">
            <p>Pasiyent<span>*</span></p>
            <CustomDropdown
              options={formattedPatients}
              onChange={handlePatientChange}
              placeholder="Pasiyent seçin"
              value={selectedPatient}
            />
          </div>

          <div className="queuePageWrapperInput">
            <p>Həkim<span>*</span></p>
            <CustomDropdown
              options={formattedDoctors}
              onChange={handleDoctorChange}
              placeholder="Həkim seçin"
              value={selectedDoctor}
            />
          </div>
        </div>

        <div className="queuePageWrapperInputRow">
          <div className="queuePageWrapperInput">
            <p>Başlama tarixi<span>*</span></p>
            <input
              className="addQueueBasicInput"
              type="date"
              ref={startDateRef}
              required
            />
          </div>
          <div className="queuePageWrapperInput">
            <p>Bitmə tarixi<span>*</span></p>
            <input
              className="addQueueBasicInput"
              type="date"
              ref={endDateRef}
              required
            />
          </div>
        </div>

        <div className="queuePageWrapperInputRow">
          <div className="queuePageWrapperInput">
            <p>Başlama saatı<span>*</span></p>
            <input
              className="addQueueBasicInput"
              type="time"
              ref={startTimeRef}
              required
            />
          </div>
          <div className="queuePageWrapperInput">
            <p>Bitmə saatı<span>*</span></p>
            <input
              className="addQueueBasicInput"
              type="time"
              ref={endTimeRef}
              required
            />
          </div>
        </div>

        <div className="queuePageWrapperInputWeek">
          <p>Həftənin günləri<span>*</span></p>
          <DropdownMenuChecklist
            onSelect={handleDaysSelect}
            placeholder="Gün seçin"
            options={[
              { value: "MONDAY", label: "Bazar ertəsi" },
              { value: "TUESDAY", label: "Çərşənbə axşamı" },
              { value: "WEDNESDAY", label: "Çərşənbə" },
              { value: "THURSDAY", label: "Cümə axşamı" },
              { value: "FRIDAY", label: "Cümə" },
              { value: "SATURDAY", label: "Şənbə" },
              { value: "SUNDAY", label: "Bazar" },
            ]}
            value={selectedDays}
          />
        </div>
      </div>

      <div className="addQueuePageAcceptOrDeny">
        <button className="cancelAddQueue">
          <img src={cancelForm} alt="cancel" />
          İmtina et
        </button>
        <button
          className="acceptAddQueue"
          onClick={handleSubmit}
          disabled={loading}
        >
          <img src={acceptForm} alt="save" />
          {loading ? "Yüklənir..." : "Yadda saxla"}
        </button>
      </div>
    </div>
  );
}

export default AddQueue;
