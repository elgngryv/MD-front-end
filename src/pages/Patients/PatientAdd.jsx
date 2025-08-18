import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/style/PatientsPage/addpatient.css";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";
import verifyButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import usePatientStore from "../../../stores/patiendStore";
import useBlackListResultStore from "../../../stores/blacklistReasonStore";
import usePriceCategoryStore from "../../../stores/priceCategoryStore";
import useSpecializationStore from "../../../stores/useSpecializationStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientAdd = () => {
  const navigate = useNavigate();
  const { addPatient } = usePatientStore();
  const { results: blacklistOptions, fetchResults: fetchBlacklistOptions } = useBlackListResultStore();
  const { categories: priceCategories, fetchCategories: fetchPriceCategories } = usePriceCategoryStore();
  const { specializations, fetchSpecializations } = useSpecializationStore();

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
    priceCategoryName: "",
    specializationName: "", // Dəyişdirildi
    doctorId: null,
    isVip: false,
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
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/general-calendar/read-doctors`,
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
    fetchAllData();
    fetchBlacklistOptions();
    fetchPriceCategories();
    fetchSpecializations();
  }, [fetchBlacklistOptions, fetchPriceCategories, fetchSpecializations]);

  const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    let formattedNumber = '';
    if (cleaned.length > 0) {
      formattedNumber += `(${cleaned.substring(0, 3)}`;
    }
    if (cleaned.length >= 4) {
      formattedNumber += `)-${cleaned.substring(3, 6)}`;
    }
    if (cleaned.length >= 7) {
      formattedNumber += `-${cleaned.substring(6, 10)}`;
    }
    return formattedNumber;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "finCode") {
      newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    } else if (["phone", "whatsapp", "workPhone", "homePhone"].includes(name)) {
      newValue = formatPhoneNumber(value);
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
    if (!formData.priceCategoryName) newErrors.priceCategoryName = "Qiymət kateqoriyası tələb olunur";
    if (!formData.doctorId) newErrors.doctorId = "Həkimi seçin";
    if (!formData.specializationName) newErrors.specializationName = "İxtisası seçin"; // Dəyişdirildi

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
      newErrors.finCode = "FIN kod yalnız böyük hərflər və rəqəmlərdən ibarət 7 simvol olmalıdır";

    if (formData.isBlacklisted && !formData.blacklistCategory)
      newErrors.blacklistCategory = "Qara siyahı kateqoriyası seçin";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Göndərilən formData:", formData);

    if (!validateForm()) {
      toast.error("Zəhmət olmasa, tələb olunan sahələri doldurun və formatları düzəldin.");
      return;
    }

    const dataToSend = {
      ...formData,
      specializationName: formData.specializationName, // Dəyişdirildi
      doctorId: formData.doctorId,
      priceCategoryName: formData.priceCategoryName,
      blacklistCategory: formData.isBlacklisted && formData.blacklistCategory ? parseInt(formData.blacklistCategory, 10) : null,
    };

    dataToSend.dateOfBirth = formData.dateOfBirth === "" ? null : formData.dateOfBirth;
    dataToSend.email = formData.email === "" ? null : formData.email;
    dataToSend.homeAddress = formData.homeAddress === "" ? null : formData.homeAddress;
    dataToSend.workAddress = formData.workAddress === "" ? null : formData.workAddress;
    dataToSend.recommender = formData.recommender === "" ? null : formData.recommender;

    setLoading(true);
    try {
      const response = await addPatient(dataToSend);
      console.log("Pasiyent uğurla əlavə olundu:", response);
      toast.success("Pasiyent uğurla əlavə olundu!");
      setTimeout(() => {
        navigate("/patients");
      }, 1500);
    } catch (err) {
      console.error("Xəta baş verdi:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Xəta baş verdi. Məlumatları yoxlayın.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patientsGroupWrapper">
      <ToastContainer position="top-right" autoClose={2000} />
      <form onSubmit={handleSubmit} className="patientsGroupContainer">
        <div className="patientsGroupLeft">
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Adı <span className="patientsGroupRequired">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="patientsGroupInputText" />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Soyadı <span className="patientsGroupRequired">*</span></label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="patientsGroupInputText" />
            {errors.surname && <span className="error-message">{errors.surname}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ata adı <span className="patientsGroupRequired">*</span></label>
            <input type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} className="patientsGroupInputText" />
            {errors.patronymic && <span className="error-message">{errors.patronymic}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Fin kodu <span className="patientsGroupRequired">*</span></label>
            <input type="text" name="finCode" value={formData.finCode} onChange={handleChange} maxLength={7} className="patientsGroupInputText" />
            {errors.finCode && <span className="error-message">{errors.finCode}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Cinsiyyət <span className="patientsGroupRequired">*</span></label>
            <div className="patientsGroupGender">
              <label>
                <input type="radio" name="genderStatus" value="MAN" checked={formData.genderStatus === "MAN"} onChange={handleChange} className="patientsGroupCheckbox" /> Kişi
              </label>
              <label>
                <input type="radio" name="genderStatus" value="WOMAN" checked={formData.genderStatus === "WOMAN"} onChange={handleChange} className="patientsGroupCheckbox" /> Qadın
              </label>
            </div>
            {errors.genderStatus && <span className="error-message">{errors.genderStatus}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Doğum tarixi</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="patientsGroupInputDate" />
          </div>

          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Qiymət kateqoriyası <span className="patientsGroupRequired">*</span></label>
            <select name="priceCategoryName" value={formData.priceCategoryName} onChange={handleChange} className="patientsGroupSelect">
              <option value="">seçin</option>
              {priceCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.priceCategoryName && <span className="error-message">{errors.priceCategoryName}</span>}
          </div>

          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İxtisası <span className="patientsGroupRequired">*</span></label>
            <select name="specializationName" value={formData.specializationName} onChange={handleChange} className="patientsGroupSelect"> {/* Dəyişdirildi */}
              <option value="">seçin</option>
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.name}>
                  {spec.name}
                </option>
              ))}
            </select>
            {errors.specializationName && <span className="error-message">{errors.specializationName}</span>} {/* Dəyişdirildi */}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Həkim <span className="patientsGroupRequired">*</span></label>
            <select name="doctorId" value={formData.doctorId || ""} onChange={handleChange} className="patientsGroupSelect">
              <option value="">Həkim seçin</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.name} {doctor.surname}
                </option>
              ))}
            </select>
            {errors.doctorId && <span className="error-message">{errors.doctorId}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">VIP</label>
            <input type="checkbox" name="isVip" checked={formData.isVip} onChange={handleChange} className="patientsGroupCheckbox" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Qara siyahı</label>
            <div className="patientsGroupBlacklist">
              <input type="checkbox" name="isBlacklisted" checked={formData.isBlacklisted} onChange={handleChange} className="patientsGroupCheckbox" />
              <select name="blacklistCategory" value={formData.blacklistCategory} onChange={handleChange} className="patientsGroupBlacklistSelect" disabled={!formData.isBlacklisted}>
                <option value="">seçin</option>
                {blacklistOptions.data &&
                  blacklistOptions.data.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.statusName}
                    </option>
                  ))}
              </select>
            </div>
            {errors.blacklistCategory && <span className="error-message">{errors.blacklistCategory}</span>}
          </div>
        </div>

        <div className="patientsGroupRight">
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Mobil nömrə 1 <span className="patientsGroupRequired">*</span></label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="patientsGroupInputText" placeholder="(XXX)-XXX-XXXX" />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Whatsapp</label>
            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="patientsGroupInputText" placeholder="(XXX)-XXX-XXXX" />
            {errors.whatsapp && <span className="error-message">{errors.whatsapp}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İş nömrəsi</label>
            <input type="tel" name="workPhone" value={formData.workPhone} onChange={handleChange} className="patientsGroupInputText" placeholder="(XXX)-XXX-XXXX" />
            {errors.workPhone && <span className="error-message">{errors.workPhone}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ev nömrəsi</label>
            <input type="tel" name="homePhone" value={formData.homePhone} onChange={handleChange} className="patientsGroupInputText" placeholder="(XXX)-XXX-XXXX" />
            {errors.homePhone && <span className="error-message">{errors.homePhone}</span>}
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">E-poçt</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ev ünvanı</label>
            <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İş ünvanı</label>
            <input type="text" name="workAddress" value={formData.workAddress} onChange={handleChange} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Tövsiyə edən şəxs</label>
            <input type="text" name="recommender" value={formData.recommender} onChange={handleChange} className="patientsGroupInputText" />
          </div>
        </div>
      </form>

      <div className="submitAddPatientForm">
        <button type="button" className="addPatientCancelButton" onClick={() => {
          setFormData({
            name: "", surname: "", patronymic: "", finCode: "", genderStatus: "", dateOfBirth: "",
            priceCategoryName: "", specializationName: "", doctorId: null, isVip: false, // Dəyişdirildi
            isBlacklisted: false, blacklistCategory: "", phone: "", whatsapp: "", workPhone: "",
            homePhone: "", email: "", homeAddress: "", workAddress: "", recommender: "",
          });
          setErrors({});
          navigate(-1);
        }}>
          <img src={cancelButton} className="addPatientCancelBTN" alt="Cancel" />
          İmtina et
        </button>
        <button type="submit" onClick={handleSubmit} className="addPatientVerifyButton" disabled={loading}>
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