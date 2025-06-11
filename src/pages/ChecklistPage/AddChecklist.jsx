import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/ChecklistPage/addchecklist.css";
import { FaTimes, FaCheck } from "react-icons/fa"; // Ləğv və Yadda saxla ikonları

function AddCheckList() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API çağırışı burada olacaq (məsələn, yoxlama siyahısı elementini serverə göndərmək)
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Yoxlama siyahısı elementi uğurla əlavə edildi");
        navigate("/checklist"); // Yoxlama siyahısı səhifəsinə yönləndirmə
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

export default AddCheckList;