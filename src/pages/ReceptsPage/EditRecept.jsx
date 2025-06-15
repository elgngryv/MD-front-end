// React
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Style
import "../../assets/style/ReceptsPage/editrecept.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Static data
const staticReceptsData = [
  { id: "1", receptName: "Recept 1" },
  { id: "2", receptName: "Recept 2" },
  { id: "3", receptName: "Recept 3" },
];

function EditRecept() {
  const [receptName, setReceptName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Find recept from static data
    const recept = staticReceptsData.find(item => item.id === id);
    if (recept) {
      setReceptName(recept.receptName);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receptName.trim()) return;

    try {
      // Static data update example
      const updatedRecept = {
        id,
        receptName: receptName.trim(),
      };

      console.log("Updated Recept:", updatedRecept);
      toast.success("Resept uğurla yeniləndi!");
      navigate("/recepts");
    } catch (error) {
      console.error("Resept yenilənərkən xəta:", error);
      toast.error("Resept yenilənərkən xəta baş verdi!");
    }
  };

  return (
    <div className="editReceptWrapper">
      <form className="editReceptContainer" onSubmit={handleSubmit}>
        <div className="editReceptInput">
          <p>
            Reseptin adı<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Reseptin adı"
            value={receptName}
            onChange={(e) => setReceptName(e.target.value)}
          />
        </div>

        <div className="editReceptButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => navigate("/recepts")}>
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

export default EditRecept;