import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/PriceCategory/editpricecategory.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function EditPriceCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    status: "Aktiv"
  });

  useEffect(() => {
    // Burada API-dən məlumatları gətirmək üçün çağırış ediləcək
    // Məsələn:
    const fetchCategoryData = async () => {
      try {
        // const response = await api.getCategory(id);
        // setFormData(response.data);
        
        // Mock data for example:
        setFormData({
          categoryName: "Konservativ müayinə",
          status: "Aktiv"
        });
      } catch (error) {
        toast.error("Məlumatları yükləmək mümkün olmadı");
        navigate("/price-category");
      }
    };

    fetchCategoryData();
  }, [id, navigate]);

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
        toast.success("Qiymət kateqoriyası uğurla yeniləndi");
        navigate("/price-category");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editPriceCategoryFormWrapper">
      <div className="editPriceCategoryFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editPriceCategoryFormRow">
            <label className="editPriceCategoryLabel">
              Kateqoriya adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editPriceCategoryField"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="editPriceCategoryFormRow">
            <label className="editPriceCategoryLabel">
              Status <span className="required">*</span>
            </label>
            <select
              className="editPriceCategoryField"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="Aktiv">Aktiv</option>
              <option value="Passiv">Passiv</option>
            </select>
          </div>

          <div className="editPriceCategoryActions">
            <button
              type="button"
              className="editPriceCategoryCancelBtn"
              onClick={() => navigate("/price-category")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editPriceCategorySaveBtn"
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

export default EditPriceCategory;