import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import { MdColorLens } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/PatientPage/patientedit.css";
import axios from "axios";
import { toast } from "react-toastify";
import usePriceCategoryStore from "../../../stores/priceCategoryStore";
import useSpecializationStore from "../../../stores/useSpecializationStore";
import usePatientStore from "../../../stores/patiendStore";

const PatientEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchPatientById, editPatient, loading, selectedPatient } =
    usePatientStore();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedPriceCategory, setSelectedPriceCategory] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const colorPickerRef = useRef(null);

  // Store-lardan məlumatları əldə et
  const { categories, fetchCategories } = usePriceCategoryStore();
  const { specializations, fetchSpecializations } = useSpecializationStore();

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();

    if (id) {
      fetchPatientById(id);
    }
  }, [id]);

  const formRefs = {
    name: useRef(),
    surname: useRef(),
    patronymic: useRef(),
    finCode: useRef(),
    dateOfBirth: useRef(),
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

  // Populate form with patient data when available
  useEffect(() => {
    if (selectedPatient) {
      // Set dropdown values
      if (selectedPatient.genderStatus) {
        const genderOption = [
          { value: "MAN", label: "Kişi" },
          { value: "WOMAN", label: "Qadın" },
        ].find((opt) => opt.value === selectedPatient.genderStatus);
        setSelectedGender(genderOption);
      }

      if (selectedPatient.priceCategoryName) {
        const categoryOption = categories.find(
          (cat) => cat.name === selectedPatient.priceCategoryName
        );
        setSelectedPriceCategory(
          categoryOption
            ? { value: categoryOption.name, label: categoryOption.name }
            : null
        );
      }

      if (selectedPatient.specializationName) {
        const specOption = specializations.find(
          (spec) => spec.name === selectedPatient.specializationName
        );
        setSelectedSpecialization(
          specOption ? { value: specOption.name, label: specOption.name } : null
        );
      }

      if (selectedPatient.doctorId || selectedPatient.doctor_id) {
        const doctorId = selectedPatient.doctorId || selectedPatient.doctor_id;
        const doctor = doctors.find((doc) => doc.doctorId === doctorId);
        if (doctor) {
          setSelectedDoctor({
            value: doctor.doctorId,
            label: `${doctor.name} ${doctor.surname}`,
          });
        }
      }

      // Set input values
      Object.entries(formRefs).forEach(([key, ref]) => {
        if (ref.current && selectedPatient[key] !== undefined) {
          if (key === "isVip" || key === "isBlacklisted") {
            ref.current.checked = selectedPatient[key] || false;
          } else {
            ref.current.value = selectedPatient[key] || "";
          }
        }
      });
    }
  }, [selectedPatient, categories, specializations, doctors]);

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
    setFormLoading(true);

    const requestData = {
      patientId: id,
      name: formRefs.name.current.value,
      surname: formRefs.surname.current.value,
      patronymic: formRefs.patronymic.current.value || null,
      finCode: formRefs.finCode.current.value,
      genderStatus: selectedGender ? selectedGender.value : null,
      dateOfBirth: formRefs.dateOfBirth.current.value,
      priceCategoryName: selectedPriceCategory
        ? selectedPriceCategory.value
        : null,
      specializationName: selectedSpecialization
        ? selectedSpecialization.value
        : null,
      doctor_id: selectedDoctor ? selectedDoctor.value : null,
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
      await editPatient(requestData);
      toast.success("Pasiyent məlumatları uğurla yeniləndi");
      navigate("/patients");
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Pasiyent məlumatları yenilənərkən xəta baş verdi";
      console.error("Update error:", errMsg);
      toast.error(errMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading && !selectedPatient) {
    return <div className="loading">Yüklənir...</div>;
  }

  if (!selectedPatient && id) {
    return <div className="error">Pasiyent tapılmadı</div>;
  }

  return (
    <div className="patient-edit-container">
      <h2>Pasiyent Məlumatlarını Redaktə Et</h2>
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="left">
            <div className="main-form-group">
              <label>Ad</label>
              <input
                type="text"
                ref={formRefs.name}
                required
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>Soyad</label>
              <input
                type="text"
                ref={formRefs.surname}
                required
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>Ata adı</label>
              <input
                type="text"
                ref={formRefs.patronymic}
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>FIN kod</label>
              <input
                type="text"
                ref={formRefs.finCode}
                required
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>Cinsiyyət</label>
              <CustomDropdown
                value={selectedGender}
                onChange={(option) => setSelectedGender(option)}
                options={[
                  { value: "MAN", label: "Kişi" },
                  { value: "WOMAN", label: "Qadın" },
                ]}
                placeholder="Seçin"
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group">
              <label>Doğum tarixi</label>
              <input
                type="date"
                ref={formRefs.dateOfBirth}
                required
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>Qiymət kateqoriyası</label>
              <CustomDropdown
                value={selectedPriceCategory}
                onChange={(option) => setSelectedPriceCategory(option)}
                options={categories.map((category) => ({
                  value: category.name,
                  label: category.name,
                }))}
                placeholder="Seçin"
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group">
              <label>İxtisas</label>
              <CustomDropdown
                value={selectedSpecialization}
                onChange={(option) => setSelectedSpecialization(option)}
                options={specializations.map((spec) => ({
                  value: spec.name,
                  label: spec.name,
                }))}
                placeholder="Seçin"
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group">
              <label>Həkim</label>
              <CustomDropdown
                value={selectedDoctor}
                onChange={(option) => setSelectedDoctor(option)}
                options={doctors.map((doctor) => ({
                  value: doctor.doctorId,
                  label: `${doctor.name} ${doctor.surname}`,
                }))}
                placeholder="Seçin"
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group color-picker-group">
              <label>Rəng kodu</label>
              <div className="color-input-container">
                <input
                  type="text"
                  ref={formRefs.colorCode}
                  readOnly
                  disabled={formLoading}
                />
                <span
                  className="color-icon"
                  onClick={() =>
                    !formLoading && setShowColorPicker(!showColorPicker)
                  }>
                  <MdColorLens />
                </span>
                {showColorPicker && (
                  <div className="color-picker-popup" ref={colorPickerRef}>
                    <SketchPicker
                      color={formRefs.colorCode.current?.value || "#ffffff"}
                      onChange={handleColorChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="main-form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  className="patientEditCheckbox"
                  ref={formRefs.isVip}
                  disabled={formLoading}
                />{" "}
                VIP
              </label>
            </div>

            <div className="main-form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  className="patientEditCheckbox"
                  ref={formRefs.isBlacklisted}
                  disabled={formLoading}
                />{" "}
                Qara siyahı
              </label>
            </div>
          </div>

          <div className="right">
            <div className="main-form-group">
              <label>Mobil nömrə</label>
              <input
                type="tel"
                ref={formRefs.phone}
                required
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>İş telefonu</label>
              <input
                type="tel"
                ref={formRefs.workPhone}
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>Ev telefonu</label>
              <input
                type="tel"
                ref={formRefs.homePhone}
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>Ev ünvanı</label>
              <input
                type="text"
                ref={formRefs.homeAddress}
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>İş ünvanı</label>
              <input
                type="text"
                ref={formRefs.workAddress}
                disabled={formLoading}
              />
            </div>

            <div className="main-form-group">
              <label>E-poçt</label>
              <input type="email" ref={formRefs.email} disabled={formLoading} />
            </div>
          </div>
        </div>

        <div className="main-form-actions">
          <button
            type="submit"
            className="patientEditCreateBTN"
            disabled={formLoading}>
            {formLoading ? "Yüklənir..." : "Yadda Saxla"}
          </button>
          <button
            type="button"
            className="patientEditCancelBTN"
            onClick={handleCancel}
            disabled={formLoading}>
            Ləğv et
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientEdit;
