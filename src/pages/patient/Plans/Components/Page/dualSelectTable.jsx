import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";

const DualSelectTable = () => {
  // 🔹 Kateqoriyalar (statik — gələcəkdə API-dən gələcək)
  const [categories] = useState([
    { id: 1, code: "CAT001", name: "Navigation Oneee" },
    { id: 2, code: "CAT002", name: "Navigation Two" },
    { id: 3, code: "CAT003", name: "Navigation Three" },
    { id: 4, code: "CAT004", name: "Navigation Four" },
  ]);

  // 🔹 Əməliyyatlar (statik — gələcəkdə API-dən gələcək)
  const [actions] = useState([
    { id: 11, code: "ACT001", name: "Operation One" },
    { id: 12, code: "ACT002", name: "Operation Two" },
    { id: 13, code: "ACT003", name: "Operation Three" },
    { id: 14, code: "ACT004", name: "Operation Four" },
  ]);

  // 🔹 Seçilənlər
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedAction, setSelectedAction] = useState([]);

  // 🔹 İlk kateqoriya default aktiv olsun
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory([categories[0].id]);
    }
  }, [categories]);

  // 🔹 Stil (sadə table görünüşü üçün)
  const containerStyle = {
    // border: "1px solid #e5e5e5",
    display: "flex",
    width: 500,
  };

  const columnHeaderStyle = {
    padding: "8px 12px",
    borderBottom: "1px solid #e5e5e5",
    fontWeight: 500,
  };

  const columnContentStyle = {
    padding: "8px 12px",
  };

  return (
    <div style={containerStyle}>
      {/* 🔸 Sol tərəf - Kateqoriyalar */}
      <div style={{ flex: 1, borderRight: "1px solid #e5e5e5" }}>
        <div style={columnHeaderStyle}>Kateqoriyalar</div>
        <div style={columnContentStyle}>
          {categories.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <Checkbox
                checked={selectedCategory.includes(item.id)}
                onChange={() => setSelectedCategory([item.id])} // yalnız bir aktiv
              >
                {item.name}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      {/* 🔸 Sağ tərəf - Əməliyyatlar */}
      <div style={{ flex: 1 ,borderRight: "1px solid #e5e5e5",}}>
        <div style={columnHeaderStyle}>Əməliyyatlar ₼</div>
        <div style={columnContentStyle}>
          {actions.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <Checkbox
                checked={selectedAction.includes(item.id)}
                onChange={() => setSelectedAction([item.id])} // yalnız bir seçilə bilər
              >
                {item.name}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DualSelectTable;
