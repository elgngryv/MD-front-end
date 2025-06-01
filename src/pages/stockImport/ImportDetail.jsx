import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductCategoryStore } from "../../../stores/productCategories";
import { useProductStore } from "../../../stores/productStore";

const ImportDetail = () => {
  const { id } = useParams();
  const { fetchCategories, categories } = useProductCategoryStore();
  const { fetchProducts, products } = useProductStore();

  const [entryData, setEntryData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchProducts();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (products.length && categories.length) {
      fetchEntryDetail();
    }
  }, [products, categories]);

  const fetchEntryDetail = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/order-from-warehouse/info/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("API-dən düzgün cavab gəlmədi");

      const data = await res.json();

      const transformedData = {
        id: data.id || null,
        date: data.date || "",
        time: `${data.time?.hour?.toString().padStart(2, "0") || "00"}:${
          data.time?.minute?.toString().padStart(2, "0") || "00"
        }`,
        description: data.description || "",
        warehouseEntryProductUpdateRequests:
          data.orderFromWarehouseProductResponses.map((p) => {
            const product = products.find(
              (prod) => prod.productName === p.productName
            );
            const category = categories.find(
              (cat) => cat.categoryName === p.categoryName
            );

            return {
              warehouseEntryProductId: p.id || "",
              categoryId: category?.id || "",
              productId: product?.id || "",
              quantity: p.quantity || 0,
              price: p.price || 0,
            };
          }),
      };

      setEntryData(transformedData);
    } catch (err) {
      console.error("Məlumat yüklənmədi", err);
    }
  };

  if (!entryData)
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
        </div>
      </div>
    );

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Mədaxil Detalları (ID: {id})</h2>

      <div className="mb-4">
        <label className="block mb-1">Tarix:</label>
        <input
          type="date"
          value={entryData.date}
          disabled
          className="p-2 border rounded w-full bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Saat:</label>
        <input
          type="time"
          value={entryData.time}
          disabled
          className="p-2 border rounded w-full bg-gray-100"
        />
      </div>

      {entryData.warehouseEntryProductUpdateRequests.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
          <div className="mb-2">
            <label className="block mb-1">Kategoriya:</label>
            <select
              value={item.categoryId}
              disabled
              className="p-2 border rounded w-full bg-gray-100">
              <option disabled value="">
                Kategoriya seçin
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Məhsul:</label>
            <select
              value={item.productId}
              disabled
              className="p-2 border rounded w-full bg-gray-100">
              <option disabled value="">
                Məhsul seçin
              </option>
              {products
                .filter((p) => p.categoryId === item.categoryId)
                .map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.productName}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Say:</label>
            <input
              type="number"
              value={item.quantity}
              disabled
              className="p-2 border rounded w-full bg-gray-100"
            />
          </div>

          {/* <div>
            <label className="block mb-1">Qiymət:</label>
            <input
              type="number"
              value={item.price}
              disabled
              className="p-2 border rounded w-full bg-gray-100"
            />
          </div> */}
        </div>
      ))}

      <div className="mb-4">
        <label className="block mb-1">Qeyd:</label>
        <textarea
          value={entryData.description}
          disabled
          className="p-2 border rounded w-full bg-gray-100"
        />
      </div>
    </div>
  );
};

export default ImportDetail;
