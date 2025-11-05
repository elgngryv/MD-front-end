import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/OtherObjects/editobject.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function EditOtherObject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    objectName: "",
  });

  useEffect(() => {
    // Burada məlumatları yükləmək üçün API çağırışı ediləcək
    // Məsələn:
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`/api/other-objects/${id}`);
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
      // API çağırışı burada olacaq (məsələn, obyekt elementini yeniləmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Obyekt uğurla yeniləndi");
        navigate("/other-objects");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editOtherObjectFormWrapper">
      <div className="editOtherObjectFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editOtherObjectFormRow">
            <label className="editOtherObjectLabel">
              Obyektin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editOtherObjectField"
              name="objectName"
              value={formData.objectName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="editOtherObjectActions">
            <button
              type="button"
              className="editOtherObjectCancelBtn"
              onClick={() => navigate("/other-objects")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editOtherObjectSaveBtn"
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

export default EditOtherObject;