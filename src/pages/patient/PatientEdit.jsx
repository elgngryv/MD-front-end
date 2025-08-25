import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import { MdColorLens } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/PatientPage/patientedit.css";
import axios from "axios";
import { toast } from "react-toastify";
import usePriceCategoryStore from "../../../stores/priceCategoryStore";
import useSpecializationStore from "../../../stores/useSpecializationStore";

const PatientForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  mode = "create",
}) => {
  const navigate = useNavigate();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const colorPickerRef = useRef(null);
  
  // Store-lardan məlumatları əldə et
  const { categories, fetchCategories } = usePriceCategoryStore();
  const { specializations, fetchSpecializations } = useSpecializationStore();

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();
  }, []);

  const formRefs = {
    name: useRef(),
    surname: useRef(),
    patronymic: useRef(),
    finCode: useRef(),
    genderStatus: useRef(),
    dateOfBirth: useRef(),
    priceCategoryName: useRef(),
    specializationName: useRef(),
    doctorId: useRef(),
    phone: useRef(),
    workPhone: useRef(),
    homePhone: useRef(),
    homeAddress: useRef(),
    workAddress: useRef(),
    email: useRef(),
    colorCode: useRef(),
    isVip: useRef(),
    isBlacklisted: useRef(),
  };

  useEffect(() => {
    const fetchDoctors = async () => {
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
        console.error("Failed to fetch doctors:", error);
        toast.error("Həkimlər siyahısı yüklənə bilmədi");
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (initialData) {
      Object.entries(formRefs).forEach(([key, ref]) => {
        if (ref.current) {
          if (key === "isVip" || key === "isBlacklisted") {
            ref.current.checked = initialData[key] || false;
          } else {
            const fieldName =
              key === "doctorId" && initialData.doctor_id ? "doctor_id" : key;
            ref.current.value = initialData[fieldName] || "";
          }
        }
      });
    }
  }, [initialData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleColorChange = (color) => {
    formRefs.colorCode.current.value = color.hex;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      patientId: initialData.id,
      name: formRefs.name.current.value,
      surname: formRefs.surname.current.value,
      patronymic: formRefs.patronymic.current.value || null,
      finCode: formRefs.finCode.current.value,
      genderStatus: formRefs.genderStatus.current.value,
      dateOfBirth: formRefs.dateOfBirth.current.value,
      priceCategoryName: formRefs.priceCategoryName.current.value || null,
      specializationName: formRefs.specializationName.current.value || null,
      doctorId: formRefs.doctorId.current.value || null,
      phone: formRefs.phone.current.value,
      workPhone: formRefs.workPhone.current.value || null,
      homePhone: formRefs.homePhone.current.value || null,
      homeAddress: formRefs.homeAddress.current.value || null,
      workAddress: formRefs.workAddress.current.value || null,
      email: formRefs.email.current.value || null,
      colorCode: formRefs.colorCode.current.value || null,
      isVip: formRefs.isVip.current.checked,
      isBlacklisted: formRefs.isBlacklisted.current.checked,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/patient/update`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Əgər 200-dürsə:
      if (response.status === 200) {
        setPatientData(response.data);
        toast.success("Pasiyent məlumatları uğurla yeniləndi");

        // success-dən sonra yönləndir və ya callback
        if (typeof onSubmit === "function") {
          onSubmit(response.data);
        }

        navigate("/patients");
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Pasiyent məlumatları yenilənərkən xəta baş verdi";
      console.error("Update error:", errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else navigate(-1);
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      if (formRefs.genderStatus.current) {
        formRefs.genderStatus.current.value = initialData.genderStatus || "";
      }
      if (formRefs.priceCategoryName.current) {
        formRefs.priceCategoryName.current.value =
          initialData.priceCategoryName || "";
      }
      if (formRefs.specializationName.current) {
        formRefs.specializationName.current.value =
          initialData.specializationName || "";
      }
      if (formRefs.doctorId.current) {
        formRefs.doctorId.current.value =
          initialData.doctorId || initialData.doctor_id || "";
      }
    }
  }, [initialData]);

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="left">
          <div className="main-form-group">
            <label>Ad</label>
            <input type="text" ref={formRefs.name} required />
          </div>

          <div className="main-form-group">
            <label>Soyad</label>
            <input type="text" ref={formRefs.surname} required />
          </div>

          <div className="main-form-group">
            <label>Ata adı</label>
            <input type="text" ref={formRefs.patronymic} />
          </div>

          <div className="main-form-group">
            <label>FIN kod</label>
            <input type="text" ref={formRefs.finCode} required />
          </div>

          <div className="main-form-group">
            <label>Cinsiyyət</label>
            <CustomDropdown
              value={initialData.genderStatus}
              onChange={(option) =>
                (formRefs.genderStatus.current.value = option.value)
              }
              options={[
                { value: "MAN", label: "Kişi" },
                { value: "WOMAN", label: "Qadın" },
              ]}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.genderStatus} />
          </div>

          <div className="main-form-group">
            <label>Doğum tarixi</label>
            <input type="date" ref={formRefs.dateOfBirth} required />
          </div>

          <div className="main-form-group">
            <label>Qiymət kateqoriyası</label>
            <CustomDropdown
              value={initialData.priceCategoryName}
              onChange={(option) =>
                (formRefs.priceCategoryName.current.value = option.value)
              }
              options={categories.map(category => ({
                value: category.name,
                label: category.name
              }))}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.priceCategoryName} />
          </div>

          <div className="main-form-group">
            <label>İxtisas</label>
            <CustomDropdown
              value={initialData.specializationName}
              onChange={(option) =>
                (formRefs.specializationName.current.value = option.value)
              }
              options={specializations.map(spec => ({
                value: spec.name,
                label: spec.name
              }))}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.specializationName} />
          </div>

          <div className="main-form-group">
            <label>Həkim</label>
            <CustomDropdown
              value={initialData.doctorId || initialData.doctor_id}
              onChange={(option) =>
                (formRefs.doctorId.current.value = option.value)
              }
              options={doctors.map((doctor) => ({
                value: doctor.doctorId,
                label: `${doctor.name} ${doctor.surname}`,
              }))}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.doctorId} />
          </div>

          <div className="main-form-group">
            <label>Rəng kodu</label>
            <input type="text" ref={formRefs.colorCode} readOnly />
            <span
              className="color-icon"
              onClick={() => setShowColorPicker(!showColorPicker)}>
              <MdColorLens />
            </span>
            {showColorPicker && (
              <div ref={colorPickerRef}>
                <SketchPicker
                  color={formRefs.colorCode.current?.value || "#ffffff"}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </div>

          <div className="main-form-group">
            <label>
              <input
                type="checkbox"
                className="patientEditCheckbox"
                ref={formRefs.isVip}
              />{" "}
              VIP
            </label>
          </div>

          <div className="main-form-group">
            <label>
              <input
                type="checkbox"
                className="patientEditCheckbox"
                ref={formRefs.isBlacklisted}
              />{" "}
              Qara siyahı
            </label>
          </div>
        </div>

        <div className="right">
          <div className="main-form-group">
            <label>Mobil nömrə</label>
            <input type="tel" ref={formRefs.phone} required />
          </div>

          <div className="main-form-group">
            <label>İş telefonu</label>
            <input type="tel" ref={formRefs.workPhone} />
          </div>

          <div className="main-form-group">
            <label>Ev telefonu</label>
            <input type="tel" ref={formRefs.homePhone} />
          </div>

          <div className="main-form-group">
            <label>Ev ünvanı</label>
            <input type="text" ref={formRefs.homeAddress} />
          </div>

          <div className="main-form-group">
            <label>İş ünvanı</label>
            <input type="text" ref={formRefs.workAddress} />
          </div>

          <div className="main-form-group">
            <label>E-poçt</label>
            <input type="email" ref={formRefs.email} />
          </div>
        </div>
      </div>

      <div className="main-form-actions">
        <button
          type="submit"
          className="patientEditCreateBTN"
          disabled={loading}>
          {loading
            ? "Yüklənir..."
            : mode === "create"
            ? "Yarat"
            : "Yadda Saxla"}
        </button>
        <button
          type="button"
          className="patientEditCancelBTN"
          onClick={handleCancel}
          disabled={loading}>
          Ləğv et
        </button>
      </div>
    </form>
  );
};

export default PatientForm;