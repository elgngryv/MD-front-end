import React, { useRef, useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import "../../assets/style/Teeth/addexaminationpicture.css";

const examinationOptions = [
  "Apikal iltihab 1 kanal",
  "Çürük bukkal",
  "Başqa müayinə/əməliyyat"
];

const AddExaminationPicture = () => {
  const [selectedExam, setSelectedExam] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    fileInputRef.current.value = "";
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="addExaminationPictureContainer">
      <form className="addexaminationpicture-form">
        <div className="addexaminationpicture-row">
          <label>
            Müayinə / Əməliyyat <span className="addexaminationpicture-required">*</span>
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            required
          >
            <option value="">Seçin</option>
            {examinationOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="addexaminationpicture-row imagesRowToUploadExamination">
          <label>Şəkil</label>
          <div className="addexaminationpicture-upload-box">
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="addexaminationpicture-upload-btn"
              onClick={() => fileInputRef.current.click()}
            >
              <FiUpload style={{ marginRight: 8 }} /> Dişin şəklini yükləyin
            </button>
          </div>
          {images.length > 0 && (
            <div className="addexaminationpicture-images-list">
              {images.map((img, idx) => (
                <div className="addexaminationpicture-image-item" key={idx}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt="diş şəkli"
                    className="addexaminationpicture-thumb"
                  />
                  <button
                    type="button"
                    className="addexaminationpicture-remove-btn"
                    onClick={() => handleRemoveImage(idx)}
                    title="Sil"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="addexaminationpicture-actions">
          <button type="button" className="addexaminationpicture-cancel-btn">İmtina et</button>
          <button type="submit" className="addexaminationpicture-save-btn">Yadda saxla</button>
        </div>
      </form>
    </div>
  );
};

export default AddExaminationPicture; 