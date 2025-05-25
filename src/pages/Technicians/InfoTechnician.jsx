import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../assets/style/Technicians/infotechnician.css";
import DownloadIcon from '../../assets/icons/Download';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbCoins } from 'react-icons/tb';

function InfoTechnician() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleDownload = (file) => {
        const link = document.createElement('a');
        link.href = file;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEdit = () => {
        navigate(`/technicians/edit/${id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Bu texniki silmək istədiyinizə əminsiniz?')) {
            console.log('Delete technician with ID:', id);
        }
    };

    const handlePrices = () => {
        navigate(`/technicians/prices/${id}`);
    };

    const technicianData = {
        status: "Aktiv",
        username: "admin",
        password: "••••••••••",
        name: "Admin",
        surname: "User",
        fatherName: "User",
        permissions: "Tam icazə",
        finCode: "FIN1234",
        gender: "Kişi",
        birthDate: "",
        mobile1: "(050) xxx xx xx",
        mobile2: "",
        mobile3: "",
        homePhone: "",
        email: "",
        address: "",
        images: [
            "/path-to-image.jpg" 
        ]
    };

    return (
        <div className="infoTechnicianContainer">
            <div className="infoHeader">
                <div className="actionButtons">
                    <button className="iconButton" onClick={handleEdit} title="Redaktə et">
                        <FiEdit2 size={20} />
                    </button>
                    <button className="iconButton" onClick={handleDelete} title="Sil">
                        <RiDeleteBin6Line size={20} />
                    </button>
                    <button className="iconButton" onClick={handlePrices} title="Qiymətlər">
                        <TbCoins size={20} />
                    </button>
                    <button className="downloadButton" onClick={() => handleDownload("/path-to-cv.pdf")}>
                        <DownloadIcon />
                        <span>Yüklə</span>
                    </button>
                </div>
            </div>

            <div className="infoContent">
                <div className="infoLeft">
                    <div className="infoRow">
                        <span className="infoLabel">Status</span>
                        <span className={`statusBadge ${technicianData.status === "Aktiv" ? "active" : "inactive"}`}>
                            {technicianData.status}
                        </span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">İstifadəçi adı</span>
                        <span className="infoValue">{technicianData.username}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Şifrə</span>
                        <span className="infoValue">{technicianData.password}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Adı</span>
                        <span className="infoValue">{technicianData.name}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Soyadı</span>
                        <span className="infoValue">{technicianData.surname}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Ata adı</span>
                        <span className="infoValue">{technicianData.fatherName}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">İcazələri</span>
                        <span className="infoValue">{technicianData.permissions}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Fin kodu</span>
                        <span className="infoValue">{technicianData.finCode}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Cinsiyyət</span>
                        <span className="infoValue">{technicianData.gender}</span>
                    </div>
                </div>

                <div className="infoRight">
                    <div className="infoRow">
                        <span className="infoLabel">Doğum tarixi</span>
                        <span className="infoValue">{technicianData.birthDate || "-"}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Mobil nömrə 1</span>
                        <span className="infoValue">{technicianData.mobile1}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Mobil nömrə 2</span>
                        <span className="infoValue">{technicianData.mobile2 || "-"}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Mobil nömrə 3</span>
                        <span className="infoValue">{technicianData.mobile3 || "-"}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Ev telefonu</span>
                        <span className="infoValue">{technicianData.homePhone || "-"}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">E-poçt ünvanı</span>
                        <span className="infoValue">{technicianData.email || "-"}</span>
                    </div>
                    <div className="infoRow">
                        <span className="infoLabel">Ünvan</span>
                        <span className="infoValue">{technicianData.address || "-"}</span>
                    </div>
                </div>
            </div>

            <div className="infoImageSection">
                <span className="infoLabel">Şəkil</span>
                <div className="infoImageContainer">
                    <div className="infoImageGrid">
                        {technicianData.images.map((image, index) => (
                            <div key={index} className="infoImage">
                                <img 
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                />
                                <button 
                                    className="downloadImageButton"
                                    onClick={() => handleDownload(image)}
                                >
                                    <DownloadIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div 
                    className="modalOverlay"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="modalContent">
                        <img 
                            src={selectedImage} 
                            alt="Full size"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default InfoTechnician; 