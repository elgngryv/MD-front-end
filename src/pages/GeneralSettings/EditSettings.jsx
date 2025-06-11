import React, { useState } from "react";
import "../../assets/style/GeneralSettings/editsettings.css";

const EditSettings = () => {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("23:00");
  const [interval, setInterval] = useState("15");
  const [diagnosisItems, setDiagnosisItems] = useState(["Müayinə", "14"]);
  const [labItems, setLabItems] = useState(["Endodontiya - 1Perio lateral"]);

  const removeItem = (type, index) => {
    if (type === "diagnosis") {
      setDiagnosisItems(diagnosisItems.filter((_, i) => i !== index));
    } else {
      setLabItems(labItems.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="editGeneralSettingsWrapper">
        <div className="editSettings-container">
        <div className="editSettings-row">
            <label className="editSettings-label">Təqvim: Başlama saatı</label>
            <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="editSettings-input"
            />
        </div>

        <div className="editSettings-row">
            <label className="editSettings-label">Təqvim: Bitış saatı</label>
            <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="editSettings-input"
            />
        </div>

        <div className="editSettings-row">
            <label className="editSettings-label">Təqvim: Interval (dəqiqə)</label>
            <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="editSettings-input"
            />
        </div>

        <div className="editSettings-row">
            <label className="editSettings-label">Diaqnoz üçün müayinələr</label>
            <div className="editSettings-tags">
            {diagnosisItems.map((item, index) => (
                <span key={index} className="editSettings-tag">
                {item}
                <button
                    onClick={() => removeItem("diagnosis", index)}
                    className="editSettings-remove"
                >
                    ✕
                </button>
                </span>
            ))}
            </div>
        </div>

        <div className="editSettings-row">
            <label className="editSettings-label">Laboratoriya üçün əməliyyatlar</label>
            <div className="editSettings-tags">
            {labItems.map((item, index) => (
                <span key={index} className="editSettings-tag">
                {item}
                <button
                    onClick={() => removeItem("lab", index)}
                    className="editSettings-remove"
                >
                    ✕
                </button>
                </span>
            ))}
            </div>
        </div>

        <div className="editSettings-actions">
            <button className="editSettings-cancel">İmtina et</button>
            <button className="editSettings-save">Yadda saxla</button>
        </div>
        </div>
    </div>
  );
};

export default EditSettings;
