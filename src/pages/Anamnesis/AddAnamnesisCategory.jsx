// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Style
import "../../assets/style/Anamnesis/addanamnesiscategory.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Store
import useAnamnesisCategoryStore from "../../../stores/anamnesisCategoryStore";

function AddAnamnesis() {
  const [anamnesisName, setAnamnesisName] = useState("");
  const navigate = useNavigate();
  const addCategory = useAnamnesisCategoryStore((state) => state.addCategory);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!anamnesisName.trim()) {
      toast.warning("Zəhmət olmasa kateqoriya adını daxil edin!");
      return;
    }

    try {
      const newAnamnesis = {
        name: anamnesisName.trim(),
      };

      await addCategory(newAnamnesis);
      toast.success("Anamnez kateqoriyası uğurla əlavə olundu!");
      setTimeout(() => {
        navigate("/anamnesis");
      }, 1500);
    } catch (error) {
      console.error("Anamnez əlavə edilərkən xəta:", error);
      toast.error("Anamnez əlavə edilərkən xəta baş verdi!");
    }
  };

  return (
    <div className="addAnamnesisWrapper">
      <ToastContainer />
      <form className="addAnamnesisContainer" onSubmit={handleSubmit}>
        <div className="addAnamnesisInput">
          <p>
            Kateqoriyanın adı<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Anamnezin adı"
            value={anamnesisName}
            onChange={(e) => setAnamnesisName(e.target.value)}
          />
        </div>

        <div className="addAnamnesisButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => setAnamnesisName("")}>
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

export default AddAnamnesis;
