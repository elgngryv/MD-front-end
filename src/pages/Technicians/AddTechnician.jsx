import React, { useState, useRef } from 'react';
import "../../assets/style/Technicians/addtechnician.css"
import AddPhotoIcon from '../../assets/icons/AddPhoto';
import CloseIcon from '../../assets/icons/Close';

function AddTechnician() {
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDeleteImage = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageClick = (file) => {
    setSelectedImage(file);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setFiles(prev => [...prev, ...imageUrls]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="addTechnicianFormContainer"> 
        <div className="addTechFormPart">
            <div className="addTechnicianLeft">
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        İstifadəçi adı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="addTechnicianInput" />
                </div>
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        Adı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="addTechnicianInput" />
                </div>
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        Soyadı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="addTechnicianInput" />
                </div>
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        Ata adı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="addTechnicianInput" />
                </div>
                <div className="leftPartInputGender">
                    <p className="leftPartInputTitle">
                        Cinsiyyət <span className='requiredStar'>*</span>
                    </p>
                    <div className="genderOptions">
                        <label className="genderLabel">
                            <input type="radio" name="gender" value="male" />
                            Kişi
                        </label>
                        <label className="genderLabel">
                            <input type="radio" name="gender" value="female" />
                            Qadın
                        </label>
                    </div>
                </div>
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        Fin kodu <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="addTechnicianInput" />
                </div>
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        Şifrə
                    </p>
                    <input type="password" className="addTechnicianInput" />
                </div>
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        Doğum tarixi
                    </p>
                    <input type="date" className="addTechnicianInput" />
                </div>
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">
                        Mobil nömrə 1 <span className='requiredStar'>*</span>
                    </p>
                    <input type="tel" className="addTechnicianInput" defaultValue="+994" />
                </div>
            </div>

            <div className="addTechnicianRight">
                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">Mobil nömrə 2</p>
                    <input type="tel" className="addTechnicianInput" defaultValue="+994" />
                </div>

                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">Mobil nömrə 3</p>
                    <input type="tel" className="addTechnicianInput" defaultValue="+994" />
                </div>

                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">Ev telefonu</p>
                    <input type="tel" className="addTechnicianInput" defaultValue="+994" />
                </div>

                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">E-poçt ünvanı</p>
                    <input type="email" className="addTechnicianInput" />
                </div>

                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">Ünvan</p>
                    <input type="text" className="addTechnicianInput" />
                </div>

                <div className="leftPartInputData">
                    <p className="leftPartInputTitle">İcazələri</p>
                    <div className="addTechnicianCheckboxGroup">
                        <label><input type="checkbox" /> TAM İCAZƏ</label>
                        <label><input type="checkbox" /> RESEPSİONİST</label>
                        <label><input type="checkbox" /> TİBB BACISI</label>
                        <label><input type="checkbox" /> DİŞ TEXNİKLƏRİ</label>
                        <label><input type="checkbox" /> MALİYYƏ HESABAT</label>
                        <label><input type="checkbox" /> ANBAR</label>
                        <label><input type="checkbox" /> Həkim tam icazə</label>
                        <label><input type="checkbox" /> Həkim limitli</label>
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
                    style={{ display: 'none' }}
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
            <div 
                className="modalOverlay"
                onClick={() => setSelectedImage(null)}
            >
                <div className="modalContent">
                    <img 
                        src={selectedImage} 
                        alt="full-size"
                    />
                </div>
            </div>
        )}

        <div className="addTechnicianActions">
            <button type="button" className="addTechnicianCancelBtn">İmtina et</button>
            <button type="submit" className="addTechnicianSaveBtn">Yadda saxla</button>
        </div>
    </div>
  );
}

export default AddTechnician; 