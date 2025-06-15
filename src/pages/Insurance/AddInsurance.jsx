import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/Insurance/addinsurance.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

function AddInsurance() {
  const [formData, setFormData] = useState({
    companyName: "",
    deductibleAmount: "",
    status: "active"
  });

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    const payload = {
      companyName: formData.companyName,
      deductibleAmount: Number(formData.deductibleAmount),
      status: formData.status,
    };

    console.log("AddInsurance payload:", payload);

    try {
      // Here you would typically make an API call
      alert("Sığorta uğurla əlavə edildi!");
      navigate("/insurance");
    } catch (err) {
      alert(`Xəta baş verdi: ${err.message}`);
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

  return (
    <form className="addInsuranceWrapper" onSubmit={handleSubmit}>
      <div className="addInsuranceContainer">
        <div className="addInsuranceInput">
          <p>Sığorta şirkəti<span>*</span></p>
          <input
            type="text"
            placeholder="Sığorta şirkəti"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addInsuranceInput">
          <p>Azadolma məbləği<span>*</span></p>
          <input
            type="number"
            placeholder="Azadolma məbləği"
            name="deductibleAmount"
            value={formData.deductibleAmount}
            onChange={handleChange}
            required
          />
        </div>
      
        <div className="addInsuranceButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() =>
              setFormData({
                companyName: "",
                deductibleAmount: "",
                status: "active"
              })
            }
          >
            <img src={cancelButton} alt="Cancel" />
            İmtina et
          </button>
          <button type="submit" className="acceptFormCondition">
            <img src={acceptButton} alt="Save" />
            Yadda saxla
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddInsurance;