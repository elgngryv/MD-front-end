import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/style/Anamnesis/editanamnesis.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Static data for example
const staticAnamnesisData = [
  { id: "1", anamnesisName: "Ümumi Anamnez", anamnesisNo: "001", anamnesisTitle: "Ümumi xəstəlik tarixçəsi" },
  { id: "2", anamnesisName: "Stomatoloji Anamnez", anamnesisNo: "002", anamnesisTitle: "Diş xəstəlikləri tarixçəsi" },
  { id: "3", anamnesisName: "Allergik Anamnez", anamnesisNo: "003", anamnesisTitle: "Allergiya tarixçəsi" },
];

function EditAnamnesis() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    anamnesisName: "",
    anamnesisNo: "",
    anamnesisTitle: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const anamnesisToEdit = staticAnamnesisData.find((a) => a.id.toString() === id);
    if (anamnesisToEdit) {
      setFormData({
        anamnesisName: anamnesisToEdit.anamnesisName || "",
        anamnesisNo: anamnesisToEdit.anamnesisNo?.toString() || "",
        anamnesisTitle: anamnesisToEdit.anamnesisTitle || "",
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
    if (!formData.anamnesisName.trim())
      errors.anamnesisName = "Anamnez adı tələb olunur";
    if (!formData.anamnesisNo.trim())
      errors.anamnesisNo = "Anamnez kodu tələb olunur";
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
      anamnesisName: formData.anamnesisName,
      anamnesisNo: Number(formData.anamnesisNo),
      anamnesisTitle: formData.anamnesisTitle,
    };
  
    console.log("EditAnamnesis payload:", payload);  
  
    try {
      // Here you would typically make an API call
      alert("Anamnez uğurla yeniləndi!");
      navigate("/anamnesis");
    } catch (err) {
      alert(`Xəta baş verdi: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="editAnamnesisWrapper">
      <form className="editAnamnesisContainer" onSubmit={handleSubmit}>
        <div className="editAnamnesisInput">
          <label>
            Anamnezin adı<span>*</span>
          </label>
          <input
            type="text"
            name="anamnesisName"
            placeholder="Anamnezin adı"
            value={formData.anamnesisName}
            onChange={handleChange}
            required
          />
          {formErrors.anamnesisName && (
            <span className="error">{formErrors.anamnesisName}</span>
          )}
        </div>

        <div className="editAnamnesisInput">
          <label>
            Anamnezin kodu<span>*</span>
          </label>
          <input
            type="text"
            name="anamnesisNo"
            placeholder="Anamnezin kodu"
            value={formData.anamnesisNo}
            onChange={handleChange}
            required
          />
          {formErrors.anamnesisNo && (
            <span className="error">{formErrors.anamnesisNo}</span>
          )}
        </div>

        <div className="editAnamnesisInput">
          <label>Özəllikləri</label>
          <input
            type="text"
            name="anamnesisTitle"
            placeholder="Anamnezin özəllikləri"
            value={formData.anamnesisTitle}
            onChange={handleChange}
          />
        </div>

        <div className="editAnamnesisButtons">
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

export default EditAnamnesis;
