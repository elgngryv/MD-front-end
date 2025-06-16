import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/style/Operations/addoperationcategory.css';
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

function AddOperationCategory() {
  const navigate = useNavigate();
  const [operationCategoryName, setOperationCategoryName] = useState('');
  const [isColorSelection, setIsColorSelection] = useState(false);
  const [isImplantSelection, setIsImplantSelection] = useState(false);
  const [insurancePercentages, setInsurancePercentages] = useState(
    insuranceCompanies.reduce((acc, company) => ({ ...acc, [company.key]: '' }), {})
  );

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

    const newOperationCategory = {
      id: Math.random().toString(36).substr(2, 9),
      operationCategoryName,
      isColorSelection,
      isImplantSelection,
      insurancePercentages,
    };

    console.log("New Operation Category:", newOperationCategory);
    toast.success("Əməliyyat kateqoriyası uğurla əlavə olundu!");
    // navigate('/operations'); // Uncomment to navigate after success
  };

  return (
    <div className="addOperationWrapper">
      <form className="addOperationContainer" onSubmit={handleSubmit}>
        <div className="addOperationInputGroup">
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

        <div className="addOperationCheckboxGroup">
          <label className="addOperationCheckboxLabel">
            <input
              type="checkbox"
              checked={isColorSelection}
              onChange={(e) => setIsColorSelection(e.target.checked)}
            />
            Rəng seçimi
          </label>
          <label className="addOperationCheckboxLabel">
            <input
              type="checkbox"
              checked={isImplantSelection}
              onChange={(e) => setIsImplantSelection(e.target.checked)}
            />
            İmplant seçimi
          </label>
        </div>

        <div className="addOperationInsuranceSection">
          {insuranceCompanies.map((company) => (
            <div className="addOperationInsuranceItem" key={company.key}>
              <p>{company.name}</p>
              <div className="addOperationPercentageInput">
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

        <div className="addOperationButtons">
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

export default AddOperationCategory;
