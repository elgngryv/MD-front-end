import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/PriceCategory/addpricecategory.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function AddPriceCategory() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Qiymət kateqoriyası uğurla əlavə edildi");
        navigate("/price-category"); // Qiymət kateqoriyaları səhifəsinə yönləndirmə
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addPriceCategoryFormWrapper">
      <div className="addPriceCategoryFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addPriceCategoryFormRow">
            <label className="addPriceCategoryLabel">
              Kateqoriya adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addPriceCategoryField"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addPriceCategoryActions">
            <button
              type="button"
              className="addPriceCategoryCancelBtn"
              onClick={() => navigate("/price-category")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addPriceCategorySaveBtn"
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

export default AddPriceCategory;