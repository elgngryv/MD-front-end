import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "./CustomDropdown";
import ToothSelector from "./ToothSelector";
import MultiFileForm from "./MultiFileForm";
import useDentalOrderStore from "../../stores/dentalOrderStore";

import useGarnitureStore from "../../stores/garnitureStore";
import useColorStore from "../../stores/colorStore";
import useTechnicianStore from "../../stores/technicianStore";
import usePatientStore from "../../stores/patiendStore";
import useCalendarStore from "../../stores/calendarStore";
import useCeramicsStore from "../../stores/ceramicStore";
import useMetalStore from "../../stores/metalsStore";
import "../assets/style/form.css";

// Fallback data for when API fails
const fallbackColors = [
  { value: 1, label: "A1" },
  { value: 2, label: "A2" },
  { value: 3, label: "A3" },
  { value: 4, label: "A3.5" },
  { value: 5, label: "A4" },
];

const fallbackMetals = [
  { value: 1, label: "Nikel-Krom" },
  { value: 2, label: "Kobalt-Krom" },
  { value: 3, label: "Titanyum" },
  { value: 4, label: "Altın Alaşım" },
];

const fallbackGarnitures = [
  { value: 1, label: "Standard" },
  { value: 2, label: "Premium" },
  { value: 3, label: "Lüks" },
];

