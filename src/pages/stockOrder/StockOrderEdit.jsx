// StockOrderEdit.jsx

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ListWithSubtotal from "../../components/list/ListwithSubtotal";
import DeleteIcon from "../../assets/icons/Delete";
import { useNavigate, useParams } from "react-router-dom";
import MultiFileForm from "../../components/MultiFileForm";
import axios from "axios";
import useWorkerStore from "../../../stores/workerStore";
import useCalendarStore from "../../../stores/calendarStore";
import "../../assets/style/StockOrder/stockorderedit.css";

const API_BASE_URL = "http://62.84.178.128:5555/api/v1";

const StockOrderEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    orderDate: "",
    orderTime: "",
    room: null,
    personWhoPlacedOrder: "",
    orderNumber: "",
    note: "",
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { rooms, fetchRooms } = useCalendarStore();
  const { fetchWorkerById, selectedWorker } = useWorkerStore();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found in localStorage.");
      return {};
    }
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authHeaders = getAuthHeaders();
        if (Object.keys(authHeaders).length === 0) {
          setIsLoading(false);
          alert("Giriş tokeni tapılmadı. Zəhmət olmasa yenidən daxil olun.");
          navigate("/login");
          return;
        }

        await fetchRooms();
        const roomsData = useCalendarStore.getState().rooms;

        if (id) {
          const orderResponse = await axios.get(
            `${API_BASE_URL}/order-from-warehouse/info/${id}`,
            authHeaders
          );
          const orderData = orderResponse.data;

          let formattedTime = "";
          if (orderData.time) {
            if (typeof orderData.time === "object" && orderData.time !== null) {
              const hour = String(orderData.time.hour).padStart(2, "0");
              const minute = String(orderData.time.minute).padStart(2, "0");
              formattedTime = `${hour}:${minute}`;
            } else if (typeof orderData.time === "string" && orderData.time.length >= 5) {
              formattedTime = orderData.time.substring(0, 5);
            }
          }
          
          const roomToSet = roomsData.find((room) => room.cabinetName === orderData.cabinetName);
          
          setFormData(prev => ({
            ...prev,
            orderDate: orderData.date || "",
            orderTime: formattedTime || "",
            room: roomToSet ? roomToSet.id : null,
            orderNumber: orderData.number || "",
            note: orderData.description || "",
          }));
          
          if (orderData.personWhoPlacedOrderUUID) {
            await fetchWorkerById(orderData.personWhoPlacedOrderUUID);
          }

          if (orderData.orderFromWarehouseProductResponses?.length > 0) {
            const formattedProducts = orderData.orderFromWarehouseProductResponses.map((item) => {
              const unitPrice = item.price || 0;
              const totalPrice = item.quantity * unitPrice;

              return {
                id: item.id,
                category: item.categoryId,
                name: item.productId,
                quantity: item.quantity,
                price: unitPrice,
                totalPrice: totalPrice,
                categoryName: item.categoryName,
                productName: item.productName || item.productTitle,
                warehouseEntryId: item.warehouseEntryId,
                warehouseEntryProductId: item.warehouseEntryProductId,
                warehouseEntryProductName: item.warehouseEntryProductName || item.productName || item.productTitle,
              };
            });
            setProducts(formattedProducts);
          }
        }
      } catch (error) {
        console.error("Məlumatları gətirərkən xəta baş verdi:", error);
        let errorMessage = "Məlumatları yükləyərkən xəta baş verdi: ";
        if (error.response?.status === 401) {
          errorMessage += "Giriş səlahiyyəti yoxdur. Zəhmət olmasa yenidən daxil olun.";
          navigate("/login");
        } else {
          errorMessage += error.response?.data?.message || error.message;
        }
        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, navigate, fetchWorkerById, fetchRooms]);

  useEffect(() => {
    if (selectedWorker) {
      setFormData((prev) => ({
        ...prev,
        personWhoPlacedOrder: selectedWorker.name + " " + selectedWorker.surname || "",
      }));
    }
  }, [selectedWorker]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleRoomChange = (e) => {
    const selectedRoomId = e.target.value;
    setFormData((prev) => ({ ...prev, room: selectedRoomId }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      if (products.length === 0) {
        alert("Zəhmət olmasa ən azı bir məhsul əlavə edin.");
        setIsSubmitting(false);
        return;
      }

      const { orderDate, orderTime, room, orderNumber, note } = formData;
      if (!orderDate || !orderTime || !room || !orderNumber || !note) {
        alert("Zəhmət olmasa bütün tələb olunan sahələri doldurun.");
        setIsSubmitting(false);
        return;
      }

      let timeString = "00:00:00";
      if (orderTime) {
        const [hour, minute] = orderTime.split(":");
        timeString = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
      }
      
      const payload = {
        id: Number(id),
        date: orderDate,
        time: timeString,
        cabinetName: room,
        personWhoPlacedOrderUUID: selectedWorker?.uuid,
        orderNumber: Number(orderNumber),
        description: note,
        orderFromWarehouseProductRequests: products.map((p) => ({
          warehouseEntryId: Number(p.warehouseEntryId),
          warehouseEntryProductId: Number(p.warehouseEntryProductId),
          categoryId: Number(p.category),
          productId: Number(p.name),
          quantity: Number(p.quantity),
        })),
      };

      console.log("Göndərilən məlumat (Payload):", payload);

      const authHeaders = getAuthHeaders();
      const response = await axios.put(
        `${API_BASE_URL}/order-from-warehouse/update`,
        payload,
        authHeaders
      );

      console.log("API cavabı:", response.data);
      
      alert("Sifariş uğurla yeniləndi!");
      navigate("/stock/order");
      
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      console.error("Xəta detalı:", error.response?.data || error.message);
      
      let errorMessage = "Xəta baş verdi: ";
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bu sifarişi silmək istədiyinizə əminsiniz?")) {
      try {
        const authHeaders = getAuthHeaders();
        if (Object.keys(authHeaders).length === 0) {
          alert("Giriş tokeni tapılmadı. Zəhmət olmasa yenidən daxil olun.");
          navigate("/login");
          return;
        }

        await axios.delete(`${API_BASE_URL}/order-from-warehouse/delete/${id}`, authHeaders);
        alert("Sifariş uğurla silindi!");
        navigate("/stock/order");
      } catch (error) {
        console.error("Silinmə zamanı xəta:", error);
        let errorMessage = "Silinmə zamanı xəta baş verdi: ";
        if (error.response?.status === 401) {
          errorMessage += "Giriş səlahiyyəti yoxdur. Zəhmət olmasa yenidən daxil olun.";
          navigate("/login");
        } else {
          errorMessage += error.response?.data?.message || error.message;
        }
        alert(errorMessage);
      }
    }
  };

  const handleEditProduct = (productToEdit) => {
    alert("Məhsul redaktə funksiyası aktiv deyil. Zəhmət olmasa məhsulu silib yenidən əlavə edin.");
  };

  const handleDeleteProduct = (productToDelete) => {
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
  };

  if (isLoading) {
    return (
      <div className="stockOrderFormWrapper__loading">
        <FontAwesomeIcon icon={faSpinner} spin className="stockOrderFormWrapper__spinner" />
        <span className="stockOrderFormWrapper__loadingText">Yüklənir...</span>
      </div>
    );
  }

  return (
    <div className="stockOrderFormWrapper">
      <div className="stockOrderTopPartIcons">
        <button type="button" onClick={handleDelete} className="stockOrderTopPartIcons__link">
          <DeleteIcon className="stockOrderTopPartIcons__deleteIcon" />
        </button>
      </div>
      <form onSubmit={handleFormSubmit} className="stockOrderFormWrapper__form">
        <div className="stockOrderFormWrapper__row">
          <label htmlFor="orderDate" className="stockOrderFormWrapper__label">
            Sifariş tarixi <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <input
              id="orderDate"
              type="date"
              value={formData.orderDate}
              onChange={handleChange}
              className="stockOrderFormWrapper__input"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label htmlFor="orderTime" className="stockOrderFormWrapper__label">
            Saat <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <input
              id="orderTime"
              type="time"
              value={formData.orderTime}
              onChange={handleChange}
              className="stockOrderFormWrapper__input"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label htmlFor="room" className="stockOrderFormWrapper__label">
            Otaq <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <select
              id="room"
              value={formData.room || ""}
              onChange={handleRoomChange}
              className="stockOrderFormWrapper__input"
            >
              <option value="" disabled>Otaq seçin</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.cabinetName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label htmlFor="personWhoPlacedOrder" className="stockOrderFormWrapper__label">
            Sifariş verən <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <input
              id="personWhoPlacedOrder"
              type="text"
              value={formData.personWhoPlacedOrder}
              onChange={handleChange}
              className="stockOrderFormWrapper__input"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label htmlFor="orderNumber" className="stockOrderFormWrapper__label">
            Çeşid sayı <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <input
              id="orderNumber"
              type="text"
              value={formData.orderNumber}
              onChange={handleChange}
              className="stockOrderFormWrapper__input"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label htmlFor="note" className="stockOrderFormWrapper__label">
            Qeyd <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <textarea
              id="note"
              value={formData.note}
              onChange={handleChange}
              className="stockOrderFormWrapper__textarea"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__productsSection">
          <div className="stockOrderFormWrapper__row stockOrderFormWrapper__tableRow">
            <ListWithSubtotal
              columns={[
                { key: "categoryName", label: "Kategoriya" },
                { key: "productName", label: "Məhsul" },
                { key: "quantity", label: "Miqdar" },
                { key: "price", label: "Vahid qiymət" },
                { key: "totalPrice", label: "Ümumi qiymət" },
                { key: "warehouseEntryProductName", label: "Anbar məhsulu" },
              ]}
              data={products}
              subtotalColumns={["price", "totalPrice"]}
              enableEdit={true}
              enableDelete={true}
              handleEdit={handleEditProduct}
              handleDelete={handleDeleteProduct}
              className="stockOrderFormWrapper__list"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label className="stockOrderFormWrapper__label">Sənədlər</label>
          <div className="stockOrderFormWrapper__inputContainer">
            <MultiFileForm mode="edit" id={id} />
          </div>
        </div>

        <div className="stockOrderFormWrapper__actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="stockOrderFormWrapper__buttonCancel"
          >
            <FontAwesomeIcon icon={faXmark} />
            Ləğv et
          </button>
          <button
            type="submit"
            disabled={isSubmitting || products.length === 0}
            className="stockOrderFormWrapper__buttonSave"
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Göndərilir...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} />
                Yadda saxla
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockOrderEdit;