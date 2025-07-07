import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams əlavə edildi
// Removed: import { FiEdit } from 'react-icons/fi';
// Removed: import { FaTrashAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx'; // Close icon for modal

// Assuming these are your custom SVG icon components
import EditIcon from "../../assets/icons/Edit"; // Custom Edit Icon
import DeleteIcon from "../../assets/icons/Delete"; // Custom Delete Icon

const PatientInsuranceBalanceInfo = ({ infoData }) => {
    const navigate = useNavigate();
    // URL-dən patientId, insuranceBalanceId və infoId-ni çıxarırıq
    const { patientId, insuranceBalanceId, infoId } = useParams(); 

    const [data, setData] = useState({
        date: '',
        amount: '',
        documents: [],
    });

    const [selectedImage, setSelectedImage] = useState(null); // State for full-size image modal

    useEffect(() => {
        if (infoData) {
            setData({
                date: infoData.date || '',
                amount: infoData.amount || '',
                documents: infoData.documents ? [...infoData.documents] : [],
            });
        }
        // Qeyd: Əgər məlumatları URL-dəki ID-lərə əsasən API-dən çəkirsinizsə,
        // bu hissəni burada aktivləşdirə bilərsiniz. Məsələn:
        // if (patientId && insuranceBalanceId && infoId) {
        //     fetch(`/api/patients/${patientId}/insurance/${insuranceBalanceId}/info/${infoId}`)
        //         .then(res => res.json())
        //         .then(fetchedData => setData({
        //             date: fetchedData.date,
        //             amount: fetchedData.amount,
        //             documents: fetchedData.documents || []
        //         }));
        // }
    }, [infoData, patientId, insuranceBalanceId, infoId]); // `useParams` dəyərləri də dependency siyahısına əlavə edildi

    const handleEditClick = () => {
        // Redaktə səhifəsinə doğru URL ilə yönləndirmə
        // `patientId`, `insuranceBalanceId` və `infoId` dəyərləri URL-dən istifadə olunur
        const editPath = `/patients/patient/${patientId}/insurance/insurance-balance/${insuranceBalanceId}/edit/${infoId}`;
        console.log('Edit icon clicked. Navigating to:', editPath);
        navigate(editPath, { state: { initialData: data } }); 
    };

    const handleDeleteClick = () => {
        // Handle delete action, e.g., show a confirmation modal or directly call an API
        console.log('Delete icon clicked for:', data);
        const confirmDelete = window.confirm('Bu məlumatı silmək istədiyinizə əminsiniz?');
        if (confirmDelete) {
            // Implement your delete logic here, possibly using patientId, insuranceBalanceId, infoId
            alert('Məlumat silindi (simulyasiya)!'); 
            navigate(-1); 
        }
    };

    const handleImageClick = (fileUrl) => {
        setSelectedImage(fileUrl); 
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-end gap-3 mb-4">
                <button
                    type="button"
                    onClick={handleEditClick}
                    className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    title="Redaktə et"
                >
                    <EditIcon /> 
                </button>
                <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200"
                    title="Sil"
                >
                    <DeleteIcon /> 
                </button>
            </div>

            <div className="flex-grow">
                <form className="space-y-6">
                    {/* Tarix */}
                    <div className="flex items-center gap-6">
                        <label htmlFor="date" className="w-24 text-sm font-medium text-gray-700">
                            Tarix
                        </label>
                        <div className="flex-grow">
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={data.date}
                                readOnly 
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-sm cursor-default"
                            />
                        </div>
                    </div>

                    {/* Məbləğ */}
                    <div className="flex items-center gap-6">
                        <label htmlFor="amount" className="w-24 text-sm font-medium text-gray-700">
                            Məbləğ
                        </label>
                        <div className="flex-grow">
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={data.amount}
                                readOnly 
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-sm cursor-default"
                                placeholder="Məbləğ"
                            />
                        </div>
                    </div>

                    {/* Sənəd hissəsi (yalnız göstərmək üçün) */}
                    <div className="flex items-start gap-6">
                        <label htmlFor="document-preview" className="w-24 text-sm font-medium text-gray-700 mt-2">
                            Sənəd
                        </label>
                        <div className="flex-grow flex flex-col gap-3">
                            {data.documents.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {data.documents.map((fileUrl, index) => (
                                        <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                            <img
                                                src={fileUrl}
                                                alt={`Sənəd ${index + 1} önizləməsi`}
                                                className="w-full h-full object-cover cursor-pointer"
                                                onClick={() => handleImageClick(fileUrl)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Sənəd əlavə edilməyib.</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Full-size image modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-3xl max-h-full overflow-auto rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="full-size" className="max-w-full max-h-full object-contain" />
                        <button
                            className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-1.5 flex items-center justify-center shadow-md hover:bg-gray-200"
                            onClick={() => setSelectedImage(null)}
                            title="Close"
                        >
                            <RxCross2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientInsuranceBalanceInfo;