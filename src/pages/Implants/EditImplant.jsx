// React
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Style
import "../../assets/style/Implants/editimplant.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Static data
const staticImplantData = [
  { id: "1", brandName: "Nobel Active" },
  { id: "2", brandName: "Straumann" },
  { id: "3", brandName: "Astra Tech" },
];

function EditImplant() {
  const [brandName, setBrandName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Find implant from static data
    const implant = staticImplantData.find(item => item.id === id);
    if (implant) {
      setBrandName(implant.brandName);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName.trim()) return;

    try {
      // Static data update example
      const updatedImplant = {
        id,
        brandName: brandName.trim(),
      };

      console.log("Updated Implant:", updatedImplant);
      toast.success("İmplant uğurla yeniləndi!");
      navigate("/implants");
    } catch (error) {
      console.error("İmplant yenilənərkən xəta:", error);
      toast.error("İmplant yenilənərkən xəta baş verdi!");
    }
  };

  return (
    <div className="editImplantWrapper">
      <form className="editImplantContainer" onSubmit={handleSubmit}>
        <div className="editImplantInput">
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

        <div className="editImplantButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => navigate("/implants")}>
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

export default EditImplant; 