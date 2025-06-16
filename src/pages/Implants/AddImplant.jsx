// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Style
import "../../assets/style/Implants/addimplant.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddImplant() {
  const [brandName, setBrandName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName.trim()) return;

    try {
      // Static data example
      const newImplant = {
        id: Math.random().toString(36).substr(2, 9),
        brandName: brandName.trim(),
      };

      console.log("New Implant:", newImplant);
      setBrandName("");
      toast.success("İmplant uğurla əlavə olundu!");
      navigate("/implants");
    } catch (error) {
      console.error("İmplant əlavə edilərkən xəta:", error);
      toast.error("İmplant əlavə edilərkən xəta baş verdi!");
    }
  };

  return (
    <div className="addImplantWrapper">
      <form className="addImplantContainer" onSubmit={handleSubmit}>
        <div className="addImplantInput">
          <p>
            Markanın adı<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Markanın adı"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        <div className="addImplantButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => setBrandName("")}>
            <img src={cancelButton} alt="cancel" />
            İmtina et
          </button>

          <button type="submit" className="acceptFormCondition">
            <img src={acceptButton} alt="accept" />
            Yadda saxla
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddImplant; 