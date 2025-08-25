import React, { useEffect, useState } from "react";
import StockDeleteForm from "../../components/StockDeleteForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import useWarehouseDeletionStore from "../../../stores/warehouseDeletionStore.js";

const StockDeleteDetail = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    fetchDeletionById,
    updateDeletion,
    selectedDeletion,
    loading: storeLoading,
    error,
  } = useWarehouseDeletionStore();

  useEffect(() => {
    if (mode === "edit" && id) {
      fetchDeletionById(id);
    } else {
      setLoading(false);
    }
  }, [mode, id, fetchDeletionById]);

  useEffect(() => {
    if (mode === "edit" && selectedDeletion) {
      // API-dən gələn məlumatı formata uyğunlaşdır
      // products əvvəlcə yoxlayırıq və default [] istifadə edirik
      const products = selectedDeletion.products || [];
      const formattedData = {
        deletionFromWarehouseId: selectedDeletion.id,
        date: selectedDeletion.date,
        time: selectedDeletion.time || {
          hour: 0,
          minute: 0,
          second: 0,
          nano: 0,
        },
        description: selectedDeletion.description || "",
        deletionFromWarehouseProductRequests: products.map((product) => ({
          deletionFromWarehouseProductId: product.id || 0,
          warehouseEntryId: product.warehouseEntryId || 0,
          warehouseEntryProductId: product.warehouseEntryProductId || 0,
          productId: product.productId || 0,
          categoryId: product.categoryId || 0,
          quantity: product.quantity || 0,
        })),
      };
      setInitialData(formattedData);
      setLoading(false);
    }
  }, [selectedDeletion, mode]);

  const handleSubmit = async (formData) => {
    try {
      if (mode === "edit") {
        await updateDeletion(formData);
      }
      // After successful submission, navigate back to the list view
      navigate("/stock/delete");
    } catch (err) {
      console.error("Form göndərilərkən xəta baş verdi:", err);
    }
  };

  const handleCancel = () => {
    navigate("/stock/delete");
  };

  if ((mode === "edit" && loading) || storeLoading) {
    return <div>Yüklənir...</div>;
  }

  if (error && mode === "edit") {
    return <div>Xəta: {error}</div>;
  }

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Məhsul Silinməsinə Düzəliş" : "Məhsul Sil"}
      </h1>
      <StockDeleteForm
        initialData={initialData}
        mode={mode}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default StockDeleteDetail;
