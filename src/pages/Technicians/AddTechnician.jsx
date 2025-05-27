import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/Technicians/addtechnician.css";
import AddPhotoIcon from "../../assets/icons/AddPhoto";
import CloseIcon from "../../assets/icons/Close";
import useTechnicianStore from "../../../stores/technicianStore";

function AddTechnician({ onClose }) {
  const { addTechnician } = useTechnicianStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    finCode: "",
    dateOfBirth: "",
    phone: "+994",
    genderStatus: "MAN",
    patronymic: "",
    email: "",
    phone2: "+994",
    phone3: "+994",
    homePhone: "+994",
    address: "",
    permissions: [],
  });

  const handleDeleteImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageClick = (file) => {
    setSelectedImage(file);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setFiles((prev) => [...prev, ...imageUrls]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      genderStatus: e.target.value === "male" ? "MAN" : "WOMAN",
    }));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          permissions: [...prev.permissions, value],
        };
      } else {
        return {
          ...prev,
          permissions: prev.permissions.filter((perm) => perm !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Profil şəkli URL yaratmaq
      const profileImage =
        files.length > 0
          ? files[0]
          : `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
              formData.name
            )}+${encodeURIComponent(formData.surname)}`;

      // API üçün məlumatları hazırlamaq
      const technicianData = {
        username: formData.username,
        password: formData.password || undefined,
        name: formData.name,
        surname: formData.surname,
        finCode: formData.finCode,
        dateOfBirth: formData.dateOfBirth || undefined,
        phone: formData.phone,
        genderStatus: formData.genderStatus,
        patronymic: formData.patronymic,
        email: formData.email || undefined,
        phone2: formData.phone2.replace("+994", "")
          ? formData.phone2
          : undefined,
        phone3: formData.phone3.replace("+994", "")
          ? formData.phone3
          : undefined,
        homePhone: formData.homePhone.replace("+994", "")
          ? formData.homePhone
          : undefined,
        address: formData.address || undefined,
        permissions:
          formData.permissions.length > 0 ? formData.permissions : undefined,
        profileImage,
      };

      // Boş sahələri silmək
      const payload = Object.fromEntries(
        Object.entries(technicianData).filter(
          ([_, value]) => value !== undefined
        )
      );

      await addTechnician(payload);

      // Uğur mesajı göstərmək
      toast.success("Texniki uğurla əlavə edildi!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // 1 saniyə sonra texniklər səhifəsinə yönləndirmək
      setTimeout(() => {
        navigate("/technicians");
      }, 1000);

      // Modalı bağlamaq
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Texniki əlavə edilərkən xəta:", error);
      toast.error(
        `Xəta: ${error.response?.data?.message || "Texniki əlavə edilərkən xəta baş verdi"}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addTechnicianFormContainer">
      <form onSubmit={handleSubmit}>
        <div className="addTechFormPart">
          <div className="addTechnicianLeft">
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">
                İstifadəçi adı <span className="requiredStar">*</span>
              </p>
              <input
                type="text"
                className="addTechnicianInput"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">
                Adı <span className="requiredStar">*</span>
              </p>
              <input
                type="text"
                className="addTechnicianInput"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">
                Soyadı <span className="requiredStar">*</span>
              </p>
              <input
                type="text"
                className="addTechnicianInput"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">
                Ata adı <span className="requiredStar">*</span>
              </p>
              <input
                type="text"
                className="addTechnicianInput"
                name="patronymic"
                value={formData.patronymic}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="leftPartInputGender">
              <p className="leftPartInputTitle">
                Cinsiyyət <span className="requiredStar">*</span>
              </p>
              <div className="genderOptions">
                <label className="genderLabel">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.genderStatus === "MAN"}
                    onChange={handleGenderChange}
                  />
                  Kişi
                </label>
                <label className="genderLabel">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.genderStatus === "WOMAN"}
                    onChange={handleGenderChange}
                  />
                  Qadın
                </label>
              </div>
            </div>
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">
                Fin kodu <span className="requiredStar">*</span>
              </p>
              <input
                type="text"
                className="addTechnicianInput"
                name="finCode"
                value={formData.finCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">Şifrə</p>
              <input
                type="password"
                className="addTechnicianInput"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">Doğum tarixi</p>
              <input
                type="date"
                className="addTechnicianInput"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">
                Mobil nömrə 1 <span className="requiredStar">*</span>
              </p>
              <input
                type="tel"
                className="addTechnicianInput"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="addTechnicianRight">
            <div className="leftPartInputData">
              <p className="leftPartInputTitle">Mobil nömrə 2</p>
              <input
                type="tel"
                className="addTechnicianInput"
                name="phone2"
                value={formData.phone2}
                onChange={handleInputChange}
              />
            </div>

            <div className="leftPartInputData">
              <p className="leftPartInputTitle">Mobil nömrə 3</p>
              <input
                type="tel"
                className="addTechnicianInput"
                name="phone3"
                value={formData.phone3}
                onChange={handleInputChange}
              />
            </div>

            <div className="leftPartInputData">
              <p className="leftPartInputTitle">Ev telefonu</p>
              <input
                type="tel"
                className="addTechnicianInput"
                name="homePhone"
                value={formData.homePhone}
                onChange={handleInputChange}
              />
            </div>

            <div className="leftPartInputData">
              <p className="leftPartInputTitle">E-poçt ünvanı</p>
              <input
                type="email"
                className="addTechnicianInput"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="leftPartInputData">
              <p className="leftPartInputTitle">Ünvan</p>
              <input
                type="text"
                className="addTechnicianInput"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="leftPartInputData">
              <p className="leftPartInputTitle">İcazələri</p>
              <div className="addTechnicianCheckboxGroup">
                <label>
                  <input
                    type="checkbox"
                    value="FULL_PERMISSION"
                    onChange={handlePermissionChange}
                  />{" "}
                  TAM İCAZƏ
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="RECEPTIONIST"
                    onChange={handlePermissionChange}
                  />{" "}
                  RESEPSİONİST
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="NURSE"
                    onChange={handlePermissionChange}
                  />{" "}
                  TİBB BACISI
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="DENTAL_TECHNICIAN"
                    onChange={handlePermissionChange}
                  />{" "}
                  DİŞ TEXNİKLƏRİ
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="FINANCIAL_REPORT"
                    onChange={handlePermissionChange}
                  />{" "}
                  MALİYYƏ HESABAT
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="WAREHOUSE"
                    onChange={handlePermissionChange}
                  />{" "}
                  ANBAR
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="DOCTOR_FULL"
                    onChange={handlePermissionChange}
                  />{" "}
                  Həkim tam icazə
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="DOCTOR_LIMITED"
                    onChange={handlePermissionChange}
                  />{" "}
                  Həkim limitli
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="addTechnicianUpload">
          <p className="leftPartInputTitle">Şəkil</p>
          <div className="uploadContainer">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
              style={{ display: "none" }}
            />
            <button
              className="uploadButton"
              onClick={handleUploadClick}
              type="button"
            >
              <AddPhotoIcon />
              <span>Müvafiq sənədləri yükləyin</span>
            </button>

            {files.length > 0 && (
              <div className="imagePreviewContainer">
                {files.map((file, index) => (
                  <div key={index} className="imagePreview">
                    <img
                      src={file}
                      alt={`file-${index}`}
                      onClick={() => handleImageClick(file)}
                    />
                    <button
                      className="deleteButton"
                      onClick={() => handleDeleteImage(index)}
                      type="button"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedImage && (
          <div className="modalOverlay" onClick={() => setSelectedImage(null)}>
            <div className="modalContent">
              <img src={selectedImage} alt="full-size" />
            </div>
          </div>
        )}

        <div className="addTechnicianActions">
          <button
            type="button"
            className="addTechnicianCancelBtn"
            onClick={onClose}
            disabled={isSubmitting}
          >
            İmtina et
          </button>
          <button
            type="submit"
            className="addTechnicianSaveBtn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Yüklənir..." : "Yadda saxla"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnician;