import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/CabinetsPage/editcabinet.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function EditCabinet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cabinetName: "",
  });

  useEffect(() => {
    // Burada məlumatları yükləmək üçün API çağırışı ediləcək
    // Məsələn:
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`/api/cabinets/${id}`);
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
      // API çağırışı burada olacaq (məsələn, kabinet elementini yeniləmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Kabinet uğurla yeniləndi");
        navigate("/cabinets");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editCabinetFormWrapper">
      <div className="editCabinetFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editCabinetFormRow">
            <label className="editCabinetLabel">
              Kabinetin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editCabinetField"
              name="cabinetName"
              value={formData.cabinetName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="editCabinetActions">
            <button
              type="button"
              className="editCabinetCancelBtn"
              onClick={() => navigate("/cabinets")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editCabinetSaveBtn"
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

export default EditCabinet;
