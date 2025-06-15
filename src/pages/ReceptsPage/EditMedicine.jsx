import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/style/ReceptsPage/editmedicine.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Static data for example
const staticMedicineData = [
  { id: "1", medicineName: "Parol", note: "Hər 8 saatdan bir" },
  { id: "2", medicineName: "Aspirin", note: "Hər 12 saatdan bir" },
  { id: "3", medicineName: "İbuprofen", note: "Hər 6 saatdan bir" },
];

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    medicineName: "",
    note: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const medicineToEdit = staticMedicineData.find((m) => m.id.toString() === id);
    if (medicineToEdit) {
      setFormData({
        medicineName: medicineToEdit.medicineName || "",
        note: medicineToEdit.note || "",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.medicineName.trim())
      errors.medicineName = "Dərmanın adı tələb olunur";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
  
    const payload = {
      id: Number(id),
      medicineName: formData.medicineName,
      note: formData.note,
    };
  
    console.log("EditMedicine payload:", payload);  
  
    try {
      // Here you would typically make an API call
      alert("Dərman uğurla yeniləndi!");
      navigate(-1);
    } catch (err) {
      alert(`Xəta baş verdi: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="editMedicineWrapper">
      <form className="editMedicineContainer" onSubmit={handleSubmit}>
        <div className="editMedicineInput">
          <label>
            Dərmanın adı<span>*</span>
          </label>
          <input
            type="text"
            name="medicineName"
            placeholder="Dərmanın adı"
            value={formData.medicineName}
            onChange={handleChange}
            required
          />
          {formErrors.medicineName && (
            <span className="error">{formErrors.medicineName}</span>
          )}
        </div>

        <div className="editMedicineInput">
          <label>Qeyd</label>
          <input
            type="text"
            name="note"
            placeholder="Qeyd"
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        <div className="editMedicineButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={handleCancel}>
            <img src={cancelButton} alt="İmtina et" />
            İmtina et
          </button>
          <button
            type="submit"
            className="acceptFormCondition">
            <img src={acceptButton} alt="Yadda saxla" />
            Yadda saxla
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMedicine;
