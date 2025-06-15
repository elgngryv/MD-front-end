import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/DentalSet/adddentalset.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

function AddDentalSet() {
  const [formData, setFormData] = useState({
    setName: "",
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
      setName: formData.setName,
      status: formData.status,
    };

    console.log("AddDentalSet payload:", payload);

    try {
      // Here you would typically make an API call
      alert("Qarnitur uğurla əlavə edildi!");
      navigate("/dental-set");
    } catch (err) {
      alert(`Xəta baş verdi: ${err.message}`);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.setName.trim())
      errors.setName = "Qarniturun adı tələb olunur";
    return errors;
  };

  return (
    <form className="addDentalSetWrapper" onSubmit={handleSubmit}>
      <div className="addDentalSetContainer">
        <div className="addDentalSetInput">
          <p>Qarniturun adı<span>*</span></p>
          <input
            type="text"
            placeholder="Qarniturun adı"
            name="setName"
            value={formData.setName}
            onChange={handleChange}
            required
          />
        </div>
      
        <div className="addDentalSetButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() =>
              setFormData({
                setName: "",
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

export default AddDentalSet; 