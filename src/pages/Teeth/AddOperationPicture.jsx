import React, { useRef, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import CustomSelect from '../../components/CustomSelect';
import AddPhoto from '../../assets/icons/AddPhoto';
import downloadIcon from '../../assets/images/EmployeesPage/verifyProcess.png';
import "../../assets/style/Teeth/addoperationpicture.css";

const operationOptions = [
  { value: 'apikal_iltihab', label: 'Apikal iltihab 1 kanal' },
  { value: 'curuk_bukkal', label: 'Çürük bukkal' },
  { value: 'bashqa_muayine', label: 'Başqa müayinə/əməliyyat' }
];

const AddOperationPicture = () => {
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleOperationChange = (selectedOption) => {
    setSelectedOperation(selectedOption);
  };

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
  };

  return (
    <div className="addOperationPictureContainer">
      <div className="header-icons">
        <MdEdit className="icon edit-icon" />
        <MdDelete className="icon delete-icon" onClick={handleImageDelete} />
      </div>
      <form className="addoperationpicture-form">
        <div className="addoperationpicture-row">
          <label>
            Müayinə / Əməliyyat <span className="addoperationpicture-required">*</span>
          </label>
          <CustomSelect
            options={operationOptions}
            value={selectedOperation}
            onChange={handleOperationChange}
            placeholder="Seçin"
            className="operation-select"
          />
        </div>
        <div className="addoperationpicture-row imagesRowToUploadOperation">
          <label>Şəkil</label>
          <div className="image-upload-area">
            {image ? (
              <div className="image-preview">
                <img src={image} alt="Uploaded" />
                <div className="download-overlay">
                  <img src={downloadIcon} alt="Download" className="download-icon" />
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
          <button type="button" className="addoperationpicture-cancel-btn">İmtina et</button>
          <button type="submit" className="addoperationpicture-save-btn">Yadda saxla</button>
        </div>
      </form>
    </div>
  );
};

export default AddOperationPicture; 