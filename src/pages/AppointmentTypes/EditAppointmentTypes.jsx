import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/AppointmentTypes/editappointmenttypes.css";
import { FaRegClock } from "react-icons/fa"; // Saat ikonası
import { FaTimes, FaCheck } from "react-icons/fa"; // Ləğv və Yadda saxla ikonları

// Mock data (real tətbiqdə API-dən gələcək)
const mockAppointmentTypes = [
  { id: 1, name: "Aparat kontrol", duration: "00:15" },
  { id: 2, name: "Breketin təkrar yapışdırılması", duration: "00:20" },
  // ... digər mock randevu tipləri
];

function EditAppointmentType() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL-dən ID-ni götürürük
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    appointmentName: "",
    duration: "",
  });

  useEffect(() => {
    // ID-yə əsasən məlumatları yüklə (real tətbiqdə API çağırışı olacaq)
    const typeToEdit = mockAppointmentTypes.find(type => type.id === parseInt(id));
    if (typeToEdit) {
      setFormData({
        appointmentName: typeToEdit.name,
        duration: typeToEdit.duration,
      });
    } else {
      toast.error("Randevu tipi tapılmadı!");
      navigate("/appointment-types"); // Tapılmasa siyahıya yönləndir
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, randevu tipini serverdə yeniləmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Randevu tipi uğurla yeniləndi");
        navigate("/appointment-types"); // Randevu tipləri səhifəsinə yönləndirmə
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editAppointmentTypeFormWrapper">
      <div className="editAppointmentTypeFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editAppointmentTypeFormRow">
            <label className="editAppointmentTypeLabel">
              Randevu tipinin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editAppointmentTypeField"
              name="appointmentName"
              value={formData.appointmentName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="editAppointmentTypeFormRow">
            <label className="editAppointmentTypeLabel">Müddət</label>
            <div className="editAppointmentTypeInputFieldWithIcon">
              <input
                type="time"
                className="editAppointmentTypeField"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="HH:MM"
              />
            </div>
          </div>

          <div className="editAppointmentTypeActions">
            <button
              type="button"
              className="editAppointmentTypeCancelBtn"
              onClick={() => navigate("/appointment-types")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editAppointmentTypeSaveBtn"
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

export default EditAppointmentType;
