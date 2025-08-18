import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import { MdColorLens } from "react-icons/md";
import "../assets/style/form.css";
import ProfileImage from "./ProfileImage";
import { LuPenLine } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "./Modal";
import CustomDropdown from "./CustomDropdown";
import useWorkerStore from "../../stores/workerStore";
import usePermissionStore from "../../stores/permissionStore";
// Import eye icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function UserForm({ mode: initialMode, userData = null, onSubmit, onDelete }) {
  const { addWorker } = useWorkerStore();
  const {
    permissions: rawPermissions,
    fetchPermissions,
    loading: permissionsLoading,
  } = usePermissionStore();
  const [mode, setMode] = useState(initialMode);
  const [showColorPicker, setShowColorPicker] = useState(false);
  // Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const colorPickerRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Transform permissions to include both ID and name
  const permissionList = rawPermissions
    .filter((permission) => permission.status === "ACTIVE")
    .map((permission) => ({
      label: permission.permissionName,
      value: permission.id.toString(),
      name: permission.permissionName,
    }));

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Convert permission names back to IDs when initializing form with existing data
  const getDefaultPermissions = () => {
    if (!userData || !userData.permissions) return [];
    return userData.permissions.map((permissionName) => {
      const permission = rawPermissions.find(
        (p) => p.permissionName === permissionName
      );
      return permission ? permission.id.toString() : permissionName;
    });
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "İstifadəçi Adı 3-20 simvol arasında olmalıdır")
      .max(20, "İstifadəçi Adı 3-20 simvol arasında olmalıdır")
      .required("İstifadəçi adı tələb olunur"),
    password:
      mode === "create"
        ? yup
            .string()
            .matches(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_]).{8,}$/,
              "Şifrə minimum 8 simvol olmalı, böyük/kiçik hərf, rəqəm və xüsusi simvol içerməlidir"
            )
            .required("Şifrə tələb olunur")
        : yup.string(),
    name: yup
      .string()
      .min(3, "Ad 3-20 simvol arasında olmalıdır")
      .max(20, "Ad 3-20 simvol arasında olmalıdır")
      .required("Ad tələb olunur"),
    surname: yup
      .string()
      .min(3, "Soyad 3-20 simvol arasında olmalıdır")
      .max(20, "Soyad 3-20 simvol arasında olmalıdır")
      .required("Soyad tələb olunur"),
    patronymic: yup
      .string()
      .min(3, "Ata Adı 3-20 simvol arasında olmalıdır")
      .max(20, "Ata Adı 3-20 simvol arasında olmalıdır")
      .required("Ata Adı tələb olunur"),
    finCode: yup
      .string()
      .matches(
        /^[A-Z0-9]{7}$/,
        "FIN kod yalnız böyük hərflər və rəqəmlərdən ibarət 7 simvol olmalıdır"
      )
      .required("FIN kod tələb olunur"),
    genderStatus: yup.string().required("Cinsiyyət seçilməlidir"),
    dateOfBirth: yup
      .date()
      .max(new Date(), "Doğum tarixi bu gündən sonra ola bilməz")
      .required("Doğum tarixi tələb olunur"),
    phone: yup
      .string()
      .matches(
        /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin"
      )
      .required("Telefon nömrəsi tələb olunur"),
    phone2: yup
      .string()
      .nullable()
      .test(
        "phone2-format",
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin",
        function (value) {
          if (!value) return true;
          return /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value);
        }
      ),
    homePhone: yup
      .string()
      .nullable()
      .test(
        "homePhone-format",
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin",
        function (value) {
          if (!value) return true;
          return /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value);
        }
      ),
    phone3: yup
      .string()
      .nullable()
      .test(
        "phone3-format",
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin",
        function (value) {
          if (!value) return true;
          return /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value);
        }
      ),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Düzgün e-poçt ünvanı daxil edin"
      ),
    experience: yup
      .number()
      .min(0, "Təcrübə mənfi ola bilməz")
      .typeError("Təcrübə rəqəm olmalıdır"),
    permissions:
      mode !== "view"
        ? yup.array().min(1, "Ən azı bir icazə seçilməlidir")
        : yup.array(),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues: userData
      ? {
          ...userData,
          permissions: getDefaultPermissions(),
        }
      : {
          username: "",
          password: "",
          name: "",
          surname: "",
          patronymic: "",
          finCode: "",
          colorCode: "#ffffff",
          genderStatus: "",
          dateOfBirth: "",
          degree: "",
          phone: "",
          phone2: "",
          homePhone: "",
          phone3: "",
          email: "",
          address: "",
          experience: 0,
          permissions: [],
        },
  });

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

  const handleEditButton = () => setMode("edit");
  const handleCancelButton = () =>
    mode === "edit" ? setMode("view") : navigate(-1);
  const handleColorChange = (color) => setValue("colorCode", color.hex);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7)
      return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
  };

  const handleFormSubmit = (data) => {
    // Transform permission IDs to names before submission
    const permissionsWithNames = data.permissions.map((permissionId) => {
      const permission = rawPermissions.find(
        (p) => p.id.toString() === permissionId
      );
      return permission ? permission.permissionName : permissionId;
    });

    // Fix color code format
    let fixedColorCode = data.colorCode;
    if (data.colorCode.startsWith("6")) {
      fixedColorCode = `#${data.colorCode.substring(1)}`;
    } else if (!data.colorCode.startsWith("#")) {
      fixedColorCode = `#${data.colorCode}`;
    }

    const transformedData = {
      username: data.username,
      password: mode === "create" ? data.password : undefined,
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      finCode: data.finCode,
      colorCode: fixedColorCode,
      genderStatus: data.genderStatus,
      dateOfBirth: data.dateOfBirth,
      degree: data.degree || null,
      phone: data.phone,
      phone2: data.phone2 || null,
      homePhone: data.homePhone || null,
      phone3: data.phone3 || null,
      email: data.email || null,
      address: data.address || null,
      experience: data.experience || 0,
      permissions: permissionsWithNames,
    };

    console.log("Submitting data:", transformedData);

    if (mode === "edit") {
      const updateData = Object.keys(transformedData).reduce((acc, key) => {
        if (transformedData[key] !== userData[key])
          acc[key] = transformedData[key];
        return acc;
      }, {});
      onSubmit(updateData);
    } else {
      onSubmit(transformedData);
    }
  };

  return (
    <div className="main-form-container">
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Əminsinizmi?"
        message="İşçi silinəcək!"
        onConfirm={onDelete}
      />
      <h3 className="main-form-title">
        {mode === "create"
          ? "İşçi əlavə et"
          : mode === "edit"
          ? "İşçi məlumatlarını yenilə"
          : "İşçi məlumatları"}
      </h3>

      <form className="main-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={`${mode === "view" ? "profile-buttons" : ""}`}>
          <ProfileImage userId={watch("username")} mode={mode} />
          {mode === "view" && (
            <div className="profile-button-group">
              <button
                type="button"
                className="color-success"
                onClick={handleEditButton}>
                <LuPenLine className="color-success" />
                Redaktə et
              </button>
              <button
                type="button"
                className="color-danger"
                onClick={() => setShowModal(true)}>
                <FaRegTrashAlt className="color-danger" />
                Sil
              </button>
            </div>
          )}
        </div>
        <div className="input-container">
          <div className="left">
            <div className="main-form-group">
              <label htmlFor="username">
                İstifadəçi adı <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.username ? "error" : ""
                }`}
              />
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </div>

            {mode === "create" && (
              <div className="main-form-group password-field-group">
                <label htmlFor="password">
                  Şifrə <span className="text-red-500">*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={errors.password ? "error" : ""}
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
            )}

            <div className="main-form-group">
              <label htmlFor="name">
                Ad <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.name ? "error" : ""
                }`}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="surname">
                Soyad <span className="text-red-500">*</span>
              </label>
              <input
                id="surname"
                type="text"
                {...register("surname")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.surname ? "error" : ""
                }`}
              />
              {errors.surname && (
                <p className="error-message">{errors.surname.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="patronymic">
                Ata adı <span className="text-red-500">*</span>
              </label>
              <input
                id="patronymic"
                type="text"
                {...register("patronymic")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.patronymic ? "error" : ""
                }`}
              />
              {errors.patronymic && (
                <p className="error-message">{errors.patronymic.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="genderStatus">
                Cinsiyyət <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                name="genderStatus"
                value={watch("genderStatus")}
                onChange={(option) => setValue("genderStatus", option.value)}
                placeholder="Cins seçin"
                options={[
                  {
                    value: "MAN",
                    label: "Kişi",
                  },
                  {
                    value: "WOMAN",
                    label: "Qadın",
                  },
                ]}
                isDisabled={mode === "view"}
              />
              {errors.genderStatus && (
                <p className="error-message">{errors.genderStatus.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="finCode">
                FIN kod <span className="text-red-500">*</span>
              </label>
              <input
                id="finCode"
                type="text"
                {...register("finCode")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.finCode ? "error" : ""
                }`}
              />
              {errors.finCode && (
                <p className="error-message">{errors.finCode.message}</p>
              )}
            </div>

            <div className="main-form-group color-selector-group">
              <label htmlFor="colorCode">Rəng kodu</label>
              <input
                id="colorCode"
                type="text"
                {...register("colorCode")}
                readOnly
                className={mode === "view" ? "readonly" : ""}
              />
              {mode !== "view" && (
                <span
                  className="color-icon"
                  onClick={() => setShowColorPicker(!showColorPicker)}>
                  <MdColorLens />
                </span>
              )}
              <span
                className="color-swatch"
                style={{ backgroundColor: watch("colorCode") }}></span>

              {showColorPicker && (
                <div ref={colorPickerRef} className="color-picker-dropdown">
                  <SketchPicker
                    disableAlpha={true}
                    color={watch("colorCode")}
                    onChangeComplete={handleColorChange}
                  />
                </div>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="dateOfBirth">
                Doğum tarixi <span className="text-red-500">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.dateOfBirth ? "error" : ""
                }`}
              />
              {errors.dateOfBirth && (
                <p className="error-message">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="degree">Elmi dərəcə</label>
              <input
                id="degree"
                type="text"
                {...register("degree")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>
          </div>

          <div className="right">
            <div className="main-form-group">
              <label htmlFor="phone">
                Mobil nömrə 1 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("phone", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.phone ? "error" : ""
                }`}
              />
              {errors.phone && (
                <p className="error-message">{errors.phone.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="phone2">Mobil nömrə 2</label>
              <input
                id="phone2"
                type="tel"
                {...register("phone2", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("phone2", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.phone2 ? "error" : ""
                }`}
              />
              {errors.phone2 && (
                <p className="error-message">{errors.phone2.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="phone3">Mobil nömrə 3</label>
              <input
                id="phone3"
                type="tel"
                {...register("phone3", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("phone3", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.phone3 ? "error" : ""
                }`}
              />
              {errors.phone3 && (
                <p className="error-message">{errors.phone3.message}</p>
              )}
            </div>
            <div className="main-form-group">
              <label htmlFor="homePhone">Ev telefonu</label>
              <input
                id="homePhone"
                type="tel"
                {...register("homePhone", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("homePhone", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.homePhone ? "error" : ""
                }`}
              />
              {errors.homePhone && (
                <p className="error-message">{errors.homePhone.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="email">E-poçt ünvanı</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.email ? "error" : ""
                }`}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="address">Ünvan</label>
              <input
                id="address"
                type="text"
                {...register("address")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="experience">Təcrübə (il)</label>
              <input
                id="experience"
                type="number"
                {...register("experience")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.experience ? "error" : ""
                }`}
              />
              {errors.experience && (
                <p className="error-message">{errors.experience.message}</p>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="permissions">
                İcazələr <span className="text-red-500">*</span>
              </label>
              <div className="permissions-checklist">
                {permissionsLoading ? (
                  <div className="text-sm text-gray-500">
                    İcazələr yüklənir...
                  </div>
                ) : permissionList.length === 0 ? (
                  <div className="text-sm text-gray-500">İcazə tapılmadı</div>
                ) : (
                  <Controller
                    name="permissions"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-2">
                        {permissionList.map((permission) => (
                          <label
                            key={permission.value}
                            className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={permission.value}
                              checked={field.value?.includes(permission.value)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const currentValues = field.value || [];
                                if (isChecked) {
                                  field.onChange([
                                    ...currentValues,
                                    permission.value,
                                  ]);
                                } else {
                                  field.onChange(
                                    currentValues.filter(
                                      (val) => val !== permission.value
                                    )
                                  );
                                }
                              }}
                              disabled={mode === "view"}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{permission.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                )}
              </div>
              {errors.permissions && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.permissions.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index} className="text-red-500 text-xs error-message">
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {mode !== "view" && (
          <div className="main-form-actions">
            <button type="submit" className="btn-submit">
              {mode === "create" ? "Əlavə et" : "Yenilə"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancelButton}>
              Ləğv et
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserForm;