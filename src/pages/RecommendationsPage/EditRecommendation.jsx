import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/RecommendationsPage/editrecommendation.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function EditRecommendation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    recommendationName: "",
  });

  useEffect(() => {
    // Burada məlumatları yükləmək üçün API çağırışı ediləcək
    // Məsələn:
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`/api/recommendations/${id}`);
    //     const data = await response.json();
    //     setFormData(data);
    //   } catch (error) {
    //     toast.error("Məlumatları yükləmək mümkün olmadı");
    //   }
    // };
    // fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, tövsiyə elementini yeniləmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Tövsiyə uğurla yeniləndi");
        navigate("/recommendations");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editRecommendationFormWrapper">
      <div className="editRecommendationFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editRecommendationFormRow">
            <label className="editRecommendationLabel">
              Tövsiyənin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editRecommendationField"
              name="recommendationName"
              value={formData.recommendationName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="editRecommendationActions">
            <button
              type="button"
              className="editRecommendationCancelBtn"
              onClick={() => navigate("/recommendations")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editRecommendationSaveBtn"
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

export default EditRecommendation; 