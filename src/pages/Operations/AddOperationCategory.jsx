import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/Operations/addoperationcategory.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaPercentage } from "react-icons/fa";
import useOperationTypesStore from "../../../stores/operationsTypeStore";
import useInsuranceCompanyStore from "../../../stores/insuranceStore";

function AddOperationCategory() {
  const navigate = useNavigate();
  const createOperation = useOperationTypesStore((state) => state.create);
  const { insuranceCompanyList, fetchList, loading, error } = useInsuranceCompanyStore();

  const [operationCategoryName, setOperationCategoryName] = useState("");
  const [isColorSelection, setIsColorSelection] = useState(false);
  const [isImplantSelection, setIsImplantSelection] = useState(false);
  const [insurancePercentages, setInsurancePercentages] = useState({});

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handlePercentageChange = (id, value) => {
    setInsurancePercentages((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!operationCategoryName.trim()) {
      toast.error("Əməliyyat kateqoriyasının adı boş ola bilməz!");
      return;
    }

    const insurances = insuranceCompanyList
      .filter((company) => insurancePercentages[company.id])
      .map((company) => ({
        insuranceCompanyId: company.id,
        deductiblePercentage: Number(insurancePercentages[company.id]) || 0,
      }));

    const payload = {
      categoryName: operationCategoryName,
      status: "ACTIVE",
      colorSelection: isColorSelection,
      implantSelection: isImplantSelection,
      insurances,
    };

    try {
      await createOperation(payload);
      toast.success("Əməliyyat kateqoriyası uğurla əlavə olundu!");
      setTimeout(() => navigate("/operations"), 1500);
    } catch (err) {
      toast.error("Əlavə olunarkən xəta baş verdi!");
    }
  };

  return (
    <div className="addOperationWrapper">
      <ToastContainer />
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
          {loading && <p style={{ color: "gray" }}>Yüklənir...</p>}

          {error && <p style={{ color: "red" }}>Xəta baş verdi: {error.message || error.toString()}</p>}

          {!loading && !error && insuranceCompanyList.length === 0 && (
            <p style={{ color: "gray" }}>Sığorta şirkətləri tapılmadı...</p>
          )}

          {!loading && !error && insuranceCompanyList.length > 0 && insuranceCompanyList.map((company) => (
            <div className="addOperationInsuranceItem" key={company.id}>
              <p>{company.companyName}</p>
              <div className="addOperationPercentageInput">
                <input
                  type="text"
                  placeholder="Azadolma faizi"
                  value={insurancePercentages[company.id] || ""}
                  onChange={(e) =>
                    handlePercentageChange(company.id, e.target.value)
                  }
                />
                <span>
                  <FaPercentage />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="addOperationButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => navigate("/operations")}
          >
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
