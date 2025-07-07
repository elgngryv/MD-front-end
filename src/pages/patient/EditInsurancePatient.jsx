import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams əlavə edildi

const EditInsurancePatient = () => {
    const navigate = useNavigate();
    const { patientId, insuranceId } = useParams(); // URL parametrlərini alırıq

    // Nümunə məlumatı: Realda bu məlumatı API-dən patientId və insuranceId-yə əsasən yükləməlisiniz.
    // Bu, formanın ilkin dəyərlərini təmsil edir.
    const initialInsuranceData = {
        insuranceCompany: "Paşa Sığorta", // Misal üçün mövcud dəyər
        policyNo: "POLIS123456789",    // Misal üçün mövcud dəyər
        expiryDate: "2026-12-31",      // Misal üçün mövcud dəyər
        deductibleAmount: "200",       // Misal üçün mövcud dəyər
        maxAnnualAmount: "10000",      // Misal üçün mövcud dəyər
        note: "Bu sığorta paketi standart tibbi xidmətləri əhatə edir. Diş müalicəsi daxil deyil.", // Misal üçün mövcud dəyər
    };

    const [formData, setFormData] = useState(initialInsuranceData);

    // Real tətbiqdə, useEffect istifadə edərək məlumatları yükləyərsiniz:
    useEffect(() => {
        // Məsələn:
        // const fetchInsuranceData = async () => {
        //     try {
        //         const response = await fetch(`/api/patients/${patientId}/insurance/${insuranceId}`);
        //         const data = await response.json();
        //         setFormData(data);
        //     } catch (error) {
        //         console.error("Sığorta məlumatı yüklənərkən xəta baş verdi:", error);
        //     }
        // };
        //
        // if (patientId && insuranceId) {
        //     fetchInsuranceData();
        // }
    }, [patientId, insuranceId]); // patientId və insuranceId dəyişdikdə yenidən yükləyin

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dəyişikliklər yadda saxlandı:", formData);
        // Burada yenilənmiş məlumatları API-yə göndərə bilərsiniz (PUT/PATCH zəngi)
        // fetch(`/api/patients/${patientId}/insurance/${insuranceId}`, {
        //     method: 'PUT', // və ya 'PATCH'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     navigate(`/patients/patient/${patientId}/insurance/info/${insuranceId}`); // Məlumat səhifəsinə geri qayıt
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });

        navigate(`/patients/patient/${patientId}/insurance/info/${insuranceId}`); // Müvəqqəti yönləndirmə
    };

    const handleCancel = () => {
        console.log("Redaktə imtina edildi.");
        // Əgər ID-lər mövcuddursa, info səhifəsinə yönləndir, əks halda geri qayıt
        if (patientId && insuranceId) {
            navigate(`/patients/patient/${patientId}/insurance/info/${insuranceId}`);
        } else {
            navigate(-1); // Bir səhifə geri qayıt
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-w-100% mx-auto my-8">

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Sığorta şirkəti - Dropdown */}
                <div className="flex items-center gap-3">
                    <label htmlFor="insuranceCompany" className="text-base font-medium text-gray-700 w-1/3">
                        Sığorta şirkəti <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex-1">
                        <select
                            id="insuranceCompany"
                            name="insuranceCompany"
                            value={formData.insuranceCompany}
                            onChange={handleChange}
                            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none pr-10"
                            required
                        >
                            <option value="">Seçin</option>
                            <option value="A-Group Sığorta">A-Group Sığorta</option>
                            <option value="Paşa Sığorta">Paşa Sığorta</option>
                            <option value="Atəşgah Sığorta">Atəşgah Sığorta</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Polis No */}
                <div className="flex items-center gap-3">
                    <label htmlFor="policyNo" className="text-base font-medium text-gray-700 w-1/3">
                        Polis No <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="policyNo"
                        name="policyNo"
                        value={formData.policyNo}
                        onChange={handleChange}
                        className="block w-full flex-1 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder=""
                        required
                    />
                </div>

                {/* Bitmə tarixi */}
                <div className="flex items-center gap-3">
                    <label htmlFor="expiryDate" className="text-base font-medium text-gray-700 w-1/3">
                        Bitmə tarixi <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex-1">
                        <input
                            type="date"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            required
                        />
                    </div>
                </div>

                {/* Azadolma məbləği */}
                <div className="flex items-center gap-3">
                    <label htmlFor="deductibleAmount" className="text-base font-medium text-gray-700 w-1/3">
                        Azadolma məbləği
                    </label>
                    <input
                        type="text"
                        id="deductibleAmount"
                        name="deductibleAmount"
                        value={formData.deductibleAmount}
                        onChange={handleChange}
                        className="block w-full flex-1 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder=""
                    />
                </div>

                {/* İllik maksimum məbləğ */}
                <div className="flex items-center gap-3">
                    <label htmlFor="maxAnnualAmount" className="text-base font-medium text-gray-700 w-1/3">
                        İllik maksimum məbləğ
                    </label>
                    <input
                        type="text"
                        id="maxAnnualAmount"
                        name="maxAnnualAmount"
                        value={formData.maxAnnualAmount}
                        onChange={handleChange}
                        className="block w-full flex-1 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder=""
                    />
                </div>

                {/* Qeyd */}
                <div className="flex items-start gap-3">
                    <label htmlFor="note" className="text-base font-medium text-gray-700 w-1/3">
                        Qeyd
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        rows="4"
                        className="block w-full flex-1 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                        placeholder=""
                    ></textarea>
                </div>

                {/* Düymələr */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center justify-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-300"
                    >
                        <span className="mr-2">✕</span> İmtina et
                    </button>
                    <button
                        type="submit"
                        className="flex items-center justify-center bg-[#155EEF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#124DCC] transition-all duration-300"
                    >
                        <span className="mr-2">✓</span> Dəyişiklikləri yadda saxla
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInsurancePatient;