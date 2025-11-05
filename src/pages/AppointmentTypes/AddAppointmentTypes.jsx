import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAppointmentTypeStore from "../../../stores/appointment-type-store";
import "../../assets/style/AppointmentTypes/addappointmenttypes.css";
import { FaRegClock, FaTimes, FaCheck } from "react-icons/fa";

function AddAppointmentType() {
  const navigate = useNavigate();
  const addAppointmentType = useAppointmentTypeStore((state) => state.addAppointmentType);
  const loading = useAppointmentTypeStore((state) => state.loading);

  const [formData, setFormData] = useState({
    appointmentName: "",
    duration: "", // "HH:MM"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.appointmentName.trim()) {
      toast.error("Randevu tipinin adı daxil edilməlidir");
      return;
    }

    // Backend 'time' string formatında gözləyir, ona görə düz string göndəririk
    // Backend 'HH:mm:ss' formatını istəyir, ona görə :ss əlavə edirik
    const timeString = formData.duration ? `${formData.duration}:00` : "00:00:00";

    const sendData = {
      appointmentTypeName: formData.appointmentName,
      time: timeString,
    };

    try {
      await addAppointmentType(sendData);
      toast.success("Randevu tipi uğurla əlavə edildi");
      navigate("/appointment-types");
    } catch (error) {
      toast.error("Xəta baş verdi");
    }
  };

  return (
    <div className="addAppointmentTypeFormWrapper">
      <div className="addAppointmentTypeFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addAppointmentTypeFormRow">
            <label className="addAppointmentTypeLabel">
              Randevu tipinin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addAppointmentTypeField"
              name="appointmentName"
              value={formData.appointmentName}
              onChange={handleInputChange}
              required
              disabled={loading}
              placeholder="Randevu tipinin adını daxil edin"
            />
          </div>

          <div className="addAppointmentTypeFormRow">
            <label className="addAppointmentTypeLabel">Müddət</label>
            <div className="addAppointmentTypeInputFieldWithIcon">
              <input
                type="time"
                className="addAppointmentTypeField"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="HH:MM"
                disabled={loading}
              />
              <FaRegClock className="clockIcon" />
            </div>
          </div>

          <div className="addAppointmentTypeActions">
            <button
              type="button"
              className="addAppointmentTypeCancelBtn"
              onClick={() => navigate("/appointment-types")}
              disabled={loading}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addAppointmentTypeSaveBtn"
              disabled={loading}
            >
              {loading ? "Yüklənir..." : <><FaCheck /> Yadda saxla</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAppointmentType;