const OrderForm = ({ initialData, mode = "create", onSubmit, onCancel }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: initialData || {},
  });

  // State for stores and dropdown options
  const [garnitures, setGarnitures] = useState([]);
  const [colors, setColors] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [ceramics, setCeramics] = useState([]);
  const [metals, setMetals] = useState([]);

  // State for tooth selection
  const [selectedTeeth, setSelectedTeeth] = useState(
    initialData?.teethList || []
  );
  const [isChild, setIsChild] = useState(true);
  const [toothDetails, setToothDetails] = useState(
    initialData?.toothDetailIds || []
  );
  const [files, setFiles] = useState([]);

  // Initialize stores
  const dentalOrderStore = useDentalOrderStore();
  const garnitureStore = useGarnitureStore();
  const colorStore = useColorStore();
  const technicianStore = useTechnicianStore();
  const patientStore = usePatientStore();
  const calendarStore = useCalendarStore();
  const ceramicsStore = useCeramicsStore();
  const metalStore = useMetalStore();

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedTeeth(initialData.teethList || []);
      setToothDetails(initialData.toothDetailIds || []);

      // Set initial values for dropdowns
      if (initialData.doctorId) setValue("doctor", initialData.doctorId);
      if (initialData.technicianId)
        setValue("technician", initialData.technicianId);
      if (initialData.patientId) setValue("patient", initialData.patientId);
      if (initialData.dentalWorkType)
        setValue("workType", initialData.dentalWorkType);

      // Set denture info if available
      if (initialData.orderDentureInfo) {
        if (initialData.orderDentureInfo.color)
          setValue("color", initialData.orderDentureInfo.color);
        if (initialData.orderDentureInfo.garniture)
          setValue("garniture", initialData.orderDentureInfo.garniture);
      }
    }
  }, [initialData, reset, setValue]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all necessary data with error handling
        const promises = [
          garnitureStore
            .fetchGarnitureList()
            .catch((e) => console.error("Garniture error:", e)),
          colorStore
            .fetchColorList()
            .catch((e) => console.error("Color error:", e)),
          technicianStore
            .fetchTechnicians()
            .catch((e) => console.error("Technician error:", e)),
          patientStore
            .fetchPatients()
            .catch((e) => console.error("Patient error:", e)),
          calendarStore
            .fetchDoctors()
            .catch((e) => console.error("Doctor error:", e)),
          ceramicsStore
            .fetchCeramicsList()
            .catch((e) => console.error("Ceramics error:", e)),
          metalStore
            .fetchMetals()
            .catch((e) => console.error("Metal error:", e)),
        ];

        await Promise.allSettled(promises);

        // Set dropdown options (only if data is available)
        setGarnitures(
          garnitureStore.garnitures?.map((item) => ({
            value: item.id,
            label: item.data.name || item.label,
          })) || fallbackGarnitures
        );

        setColors(
          colorStore.colors.map((item) => ({
            value: item.id,
            label: item.name || item.label,
          }))
        );

        setTechnicians(
          technicianStore.technicians?.map((item) => ({
            value: item.id,
            label: `${item.name} ${item.surname}`,
          })) || []
        );

        setPatients(
          patientStore.patients?.map((item) => ({
            value: item.id,
            label: `${item.name} ${item.surname}`,
          })) || []
        );

        setDoctors(
          calendarStore.doctors?.map((item) => ({
            value: item.doctorId || item.id,
            label: `${item.name} ${item.surname}`,
          })) || []
        );

        setCeramics(
          ceramicsStore.ceramics?.map((item) => ({
            value: item.id,
            label: item.name,
          })) || []
        );

        setMetals(
          metalStore.metals?.map((item) => ({
            value: item.id,
            label: item.name,
          })) || fallbackMetals
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle tooth selection
  const handleToothSelect = (tooth) => {
    const newSelectedTeeth = selectedTeeth.includes(tooth)
      ? selectedTeeth.filter((t) => t !== tooth)
      : [...selectedTeeth, tooth];

    setSelectedTeeth(newSelectedTeeth);

    // Initialize tooth details for new teeth
    const newToothDetails = [...toothDetails];
    newSelectedTeeth.forEach((toothNumber) => {
      if (
        !newToothDetails.find((detail) => detail.toothNumber === toothNumber)
      ) {
        newToothDetails.push({
          toothNumber,
          colorId: null,
          metalId: null,
          ceramicId: null,
        });
      }
    });

    // Remove details for deselected teeth
    const filteredDetails = newToothDetails.filter((detail) =>
      newSelectedTeeth.includes(detail.toothNumber)
    );

    setToothDetails(filteredDetails);
  };

  // Handle tooth detail changes
  const handleToothDetailChange = (toothNumber, field, value) => {
    const updatedDetails = toothDetails.map((detail) => {
      if (detail.toothNumber === toothNumber) {
        return { ...detail, [field]: value };
      }
      return detail;
    });

    setToothDetails(updatedDetails);
  };

  // Handle file uploads
  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  // Prepare data for submission
  const prepareSubmitData = (data) => {
    const submitData = {
      checkDate: data.inspectionDate || data.checkDate,
      deliveryDate: data.deliveryDate,
      description: data.notes || data.description || "",
      dentalWorkType: data.workType,
      orderDentureInfo: {
        color: data.color,
        garniture: data.garniture,
      },
      toothDetailIds: toothDetails,
      teethList: selectedTeeth,
      doctorId: data.doctor,
      technicianId: data.technician,
      patientId: parseInt(data.patient),
    };

    // Only include files if there are any
    if (files.length > 0) {
      submitData.files = files.map((file) => file.base64 || file);
    }

    return submitData;
  };

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      const submitData = prepareSubmitData(data);

      if (mode === "create") {
        await dentalOrderStore.addOrder(submitData);
      } else if (mode === "edit") {
        await dentalOrderStore.editOrder({
          ...submitData,
          id: initialData.id,
        });
      }

      if (onSubmit) {
        onSubmit(submitData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Work types (could also be fetched from an API)
  const workTypes = [
    { value: "PROTEZ", label: "Protez" },
    { value: "KORONKA", label: "Koronka" },
    { value: "IMPLANT", label: "İmplant" },
  ];

  // Get current values from form
  const formValues = watch();

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 border border-[#E5E7EB] rounded-lg p-6 bg-white">
        {/* Doctor Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="doctor">
            Həkim <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={doctors}
              value={formValues.doctor}
              onChange={(value) => setValue("doctor", value)}
              placeholder="Həkim seçin"
              name="doctor"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Technician Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="technician">
            Texnik <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={technicians}
              value={formValues.technician}
              onChange={(value) => setValue("technician", value)}
              placeholder="Texnik seçin"
              name="technician"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Patient Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="patient">
            Pasiyent <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={patients}
              value={formValues.patient}
              onChange={(value) => setValue("patient", value)}
              placeholder="Pasiyent seçin"
              name="patient"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Order Date */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="orderDate">
            Sifariş tarixi <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <input
              id="orderDate"
              type="date"
              {...register("orderDate", { required: true })}
              readOnly={mode === "view"}
              className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
            />
          </div>
        </div>

        {/* Inspection Date */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="inspectionDate">
            Yoxlanılma tarixi <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <input
              id="inspectionDate"
              type="date"
              {...register("inspectionDate", { required: true })}
              readOnly={mode === "view"}
              className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
            />
          </div>
        </div>

        {/* Delivery Date */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="deliveryDate">
            Təhvil tarixi <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <input
              id="deliveryDate"
              type="date"
              {...register("deliveryDate", { required: true })}
              readOnly={mode === "view"}
              className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
            />
          </div>
        </div>

        {/* Work Type Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="workType">
            İşin növü <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={workTypes}
              value={formValues.workType}
              onChange={(value) => setValue("workType", value)}
              placeholder="İşin növünü seçin"
              name="workType"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Color */}
        <div className="flex justify-between items-center gap-2">
          <label>Rəng *</label>
          <div className="w-[950px]">
            <CustomDropdown
              options={colors}
              value={
                colors.find(
                  (c) => c.value === initialData?.orderDentureInfo?.color
                ) || null
              }
              onChange={(val) => setValue("color", val.value)}
              placeholder="Rəng seçin"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Furniture Dropdown */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="garniture">
            Qarnitur <span className="text-red-500">*</span>
          </label>
          <div className="w-[950px]">
            <CustomDropdown
              options={garnitures}
              value={formValues.garniture}
              onChange={(value) => setValue("garniture", value)}
              placeholder="Qarnitur seçin"
              name="garniture"
              disabled={mode === "view"}
            />
          </div>
        </div>

        {/* Notes - Larger Textbox */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="notes">Qeyd</label>
          <div className="w-[950px]">
            <textarea
              id="notes"
              {...register("notes")}
              readOnly={mode === "view"}
              className={`w-full h-32 border border-[#D4DCE8] rounded-lg px-4 py-2 resize-none ${
                mode === "view" ? "bg-gray-200" : ""
              }`}
              placeholder="Qeydlər..."
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="flex justify-between items-center gap-2">
          <label htmlFor="files">Fayllar</label>
          <div className="w-[950px]">
            <MultiFileForm
              onFilesChange={handleFilesChange}
              disabled={mode === "view"}
              initialFiles={initialData?.files || []}
            />
          </div>
        </div>
      </div>

      {/* Tooth Selection Section */}
      <div className="flex flex-col border border-[#E5E7EB] bg-white rounded-lg w-full p-4 gap-2">
        <h1 className="text-lg font-bold">Diş qrafiki</h1>
        <h2>Təsirə məruz qalan dişlər və müalicə sahələri</h2>

        <div className="flex items-center justify-around border border-[#E5E7EB] rounded-lg w-[198px] h-[40px]">
          <button
            type="button"
            className={`w-[90px] h-[32px] rounded-lg ${
              !isChild ? "bg-[#155EEF] text-white" : ""
            }`}
            onClick={() => {
              setIsChild(false);
              setSelectedTeeth([]);
              setToothDetails([]);
            }}>
            Yetkin
          </button>
          <button
            type="button"
            className={`w-[90px] h-[32px] rounded-lg ${
              isChild ? "bg-[#155EEF] text-white" : ""
            }`}
            onClick={() => {
              setIsChild(true);
              setSelectedTeeth([]);
              setToothDetails([]);
            }}>
            Uşaq
          </button>
        </div>

        <div>
          <ToothSelector
            showImage={true}
            selectedTeeth={selectedTeeth}
            onSelect={handleToothSelect}
            isChild={isChild}
            disabled={mode === "view"}
          />
        </div>

        {/* Tooth Details */}
        {selectedTeeth.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Diş detalları:</h3>
            {selectedTeeth.map((toothNumber) => {
              const toothDetail =
                toothDetails.find((d) => d.toothNumber === toothNumber) || {};

              return (
                <div key={toothNumber} className="mb-4 p-2 border rounded">
                  <h4 className="font-semibold">Diş #{toothNumber}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div>
                      <label>Rəng:</label>
                      <CustomDropdown
                        options={colors}
                        value={toothDetail.colorId}
                        onChange={(value) =>
                          handleToothDetailChange(toothNumber, "colorId", value)
                        }
                        placeholder="Rəng seçin"
                        disabled={mode === "view"}
                      />
                    </div>
                    <div>
                      <label>Metal:</label>
                      <CustomDropdown
                        options={metals}
                        value={toothDetail.metalId}
                        onChange={(value) =>
                          handleToothDetailChange(toothNumber, "metalId", value)
                        }
                        placeholder="Metal seçin"
                        disabled={mode === "view"}
                      />
                    </div>
                    <div>
                      <label>Keramika:</label>
                      <CustomDropdown
                        options={ceramics}
                        value={toothDetail.ceramicId}
                        onChange={(value) =>
                          handleToothDetailChange(
                            toothNumber,
                            "ceramicId",
                            value
                          )
                        }
                        placeholder="Keramika seçin"
                        disabled={mode === "view"}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="self-end flex gap-4 m-4">
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border text-[#155EEF] border-[#155EEF] rounded-lg hover:bg-gray-100 w-[184px] h-[44px] gap-2"
          onClick={onCancel}>
          <FontAwesomeIcon icon={faXmark} />
          Ləğv et
        </button>
        {mode !== "view" && (
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-[#155EEF] text-white rounded-lg hover:bg-[#155EEF] w-[184px] h-[44px] gap-2"
            disabled={dentalOrderStore.loading}>
            <FontAwesomeIcon icon={faCheck} />
            {dentalOrderStore.loading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        )}
      </div>
    </form>
  );
};

export default OrderForm;
