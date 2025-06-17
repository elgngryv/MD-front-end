import React, { useRef, useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import "../../assets/style/Teeth/addteeth.css"

const toothNumbers = ["11", "12", "13", "14", "15", "16", "17", "18"];
const toothTypes = ["Yetkin", "Uşaq"];
const locations = ["Üst sol", "Üst sağ", "Alt sol", "Alt sağ", "Orta"];

const AddTeeth = () => {
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
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
    <div className="addTeethContainer">
        <form className="addteeth-form">
        <div className="addteeth-row">
            <label>
            Dişin nömrəsi <span className="addteeth-required">*</span>
            </label>
            <select
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            required
            >
            <option value="">Seçin</option>
            {toothNumbers.map((num) => (
                <option key={num} value={num}>{num}</option>
            ))}
            </select>
        </div>
        <div className="addteeth-row">
            <label>
            Dişin növü <span className="addteeth-required">*</span>
            </label>
            <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
            >
            <option value="">Seçin</option>
            {toothTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
            ))}
            </select>
        </div>
        <div className="addteeth-row">
            <label>
            Yeri <span className="addteeth-required">*</span>
            </label>
            <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
            >
            <option value="">Seçin</option>
            {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
            ))}
            </select>
        </div>
        <div className="addteeth-row imagesRowToUploadTeeth">
            <label>Şəkil</label>
            <div className="addteeth-upload-box">
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
                className="addteeth-upload-btn"
                onClick={() => fileInputRef.current.click()}
            >
                <FiUpload style={{ marginRight: 8 }} /> Dişin şəklini yükləyin
            </button>
            </div>
            {images.length > 0 && (
            <div className="addteeth-images-list">
                {images.map((img, idx) => (
                <div className="addteeth-image-item" key={idx}>
                    <img
                    src={URL.createObjectURL(img)}
                    alt="diş şəkli"
                    className="addteeth-thumb"
                    />
                    <button
                    type="button"
                    className="addteeth-remove-btn"
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
        <div className="addteeth-actions">
            <button type="button" className="addteeth-cancel-btn">İmtina et</button>
            <button type="submit" className="addteeth-save-btn">Yadda saxla</button>
        </div>
        </form>
    </div>
  );
};

export default AddTeeth; 