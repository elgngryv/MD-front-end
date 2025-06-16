// React
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Style
import "../../assets/style/Implants/editsizes.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Static data
const staticSizesData = [
  { id: "1", diameter: "2.0", length: "6" },
  { id: "2", diameter: "2.5", length: "8" },
  { id: "3", diameter: "3.0", length: "10" },
  { id: "4", diameter: "3.5", length: "12" },
];

function EditSize() {
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Find size from static data
    const size = staticSizesData.find(item => item.id === id);
    if (size) {
      setDiameter(size.diameter);
      setLength(size.length);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!diameter.trim() || !length.trim()) return;

    try {
      // Static data update example
      const updatedSize = {
        id,
        diameter: diameter.trim(),
        length: length.trim(),
      };

      console.log("Updated Size:", updatedSize);
      toast.success("Ölçü uğurla yeniləndi!");
      navigate("/sizes");
    } catch (error) {
      console.error("Ölçü yenilənərkən xəta:", error);
      toast.error("Ölçü yenilənərkən xəta baş verdi!");
    }
  };

  return (
    <div className="editSizesWrapper">
      <form className="editSizesContainer" onSubmit={handleSubmit}>
        <div className="editSizesInput">
          <p>
            Diametir<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Diametir"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
          />
        </div>

        <div className="editSizesInput">
          <p>
            Uzunluq<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Uzunluq"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="editSizesButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => navigate("/sizes")}>
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

export default EditSize; 