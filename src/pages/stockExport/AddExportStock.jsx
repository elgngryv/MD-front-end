import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../../assets/style/StockExport/addexportstock.css';
import AddPhotoIcon from "../../assets/icons/AddPhoto";
import CloseIcon from "../../assets/icons/Close";
import useWarehouseRemovalProductsStore from '../../../stores/warehouseRemovalProductsStore'; // Bu sizin məxaric store-unuzdur
import useOrdersFromWarehouseStore from '../../../stores/orderFromWarehouseStore'; // Yeni: Anbar Sifarişləri store-unu import etdik
import { useNavigate } from 'react-router-dom';

const AddExportStock = () => {
    const navigate = useNavigate();
    const { createProduct, loading, error } = useWarehouseRemovalProductsStore();

    // Anbar Sifarişləri store-dan məlumatları çəkirik
    const { orders, fetchOrders, loading: ordersLoading, error: ordersError } = useOrdersFromWarehouseStore();

    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Yeni: Seçilən anbar sifarişinin ID-si üçün state
    const [selectedOrderId, setSelectedOrderId] = useState('');

    const initialFormData = {
        date: '',
        time: '',
        warehouseRemovalId: '',
        requests: [], // Məhsullar bura əlavə olunacaq
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    // `quantity` sahəsi `requests` array-inin uzunluğuna əsasən avtomatik hesablanır
    useEffect(() => {
        setFormData(prev => ({ ...prev, quantity: prev.requests.length }));
    }, [formData.requests.length]);

    // Anbar sifarişlərini komponent yüklənəndə çəkmək üçün useEffect
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Handle input changes for main form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle changes for product-specific fields (specifically currentExpenses)
    const handleProductChange = useCallback((index, field, value) => {
        setFormData((prev) => {
            const newRequests = [...prev.requests];
            // Yoxlama əlavə edirik: currentExpenses RemainingQuantity-dən çox olmasın
            if (field === 'currentExpenses') {
                const remaining = newRequests[index].remainingQuantity;
                const parsedValue = parseInt(value) || 0;
                newRequests[index] = {
                    ...newRequests[index],
                    [field]: parsedValue > remaining ? remaining : parsedValue < 0 ? 0 : parsedValue, // 0-dan az olmasın
                };
            } else {
                newRequests[index] = {
                    ...newRequests[index],
                    [field]: value, // Digər sahələr üçün dəyəri birbaşa təyin et
                };
            }
            return { ...prev, requests: newRequests };
        });
    }, []);

    const handleDeleteImage = useCallback((index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const handleImageClick = useCallback((file) => {
        setSelectedImage(file);
    }, []);

    const handleFileSelect = useCallback((event) => {
        const selectedFiles = Array.from(event.target.files);
        const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
        setFiles((prev) => [...prev, ...imageUrls]);
    }, []);

    const handleUploadClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    // --- YENİLƏNMİŞ: handleAddProductsFromOrder funksiyası ---
    // Seçilən sifarişin bütün məhsullarını cədvələ əlavə edir
    const handleAddProductsFromOrder = () => {
        if (!selectedOrderId) {
            alert("Zəhmət olmasa məhsullarını əlavə etmək üçün bir sifariş seçin.");
            return;
        }

        const orderToAdd = orders.find(o => o.id.toString() === selectedOrderId);

        if (orderToAdd && orderToAdd.products && orderToAdd.products.length > 0) {
            // Yalnız hələ əlavə edilməmiş məhsulları əlavə et
            const newProducts = orderToAdd.products.filter(apiProduct =>
                !formData.requests.some(formProduct => 
                    formProduct.orderFromWarehouseProductId === apiProduct.id
                )
            ).map(apiProduct => ({
                // API-dən gələn məlumatları uyğun adlarla map edirik
                orderFromWarehouseProductId: apiProduct.id, // Bu, API-nin istədiyi ID-dir
                currentExpenses: 0, // Başlanğıc məxaric dəyəri
                category: apiProduct.category || 'N/A', // `category` API-dən necə gəlirsə
                productName: apiProduct.productName,
                specifications: apiProduct.specifications || 'N/A',
                orderQuantity: apiProduct.orderQuantity || 0, // Sifarişdəki miqdar
                sentQuantity: apiProduct.sentQuantity || 0, // Göndərilən miqdar
                remainingQuantity: (apiProduct.orderQuantity || 0) - (apiProduct.sentQuantity || 0), // Qalan miqdar
            }));

            if (newProducts.length === 0) {
                alert("Seçilən sifarişdəki bütün məhsullar artıq cədvələ əlavə olunub.");
                return;
            }

            setFormData(prev => ({
                ...prev,
                requests: [...prev.requests, ...newProducts]
            }));
            // setSelectedOrderId(''); // Əlavə etdikdən sonra seçimi sıfırlaya bilərsiniz (və ya yox)
        } else {
            alert("Seçilən sifariş tapılmadı və ya tərkibində məhsul yoxdur.");
        }
    };


    // Məhsulu cədvəldən silmək üçün funksiya
    const handleDeleteProduct = (index) => {
        setFormData(prev => ({
            ...prev,
            requests: prev.requests.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasiya: Tarix, saat, anbar ID daxil edilibmi?
        if (!formData.date || !formData.time || !formData.warehouseRemovalId) {
            alert("Zəhmət olmasa sifariş tarixi, saatı və Anbar Məxaric ID-ni doldurun.");
            return;
        }
        // Validasiya: Heç olmasa bir məhsul əlavə edilibmi?
        if (formData.requests.length === 0) {
            alert("Zəhmət olmasa ən azı bir məhsul əlavə edin.");
            return;
        }

        // `currentExpenses` dəyərlərinin `remainingQuantity`-dən böyük olmadığını yoxla
        const isValidQuantities = formData.requests.every(product => 
            product.currentExpenses <= product.remainingQuantity
        );
        if (!isValidQuantities) {
            alert("Cari məxaric miqdarı qalıq miqdarı keçə bilməz.");
            return;
        }

        const dataToSend = {
            date: formData.date,
            time: formData.time,
            warehouseRemovalId: formData.warehouseRemovalId ? parseInt(formData.warehouseRemovalId) : 0,
            requests: formData.requests.map(product => ({
                orderFromWarehouseProductId: product.orderFromWarehouseProductId,
                currentExpenses: product.currentExpenses,
            })),
            description: formData.description,
        };
        
        console.log("Göndərilən Data:", JSON.stringify(dataToSend, null, 2));

        try {
            await createProduct(dataToSend);
            alert("Məxaric uğurla əlavə edildi!");
            setFormData(initialFormData);
            setFiles([]);
            setSelectedOrderId(''); // Formu sıfırlayarkən seçimi də sıfırla
            navigate('/stock/exports');
        } catch (err) {
            console.error("Məxaric əlavə edilərkən xəta baş verdi:", err);
            alert(`Məxaric əlavə edilərkən xəta baş verdi: ${error?.message || 'Naməlum xəta'}`);
        }
    };

    return (
        <div className="addExportStockContainer">
            <form onSubmit={handleSubmit}>
                <div className="addExportStockTopPart">
                    <div className="addExportStockFormGroup">
                        <label>Sifariş tarixi</label>
                        <input 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="addExportStockFormGroup">
                        <label>Saat</label>
                        <input 
                            type="time" 
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="addExportStockFormGroup">
                        <label>Anbar Məxaric ID</label>
                        <input
                            type="number"
                            name="warehouseRemovalId"
                            value={formData.warehouseRemovalId}
                            onChange={handleInputChange}
                            placeholder="Anbar Məxaric ID daxil edin"
                            required
                        />
                    </div>
                    <div className="addExportStockFormGroup">
                        <label>Çeşid sayı</label>
                        <input 
                            type="number" 
                            name="quantity"
                            value={formData.quantity}
                            readOnly
                            className="read-only-input"
                        />
                    </div>
                    <div className="addExportStockFormGroup">
                        <label>Qeyd</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="addExportStockTableSection">
                    <h3>Məhsullar</h3>
                    <div className="order-product-selection-area">
                        <label htmlFor="order-select">Anbar Sifarişi Seçin:</label>
                        <select 
                            id="order-select"
                            value={selectedOrderId} 
                            onChange={(e) => setSelectedOrderId(e.target.value)}
                            disabled={ordersLoading}
                        >
                            <option value="">-- Sifariş seçin --</option>
                            {ordersLoading && <option disabled>Sifarişlər yüklənir...</option>}
                            {ordersError && <option disabled>Xəta: {ordersError}</option>}
                            {orders.map(order => (
                                <option key={order.id} value={order.id}>
                                    Sifariş #{order.id} ({order.date})
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddProductsFromOrder} className="add-all-products-from-order-button">
                            Sifarişin məhsullarını əlavə et
                        </button>
                    </div>

                    <table className="addExportStockTable">
                        <thead>
                            <tr>
                                <th>Kateqoriyası</th>
                                <th>Məhsulun adı</th>
                                <th>Özəllikləri</th>
                                <th>Sifariş miq.</th>
                                <th>Göndərilən miq.</th>
                                <th>Qalıq miqdar</th>
                                <th>Cari məxaric</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.requests.length > 0 ? (
                                formData.requests.map((product, index) => (
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
                                                value={product.currentExpenses}
                                                onChange={(e) => handleProductChange(index, 'currentExpenses', e.target.value)}
                                                min="0"
                                                max={product.remainingQuantity} // Qalıq miqdardan çox olmasın
                                            />
                                        </td>
                                        <td>
                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteProduct(index)}
                                                className="delete-product-button"
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">
                                        Məhsullar əlavə edilməyib. Yuxarıdan sifariş seçib məhsullarını əlavə edin.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="addExportStockUpload">
                    <label className="addExportStockDocumentLabel">Sənədlər*</label>
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
                            className="addExportStockUploadButton"
                            onClick={handleUploadClick}
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
                    <div className="modalOverlay" onClick={() => setSelectedImage(null)}>
                        <div className="modalContent">
                            <img src={selectedImage} alt="full-size" />
                        </div>
                    </div>
                )}

                <div className="addExportStockButtonGroup">
                    <button 
                        type="button" 
                        className="addExportStockCancelButton"
                        onClick={() => navigate('/stock/exports')}
                    >
                        İmtina et
                    </button>
                    <button 
                        type="submit" 
                        className="addExportStockSaveButton"
                        disabled={loading}
                    >
                        {loading ? 'Yüklənir...' : 'Yadda saxla'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddExportStock;