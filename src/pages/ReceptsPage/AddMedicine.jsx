import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/ReceptsPage/addmedicine.css";

import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

function AddMedicine() {
  const [formData, setFormData] = useState({
    medicineName: "",
    note: "",
  });

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

    try {
      console.log("New Medicine:", formData);
      alert("Dərman uğurla əlavə edildi");
      navigate(-1); // Go back to previous page (medicines list)

      setFormData({
        medicineName: "",
        note: "",
      });
    } catch (error) {
      alert("Xəta baş verdi: " + error.message);
    }
  };

  return (
    <form className="addMedicineWrapper" onSubmit={handleSubmit}>
      <div className="addMedicineContainer">
        <div className="addMedicineInput">
          <p>Dərmanın adı<span>*</span></p>
          <input
            type="text"
            placeholder="Dərmanın adı"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addMedicineInput">
          <p>Qeyd</p>
          <input
            type="text"
            placeholder="Tezlik"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          />
        </div>
        <div className="addMedicineButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => navigate(-1)}
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

export default AddMedicine;