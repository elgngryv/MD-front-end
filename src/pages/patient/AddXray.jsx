import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleUpdater from "../../components/TitleUpdater";
import { FaCalendarAlt } from "react-icons/fa"; // FaUpload artıq lazım deyil
import { IoMdClose, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md"; // Şəkil silmə ikonu

const AddXRay = () => {
    const navigate = useNavigate();

    const [newXray, setNewXray] = useState({
        date: "",
        description: "",
        urls: [], // urls array olacaq
    });

    const [newImages, setNewImages] = useState([]); // Yeni yüklənəcək şəkillər üçün state

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
                isNew: true // Yeni yüklənən şəkil olduğunu göstərir (AddXRay üçün həmişə isNew olacaq)
            }))
        ]);
        // Seçilmiş faylları təmizlə ki, eyni fayl təkrar seçilə bilsin
        e.target.value = null;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burda `newXray` (tarix və description) və `newImages` (yüklənmiş fayllar)
        // API-yə göndərilməlidir. Məsələn, FormData istifadə edərək.

        // Aşağıdakı konsol loqları yalnız nümunə üçündür, real tətbiqdə API çağırışı olacaq.
        console.log("Yeni Rentgen Məlumatları:", newXray);
        console.log("Yüklənmiş Şəkillər (fayl obyektləri):", newImages.map(img => img.file));

        // API çağırışından sonra navigasiya et
        navigate('/xray');
        alert("Yeni rentgen məlumatları uğurla əlavə edildi!");
    };

    const handleCancel = () => {
        // Yüklənmiş şəkillərin preview URL-lərini təmizlə
        newImages.forEach(img => {
            if (img.preview) {
                URL.revokeObjectURL(img.preview);
            }
        });
        navigate('/xray');
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
                            Şəkil
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

                    {/* Düymələr */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center px-6 py-3 border border-blue-600 rounded-lg shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <IoMdClose className="mr-2 text-lg" /> İmtina et
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <IoMdCheckmarkCircleOutline className="mr-2 text-lg" /> Yadda saxla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddXRay;