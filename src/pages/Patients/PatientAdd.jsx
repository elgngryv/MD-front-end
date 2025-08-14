import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/PatientsPage/addpatient.css";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";
import verifyButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import usePatientStore from "../../../stores/patiendStore";
import useBlackListResultStore from "../../../stores/blacklistReasonStore";
import usePriceCategoryStore from "../../../stores/priceCategoryStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientAdd = () => {
  const { addPatient } = usePatientStore();
  const { results: blacklistOptions, fetchResults: fetchBlacklistOptions } =
    useBlackListResultStore();
  const { categories: priceCategories, fetchCategories: fetchPriceCategories } =
    usePriceCategoryStore();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    finCode: "",
    genderStatus: "",
    dateOfBirth: "",
    priceCategoryStatus: "", // Qiymət kateqoriyası ID-si string olaraq gələcək, sonra parseInt ediləcək
    specializationStatus: "",
    doctorId: null,
    isVip: false, // Bu sahənin "priceCategoryStatus" ilə əlaqəsi yoxdur, ayrı idarə olunur
    isBlacklisted: false,
    blacklistCategory: "",
    phone: "",
    whatsapp: "",
    workPhone: "",
    homePhone: "",
    email: "",
    homeAddress: "",
    workAddress: "",
    recommender: "",
  });

  useEffect(() => {
    // Doktorları yüklə
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://161.97.179.107:5555/api/v1/general-calendar/read-doctors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Doktorları alarkən xəta:", error);
        toast.error("Doktor məlumatları yüklənərkən xəta baş verdi.");
      }
    };
    fetchDoctors();

    // Qara siyahı seçimlərini yüklə
    fetchBlacklistOptions();

    // Qiymət kateqoriyalarını yüklə
    fetchPriceCategories();
  }, [fetchBlacklistOptions, fetchPriceCategories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked; // Checkbox üçün 'checked' dəyərini (boolean) birbaşa istifadə et
    } else if (name === "finCode") {
      newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    } else if (["phone", "workPhone", "homePhone", "whatsapp"].includes(name)) {
      newValue = formatPhoneNumber(value);
    } else {
      newValue = value; // Digər inputlar üçün adi dəyər
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Ad tələb olunur";
    if (!formData.surname) newErrors.surname = "Soyad tələb olunur";
    if (!formData.patronymic) newErrors.patronymic = "Ata adı tələb olunur";
    if (!formData.genderStatus) newErrors.genderStatus = "Cinsiyyət tələb olunur";
    if (!formData.priceCategoryStatus)
      newErrors.priceCategoryStatus = "Qiymət kateqoriyası tələb olunur"; // Buradakı validation saxlanılır
    if (!formData.doctorId) newErrors.doctorId = "Həkimi seçin";

    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;
    if (!formData.phone) newErrors.phone = "Mobil nömrə tələb olunur";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Nömrə formatı (XXX)-XXX-XXXX şəklində olmalıdır";

    if (formData.workPhone && !phoneRegex.test(formData.workPhone))
      newErrors.workPhone = "Nömrə formatı (XXX)-XXX-XXXX şəklində olmalıdır";
    if (formData.homePhone && !phoneRegex.test(formData.homePhone))
      newErrors.homePhone = "Nömrə formatı (XXX)-XXX-XXXX şəklində olmalıdır";
    if (formData.whatsapp && !phoneRegex.test(formData.whatsapp))
      newErrors.whatsapp = "Nömrə formatı (XXX)-XXX-XXXX şəklində olmalıdır";

    if (!formData.finCode) newErrors.finCode = "Fin kodu tələb olunur";
    else if (!/^[A-Z0-9]{7}$/.test(formData.finCode))
      newErrors.finCode =
        "FIN kod yalnız böyük hərflər və rəqəmlərdən ibarət 7 simvol olmalıdır";

    if (formData.isBlacklisted && !formData.blacklistCategory)
      newErrors.blacklistCategory = "Qara siyahı kateqoriyası seçin";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) return ""; // Düzgün formatda deyilsə boş sətir qaytar
    return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Zəhmət olmasa, tələb olunan sahələri doldurun və formatları düzəldin.");
      return;
    }

    const dataToSend = {
      ...formData,
      // Telefon nömrələrini formatla və boşdursa null et
      phone: formData.phone ? formatPhoneNumber(formData.phone) : null,
      homePhone: formData.homePhone ? formatPhoneNumber(formData.homePhone) : null,
      workPhone: formData.workPhone ? formatPhoneNumber(formData.workPhone) : null,
      whatsapp: formData.whatsapp ? formatPhoneNumber(formData.whatsapp) : null,
      
      // doctor_id-ni formData.doctorId-dən al
      doctor_id: formData.doctorId, 
      
      // priceCategoryStatus-u düzgün idarə et
      // Əgər formData.priceCategoryStatus boş string deyilsə, onu rəqəmə çevir (10-luq sistemdə), əks halda null et.
      priceCategoryStatus: formData.priceCategoryStatus ? parseInt(formData.priceCategoryStatus, 10) : null, 
      
      // Blacklist kateqoriyasını da rəqəmə çevir, əks halda null et
      blacklistCategory: formData.isBlacklisted && formData.blacklistCategory ? parseInt(formData.blacklistCategory, 10) : null, 
    };

    // Opsiyonel string sahələri üçün boş stringləri null-a çevir
    // Backend boş string əvəzinə null gözləyə bilər
    if (dataToSend.dateOfBirth === "") dataToSend.dateOfBirth = null;
    if (dataToSend.email === "") dataToSend.email = null;
    if (dataToSend.homeAddress === "") dataToSend.homeAddress = null;
    if (dataToSend.homeAddress === "") dataToSend.homeAddress = null;
    if (dataToSend.workAddress === "") dataToSend.workAddress = null;
    if (dataToSend.recommender === "") dataToSend.recommender = null;
    if (dataToSend.specializationStatus === "") dataToSend.specializationStatus = null;


    // --- Debugging üçün Konsol Loqları (Çox Vacibdir!) ---
    console.log("Göndərilən data (dataToSend):", dataToSend);
    console.log("Göndərilən priceCategoryStatus:", dataToSend.priceCategoryStatus); // Bu dəyəri yoxlayın!
    console.log("Göndərilən doctorId:", dataToSend.doctor_id); // doctorId dəyərini də yoxlamaq lazımdır

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/patient/create`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Pasiyent uğurla əlavə olundu:", response.data);
      toast.success("Pasiyent uğurla əlavə olundu!");
      // Formu sıfırla
      setFormData({
        name: "", surname: "", patronymic: "", finCode: "", genderStatus: "", dateOfBirth: "",
        priceCategoryStatus: "", specializationStatus: "", doctorId: null, isVip: false,
        isBlacklisted: false, blacklistCategory: "", phone: "", whatsapp: "", workPhone: "",
        homePhone: "", email: "", homeAddress: "", workAddress: "", recommender: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Xəta baş verdi:", err.response?.data || err.message);
      toast.error("Xəta baş verdi. Məlumatları yoxlayın.");
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(`Server xətası: ${err.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patientsGroupWrapper">
      <form onSubmit={handleSubmit} className="patientsGroupContainer">
        <div className="patientsGroupLeft">
          {/* Adı Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Adı <span className="patientsGroupRequired">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          {/* Soyadı Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Soyadı <span className="patientsGroupRequired">*</span>
            </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
            {errors.surname && (
              <span className="error-message">{errors.surname}</span>
            )}
          </div>

          {/* Ata adı Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Ata adı <span className="patientsGroupRequired">*</span>
            </label>
            <input
              type="text"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
            {errors.patronymic && (
              <span className="error-message">{errors.patronymic}</span>
            )}
          </div>

          {/* Fin Kodu Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Fin kodu <span className="patientsGroupRequired">*</span>
            </label>
            <input
              type="text"
              name="finCode"
              value={formData.finCode}
              onChange={handleChange}
              maxLength={7}
              className="patientsGroupInputText"
            />
            {errors.finCode && (
              <span className="error-message">{errors.finCode}</span>
            )}
          </div>

          {/* Cinsiyyət Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Cinsiyyət <span className="patientsGroupRequired">*</span>
            </label>
            <div className="patientsGroupGender">
              <label>
                <input
                  type="radio"
                  name="genderStatus"
                  value="MAN"
                  checked={formData.genderStatus === "MAN"}
                  onChange={handleChange}
                  className="patientsGroupCheckbox"
                />{" "}
                Kişi
              </label>
              <label>
                <input
                  type="radio"
                  name="genderStatus"
                  value="WOMAN"
                  checked={formData.genderStatus === "WOMAN"}
                  onChange={handleChange}
                  className="patientsGroupCheckbox"
                />{" "}
                Qadın
              </label>
            </div>
            {errors.genderStatus && (
              <span className="error-message">{errors.genderStatus}</span>
            )}
          </div>

          {/* Doğum tarixi Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Doğum tarixi</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="patientsGroupInputDate"
            />
          </div>

          {/* Qiymət Kateqoriyası Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Qiymət kateqoriyası{" "}
              <span className="patientsGroupRequired">*</span>
            </label>
            <select
              name="priceCategoryStatus"
              value={formData.priceCategoryStatus} // Seçili dəyəri burdan alır
              onChange={handleChange}
              className="patientsGroupSelect"
            >
              <option value="">seçin</option> {/* Default boş dəyər */}
              {priceCategories.map((category) => (
                <option key={category.id} value={category.id}> {/* category.id-ni dəyər olaraq təyin edirik */}
                  {category.name}
                </option>
              ))}
            </select>
            {errors.priceCategoryStatus && (
              <span className="error-message">
                {errors.priceCategoryStatus}
              </span>
            )}
          </div>

          {/* İxtisası Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İxtisası</label>
            <input
              type="text"
              name="specializationStatus"
              value={formData.specializationStatus}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
          </div>

          {/* Həkim Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Həkim <span className="patientsGroupRequired">*</span>
            </label>
            <select
              name="doctorId"
              value={formData.doctorId || ""}
              onChange={handleChange}
              className="patientsGroupSelect"
            >
              <option value="">Həkim seçin</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.name} {doctor.surname}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <span className="error-message">{errors.doctorId}</span>
            )}
          </div>

          {/* VIP Field (ayrı bir checkbox kimi saxlanılır) */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">VIP</label>
            <input
              type="checkbox"
              name="isVip"
              checked={formData.isVip}
              onChange={handleChange}
              className="patientsGroupCheckbox"
            />
          </div>

          {/* Qara siyahı Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Qara siyahı</label>
            <div className="patientsGroupBlacklist">
              <input
                type="checkbox"
                name="isBlacklisted"
                checked={formData.isBlacklisted}
                onChange={handleChange}
                className="patientsGroupCheckbox"
              />
              <select
                name="blacklistCategory"
                value={formData.blacklistCategory}
                onChange={handleChange}
                className="patientsGroupBlacklistSelect"
                disabled={!formData.isBlacklisted}
              >
                <option value="">seçin</option>
                {blacklistOptions.data &&
                  blacklistOptions.data.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.statusName}
                    </option>
                  ))}
              </select>
            </div>
            {errors.blacklistCategory && (
              <span className="error-message">{errors.blacklistCategory}</span>
            )}
          </div>
        </div>

        <div className="patientsGroupRight">
          {/* Mobil nömrə 1 Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">
              Mobil nömrə 1 <span className="patientsGroupRequired">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="patientsGroupInputText"
              placeholder="(XXX)-XXX-XXXX"
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          {/* Whatsapp Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="patientsGroupInputText"
              placeholder="(XXX)-XXX-XXXX"
            />
            {errors.whatsapp && (
              <span className="error-message">{errors.whatsapp}</span>
            )}
          </div>

          {/* İş nömrəsi Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İş nömrəsi</label>
            <input
              type="text"
              name="workPhone"
              value={formData.workPhone}
              onChange={handleChange}
              className="patientsGroupInputText"
              placeholder="(XXX)-XXX-XXXX"
            />
            {errors.workPhone && (
              <span className="error-message">{errors.workPhone}</span>
            )}
          </div>

          {/* Ev nömrəsi Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ev nömrəsi</label>
            <input
              type="text"
              name="homePhone"
              value={formData.homePhone}
              onChange={handleChange}
              className="patientsGroupInputText"
              placeholder="(XXX)-XXX-XXXX"
            />
            {errors.homePhone && (
              <span className="error-message">{errors.homePhone}</span>
            )}
          </div>

          {/* E-poçt Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">E-poçt</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
          </div>

          {/* Ev ünvanı Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ev ünvanı</label>
            <input
              type="text"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
          </div>

          {/* İş ünvanı Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İş ünvanı</label>
            <input
              type="text"
              name="workAddress"
              value={formData.workAddress}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
          </div>

          {/* Tövsiyə edən şəxs Field */}
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Tövsiyə edən şəxs</label>
            <input
              type="text"
              name="recommender"
              value={formData.recommender}
              onChange={handleChange}
              className="patientsGroupInputText"
            />
          </div>
        </div>
      </form>

      {/* Təqdim və İmtina Düymələri */}
      <div className="submitAddPatientForm">
        <button
          type="button"
          className="addPatientCancelButton"
          onClick={() => {
            // Formu sıfırla
            setFormData({
              name: "", surname: "", patronymic: "", finCode: "", genderStatus: "", dateOfBirth: "",
              priceCategoryStatus: "", specializationStatus: "", doctorId: null, isVip: false,
              isBlacklisted: false, blacklistCategory: "", phone: "", whatsapp: "", workPhone: "",
              homePhone: "", email: "", homeAddress: "", workAddress: "", recommender: "",
            });
            setErrors({});
          }}
        >
          <img
            src={cancelButton}
            className="addPatientCancelBTN"
            alt="Cancel"
          />
          İmtina et
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="addPatientVerifyButton"
          disabled={loading}
        >
          <img src={verifyButton} className="addPatientVerifyBTN" alt="Save" />
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Yüklənir...
            </>
          ) : (
            "Yadda saxla"
          )}
        </button>
      </div>
    </div>
  );
};

export default PatientAdd;