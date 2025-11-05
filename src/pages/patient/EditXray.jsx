import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TitleUpdater from '../../components/TitleUpdater'; // Yolunuzu düzəldin
import { IoMdClose, IoMdCloudDownload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md"; // Şəkil silmə ikonu
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const EditXray = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [xrayData, setXrayData] = useState({ // Edit üçün dəyərləri saxlayan state
        date: '',
        description: '',
        urls: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentSlideshowImages, setCurrentSlideshowImages] = useState([]);
    const [initialSlideIndex, setInitialSlideIndex] = useState(0);
    const [newImages, setNewImages] = useState([]); // Yeni yüklənəcək şəkillər üçün state

    // Mock X-ray datası (REAL tətbiqdə API-dən gələcək)
    const mockXrayDataList = [
        {
            id: 1,
            date: "2025-03-06", // Tarix formatını input type="date" üçün uyğun etdik
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis nisl diam, sed lobortis massa lobortis a. Duis non quam sit amet nisl pulvinar fringilla. Suspendisse molestie dapibus sapienLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis nisl diam, sed lobortis massa lobortis a. Duis non quam sit amet nisl pulvinar fringilla. Suspendisse molestie dapibus sapien",
            patientId: 101,
            urls: [
                "https://i.ibb.co/L8GfFp5/image-41356b.jpg",
                "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg",
                "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg",
                "https://i.ibb.co/L8GfFp5/image-41356b.jpg"
            ]
        },
        {
            id: 2,
            date: "2023-02-15",
            description: "Bu, ikinci rentgenin əlavə məlumatıdır. Daha çox detal buraya əlavə oluna bilər. Məlumatlar bu bölmədə tam şəkildə göstərilməlidir.",
            patientId: 101,
            urls: [
                "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg",
                "https://i.ibb.co/L8GfFp5/image-41356b.jpg"
            ]
        },
    ];

    useEffect(() => {
        setLoading(true);
        const foundXray = mockXrayDataList.find(xray => xray.id === parseInt(id));
        if (foundXray) {
            setXrayData({
                date: foundXray.date,
                description: foundXray.description,
                urls: foundXray.urls // Mövcud şəkilləri yüklə
            });
        } else {
            setError("Rentgen tapılmadı.");
        }
        setLoading(false);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setXrayData(prevData => ({
            ...prevData,
            [name]: value
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
        // Seçilmiş faylları təmizlə ki, eyni fayl təkrar seçilə bilsin
        e.target.value = null;
    };

    const handleRemoveImage = (indexToRemove, isNew = false) => {
        if (isNew) {
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
        } else {
            setXrayData(prevData => ({
                ...prevData,
                urls: prevData.urls.filter((_, index) => index !== indexToRemove)
            }));
        }
    };
    
    const handleDownloadImage = async (e, imageUrl) => {
        e.stopPropagation();
    
        try {
            const response = await fetch(imageUrl, { mode: 'cors' });
            const blob = await response.blob();
    
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
    
            console.log(`Şəkil uğurla yükləndi: ${imageUrl}`);
        } catch (err) {
            console.error('Şəkil yüklənərkən xəta baş verdi:', err);
            alert("Şəkil yüklənə bilmədi.");
        }
    };

    const handleImageClick = (images, index) => {
        setCurrentSlideshowImages(images); // Bütün şəkilləri moda ötürürük (mövcud + yeni)
        setInitialSlideIndex(index);
        setShowImageModal(true);
    };

    const handleCloseImageModal = () => {
        setShowImageModal(false);
        setCurrentSlideshowImages([]);
        setInitialSlideIndex(0);
    };

    const handleSave = (e) => {
        e.preventDefault(); // Formun standart submit davranışını dayandır
        // Burada API-yə PUT/PATCH sorğusu göndərməlisiniz
        // xrayData (redaktə olunmuş məlumatlar) və newImages (yeni yüklənən fayllar) göndəriləcək

        console.log("Saxlanılır:", xrayData);
        console.log("Yeni şəkillər:", newImages);

        // Nümunə: Əməliyyat uğurlu olduqdan sonra əvvəlki səhifəyə qayıt
        navigate(-1); // Bir səhifə geri get
        alert("Dəyişikliklər uğurla saxlandı!");
    };

    const handleCancel = () => {
        navigate(-1); // Bir səhifə geri get
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl">Məlumat yüklənir...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
    }

    return (
        <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
            <TitleUpdater title={`Rentgeni Redaktə Et: ${id}`} />

            <form onSubmit={handleSave} className="bg-white rounded-lg shadow-xl p-8 w-full max-w-7xl h-auto border border-gray-200">
                <div className="mb-6 flex items-start">
                    <label htmlFor="date" className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Rentgenin tarixi</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={xrayData.date}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg p-3 w-full ml-4 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-6 flex items-start">
                    <label htmlFor="description" className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Əlavə məlumat</label>
                    <textarea
                        id="description"
                        name="description"
                        value={xrayData.description}
                        onChange={handleChange}
                        rows="5"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg p-3 w-full min-h-[100px] whitespace-pre-wrap ml-4 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Əlavə məlumat daxil edin..."
                    ></textarea>
                </div>

                {/* Şəkillər */}
                <div className="mb-6 flex items-start">
                    <label className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Mövcud Şəkillər</label>
                    <div className="flex flex-wrap gap-4 p-2 w-full ml-4 border border-gray-300 rounded-lg bg-gray-50">
                        {xrayData.urls && xrayData.urls.length > 0 ? (
                            xrayData.urls.map((url, index) => (
                                <div
                                    key={`existing-${index}`}
                                    className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group"
                                    onClick={() => handleImageClick(xrayData.urls.concat(newImages.map(img => img.preview)), index)}
                                >
                                    <img
                                        src={url}
                                        alt={`Mövcud X-Ray ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Silmə ikonu */}
                                    <button
                                        type="button" // Form submit etməsin deyə
                                        onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }}
                                        className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
                                        aria-label="Şəkli sil"
                                    >
                                        <MdDeleteForever className="text-xl" />
                                    </button>
                                    {/* Yükləmə ikonu */}
                                    <button
                                        type="button" // Form submit etməsin deyə
                                        onClick={(e) => handleDownloadImage(e, url)}
                                        className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
                                        aria-label="Şəkli yüklə"
                                    >
                                        <IoMdCloudDownload className="text-xl" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-32 flex items-center justify-center text-gray-500">
                                Mövcud şəkil yoxdur
                            </div>
                        )}
                    </div>
                </div>

                {/* Yeni Şəkil Yükləmə */}
                <div className="mb-6 flex items-start">
                    <label htmlFor="newImages" className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Yeni Şəkil Yüklə</label>
                    <div className="w-full ml-4">
                        <input
                            type="file"
                            id="newImages"
                            name="newImages"
                            multiple
                            accept="image/*"
                            onChange={handleNewImageUpload}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                         <div className="flex flex-wrap gap-4 mt-4 p-2 border border-gray-300 rounded-lg bg-gray-50">
                            {newImages.length > 0 ? (
                                newImages.map((image, index) => (
                                    <div
                                        key={`new-${index}`}
                                        className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group"
                                        onClick={() => handleImageClick(xrayData.urls.concat(newImages.map(img => img.preview)), xrayData.urls.length + index)}
                                    >
                                        <img
                                            src={image.preview}
                                            alt={`Yeni X-Ray ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Silmə ikonu (yeni şəkil üçün) */}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handleRemoveImage(index, true); }}
                                            className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
                                            aria-label="Yeni şəkli sil"
                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                        {/* Yeni yüklənən şəkillər üçün yükləmə ikonu */}
                                        <button
                                            type="button"
                                            onClick={(e) => handleDownloadImage(e, image.preview)}
                                            className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
                                            aria-label="Şəkli yüklə"
                                        >
                                            <IoMdCloudDownload className="text-xl" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="w-full h-32 flex items-center justify-center text-gray-500">
                                    Yeni şəkil yüklənməyib.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Düymələr */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-semibold"
                    >
                        Ləğv Et
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                    >
                        Yadda Saxla
                    </button>
                </div>
            </form>

            {/* Şəkil Modalı */}
            {showImageModal && (
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center">
                    <div className="relative flex flex-col items-center justify-center
                                     w-[90%] h-[90vh]
                                     max-w-7xl
                                     bg-white rounded-lg shadow-lg">
                        <button
                            onClick={handleCloseImageModal}
                            className="absolute top-4 right-4 text-gray-800 text-4xl z-10 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            aria-label="Close image view"
                        >
                            <IoMdClose />
                        </button>

                        <Swiper
                            navigation={true}
                            modules={[Navigation]}
                            className="w-full h-full flex items-center justify-center"
                            grabCursor={true}
                            slidesPerView={1}
                            initialSlide={initialSlideIndex}
                        >
                            {currentSlideshowImages.map((imageSrc, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col items-center justify-center w-full h-full p-4">
                                        <img
                                            src={imageSrc}
                                            alt={`X-Ray ${index + 1}`}
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                                            style={{ minWidth: '0', minHeight: '0' }}
                                        />
                                        <div className="mt-4 text-gray-700 text-lg">
                                            {index + 1} / {currentSlideshowImages.length}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditXray;