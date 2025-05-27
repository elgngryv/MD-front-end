import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTechnicianStore from "../../../stores/technicianStore";
import "../../assets/style/Technicians/infotechnician.css";
import DownloadIcon from "../../assets/icons/Download";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCoins } from "react-icons/tb";

function InfoTechnician() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const { selectedTechnician, fetchTechnicianById, removeTechnician, loading } =
    useTechnicianStore();

  useEffect(() => {
    if (id) fetchTechnicianById(id);
  }, [id]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "downloaded-file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = () => {
    navigate(`/technicians/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Bu texniki silmək istədiyinizə əminsiniz?")) {
      removeTechnician(id).then(() => {
        navigate("/technicians");
      });
    }
  };

  const handlePrices = () => {
    navigate(`/technicians/prices/${id}`);
  };

  const data = selectedTechnician;

  if (loading || !data)
    return <div className="infoTechnicianContainer">Yüklənir...</div>;

  return (
    <div className="infoTechnicianContainer">
      <div className="infoHeader">
        <div className="actionButtons">
          <button
            className="iconButton"
            onClick={handleEdit}
            title="Redaktə et">
            <FiEdit2 size={20} />
          </button>
          <button className="iconButton" onClick={handleDelete} title="Sil">
            <RiDeleteBin6Line size={20} />
          </button>
          <button
            className="iconButton"
            onClick={handlePrices}
            title="Qiymətlər">
            <TbCoins size={20} />
          </button>
          <button
            className="downloadButton"
            onClick={() => handleDownload(data?.cvFile || "/default.pdf")}>
            <DownloadIcon />
            <span>Yüklə</span>
          </button>
        </div>
      </div>

      <div className="infoContent">
        <div className="infoLeft">
          <div className="infoRow">
            <span className="infoLabel">Status</span>
            <span
              className={`statusBadge ${
                data.status === "Aktiv" ? "active" : "inactive"
              }`}>
              {data.status}
            </span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">İstifadəçi adı</span>
            <span className="infoValue">{data.username}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Şifrə</span>
            <span className="infoValue">••••••••••</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Adı</span>
            <span className="infoValue">{data.name}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Soyadı</span>
            <span className="infoValue">{data.surname}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Ata adı</span>
            <span className="infoValue">{data.patronymic}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">İcazələr</span>
            <span className="infoValue">{data.permissions}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Fin kodu</span>
            <span className="infoValue">{data.finCode}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Cinsiyyət</span>
            <span className="infoValue">{data.genderStatus}</span>
          </div>
        </div>

        <div className="infoRight">
          <div className="infoRow">
            <span className="infoLabel">Doğum tarixi</span>
            <span className="infoValue">{data.birthDate || "-"}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Mobil nömrə 1</span>
            <span className="infoValue">{data.phone}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Mobil nömrə 2</span>
            <span className="infoValue">{data.phone2 || "-"}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Mobil nömrə 3</span>
            <span className="infoValue">{data.mobile3 || "-"}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Ev telefonu</span>
            <span className="infoValue">{data.homePhone || "-"}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">E-poçt ünvanı</span>
            <span className="infoValue">{data.email || "-"}</span>
          </div>
          <div className="infoRow">
            <span className="infoLabel">Ünvan</span>
            <span className="infoValue">{data.address || "-"}</span>
          </div>
        </div>
      </div>

      <div className="infoImageSection">
        <span className="infoLabel">Şəkil</span>
        <div className="infoImageContainer">
          <div className="infoImageGrid">
            {(data.images || []).map((image, index) => (
              <div key={index} className="infoImage">
                <img
                  src={image}
                  alt={`image-${index}`}
                  onClick={() => handleImageClick(image)}
                />
                <button
                  className="downloadImageButton"
                  onClick={() => handleDownload(image)}>
                  <DownloadIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="modalOverlay" onClick={() => setSelectedImage(null)}>
          <div className="modalContent">
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoTechnician;
