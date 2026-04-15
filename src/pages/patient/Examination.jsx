import React, { useState, useEffect } from "react";
import ToothSelector from "../../components/ToothSelector";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/examination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import SimpleList from "../../components/list/SimpleList";
import { useParams } from "react-router-dom";
import useTeethExaminationStore from "../../../stores/teeth-examinationStore";
import useExaminationStore from "../../../stores/examinationStore";
import { toast } from "react-toastify";
import BlurLoader from "../../components/layout/BlurLoader";

const Examination = () => {
  const { id: patientId } = useParams();
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [mode, setMode] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const {
    teethExaminations,
    loading: findingsLoading,
    searchTeethExaminations,
    createTeethExamination,
    deleteTeethExamination,
  } = useTeethExaminationStore();

  const {
    examinations: examTypes,
    loading: typesLoading,
    fetchAllExaminations,
  } = useExaminationStore();

  useEffect(() => {
    if (patientId) {
      searchTeethExaminations({ patientId: Number(patientId) });
      fetchAllExaminations();
    }
  }, [patientId, searchTeethExaminations, fetchAllExaminations]);

  const handleToothSelect = (tooth) => {
    setSelectedTeeth((prevSelected) =>
      prevSelected.includes(tooth)
        ? prevSelected.filter((t) => t !== tooth)
        : [...prevSelected, tooth]
    );
  };

  const handleModeToggle = () => {
    if (mode === "edit") {
      setSelectedTeeth([]);
      setSelectedType(null);
    }
    setMode((prevMode) => (prevMode === "view" ? "edit" : "view"));
  };

  const handleDelete = async (examId) => {
    if (window.confirm("Bu müayinəni silmək istədiyinizə əminsiniz?")) {
      try {
        await deleteTeethExamination(examId);
        toast.success("Müayinə silindi");
      } catch (err) {
        toast.error("Silərkən xəta baş verdi");
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedTeeth.length === 0) {
      toast.warning("Zəhmət olmasa diş seçin");
      return;
    }
    if (!selectedType) {
      toast.warning("Zəhmət olmasa müayinə növünü seçin");
      return;
    }

    try {
      // Backend expects multiple creates or array? 
      // Based on AddExaminationPicture, it's one by one.
      for (const toothNo of selectedTeeth) {
        await createTeethExamination({
          patientId: Number(patientId),
          toothId: toothNo, // Assuming toothId can be toothNo or backend handles it
          examinationId: selectedType.value,
          status: "ACTIVE",
          date: new Date().toISOString().split('T')[0]
        });
      }
      toast.success("Müayinə yadda saxlanıldı");
      setSelectedTeeth([]);
      setSelectedType(null);
      setMode("view");
      searchTeethExaminations({ patientId: Number(patientId) });
    } catch (err) {
      toast.error("Yadda saxlayarkən xəta baş verdi");
    }
  };

  const filteredExaminations = teethExaminations.filter((exam) => {
    if (!selectedDate) return true;
    return exam.date === selectedDate.value;
  });

  const uniqueDates = [...new Set(teethExaminations.map(e => e.date))]
    .map(date => ({ value: date, label: date }));

  return (
    <BlurLoader isLoading={findingsLoading}>
      <div className="examination-container">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            {mode === "view" ? (
              <CustomDropdown
                className="w-64"
                value={selectedDate}
                placeholder="Tarix seçin"
                onChange={setSelectedDate}
                options={uniqueDates}
                isClearable
              />
            ) : (
              <CustomDropdown
                className="w-64"
                value={selectedType}
                placeholder="Müayinə növünü seçin"
                onChange={setSelectedType}
                options={examTypes.map(t => ({ value: t.id, label: t.typeName }))}
              />
            )}
          </div>
          <div className="flex gap-3">
            {mode === "view" ? (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleModeToggle}>
                <FontAwesomeIcon icon={faPen} />
                <span>Yeni Müayinə</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>
                  Yadda saxla
                </button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={handleModeToggle}>
                  Ləğv et
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`tooth-selector-container my-6 ${(mode === 'view' && !selectedDate) ? 'opacity-70 grayscale' : ''}`}>
          <ToothSelector
            selectedTeeth={selectedTeeth}
            onSelect={handleToothSelect}
            mode={mode}
          />
        </div>

        <div className="mt-8 border border-gray-200 rounded-xl bg-white p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Müayinə Tarixçəsi</h3>
          <SimpleList 
            columns={[
              { key: "examinationName", label: "Müayinə Adı" },
              { key: "toothId", label: "Diş No" },
              { key: "date", label: "Tarix" },
            ]} 
            data={filteredExaminations} 
            enableDelete={true}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </BlurLoader>
  );
}

export default Examination;