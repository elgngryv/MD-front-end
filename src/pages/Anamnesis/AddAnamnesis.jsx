import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/Anamnesis/addanamnesis.css";

import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

function AddAnamnesis() {
  const [formData, setFormData] = useState({
    anamnesisName: "",
    anamnesisNo: "",
    anamnesisTitle: "",
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

    const dataToSend = {
      ...formData,
      anamnesisNo: Number(formData.anamnesisNo),
    };

    try {
      console.log("New Anamnesis:", dataToSend);
      alert("Anamnez uğurla yaradıldı");
      navigate("/anamnesis");

      setFormData({
        anamnesisName: "",
      });
    } catch (error) {
      alert("Xəta baş verdi: " + error.message);
    }
  };

  return (
    <form className="addAnamnesisWrapper" onSubmit={handleSubmit}>
      <div className="addAnamnesisContainer">
        <div className="addAnamnesisInput">
          <p>Anamnezin adı<span>*</span></p>
          <input
            type="text"
            placeholder="Anamnezin adı"
            name="anamnesisName"
            value={formData.anamnesisName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addAnamnesisButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() =>
              setFormData({
                anamnesisName: "",
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

export default AddAnamnesis;
