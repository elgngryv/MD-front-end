import React, { useState, useRef, useEffect } from "react";
import "../../assets/style/Technicians/edittechnician.css";
import AddPhotoIcon from "../../assets/icons/AddPhoto";
import CloseIcon from "../../assets/icons/Close";
import useTechnicianStore from "../../../stores/technicianStore";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditTechnician({ technicianId }) {
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const { selectedTechnician, fetchTechnicianById, updateTech } =
    useTechnicianStore();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    patronymic: "",
    genderStatus: "",
    finCode: "",
    password: "",
    birthDate: "",
    phone: "+994",
    phone2: "+994",
    phone3: "+994",
    homePhone: "+994",
    email: "",
    address: "",
    permissions: [],
  });

  useEffect(() => {
    if (id) {
      fetchTechnicianById(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedTechnician) {
      setFormData((prev) => ({
        ...prev,
        username: selectedTechnician.username ?? "",
        name: selectedTechnician.name ?? "",
        surname: selectedTechnician.surname ?? "",
        patronymic: selectedTechnician.patronymic ?? "",
        genderStatus: selectedTechnician.genderStatus ?? "",
        finCode: selectedTechnician.finCode ?? "",
        password: selectedTechnician.password ?? "",
        birthDate: selectedTechnician.birthDate ?? "",
        phone: selectedTechnician.phone ?? "+994",
        phone2: selectedTechnician.phone2 ?? "+994",
        phone3: selectedTechnician.phone3 ?? "+994",
        homePhone: selectedTechnician.homePhone ?? "+994",
        email: selectedTechnician.email ?? "",
        address: selectedTechnician.address ?? "",
        permissions: selectedTechnician.permissions ?? [],
      }));
    }
  }, [selectedTechnician]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedPermissions = checked
          ? [...prev.permissions, value]
          : prev.permissions.filter((p) => p !== value);
        return { ...prev, permissions: updatedPermissions };
      });
    } else if (name === "gender") {
      setFormData((prev) => ({ ...prev, genderStatus: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

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

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...formData,
        gender: formData.genderStatus,
        permissions: formData.permissions.join(","),
      };

      console.log("Göndərilən data:", dataToSend);

      await updateTech(technicianId || id, dataToSend);
      toast.success("Uğurla yeniləndi!");
      navigate("/technicians");
    } catch (error) {
      console.error("Update xətası:", error.response?.data || error.message);
      toast.error(
        "Xəta baş verdi: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="editTechnicianFormContainer">
      <ToastContainer />
      <div className="editTechFormPart">
        <div className="editTechnicianLeft">
          {[
            "username",
            "name",
            "surname",
            "patronymic",
            "finCode",
            "password",
            "birthDate",
            "phone",
          ].map((field, idx) => (
            <div className="editPartInputData" key={idx}>
              <p className="editPartInputTitle">
                {field === "username"
                  ? "İstifadəçi adı"
                  : field === "name"
                  ? "Adı"
                  : field === "surname"
                  ? "Soyadı"
                  : field === "patronymic"
                  ? "Ata adı"
                  : field === "finCode"
                  ? "Fin kodu"
                  : field === "password"
                  ? "Şifrə"
                  : field === "birthDate"
                  ? "Doğum tarixi"
                  : "Mobil nömrə 1"}{" "}
                <span className="requiredStar">*</span>
              </p>
              <input
                type={
                  field === "birthDate"
                    ? "date"
                    : field === "password"
                    ? "password"
                    : "text"
                }
                className="editTechnicianInput"
                name={field}
                value={formData[field] ?? ""}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <div className="editPartInputGender">
            <p className="editPartInputTitle">
              Cinsiyyət <span className="requiredStar">*</span>
            </p>
            <div className="editGenderOptions">
              <label className="editGenderLabel">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.genderStatus === "male"}
                  onChange={handleInputChange}
                />
                Kişi
              </label>
              <label className="editGenderLabel">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.genderStatus === "female"}
                  onChange={handleInputChange}
                />
                Qadın
              </label>
            </div>
          </div>
        </div>

        <div className="editTechnicianRight">
          {["phone2", "phone3", "homePhone", "email", "address"].map(
            (field, idx) => (
              <div className="editPartInputData" key={idx}>
                <p className="editPartInputTitle">
                  {field === "phone2"
                    ? "Mobil nömrə 2"
                    : field === "phone3"
                    ? "Mobil nömrə 3"
                    : field === "homePhone"
                    ? "Ev telefonu"
                    : field === "email"
                    ? "E-poçt ünvanı"
                    : "Ünvan"}
                </p>
                <input
                  type={field === "email" ? "email" : "text"}
                  className="editTechnicianInput"
                  name={field}
                  value={formData[field] ?? ""}
                  onChange={handleInputChange}
                />
              </div>
            )
          )}

          <div className="editPartInputData">
            <p className="editPartInputTitle">İcazələri</p>
            <div className="editTechnicianCheckboxGroup">
              {[
                "TAM İCAZƏ",
                "RESEPSİONİST",
                "TİBB BACISI",
                "DİŞ TEXNİKLƏRİ",
                "MALİYYƏ HESABAT",
                "ANBAR",
                "Həkim tam icazə",
                "Həkim limitli",
              ].map((permission, idx) => (
                <label key={idx}>
                  <input
                    type="checkbox"
                    value={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={handleInputChange}
                  />
                  {permission}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="editTechnicianUpload">
        <p className="editPartInputTitle">Şəkil</p>
        <div className="editUploadContainer">
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
            className="editUploadButton"
            onClick={handleUploadClick}
            type="button"
          >
            <AddPhotoIcon />
            <span>Müvafiq sənədləri yükləyin</span>
          </button>

          {files.length > 0 && (
            <div className="editImagePreviewContainer">
              {files.map((file, index) => (
                <div key={index} className="editImagePreview">
                  <img
                    src={file}
                    alt={`file-${index}`}
                    onClick={() => handleImageClick(file)}
                  />
                  <button
                    className="editDeleteButton"
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

      <div className="editTechnicianSubmit">
        <div className="editTechnicianActions">
          <button type="button" className="editTechnicianCancelBtn">
            İmtina et
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="editTechnicianSaveBtn"
          >
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTechnician;
