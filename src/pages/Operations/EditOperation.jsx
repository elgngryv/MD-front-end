import React, { useState, useEffect } from "react";
import "../../assets/style/Operations/editoperation.css";
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FaManatSign } from "react-icons/fa6";
import useInsuranceCompanyStore from "../../../stores/insuranceStore";
import useOperationItemsTypeStore from "../../../stores/operationItemTypeStore";
import usePriceCategoryStore from "../../../stores/priceCategoryStore";

const EditOperation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { insuranceCompanies, fetchAll: fetchAllInsurance } =
    useInsuranceCompanyStore();
  const { selectedOperationItemsType, fetchById, updateOp } =
    useOperationItemsTypeStore();
  const { categories, fetchCategories } = usePriceCategoryStore();

  // Local state
  const [operationName, setOperationName] = useState("");
  const [operationCode, setOperationCode] = useState("");
  const [visibleInTechnicians, setVisibleInTechnicians] = useState(false);
  const [prices, setPrices] = useState({});
  const [insuranceData, setInsuranceData] = useState([]);

  // Məlumatları yüklə
  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
    fetchCategories();
    fetchAllInsurance();
  }, [id]);

  useEffect(() => {
    if (
      !selectedOperationItemsType ||
      !categories.length ||
      !insuranceCompanies.length
    )
      return;

    setOperationName(selectedOperationItemsType.operationName || "");
    setOperationCode(selectedOperationItemsType.operationCode || "");
    setVisibleInTechnicians(!!selectedOperationItemsType.showTechnic);

    // Qiymətləri doldur
    const priceMap = {};
    categories.forEach((cat) => {
      const priceObj = (selectedOperationItemsType.prices || []).find(
        (p) => p.priceCategoryId === cat.id
      );
      priceMap[cat.id] =
        priceObj && priceObj.price != null ? priceObj.price.toString() : "";
    });
    setPrices(priceMap);

    // Sığorta məlumatlarını doldur
    const insurancesFromApi = selectedOperationItemsType.insurances || [];

    // Bizim insuranceCompanies ilə uyğunlaşdıraraq dəyərləri hazırlayaq
    const insuranceMap = insuranceCompanies.map((company) => {
      const found = insurancesFromApi.find(
        (ins) => ins.insuranceCompanyId === company.id
      );
      return {
        id: company.id,
        name: company.companyName,
        value: found && found.amount != null ? found.amount.toString() : "",
      };
    });
    setInsuranceData(insuranceMap);
  }, [selectedOperationItemsType, categories, insuranceCompanies]);

  // Qiymət inputlarını dəyiş
  const handlePriceChange = (categoryId, value) => {
    setPrices((prev) => ({ ...prev, [categoryId]: value }));
  };

  // Sığorta inputlarını dəyiş
  const handleInsuranceChange = (id, value) => {
    setInsuranceData((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, value } : ins))
    );
  };

  // Yadda saxla düyməsi
  const handleSave = async () => {
    const payload = {
      operationName,
      operationCode,
      showTechnic: visibleInTechnicians,
      prices: Object.entries(prices).map(([categoryId, price]) => ({
        priceCategoryId: Number(categoryId),
        price: parseFloat(price) || 0,
      })),
      insurances: insuranceData.map((ins) => ({
        insuranceCompanyId: ins.id,
        amount: parseFloat(ins.value) || 0,
      })),
    };

    try {
      await updateOp(Number(id), payload);
      navigate(-1);
    } catch (err) {
      console.error("Update operation error:", err);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="editOperation-container">
      <div className="editOperation-form-section">
        <div className="editOperation-form-group">
          <label htmlFor="operationName">
            Əməliyyatın adı <span>*</span>
          </label>
          <input
            type="text"
            id="operationName"
            className="editOperation-input"
            value={operationName}
            onChange={(e) => setOperationName(e.target.value)}
          />
        </div>

        <div className="editOperation-form-group">
          <label htmlFor="operationCode">
            Əməliyyatın kodu <span>*</span>
          </label>
          <input
            type="text"
            id="operationCode"
            className="editOperation-input"
            value={operationCode}
            onChange={(e) => setOperationCode(e.target.value)}
          />
        </div>

        <div className="editOperation-form-group-prices">
          <label>Qiymətləri</label>
          <div className="editOperation-price-inputs">
            {categories.map((cat) => (
              <div className="editOperation-price-input-group" key={cat.id}>
                <label htmlFor={`price-${cat.id}`}>{cat.name}</label>
                <input
                  type="text"
                  id={`price-${cat.id}`}
                  className="editOperation-price-input"
                  placeholder="Qiymət"
                  value={prices[cat.id] || ""}
                  onChange={(e) => handlePriceChange(cat.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="editOperation-form-group-tech editOperation-checkbox-group">
          <label htmlFor="visibleInTechnicians">
            Texniklarda görünsün <span>*</span>
          </label>
          <input
            type="checkbox"
            id="visibleInTechnicians"
            className="editOperation-checkbox"
            checked={visibleInTechnicians}
            onChange={(e) => setVisibleInTechnicians(e.target.checked)}
          />
        </div>

        <div className="editOperation-insurance-section">
          {insuranceData.length > 0 ? (
            insuranceData.map((insurance) => (
              <div className="editOperation-insurance-item" key={insurance.id}>
                <label className="editOperation-insurance-label">
                  {insurance.name}
                </label>
                <div className="editOperation-insurance-input-group">
                  <input
                    type="number"
                    className="editOperation-insurance-input"
                    placeholder="Məbləğ"
                    value={insurance.value}
                    onChange={(e) =>
                      handleInsuranceChange(insurance.id, e.target.value)
                    }
                  />
                  <span className="editOperation-currency-symbol">
                    <FaManatSign />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>Sığorta şirkətləri mövcud deyil</p>
          )}
        </div>

        <div className="editOperation-buttons">
          <button
            className="editOperation-cancel-button"
            onClick={handleCancel}>
            <MdClose /> İmtina et
          </button>
          <button className="editOperation-save-button" onClick={handleSave}>
            <FaRegSave /> Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOperation;
