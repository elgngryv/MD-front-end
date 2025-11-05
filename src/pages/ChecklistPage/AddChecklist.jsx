import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../assets/style/ChecklistPage/addchecklist.css";
import { FaTimes, FaCheck } from "react-icons/fa";
import useExaminationStore from "../../../stores/examinationStore"; // Store path-ı özündə uyğun dəyiş

function AddCheckList() {
  const navigate = useNavigate();
  const { createExamination, loading } = useExaminationStore();

  const [formData, setFormData] = useState({
    examinationTypeName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createExamination(formData);
      toast.success("Yoxlama siyahısı elementi uğurla əlavə edildi");
      navigate("/checklist");
    } catch (error) {
      toast.error("Xəta baş verdi. Təkrar cəhd edin.");
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
              name="examinationTypeName"
              value={formData.examinationTypeName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addCheckListActions">
            <button
              type="button"
              className="addCheckListCancelBtn"
              onClick={() => navigate("/checklist")}
              disabled={loading}>
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addCheckListSaveBtn"
              disabled={loading}>
              {loading ? (
                "Yüklənir..."
              ) : (
                <>
                  <FaCheck /> Yadda saxla
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCheckList;
