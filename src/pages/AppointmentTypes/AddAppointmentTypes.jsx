import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/AppointmentTypes/addappointmenttypes.css";
import { FaRegClock } from "react-icons/fa"; // Saat ikonası
import { FaTimes, FaCheck } from "react-icons/fa"; // Ləğv və Yadda saxla ikonları

function AddAppointmentType() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    appointmentName: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, randevu tipini serverə göndərmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Randevu tipi uğurla əlavə edildi");
        navigate("/appointment-types"); // Randevu tipləri səhifəsinə yönləndirmə
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
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
            />
            </div>
            <div className="addAppointmentTypeFormRow">
            <label className="addAppointmentTypeLabel">Müddət</label>
            <div className="addAppointmentTypeInputFieldWithIcon">
                <input
                type="time" // Və ya "time" input type istifadə edə bilərsiniz
                className="addAppointmentTypeField"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="HH:MM"
                />

            </div>
            </div>

            <div className="addAppointmentTypeActions">
            <button
                type="button"
                className="addAppointmentTypeCancelBtn"
                onClick={() => navigate("/appointment-types")}
                disabled={isSubmitting}
            >
                <FaTimes /> İmtina et
            </button>
            <button
                type="submit"
                className="addAppointmentTypeSaveBtn"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Yüklənir..." : <><FaCheck /> Yadda saxla</>}
            </button>
            </div>
        </form>
        </div>
    </div>
  );
}

export default AddAppointmentType;
