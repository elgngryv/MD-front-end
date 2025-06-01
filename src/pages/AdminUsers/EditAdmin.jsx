import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import "../../assets/style/AdminUsers/editadmin.css";
import EditIcon from "../../assets/icons/Edit";
import { Link } from "react-router-dom";

const initialData = {
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

const EditAdmin = ({ mode = "edit" }) => {
  const [form, setForm] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };
//   Testing
  return (
    <div className="editAdminWrapper">
      <div className="editAdminEditIcon">
        {mode !== "edit" && (
          <Link to="../admin-users/edit" title="Redaktə et">
            <EditIcon style={{ cursor: "pointer" }} />
          </Link>
        )}
      </div>
      <form className="editAdminForm">
        <div className="editAdminRow">
          <label>Status</label>
          <span
            className={`editAdminStatus ${
              form.status === "Aktiv" ? "active" : "passive"
            }`}
          >
            {form.status}
          </span>
        </div>
        <div className="editAdminRow">
          <label>İstifadəçi adı</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            readOnly={mode !== "edit"}
            className="editAdminInput"
          />
        </div>
        <div className="editAdminRow">
          <label>Şifrə</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            readOnly={mode !== "edit"}
            className="editAdminInput"
          />
        </div>
        <div className="editAdminRow">
          <label>Adı</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            readOnly={mode !== "edit"}
            className="editAdminInput"
          />
        </div>
        <div className="editAdminRow">
          <label>Soyadı</label>
          <input
            name="surname"
            value={form.surname}
            onChange={handleChange}
            readOnly={mode !== "edit"}
            className="editAdminInput"
          />
        </div>
        <div className="editAdminRow">
          <label>İcazələri</label>
          <input
            name="permission"
            value={form.permission}
            onChange={handleChange}
            readOnly={mode !== "edit"}
            className="editAdminInput"
          />
        </div>
        <div className="editAdminRow">
          <label>Mobil nömrə</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            readOnly={mode !== "edit"}
            className="editAdminInput"
          />
        </div>
        <div className="editAdminRow editAdminImageRow">
          <label>Şəkil</label>
          <div className="editAdminImageBox">
            {form.image && (
              <div className="editAdminImagePreview">
                <img src={form.image} alt="admin" />
                <a
                  href={form.image}
                  download
                  className="editAdminDownloadIcon"
                  title="Yüklə"
                >
                  <FaDownload />
                </a>
              </div>
            )}
            {mode === "edit" && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="editAdminFileInput"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;
