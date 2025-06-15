import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/style/Insurance/editinsurance.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Static data for example
const staticInsuranceData = [
  { id: 1, companyName: "Sığorta 1", deductibleAmount: 100, status: "active" },
  { id: 2, companyName: "Sığorta 2", deductibleAmount: 200, status: "active" },
  { id: 3, companyName: "Sığorta 3", deductibleAmount: 300, status: "passive" },
];

function EditInsurance() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    deductibleAmount: "",
    status: "active"
  });
  const [formErrors, setFormErrors] = useState({});
 
  useEffect(() => {
    const insuranceToEdit = staticInsuranceData.find((i) => i.id.toString() === id);
    if (insuranceToEdit) {
      setFormData({
        companyName: insuranceToEdit.companyName || "",
        deductibleAmount: insuranceToEdit.deductibleAmount?.toString() || "",
        status: insuranceToEdit.status || "active",
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

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    const confirmMessage = newStatus === "active" 
      ? "Sığortanı aktiv etmək istədiyinizə əminsiniz?" 
      : "Sığortanı passiv etmək istədiyinizə əminsiniz?";

    if (window.confirm(confirmMessage)) {
      setFormData(prev => ({
        ...prev,
        status: newStatus
      }));
    } else {
      e.target.value = formData.status;
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.companyName.trim())
      errors.companyName = "Sığorta şirkəti tələb olunur";
    if (!formData.deductibleAmount.trim())
      errors.deductibleAmount = "Azadolma məbləği tələb olunur";
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
      companyName: formData.companyName,
      deductibleAmount: Number(formData.deductibleAmount),
      status: formData.status,
    };
  
    console.log("EditInsurance payload:", payload);  
  
    try {
      // Here you would typically make an API call
      alert("Sığorta uğurla yeniləndi!");
      navigate("/insurance");
    } catch (err) {
      alert(`Xəta baş verdi: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="editInsuranceWrapper">
      <form className="editInsuranceContainer" onSubmit={handleSubmit}>
        <div className="editInsuranceInput">
          <label>
            Sığorta şirkəti<span>*</span>
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="Sığorta şirkəti"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          {formErrors.companyName && (
            <span className="error">{formErrors.companyName}</span>
          )}
        </div>

        <div className="editInsuranceInput">
          <label>
            Azadolma məbləği<span>*</span>
          </label>
          <input
            type="number"
            name="deductibleAmount"
            placeholder="Azadolma məbləği"
            value={formData.deductibleAmount}
            onChange={handleChange}
            required
          />
          {formErrors.deductibleAmount && (
            <span className="error">{formErrors.deductibleAmount}</span>
          )}
        </div>


        <div className="editInsuranceButtons">
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

export default EditInsurance;