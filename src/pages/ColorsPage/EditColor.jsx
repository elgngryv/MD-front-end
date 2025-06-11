import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/ColorsPage/editcolor.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function EditColor() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    colorName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, rəngi yeniləmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Rəng uğurla yeniləndi");
        navigate("/colors"); // Rənglər səhifəsinə yönləndirmə
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editColorFormWrapper">
      <div className="editColorFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editColorFormRow">
            <label className="editColorLabel">
              Rəngin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editColorField"
              name="colorName"
              value={formData.colorName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="editColorActions">
            <button
              type="button"
              className="editColorCancelBtn"
              onClick={() => navigate("/colors")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editColorSaveBtn"
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

export default EditColor;