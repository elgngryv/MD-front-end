import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/style/DentalSet/editdentalset.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Static data for example
const staticDentalSetData = [
  { id: 1, setName: "Qarnitur 1", status: "active" },
  { id: 2, setName: "Qarnitur 2", status: "active" },
  { id: 3, setName: "Qarnitur 3", status: "passive" },
];

function EditDentalSet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    setName: "",
    status: "active"
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const dentalSetToEdit = staticDentalSetData.find((d) => d.id.toString() === id);
    if (dentalSetToEdit) {
      setFormData({
        setName: dentalSetToEdit.setName || "",
        status: dentalSetToEdit.status || "active",
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
      ? "Qarnituru aktiv etmək istədiyinizə əminsiniz?" 
      : "Qarnituru passiv etmək istədiyinizə əminsiniz?";

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
    if (!formData.setName.trim())
      errors.setName = "Qarniturun adı tələb olunur";
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
      setName: formData.setName,
      status: formData.status,
    };

    console.log("EditDentalSet payload:", payload);

    try {
      // Here you would typically make an API call
      alert("Qarnitur uğurla yeniləndi!");
      navigate("/dental-set");
    } catch (err) {
      alert(`Xəta baş verdi: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="editDentalSetWrapper">
      <form className="editDentalSetContainer" onSubmit={handleSubmit}>
        <div className="editDentalSetInput">
          <label>
            Qarniturun adı<span>*</span>
          </label>
          <input
            type="text"
            name="setName"
            placeholder="Qarniturun adı"
            value={formData.setName}
            onChange={handleChange}
            required
          />
          {formErrors.setName && (
            <span className="error">{formErrors.setName}</span>
          )}
        </div>

        <div className="editDentalSetButtons">
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

export default EditDentalSet; 