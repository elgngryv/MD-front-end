import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '../../assets/icons/Edit';
import DeleteIcon from '../../assets/icons/Delete';
import TitleUpdater from '../../components/TitleUpdater';
import { IoMdClose, IoMdCloudDownload } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const InfoXray = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [xrayDetail, setXrayDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentSlideshowImages, setCurrentSlideshowImages] = useState([]);
    const [initialSlideIndex, setInitialSlideIndex] = useState(0);

    // Mock X-ray datası - İndi hər X-ray obyekti birdən çox 'urls' (şəkil URL-ləri) ehtiva edir
    const mockXrayData = [
        {
            id: 1,
            date: "06.03.2025",
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
            date: "15.02.2023",
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
        const foundXray = mockXrayData.find(xray => xray.id === parseInt(id));
        if (foundXray) {
            setXrayDetail(foundXray);
        } else {
            setError("X-ray tapılmadı.");
        }
        setLoading(false);
    }, [id]);

    const handleEditClick = () => {
        navigate(`../xray/edit/${id}`);
    };

    const handleDeleteClick = () => {
        console.log(`X-ray ID ${id} silindi.`);
    };

    const handleImageClick = (imageUrl, index) => {
        setCurrentSlideshowImages(xrayDetail.urls);
        setInitialSlideIndex(index);
        setShowImageModal(true);
    };

    const handleCloseImageModal = () => {
        setShowImageModal(false);
        setCurrentSlideshowImages([]);
        setInitialSlideIndex(0);
    };

    // Bu funksiya şəkli avtomatik yükləyir, yeni səhifəyə atmır
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
            window.URL.revokeObjectURL(blobUrl); // yaddaşı təmizləmək üçün
    
            console.log(`Şəkil uğurla yükləndi: ${imageUrl}`);
        } catch (err) {
            console.error('Şəkil yüklənərkən xəta baş verdi:', err);
            alert("Şəkil yüklənə bilmədi.");
        }
    };
    

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl">Məlumat yüklənir...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-xl text-red-500">{error}</div>;
    }

    if (!xrayDetail) {
        return <div className="flex justify-center items-center h-screen text-xl text-gray-600">X-ray məlumatı mövcud deyil.</div>;
    }

    return (
        <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
            <TitleUpdater title={`X-Ray Detalları: ${xrayDetail.id}`} />

            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-7xl h-auto border border-gray-200">
                <div className="flex justify-end items-center mb-6 gap-3">
                    <button
                        onClick={handleEditClick}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Düzəliş et"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        aria-label="Sil"
                    >
                        <DeleteIcon />
                    </button>
                </div>

                {/* Rentgenin Tarixi */}
                <div className="mb-6 flex items-start">
                    <label className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Rentgenin tarixi</label>
                    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg p-3 w-full ml-4">
                        {xrayDetail.date}
                    </div>
                </div>

                {/* Əlavə Məlumat */}
                <div className="mb-6 flex items-start">
                    <label className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Əlavə məlumat</label>
                    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg p-3 w-full min-h-[100px] whitespace-pre-wrap ml-4">
                        {xrayDetail.description}
                    </div>
                </div>

                {/* Şəkillər */}
                <div className="mb-6 flex items-start">
                    <label className="block text-gray-700 text-base font-semibold mb-2 w-48 flex-shrink-0 pt-3">Şəkil</label>
                    <div className="flex flex-wrap gap-4 p-2 w-full ml-4 border border-gray-300 rounded-lg bg-gray-50">
                        {xrayDetail.urls && xrayDetail.urls.length > 0 ? (
                            xrayDetail.urls.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                                    onClick={() => handleImageClick(url, index)}
                                >
                                    <img
                                        src={url}
                                        alt={`X-Ray ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Yükləmə ikonu */}
                                    <button
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
                                Şəkil yoxdur
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                            {currentSlideshowImages.map((imageUrl, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col items-center justify-center w-full h-full p-4">
                                        <img
                                            src={imageUrl}
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

export default InfoXray;