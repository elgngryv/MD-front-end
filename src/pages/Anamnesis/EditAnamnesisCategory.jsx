// React
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Style
import "../../assets/style/Anamnesis/editanamnesiscategory.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Static data
const staticAnamnesisData = [
  { id: "1", anamnesisName: "Ümumi Anamnez" },
  { id: "2", anamnesisName: "Stomatoloji Anamnez" },
  { id: "3", anamnesisName: "Allergik Anamnez" },
];

function EditAnamnesis() {
  const [anamnesisName, setAnamnesisName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Find anamnesis from static data
    const anamnesis = staticAnamnesisData.find(item => item.id === id);
    if (anamnesis) {
      setAnamnesisName(anamnesis.anamnesisName);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!anamnesisName.trim()) return;

    try {
      // Static data update example
      const updatedAnamnesis = {
        id,
        anamnesisName: anamnesisName.trim(),
      };

      console.log("Updated Anamnesis:", updatedAnamnesis);
      toast.success("Anamnez uğurla yeniləndi!");
      navigate("/anamnesis");
    } catch (error) {
      console.error("Anamnez yenilənərkən xəta:", error);
      toast.error("Anamnez yenilənərkən xəta baş verdi!");
    }
  };

  return (
    <div className="editAnamnesisWrapper">
      <form className="editAnamnesisContainer" onSubmit={handleSubmit}>
        <div className="editAnamnesisInput">
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

        <div className="editAnamnesisButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => navigate("/anamnesis")}>
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

export default EditAnamnesis;
