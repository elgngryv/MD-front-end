import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/CabinetsPage/addcabinet.css";
import { FaTimes, FaCheck } from "react-icons/fa"; // Ləğv və Yadda saxla ikonları

function AddCabinet() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cabinetName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, kabinet elementini serverə göndərmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Kabinet uğurla əlavə edildi");
        navigate("/cabinets"); // Kabinet səhifəsinə yönləndirmə
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addCabinetFormWrapper">
      <div className="addCabinetFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addCabinetFormRow">
            <label className="addCabinetLabel">
              Kabinetin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addCabinetField"
              name="cabinetName"
              value={formData.cabinetName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addCabinetActions">
            <button
              type="button"
              className="addCabinetCancelBtn"
              onClick={() => navigate("/cabinets")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addCabinetSaveBtn"
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

export default AddCabinet;