import React from "react";
import "../../assets/style/AdminUsers/infoadmin.css";
import { FaDownload } from "react-icons/fa";
import EditIcon from "../../assets/icons/Edit";
import { Link, useParams } from "react-router-dom";

const infoData = {
  status: "Aktiv",
  username: "admin",
  password: "password123",
  name: "Admin",
  surname: "User",
  permission: "Tam icazə",
  phone: "(050) xxx xx xx",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256",
};

const InfoAdmin = ({ showEdit = true }) => {
  const { id } = useParams();

  return (
    <div className="infoAdminFormContainer">
      {showEdit && (
        <div className="infoAdminEditIcon">
          <Link to={`../admin-users/${id}/edit`} title="Redaktə et">
            <EditIcon style={{ cursor: "pointer" }} />
          </Link>
        </div>
      )}
      <form className="infoAdminForm">
        <div className="infoAdminFormRow">
          <label className="infoAdminLabel">Status</label>
          <span
            className={`infoAdminStatus ${
              infoData.status === "Aktiv" ? "active" : "passive"
            }`}
          >
            {infoData.status}
          </span>
        </div>
        <div className="infoAdminFormRow">
          <label className="infoAdminLabel">İstifadəçi adı</label>
          <input
            type="text"
            className="infoAdminField"
            value={infoData.username}
            readOnly
          />
        </div>
        <div className="infoAdminFormRow">
          <label className="infoAdminLabel">Şifrə</label>
          <input
            type="password"
            className="infoAdminField"
            value={infoData.password}
            readOnly
          />
        </div>
        <div className="infoAdminFormRow">
          <label className="infoAdminLabel">Adı</label>
          <input
            type="text"
            className="infoAdminField"
            value={infoData.name}
            readOnly
          />
        </div>
        <div className="infoAdminFormRow">
          <label className="infoAdminLabel">Soyadı</label>
          <input
            type="text"
            className="infoAdminField"
            value={infoData.surname}
            readOnly
          />
        </div>
        <div className="infoAdminFormRow">
          <label className="infoAdminLabel">İcazələri</label>
          <input
            type="text"
            className="infoAdminField"
            value={infoData.permission}
            readOnly
          />
        </div>
        <div className="infoAdminFormRow">
          <label className="infoAdminLabel">Mobil nömrə</label>
          <input
            type="text"
            className="infoAdminField"
            value={infoData.phone}
            readOnly
          />
        </div>
        <div className="infoAdminFormRow infoAdminImageUploadRow">
          <label className="infoAdminLabel">Şəkil</label>
          <div className="infoAdminPhotoWrapper">
            <div className="infoAdminImagePreview">
              <img src={infoData.image} alt="admin" />
              <a
                href={infoData.image}
                download
                className="infoAdminDownloadIcon"
                title="Yüklə"
              >
                <FaDownload />
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoAdmin;