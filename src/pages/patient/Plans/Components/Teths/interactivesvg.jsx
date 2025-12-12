import React, { useState } from "react";

const InteractiveSVG = ({
  data = [],
  categoryCode = null,   // 🔥 Yeni
  width = 110,
  height = 110,
  viewBox = "0 0 150 150",
  defaultColor = "#D1D5DB",
  hoverColor = "#2563EB",
  activeColor = "#1E3A8A",
}) => {

  const [hoveredPathId, setHoveredPathId] = useState(null);
  const [selectedToaths, setSelectedToaths] = useState([]);

  const handlePathClick = (toath, path) => {
    if (!path.isClickable) return;

    setSelectedToaths((prev) => {
      const existing = prev.find((t) => t.toathNumber === toath.toathNumber);

      if (existing) {
        // Aynı toath zaten varsa
        const alreadySelected = existing.pathIds.includes(path.id);
        const updatedPathIds = alreadySelected
          ? existing.pathIds.filter((id) => id !== path.id)
          : [...existing.pathIds, path.id];

        // Eğer toath içindeki pathler tamamen boşaldıysa, toath'ı listeden çıkar
        if (updatedPathIds.length === 0) {
          return prev.filter((t) => t.toathNumber !== toath.toathNumber);
        }

        return prev.map((t) =>
          t.toathNumber === toath.toathNumber
            ? { ...t, pathIds: updatedPathIds }
            : t
        );
      } else {
        // toath ilk defa seçiliyorsa
        return [...prev, { toathNumber: toath.toathNumber, pathIds: [path.id] }];
      }
    });
  };

  const sortToaths = (toaths = []) =>
    [...toaths].sort((a, b) => a.priority - b.priority);

  // categoryCode null ise hiçbir diş gösterilmesin
  if (categoryCode === null || categoryCode === undefined) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-gray-400">
        <p>Əməliyyat seçin</p>
      </div>
    );
  }

  // categoryCode'a göre dişleri filtrele
  const filteredCategories = data.flatMap((section) =>
    section.categorys?.filter((cat) => cat.categoryCode === categoryCode) || []
  );

  // Eğer categoryCode var ama o koda ait diş yoksa
  if (filteredCategories.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-gray-400">
        <p>Bu əməliyyata uyğun diş tapılmadı</p>
      </div>
    );
  }

  // Dişlerin toplam sayısını kontrol et
  const totalToaths = filteredCategories.reduce(
    (sum, cat) => sum + (cat.toaths?.length || 0),
    0
  );

  if (totalToaths === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px] text-gray-400">
        <p>Bu əməliyyata uyğun diş tapılmadı</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {data.map((section) =>
        section.categorys
          ?.filter((cat) => cat.categoryCode === categoryCode)
          .map((cat) =>
            sortToaths(cat.toaths)?.map((toath) => {

              // o toath için seçilmiş path id’lerini tapır
              const selectedPathIds =
                selectedToaths.find((t) => t.toathNumber === toath.toathNumber)
                  ?.pathIds || [];

              return (
                <div key={toath.id} className="text-center">
                  {/* SVG */}
                  <div className="relative inline-block">
                    <svg
                      width={width}
                      height={height}
                      viewBox={viewBox}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {toath.paths?.map((path) => {
                        const isSelected = selectedPathIds.includes(path.id);
                        const isHovered = hoveredPathId === path.id;

                        const fillColor = isSelected
                          ? activeColor
                          : isHovered
                            ? hoverColor
                            : path.fill || defaultColor;

                        return (
                          <path
                            key={path.id}
                            d={path.path}
                            fill={fillColor}
                            stroke="#697586"
                            strokeWidth="0.5"
                            style={{
                              cursor: path.isClickable ? "pointer" : "default",
                              transition: "fill 0.25s ease",
                            }}
                            onClick={() => handlePathClick(toath, path)}
                            onMouseEnter={() =>
                              path.isClickable && setHoveredPathId(path.id)
                            }
                            onMouseLeave={() => setHoveredPathId(null)}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Diş nömrəsi */}
                  <h2 className="mt-2 text-sm font-semibold text-gray-700">
                    {toath.toathNumber}
                  </h2>
                </div>
              );
            })
          )
      )}

      {/* Debug panel */}
      {selectedToaths.length > 0 && (
        <pre className="mt-4 bg-gray-100 p-2 rounded text-xs text-left">
          {JSON.stringify(selectedToaths, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default InteractiveSVG;
