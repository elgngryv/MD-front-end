import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/style/Operations/editoperationcategory.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCheckmarkOutline } from "react-icons/io5"; // Check icon
import { RxCross2 } from "react-icons/rx"; // Cross icon
import { FaPercentage } from "react-icons/fa"; // Percentage icon

const insuranceCompanies = [
  { name: "A sığorta", key: "aSigorta" },
  { name: "A-Group Sığorta", key: "aGroupSigorta" },
  { name: "ABC Sığorta", key: "abcSigorta" },
  { name: "ATA Sığorta", key: "ataSigorta" },
  { name: "Ataşgah Sığorta", key: "atasgahSigorta" },
  { name: "Meqa Sığorta", key: "meqaSigorta" },
  { name: "PAŞA Sığorta", key: "pasaSigorta" },
  { name: "Sənaye Sığorta", key: "sanayeSigorta" },
];

// Static data for example (in a real app, this would come from an API)
const staticOperationsData = [
  { id: "1", operationCategoryName: "salam", isColorSelection: false, isImplantSelection: false, insurancePercentages: { aSigorta: "10", aGroupSigorta: "12", abcSigorta: "15", ataSigorta: "", atasgahSigorta: "", meqaSigorta: "", pasaSigorta: "", sanayeSigorta: "" } },
  { id: "2", operationCategoryName: "Endodontiya", isColorSelection: true, isImplantSelection: false, insurancePercentages: { aSigorta: "5", aGroupSigorta: "", abcSigorta: "", ataSigorta: "", atasgahSigorta: "", meqaSigorta: "", pasaSigorta: "", sanayeSigorta: "" } },
  { id: "3", operationCategoryName: "İmplantologiya", isColorSelection: false, isImplantSelection: true, insurancePercentages: { aSigorta: "", aGroupSigorta: "", abcSigorta: "", ataSigorta: "20", atasgahSigorta: "", meqaSigorta: "", pasaSigorta: "", sanayeSigorta: "" } },
];

function EditOperationCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [operationCategoryName, setOperationCategoryName] = useState('');
  const [isColorSelection, setIsColorSelection] = useState(false);
  const [isImplantSelection, setIsImplantSelection] = useState(false);
  const [insurancePercentages, setInsurancePercentages] = useState(
    insuranceCompanies.reduce((acc, company) => ({ ...acc, [company.key]: '' }), {})
  );

  useEffect(() => {
    const operation = staticOperationsData.find(item => item.id === id);
    if (operation) {
      setOperationCategoryName(operation.operationCategoryName);
      setIsColorSelection(operation.isColorSelection);
      setIsImplantSelection(operation.isImplantSelection);
      setInsurancePercentages(operation.insurancePercentages);
    }
  }, [id]);

  const handlePercentageChange = (key, value) => {
    setInsurancePercentages(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!operationCategoryName.trim()) {
      toast.error("Əməliyyat kateqoriyasının adı boş ola bilməz!");
      return;
    }

    const updatedOperationCategory = {
      id,
      operationCategoryName,
      isColorSelection,
      isImplantSelection,
      insurancePercentages,
    };

    console.log("Updated Operation Category:", updatedOperationCategory);
    toast.success("Əməliyyat kateqoriyası uğurla yeniləndi!");
    // navigate('/operations'); // Uncomment to navigate after success
  };

  return (
    <div className="editOperationWrapper">
      <form className="editOperationContainer" onSubmit={handleSubmit}>
        <div className="editOperationInputGroup">
          <p>
            Əməliyyat kateqoriyasının adı<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Əməliyyat kateqoriyasının adı"
            value={operationCategoryName}
            onChange={(e) => setOperationCategoryName(e.target.value)}
          />
        </div>

        <div className="editOperationCheckboxGroup">
          <label className="editOperationCheckboxLabel">
            <input
              type="checkbox"
              checked={isColorSelection}
              onChange={(e) => setIsColorSelection(e.target.checked)}
            />
            Rəng seçimi
          </label>
          <label className="editOperationCheckboxLabel">
            <input
              type="checkbox"
              checked={isImplantSelection}
              onChange={(e) => setIsImplantSelection(e.target.checked)}
            />
            İmplant seçimi
          </label>
        </div>

        <div className="editOperationInsuranceSection">
          {insuranceCompanies.map((company) => (
            <div className="editOperationInsuranceItem" key={company.key}>
              <p>{company.name}</p>
              <div className="editOperationPercentageInput">
                <input
                  type="text"
                  placeholder="Azadolma faizi"
                  value={insurancePercentages[company.key]}
                  onChange={(e) => handlePercentageChange(company.key, e.target.value)}
                />
                <span>
                  <FaPercentage />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="editOperationButtons">
          <button type="button" className="cancelFormCondition" onClick={() => navigate('/operations')}>
            <RxCross2 />
            İmtina et
          </button>
          <button type="submit" className="acceptFormCondition">
            <IoCheckmarkOutline />
            Yadda saxla
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditOperationCategory; 