import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/RecommendationsPage/addrecommendation.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function AddRecommendation() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    recommendationName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, tövsiyə elementini serverə göndərmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Tövsiyə uğurla əlavə edildi");
        navigate("/recommendations");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addRecommendationFormWrapper">
      <div className="addRecommendationFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addRecommendationFormRow">
            <label className="addRecommendationLabel">
              Tövsiyənin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addRecommendationField"
              name="recommendationName"
              value={formData.recommendationName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addRecommendationActions">
            <button
              type="button"
              className="addRecommendationCancelBtn"
              onClick={() => navigate("/recommendations")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addRecommendationSaveBtn"
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

export default AddRecommendation; 