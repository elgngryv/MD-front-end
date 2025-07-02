import React, { useRef, useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/Teeth/addteeth.css";
import useTeethStore from "../../../stores/teethStore";
import useTeethImageStore from "../../../stores/TeethİmageStore";

const toothTypes = ["Yetkin", "Uşaq"];
const locations = ["Üst sol", "Üst sağ", "Alt sol", "Alt sağ"];

const typeMap = {
  Yetkin: "ADULT",
  Uşaq: "CHILD",
};

const locationMap = {
  "Üst sol": "TOP_LEFT",
  "Üst sağ": "TOP_RIGHT",
  "Alt sol": "BOTTOM_LEFT",
  "Alt sağ": "BOTTOM_RIGHT",
};

const toothTypeCountMap = {
  ADULT: 8,
  CHILD: 5,
};

const AddTeeth = () => {
  const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const { addTooth, loading: toothLoading } = useTeethStore();
  const { createTeethImage, loading: imageLoading } = useTeethImageStore();

  const maxToothNumber = selectedType
    ? toothTypeCountMap[typeMap[selectedType]]
    : 0;
  const toothNumbers = Array.from({ length: maxToothNumber }, (_, i) =>
    (i + 1).toString()
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    fileInputRef.current.value = "";
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedNumber ||
      !selectedType ||
      !selectedLocation ||
      images.length === 0
    ) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun və şəkil əlavə edin.");
      return;
    }

    try {
      // 1. Faylı birbaşa createTeethImage funksiyasına ötür (upload və backendə URL göndərmə işi içəridədir)
      const { data } = await createTeethImage(images[0]);
      const imageUrl = data?.data?.image;

      // 2. Diş məlumatını backendə göndər
      const payload = {
        toothNo: Number(selectedNumber),
        toothType: typeMap[selectedType],
        toothLocation: locationMap[selectedLocation],
        image: imageUrl,
      };

      await addTooth(payload);
      toast.success("Diş uğurla əlavə olundu!");

      // reset
      setSelectedNumber("");
      setSelectedType("");
      setSelectedLocation("");
      setImages([]);

      setTimeout(() => navigate("/teeth"), 1500);
    } catch (err) {
      toast.error("Xəta baş verdi!");
    }
  };

  return (
    <div className="addTeethContainer">
      <form className="addteeth-form" onSubmit={handleSubmit}>
        <div className="addteeth-row">
          <label>
            Dişin növü <span className="addteeth-required">*</span>
          </label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setSelectedNumber("");
            }}
            required>
            <option value="">Seçin</option>
            {toothTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
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
            required>
            <option value="">Seçin</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="addteeth-row">
          <label>
            Dişin nömrəsi <span className="addteeth-required">*</span>
          </label>
          <select
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            required
            disabled={!selectedType || !selectedLocation}>
            <option value="">Seçin</option>
            {toothNumbers.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
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
              onClick={() => fileInputRef.current.click()}>
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
                    title="Sil">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="addteeth-actions">
          <button type="button" className="addteeth-cancel-btn">
            İmtina et
          </button>
          <button
            type="submit"
            className="addteeth-save-btn"
            disabled={toothLoading || imageLoading}>
            {toothLoading || imageLoading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default AddTeeth;
