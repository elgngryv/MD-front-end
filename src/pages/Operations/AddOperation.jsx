import React, { useEffect, useState } from "react";
import "../../assets/style/Operations/addopertaion.css";
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FaManatSign } from "react-icons/fa6";
import useInsuranceCompanyStore from "../../../stores/insuranceStore";
import useOperationItemsTypeStore from "../../../stores/operationItemTypeStore";
import usePriceCategoryStore from "../../../stores/priceCategoryStore";

const AddOperation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchAll, insuranceCompanies } = useInsuranceCompanyStore();
  const { create } = useOperationItemsTypeStore();
  const { fetchCategories, categories } = usePriceCategoryStore();

  const [operationName, setOperationName] = useState("");
  const [operationCode, setOperationCode] = useState("");
  const [visibleInTechnicians, setVisibleInTechnicians] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [dynamicPrices, setDynamicPrices] = useState([]);

  useEffect(() => {
    fetchAll();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (insuranceCompanies.length) {
      const data = insuranceCompanies.map((company) => ({
        name: company.companyName,
        id: company.id,
        value: "",
      }));
      setInsuranceData(data);
    }
  }, [insuranceCompanies]);

  // Qiymət sahələrini kateqoriyalara əsasən hazırla
  useEffect(() => {
    if (categories.length) {
      const prices = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        value: "",
      }));
      setDynamicPrices(prices);
    }
  }, [categories]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleInsuranceChange = (index, value) => {
    const updated = [...insuranceData];
    updated[index].value = value;
    setInsuranceData(updated);
  };

  const handlePriceChange = (index, value) => {
    const updated = [...dynamicPrices];
    updated[index].value = value;
    setDynamicPrices(updated);
  };

  const handleSave = async () => {
    try {
      const prices = dynamicPrices
        .filter((item) => item.value)
        .map((item) => ({
          priceTypeId: item.id,
          price: parseFloat(item.value),
        }));

      const insurances = insuranceData
        .filter((item) => item.value)
        .map((item) => ({
          name: item.name,
          amount: parseFloat(item.value),
          insuranceCompanyId: item.id,
        }));

      const payload = {
        opTypeId: Number(id),
        operationName,
        operationCode,
        showTechnic: visibleInTechnicians,
        status: "ACTIVE",
        prices,
        insurances,
      };

      await create(payload);
      navigate(-1);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="addOperation-container">
      <div className="addOperation-form-section">
        <div className="addOperation-form-group">
          <label htmlFor="operationName">
            Əməliyyatın adı<span>*</span>
          </label>
          <input
            type="text"
            id="operationName"
            className="addOperation-input"
            value={operationName}
            onChange={(e) => setOperationName(e.target.value)}
          />
        </div>

        <div className="addOperation-form-group">
          <label htmlFor="operationCode">
            Əməliyyatın kodu<span>*</span>
          </label>
          <input
            type="text"
            id="operationCode"
            className="addOperation-input"
            value={operationCode}
            onChange={(e) => setOperationCode(e.target.value)}
          />
        </div>

        <div className="addOperation-form-group-prices">
          <label>Qiymətləri</label>
          <div className="addOperation-price-inputs">
            {dynamicPrices.map((price, index) => (
              <div className="addOperation-price-input-group" key={price.id}>
                <label htmlFor={`price-${price.id}`}>{price.name}</label>
                <input
                  type="text"
                  id={`price-${price.id}`}
                  className="addOperation-price-input"
                  placeholder="Qiymət"
                  value={price.value}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="addOperation-form-group-tech">
          <label htmlFor="visibleInTechnicians">
            Texniklarda görünsün<span>*</span>
          </label>
          <input
            type="checkbox"
            id="visibleInTechnicians"
            className="addOperation-checkbox"
            checked={visibleInTechnicians}
            onChange={(e) => setVisibleInTechnicians(e.target.checked)}
          />
        </div>

        <div className="addOperation-insurance-section">
          {insuranceData.map((insurance, index) => (
            <div className="addOperation-insurance-item" key={insurance.id}>
              <label className="addOperation-insurance-label">
                {insurance.name}
              </label>
              <div className="addOperation-insurance-input-group">
                <input
                  type="number"
                  className="addOperation-insurance-input"
                  placeholder="Məbləğ"
                  value={insurance.value}
                  onChange={(e) => handleInsuranceChange(index, e.target.value)}
                />
                <span className="addOperation-currency-symbol">
                  <FaManatSign />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="addOperation-buttons">
          <button className="addOperation-cancel-button" onClick={handleCancel}>
            <MdClose /> İmtina et
          </button>
          <button className="addOperation-save-button" onClick={handleSave}>
            <FaRegSave /> Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOperation;
