import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/OtherObjects/addobject.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function AddOtherObject() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    objectName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, obyekt elementini serverə göndərmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Obyekt uğurla əlavə edildi");
        navigate("/other-objects");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addOtherObjectFormWrapper">
      <div className="addOtherObjectFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addOtherObjectFormRow">
            <label className="addOtherObjectLabel">
              Obyektin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addOtherObjectField"
              name="objectName"
              value={formData.objectName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addOtherObjectActions">
            <button
              type="button"
              className="addOtherObjectCancelBtn"
              onClick={() => navigate("/otherobjects")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addOtherObjectSaveBtn"
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

export default AddOtherObject;