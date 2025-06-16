import React, { useState } from 'react';
import '../../assets/style/Operations/editoperation.css';
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FaManatSign } from "react-icons/fa6"; // Used for Manat symbol

const EditOperation = () => {
  const navigate = useNavigate();

  const [operationName, setOperationName] = useState('Şift titan(Antijor)');
  const [operationCode, setOperationCode] = useState('49');
  const [standardPrice, setStandardPrice] = useState('20.00');
  const [vip1Price, setVip1Price] = useState('');
  const [vip2Price, setVip2Price] = useState('');
  const [vip3Price, setVip3Price] = useState('');
  const [visibleInTechnicians, setVisibleInTechnicians] = useState(false);
  const [insuranceData, setInsuranceData] = useState([
    { name: 'A Sığorta', value: '' },
    { name: 'A-Group Sığorta', value: '' },
    { name: 'ABC Sığorta', value: '' },
    { name: 'ATA Sığorta', value: '' },
    { name: 'Ataşgah Sığorta', value: '' },
    { name: 'Meqa Sığorta', value: '' },
    { name: 'PAŞA Sığorta', value: '' },
    { name: 'Sənaye Sığorta', value: '' },
  ]);

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSave = () => {
    // Implement save logic here
    console.log({
      operationName,
      operationCode,
      standardPrice,
      vip1Price,
      vip2Price,
      vip3Price,
      visibleInTechnicians,
      insuranceData,
    });
    // After saving, navigate back or to a confirmation page
    // navigate('/operations');
  };

  const handleInsuranceChange = (index, value) => {
    const newInsuranceData = [...insuranceData];
    newInsuranceData[index].value = value;
    setInsuranceData(newInsuranceData);
  };

  return (
    <div className="editOperation-container">
      <div className="editOperation-form-section">
        <div className="editOperation-form-group">
          <label htmlFor="operationName">Əməliyyatın adı <span>*</span></label>
          <input
            type="text"
            id="operationName"
            className="editOperation-input"
            value={operationName}
            onChange={(e) => setOperationName(e.target.value)}
          />
        </div>

        <div className="editOperation-form-group">
          <label htmlFor="operationCode">Əməliyyatın kodu <span>*</span></label>
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
            <div className="editOperation-price-input-group">
              <label htmlFor="standardPrice">Standart</label>
              <input
                type="text"
                id="standardPrice"
                className="editOperation-price-input"
                value={standardPrice}
                onChange={(e) => setStandardPrice(e.target.value)}
              />
            </div>
            <div className="editOperation-price-input-group">
              <label htmlFor="vip1Price">VIP1</label>
              <input
                type="text"
                id="vip1Price"
                className="editOperation-price-input"
                placeholder="Qiymət"
                value={vip1Price}
                onChange={(e) => setVip1Price(e.target.value)}
              />
            </div>
            <div className="editOperation-price-input-group">
              <label htmlFor="vip2Price">VIP2</label>
              <input
                type="text"
                id="vip2Price"
                className="editOperation-price-input"
                placeholder="Qiymət"
                value={vip2Price}
                onChange={(e) => setVip2Price(e.target.value)}
              />
            </div>
            <div className="editOperation-price-input-group">
              <label htmlFor="vip3Price">VIP3</label>
              <input
                type="text"
                id="vip3Price"
                className="editOperation-price-input"
                placeholder="Qiymət"
                value={vip3Price}
                onChange={(e) => setVip3Price(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="editOperation-form-group-tech editOperation-checkbox-group">
          <label htmlFor="visibleInTechnicians">Texniklarda görünsün <span>*</span></label>
          <input
            type="checkbox"
            id="visibleInTechnicians"
            className="editOperation-checkbox"
            checked={visibleInTechnicians}
            onChange={(e) => setVisibleInTechnicians(e.target.checked)}
          />
        </div>

        <div className="editOperation-insurance-section">
          {insuranceData.map((insurance, index) => (
            <div className="editOperation-insurance-item" key={index}>
              <label className="editOperation-insurance-label">{insurance.name}</label>
              <div className="editOperation-insurance-input-group">
                <input
                  type="number"
                  className="editOperation-insurance-input"
                  placeholder="Adı"
                  value={insurance.value}
                  onChange={(e) => handleInsuranceChange(index, e.target.value)}
                />
                <span className="editOperation-currency-symbol"><FaManatSign /></span>
              </div>
            </div>
          ))}
        </div>

        <div className="editOperation-buttons">
          <button className="editOperation-cancel-button" onClick={handleCancel}>
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