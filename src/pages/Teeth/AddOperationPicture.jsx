import React, { useRef, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import AddPhoto from "../../assets/icons/AddPhoto";
import downloadIcon from "../../assets/images/EmployeesPage/verifyProcess.png";
import "../../assets/style/Teeth/addoperationpicture.css";
import { useParams, useNavigate } from "react-router-dom";
import useTeethOperationStore from "../../../stores/teeth-opetaionStore";

const AddOperationPicture = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { createTeethOperations, loading, error } = useTeethOperationStore();

  const [operationName, setOperationName] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!operationName.trim()) {
      alert("Əməliyyat adını daxil edin");
      return;
    }

    try {
      await createTeethOperations({
        teethId: Number(id),
        opTypeAndItemRequests: [
          {
            operationName: operationName.trim(),
          },
        ],
        // Şəkil varsa əlavə et, base64 formatında (əgər backend dəstəkləyirsə)
        image: image || null,
      });

      alert("Əlavə olundu!");
      navigate(`/teeth/${id}/operation-pictures`);
    } catch (err) {
      alert("Xəta baş verdi: " + (err.message || "Naməlum"));
    }
  };

  return (
    <div className="addOperationPictureContainer">
      <div className="header-icons">
        <MdEdit className="icon edit-icon" />
        <MdDelete className="icon delete-icon" onClick={handleImageDelete} />
      </div>
      <form className="addoperationpicture-form" onSubmit={handleSubmit}>
        <div className="addoperationpicture-row">
          <label>
            Müayinə / Əməliyyat{" "}
            <span className="addoperationpicture-required">*</span>
          </label>
          <input
            type="text"
            value={operationName}
            onChange={(e) => setOperationName(e.target.value)}
            placeholder="Əməliyyat adını daxil edin"
            className="operation-input"
            required
          />
        </div>
        <div className="addoperationpicture-row imagesRowToUploadOperation">
          <label>Şəkil</label>
          <div className="image-upload-area">
            {image ? (
              <div className="image-preview">
                <img src={image} alt="Uploaded" />
                <div className="download-overlay">
                  <img
                    src={downloadIcon}
                    alt="Download"
                    className="download-icon"
                  />
                </div>
              </div>
            ) : (
              <label htmlFor="image-upload" className="image-placeholder">
                <AddPhoto className="add-photo-icon" />
                <span>Şəkil yükləyin</span>
              </label>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
        </div>
        <div className="addoperationpicture-actions">
          <button
            type="button"
            className="addoperationpicture-cancel-btn"
            onClick={() => navigate(-1)}>
            İmtina et
          </button>
          <button
            type="submit"
            className="addoperationpicture-save-btn"
            disabled={loading}>
            {loading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        </div>
        {error && (
          <p className="error-message">
            Xəta: {error.message || "Naməlum xəta"}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddOperationPicture;
