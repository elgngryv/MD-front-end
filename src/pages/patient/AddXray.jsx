import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams əlavə edildi
import TitleUpdater from "../../components/TitleUpdater";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdClose, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

// Tutaq ki, patientId URL-dən gəlir.
// Məsələn, marşrutunuz `/patients/:patientId/xrays/add` kimi ola bilər.
// Əgər ID başqa yerdən gəlirsə, ona uyğun tənzimləyin.

const AddXRay = () => {
    const navigate = useNavigate();
    const { patientId } = useParams(); // URL-dən patientId-ni alırıq

    const [newXray, setNewXray] = useState({
        date: "",
        description: "",
        // patientId əlavə edildi (Əgər URL-dən gəlmirsə, başqa yolla əldə edin)
        patientId: patientId || "", // useParams-dan gələn patientId istifadə olunur
    });

    const [newImages, setNewImages] = useState([]); // Yeni yüklənəcək şəkillər üçün state
    const [loading, setLoading] = useState(false); // Yüklənmə vəziyyəti üçün state
    const [error, setError] = useState(null); // Səhvlər üçün state

    // Bunu öz API-nizin ünvanına uyğun dəyişdirin!
    const API_BASE_URL = "http://161.97.179.107:8080"; // Məsələn

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewXray((prevXray) => ({
            ...prevXray,
            [name]: value,
        }));
    };

    const handleNewImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prevImages => [
            ...prevImages,
            ...files.map(file => ({
                file,
                preview: URL.createObjectURL(file), // Şəkil preview üçün URL
                isNew: true // Yeni yüklənən şəkil olduğunu göstərir
            }))
        ]);
        e.target.value = null; // Seçilmiş faylları təmizlə ki, eyni fayl təkrar seçilə bilsin
    };

    const handleRemoveImage = (indexToRemove) => {
        setNewImages(prevImages => {
            const updatedImages = prevImages.filter((_, index) => index !== indexToRemove);
            // Preview URL-ləri təmizlə
            prevImages.forEach((img, idx) => {
                if (idx === indexToRemove && img.preview) {
                    URL.revokeObjectURL(img.preview);
                }
            });
            return updatedImages;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validasiya (məsələn, şəkil seçilibmi)
        if (newImages.length === 0) {
            setError("Zəhmət olmasa, ən azı bir şəkil seçin.");
            setLoading(false);
            return;
        }
        if (!newXray.date) {
            setError("Rentgenin tarixi boş ola bilməz.");
            setLoading(false);
            return;
        }
        if (!newXray.patientId) {
            setError("Xəstə ID-si təyin olunmayıb. Zəhmət olmasa, səhifəni yenidən yükləyin və ya ID-nin düzgün göndərildiyindən əmin olun.");
            setLoading(false);
            return;
        }

        const formData = new FormData();

        // 'data' hissəsini JSON stringi kimi əlavə et
        // Buradakı 'patientId' key-value cütü sizin back-end-inizin gözlədiyi kimi olmalıdır.
        // Swagger-də "data" obyekti altında olduğu görünür.
        const xrayData = {
            date: newXray.date,
            description: newXray.description,
            patientId: parseInt(newXray.patientId), // patientId-ni int-ə çevirin, əgər backend int gözləyirsə
            // urls sahəsi boş qalacaq, çünki server onu avtomatik dolduracaq
        };

        // FormData-ya 'data' JSON hissəsini əlavə edirik
        // Blob olaraq əlavə etmək, Postman-dəki "JSON" tipi seçiminə bənzərdir
        formData.append("data", new Blob([JSON.stringify(xrayData)], { type: "application/json" }));

        // Faylları əlavə et (birdən çox ola bilər)
        newImages.forEach((image, index) => {
            // Server tərəfdə @RequestPart("file") deyə qəbul edilirsə, sadəcə "file" olaraq göndərilir.
            // Əgər server tərəfdə List<MultipartFile> qəbul edilsə, bəzən "files" və ya "file[]" kimi göndərilir.
            // Swagger-də "file" string($binary) yazıldığından, "file" olaraq tək-tək göndəririk.
            formData.append("file", image.file);
        });

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/patient-xray/create`, {
                method: "POST",
                // Headers avtomatik olaraq 'multipart/form-data; boundary=...' təyin olunacaq
                // FormData istifadə edərkən Content-Type başlığını əl ilə təyin etməyin!
                headers: {
                    // Məsələn, Authorization tokenini localStorage-dan oxuya bilərsiniz
                    'Authorization': `Bearer ${localStorage.getItem('yourAuthToken')}`, // Tokeninizi buradan alın
                    // 'Accept': 'application/json', // Opsiyonel: Yaxşı praktikadır
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `API səhvi: ${response.status}`);
            }

            // Uğurlu cavab
            alert("Yeni rentgen məlumatları uğurla əlavə edildi!");
            navigate(`/patients/${patientId}/xrays`); // X-ray siyahısı səhifəsinə yönləndirmə
        } catch (err) {
            console.error("Rentgen əlavə edilərkən səhv baş verdi:", err);
            setError(err.message || "Rentgen əlavə edilərkən gözlənilməyən səhv baş verdi.");
        } finally {
            setLoading(false);
            // Preview URL-ləri təmizlə
            newImages.forEach(img => {
                if (img.preview) {
                    URL.revokeObjectURL(img.preview);
                }
            });
        }
    };

    const handleCancel = () => {
        // Yüklənmiş şəkillərin preview URL-lərini təmizlə
        newImages.forEach(img => {
            if (img.preview) {
                URL.revokeObjectURL(img.preview);
            }
        });
        navigate(`/patients/${patientId}/xrays`); // X-ray siyahısı səhifəsinə yönləndirmə
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <TitleUpdater title="Yeni Rentgen Əlavə Et" />

            <div className="w-full max-w-[1200px] bg-white p-8 rounded-lg shadow-md mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Rentgenin tarixi */}
                    <div className="flex items-center">
                        <label htmlFor="date" className="w-1/4 text-md font-medium text-gray-800 mr-4">
                            Rentgenin tarixi <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex-1">
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={newXray.date}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                                required
                            />
                            <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Əlavə məlumat */}
                    <div className="flex items-start">
                        <label htmlFor="description" className="w-1/4 text-md font-medium text-gray-800 mr-4 mt-2">
                            Əlavə məlumat
                        </label>
                        <div className="flex-1">
                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                value={newXray.description}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base resize-none"
                                placeholder=""
                            ></textarea>
                        </div>
                    </div>

                    {/* Şəkil Yüklə */}
                    <div className="flex items-start">
                        <label htmlFor="image-upload" className="w-1/4 text-md font-medium text-gray-800 mr-4 pt-2">
                            Şəkil <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1">
                            <input
                                type="file"
                                id="image-upload"
                                name="image-upload"
                                multiple // Birdən çox şəkil seçmək üçün
                                accept="image/*"
                                onChange={handleNewImageUpload}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {/* Yüklənmiş şəkillərin önizləməsi */}
                            <div className="flex flex-wrap gap-4 mt-4 p-2 border border-gray-300 rounded-lg bg-gray-50">
                                {newImages.length > 0 ? (
                                    newImages.map((image, index) => (
                                        <div key={index} className="relative w-32 h-32 md:w-40 md:h-40 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                            <img
                                                src={image.preview}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
                                                aria-label="Şəkli sil"
                                            >
                                                <MdDeleteForever className="text-xl" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full h-24 flex items-center justify-center text-gray-500">
                                        Şəkil seçilməyib.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Error Mesajı */}
                    {error && (
                        <div className="flex justify-center text-red-600 text-sm mt-4">
                            {error}
                        </div>
                    )}

                    {/* Düymələr */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center px-6 py-3 border border-blue-600 rounded-lg shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={loading} // Yüklənərkən düyməni deaktiv et
                        >
                            <IoMdClose className="mr-2 text-lg" /> İmtina et
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={loading} // Yüklənərkən düyməni deaktiv et
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Yüklənir...
                                </>
                            ) : (
                                <>
                                    <IoMdCheckmarkCircleOutline className="mr-2 text-lg" /> Yadda saxla
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddXRay;