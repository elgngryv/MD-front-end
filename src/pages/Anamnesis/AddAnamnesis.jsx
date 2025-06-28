import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/style/Anamnesis/addanamnesis.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";
import useAnamnesisListStore from "../../../stores/anamnesStore";

function AddAnamnesis() {
  const [formData, setFormData] = useState({
    name: "",
    status: "ACTIVE",
  });

  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { addAnamnesis } = useAnamnesisListStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericCategoryId = Number(categoryId);

    if (isNaN(numericCategoryId)) {
      alert("Category ID düzgün deyil.");
      return;
    }

    const dataToSend = {
      ...formData,
      anamnesisCategoryId: numericCategoryId,
    };

    try {
      await addAnamnesis(dataToSend);
      alert("Anamnez uğurla yaradıldı");
      navigate(`/anamnesis/anamnesis-details/${categoryId}`);
    } catch (error) {
      alert("Xəta baş verdi: " + (error?.message || "Bilinməyən xəta"));
    }
  };

  return (
    <form className="addAnamnesisWrapper" onSubmit={handleSubmit}>
      <div className="addAnamnesisContainer">
        <div className="addAnamnesisInput">
          <p>
            Anamnezin adı <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Anamnezin adı"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="addAnamnesisInput">
          <p>Status</p>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="ACTIVE">Aktiv</option>
            <option value="INACTIVE">Passiv</option>
          </select>
        </div>

        <div className="addAnamnesisButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() =>
              setFormData({
                name: "",
                status: "ACTIVE",
              })
            }>
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
