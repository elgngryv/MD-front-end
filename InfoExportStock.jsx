import React, { useState, useRef } from 'react';
import './InfoExportStock.css';
// import AddPhotoIcon from "../../assets/icons/AddPhoto";
// import CloseIcon from "../../assets/icons/Close";

const InfoExportStock = ({ data }) => {
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        quantity: '',
        notes: '',
        status: data?.status || 'PENDING', // Default status
        products: [
            {
                category: 'Sementlər',
                productName: 'Sementlər A1',
                specifications: 'Boş, Türkiyə',
                orderQuantity: 4,
                sentQuantity: 0,
                remainingQuantity: 1,
                totalPrice: ''
            },
        ]
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    // Status class generator
    const getStatusClass = (status) => {
        return `infoExport${status}`;
    };

    return (
        <div className="infoExportStockContainer">
            <form onSubmit={handleSubmit}>
                <div className="infoExportStockTopPart">
                    <div className="infoExportStockFormGroup">
                        <label>Sifariş tarixi</label>
                        <input 
                            type="date" 
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            readOnly
                        />
                    </div>
                    <div className="infoExportStockFormGroup">
                        <label>Saat</label>
                        <input 
                            type="time" 
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            readOnly
                        />
                    </div>
                    <div className="infoExportStockFormGroup">
                        <label>Çeşid sayı</label>
                        <input 
                            type="number" 
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                            readOnly
                        />
                    </div>
                    <div className="infoExportStockFormGroup">
                        <label>Status</label>
                        <div className={`infoExportStockStatus ${getStatusClass(formData.status)}`}>
                            {formData.status}
                        </div>
                    </div>
                    <div className="infoExportStockFormGroup">
                        <label>Qeyd</label>
                        <textarea 
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            readOnly
                        />
                    </div>
                </div>

                <div className="infoExportStockTableSection">
                    <h3>Məhsullar</h3>
                    <table className="infoExportStockTable">
                        <thead>
                            <tr>
                                <th>Kateqoriyası</th>
                                <th>Məhsulun adı</th>
                                <th>Özəllikləri</th>
                                <th>Sifariş miq.</th>
                                <th>Göndərilən miq.</th>
                                <th>Qalıq miqdar</th>
                                <th>Cari məxaric</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.category}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.specifications}</td>
                                    <td>{product.orderQuantity}</td>
                                    <td>{product.sentQuantity}</td>
                                    <td>{product.remainingQuantity}</td>
                                    <td>
                                        <input 
                                            type="number"
                                            value={product.totalPrice}
                                            readOnly
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="infoExportStockUpload">
                    <label className="infoExportStockDocumentLabel">Sənədlər*</label>
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
                            type="button"
                            className="infoExportStockUploadButton"
                            onClick={handleUploadClick}
                        >
                            {/* <AddPhotoIcon /> */}
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
                                            {/* <CloseIcon /> */}
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

                <div className="infoExportStockButtonGroup">
                    <button type="button" className="infoExportStockCancelButton">
                        İmtina et
                    </button>
                    <button type="submit" className="infoExportStockSaveButton">
                        Yadda saxla
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InfoExportStock; 