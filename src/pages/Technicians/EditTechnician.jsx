import React, { useState, useRef } from 'react';
import "../../assets/style/Technicians/edittechnician.css"
import AddPhotoIcon from '../../assets/icons/AddPhoto';
import CloseIcon from '../../assets/icons/Close';

function EditTechnician() {
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
    <div className="editTechnicianFormContainer"> 
        <div className="editTechFormPart">
            <div className="editTechnicianLeft">
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        İstifadəçi adı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="editTechnicianInput" />
                </div>
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        Adı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="editTechnicianInput" />
                </div>
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        Soyadı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="editTechnicianInput" />
                </div>
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        Ata adı <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="editTechnicianInput" />
                </div>
                <div className="editPartInputGender">
                    <p className="editPartInputTitle">
                        Cinsiyyət <span className='requiredStar'>*</span>
                    </p>
                    <div className="editGenderOptions">
                        <label className="editGenderLabel">
                            <input type="radio" name="gender" value="male" />
                            Kişi
                        </label>
                        <label className="editGenderLabel">
                            <input type="radio" name="gender" value="female" />
                            Qadın
                        </label>
                    </div>
                </div>
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        Fin kodu <span className='requiredStar'>*</span>
                    </p>
                    <input type="text" className="editTechnicianInput" />
                </div>
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        Şifrə
                    </p>
                    <input type="password" className="editTechnicianInput" />
                </div>
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        Doğum tarixi
                    </p>
                    <input type="date" className="editTechnicianInput" />
                </div>
                <div className="editPartInputData">
                    <p className="editPartInputTitle">
                        Mobil nömrə 1 <span className='requiredStar'>*</span>
                    </p>
                    <input type="tel" className="editTechnicianInput" defaultValue="+994" />
                </div>
            </div>

            <div className="editTechnicianRight">
                <div className="editPartInputData">
                    <p className="editPartInputTitle">Mobil nömrə 2</p>
                    <input type="tel" className="editTechnicianInput" defaultValue="+994" />
                </div>

                <div className="editPartInputData">
                    <p className="editPartInputTitle">Mobil nömrə 3</p>
                    <input type="tel" className="editTechnicianInput" defaultValue="+994" />
                </div>

                <div className="editPartInputData">
                    <p className="editPartInputTitle">Ev telefonu</p>
                    <input type="tel" className="editTechnicianInput" defaultValue="+994" />
                </div>

                <div className="editPartInputData">
                    <p className="editPartInputTitle">E-poçt ünvanı</p>
                    <input type="email" className="editTechnicianInput" />
                </div>

                <div className="editPartInputData">
                    <p className="editPartInputTitle">Ünvan</p>
                    <input type="text" className="editTechnicianInput" />
                </div>

                <div className="editPartInputData">
                    <p className="editPartInputTitle">İcazələri</p>
                    <div className="editTechnicianCheckboxGroup">
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
                    style={{ display: 'none' }}
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

        {selectedImage && (
            <div 
                className="editModalOverlay"
                onClick={() => setSelectedImage(null)}
            >
                <div className="editModalContent">
                    <img 
                        src={selectedImage} 
                        alt="full-size"
                    />
                </div>
            </div>
        )}

        <div className="editTechnicianActions">
            <button type="button" className="editTechnicianCancelBtn">İmtina et</button>
            <button type="submit" className="editTechnicianSaveBtn">Yadda saxla</button>
        </div>
    </div>
  );
}

export default EditTechnician;