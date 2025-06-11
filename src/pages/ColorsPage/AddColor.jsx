import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/ColorsPage/addcolor.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function AddColor() {
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
      // API çağırışı burada olacaq (məsələn, rəngi serverə göndərmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Rəng uğurla əlavə edildi");
        navigate("/colors"); // Rənglər səhifəsinə yönləndirmə
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addColorFormWrapper">
      <div className="addColorFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addColorFormRow">
            <label className="addColorLabel">
              Rəngin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addColorField"
              name="colorName"
              value={formData.colorName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addColorActions">
            <button
              type="button"
              className="addColorCancelBtn"
              onClick={() => navigate("/colors")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addColorSaveBtn"
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

export default AddColor;