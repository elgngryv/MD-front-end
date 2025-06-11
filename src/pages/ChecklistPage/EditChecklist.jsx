import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/ChecklistPage/editchecklist.css";
import { FaTimes, FaCheck } from "react-icons/fa";

function EditCheckList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
  });

  useEffect(() => {
    // Burada məlumatları yükləmək üçün API çağırışı ediləcək
    // Məsələn:
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`/api/checklist/${id}`);
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
      // API çağırışı burada olacaq (məsələn, yoxlama siyahısı elementini yeniləmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Yoxlama siyahısı elementi uğurla yeniləndi");
        navigate("/checklist");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addCheckListFormWrapper">
      <div className="addCheckListFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addCheckListFormRow">
            <label className="addCheckListLabel">
              Növün adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addCheckListField"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addCheckListActions">
            <button
              type="button"
              className="addCheckListCancelBtn"
              onClick={() => navigate("/checklist")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addCheckListSaveBtn"
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

export default EditCheckList;
