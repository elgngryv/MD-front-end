// StockOrderEdit.jsx

import { useState, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ListWithSubtotal from "../../components/list/ListwithSubtotal";
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/delete";
import { useNavigate, useParams } from "react-router-dom";
import MultiFileForm from "../../components/MultiFileForm";
import axios from "axios";
import useOrdersFromWarehouseStore from "../../../stores/orderFromWarehouseStore";
import "../../assets/style/StockOrder/stockorderedit.css";

const API_BASE_URL = "http://159.89.3.81:5555/api/v1";

const StockOrderEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();
  const { createOrder } = useOrdersFromWarehouseStore();

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    category: "",
    name: "",
    quantity: "",
    price: "",
    warehouseEntryId: "",
    warehouseEntryProductId: "",
    warehouseEntryProductName: "",
  });
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [warehouseEntries, setWarehouseEntries] = useState([]);
  const [warehouseEntryProducts, setWarehouseEntryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEntryProducts, setIsLoadingEntryProducts] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const mode = "edit";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${API_BASE_URL}/product-category/read`
        );
        setCategories(
          categoriesResponse.data.map((cat) => ({
            value: cat.id,
            label: cat.name || cat.categoryName,
          }))
        );

        const productsResponse = await axios.get(
          `${API_BASE_URL}/product/read`
        );
        setProductsByCategory(
          productsResponse.data.map((prod) => ({
            value: prod.id,
            label: prod.name || prod.productName,
            categoryId: prod.categoryId || prod.productCategoryId,
            price: prod.price,
          }))
        );

        const warehouseEntriesResponse = await axios.get(
          `${API_BASE_URL}/warehouse-entry/read`
        );
        setWarehouseEntries(
          warehouseEntriesResponse.data.map((entry) => ({
            value: entry.id,
            label: `Anbar girişi #${entry.id} - ${entry.date || "Tarixsiz"}`,
          }))
        );

        if (mode === "edit" && id) {
          const orderResponse = await axios.get(
            `${API_BASE_URL}/order-from-warehouse/info/${id}`
          );
          const orderData = orderResponse.data;

          setValue("orderDate", orderData.date);
          setValue("orderTime", orderData.time);
          setValue("room", orderData.room);
          setValue("note", orderData.description);

          if (
            Array.isArray(orderData.orderFromWarehouseProductRequests) &&
            orderData.orderFromWarehouseProductRequests.length > 0
          ) {
            const formattedProducts =
              orderData.orderFromWarehouseProductRequests.map((item) => {
                const categoryObj = categories.find(
                  (c) => c.value === item.categoryId
                );
                const productObj = productsByCategory.find(
                  (p) => p.value === item.productId
                );

                return {
                  id: Date.now() + Math.random(),
                  category: item.categoryId,
                  name: item.productId,
                  quantity: item.quantity,
                  price: productObj?.price || 0,
                  warehouseEntryId: item.warehouseEntryId,
                  warehouseEntryProductId: item.warehouseEntryProductId,
                  categoryName: categoryObj?.label || "",
                  productName: productObj?.label || "",
                };
              });

            setProducts(formattedProducts);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(
          "Məlumatları yükləyərkən xəta baş verdi: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  useEffect(() => {
    reset();
    setProducts([]);
  }, [reset]);

  const handleProductChange = (field, value) => {
    setCurrentProduct((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "category" ? { name: "" } : {}),
    }));
  };

  const fetchWarehouseEntryProducts = async (warehouseEntryId) => {
    setIsLoadingEntryProducts(true);
    try {
      const infoResponse = await axios.get(
        `${API_BASE_URL}/warehouse-entry/info/${warehouseEntryId}`
      );
      if (
        infoResponse.data &&
        Array.isArray(infoResponse.data.warehouseEntryProducts) &&
        infoResponse.data.warehouseEntryProducts.length > 0
      ) {
        return infoResponse.data.warehouseEntryProducts.map((product) => ({
          id: product.id,
          value: product.id,
          label: `${product.productName || "Məhsul"} (ID: ${product.id})`,
          productId: product.productId,
          categoryId: product.categoryId,
          quantity: product.quantity,
          price: product.price,
        }));
      }

      const fallbackResponse = await axios.get(
        `${API_BASE_URL}/warehouse-entry-product/read-by-warehouse-entry/${warehouseEntryId}`
      );
      if (
        Array.isArray(fallbackResponse.data) &&
        fallbackResponse.data.length > 0
      ) {
        return fallbackResponse.data.map((product) => ({
          id: product.id,
          value: product.id,
          label: `${product.productName || "Məhsul"} (ID: ${product.id})`,
          productId: product.productId,
          categoryId: product.categoryId,
          quantity: product.quantity,
          price: product.price,
        }));
      }

      const allProductsResponse = await axios.get(
        `${API_BASE_URL}/warehouse-entry-product/read`
      );
      const filtered = allProductsResponse.data.filter(
        (p) => p.warehouseEntryId === warehouseEntryId
      );
      if (filtered.length > 0) {
        return filtered.map((product) => ({
          id: product.id,
          value: product.id,
          label: `${product.productName || "Məhsul"} (ID: ${product.id})`,
          productId: product.productId,
          categoryId: product.categoryId,
          quantity: product.quantity,
          price: product.price,
        }));
      }

      const productsApiResponse = await axios.get(
        `${API_BASE_URL}/product/read`
      );
      if (
        Array.isArray(productsApiResponse.data) &&
        productsApiResponse.data.length > 0
      ) {
        return productsApiResponse.data.map((prod) => ({
          id: `${warehouseEntryId}-${prod.id}`,
          value: `${warehouseEntryId}-${prod.id}`,
          label: `${prod.productName} (Anbar: ${warehouseEntryId})`,
          productId: prod.id,
          categoryId: prod.categoryId,
          quantity: 100,
          price: prod.price || 10,
        }));
      }

      return [];
    } catch (error) {
      console.error("Error fetching warehouse entry products:", error);
      return [];
    } finally {
      setIsLoadingEntryProducts(false);
    }
  };

  const handleWarehouseEntryChange = async (option) => {
    try {
      const warehouseEntryId = option.value;
      handleProductChange("warehouseEntryId", warehouseEntryId);
      handleProductChange("warehouseEntryProductId", "");

      const entryProducts = await fetchWarehouseEntryProducts(
        warehouseEntryId
      );
      setWarehouseEntryProducts(entryProducts);

      if (entryProducts.length === 0) {
        alert("Bu anbar girişi üçün məhsul tapılmadı!");
      }
    } catch (error) {
      console.error("Error handling warehouse entry change:", error);
      setWarehouseEntryProducts([]);
      alert(
        "Anbar girişi məlumatlarını yükləyərkən xəta baş verdi: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleWarehouseEntryProductChange = (option) => {
    const entryProduct = warehouseEntryProducts.find(
      (p) => p.value === option.value
    );
    if (entryProduct) {
      handleProductChange("warehouseEntryProductId", option.value);
      if (entryProduct.categoryId && entryProduct.productId) {
        handleProductChange("category", entryProduct.categoryId);
        handleProductChange("name", entryProduct.productId);
      }
      if (entryProduct.price) {
        handleProductChange("price", entryProduct.price);
      }
    }
  };

  const handleAddProduct = () => {
    if (
      currentProduct.warehouseEntryId &&
      currentProduct.warehouseEntryProductId &&
      currentProduct.quantity
    ) {
      const selectedWarehouseEntryProduct = warehouseEntryProducts.find(
        (prod) => prod.value === currentProduct.warehouseEntryProductId
      );
      if (!selectedWarehouseEntryProduct) {
        alert("Seçilmiş anbar məhsulu tapılmadı. Zəhmət olmasa yenidən seçin.");
        return;
      }

      const categoryId =
        currentProduct.category || selectedWarehouseEntryProduct.categoryId;
      const productId =
        currentProduct.name || selectedWarehouseEntryProduct.productId;

      const selectedCategory = categories.find(
        (c) => c.value === categoryId
      );
      const selectedProduct = productsByCategory.find(
        (p) => p.value === productId
      );

      const newProduct = {
        id: Date.now(),
        category: categoryId,
        name: productId,
        quantity: currentProduct.quantity,
        price:
          currentProduct.price ||
          selectedWarehouseEntryProduct.price ||
          0,
        categoryName: selectedCategory?.label || "Unknown Category",
        productName: selectedProduct?.label || "Unknown Product",
        warehouseEntryId: currentProduct.warehouseEntryId,
        warehouseEntryProductId:
          currentProduct.warehouseEntryProductId,
        warehouseEntryProductName:
          selectedWarehouseEntryProduct?.label ||
          `Anbar məhsulu (ID: ${currentProduct.warehouseEntryProductId})`,
      };

      setProducts((prev) => [...prev, newProduct]);
      setCurrentProduct({
        category: "",
        name: "",
        quantity: "",
        price: "",
        warehouseEntryId: "",
        warehouseEntryProductId: "",
        warehouseEntryProductName: "",
      });
      setWarehouseEntryProducts([]);
    } else {
      alert(
        "Zəhmət olmasa anbar girişini, anbar məhsulunu və miqdarı daxil edin"
      );
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      let timeString = "00:00:00";
      if (data.orderTime) {
        const [hour, minute] = data.orderTime.split(":");
        timeString = `${hour.padStart(2, "0")}:${minute.padStart(
          2,
          "0"
        )}:00`;
      }

      const invalidProducts = products.filter(
        (p) => !p.warehouseEntryProductId
      );
      if (invalidProducts.length > 0) {
        alert(
          "Bəzi məhsulların anbar məhsulu ID-si yoxdur. Zəhmət olmasa məhsulları yenidən əlavə edin."
        );
        setIsSubmitting(false);
        return;
      }

      if (products.length === 0) {
        alert("Zəhmət olmasa ən azı bir məhsul əlavə edin.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        date: data.orderDate,
        time: timeString,
        room: data.room,
        orderFromWarehouseProductRequests: products.map((p) => ({
          warehouseEntryId: Number.parseInt(p.warehouseEntryId, 10),
          warehouseEntryProductId: Number.parseInt(
            p.warehouseEntryProductId,
            10
          ),
          categoryId: Number.parseInt(p.category, 10),
          productId: Number.parseInt(p.name, 10),
          quantity: Number.parseInt(p.quantity, 10),
        })),
        description: data.note,
      };

      console.log("Sending payload:", payload);
      setDebugInfo(JSON.stringify(payload, null, 2));

      const apiUrl = `${API_BASE_URL}/order-from-warehouse/update/${id}`;
      const response = await axios.put(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Başarılı cavab:", response.data);
      setApiResponse(JSON.stringify(response.data, null, 2));
      alert("Sifariş uğurla yeniləndi!");
      navigate("/stock/order");
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      let errorMessage = "Xəta baş verdi: ";
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Naməlum xəta";
      }
      if (error.response?.status === 404) {
        errorMessage +=
          "\nAPI endpoint tapılmadı. Zəhmət olmasa API endpoint-in düzgün olduğunu yoxlayın.";
      }
      alert(errorMessage);
      setApiResponse(
        JSON.stringify(error.response?.data || error.message, null, 2)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFilteredProducts = () => {
    if (!currentProduct.category) return productsByCategory;
    return productsByCategory.filter(
      (product) => product.categoryId === currentProduct.category
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setCurrentProduct({
      category: product.category,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      warehouseEntryId: product.warehouseEntryId,
      warehouseEntryProductId: product.warehouseEntryProductId,
      warehouseEntryProductName: product.warehouseEntryProductName,
    });

    if (product.warehouseEntryId) {
      fetchWarehouseEntryProducts(product.warehouseEntryId)
        .then((entryProducts) => {
          setWarehouseEntryProducts(entryProducts);
        })
        .catch((error) => {
          console.error("Error fetching warehouse entry products:", error);
        });
    }

    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleDelete = async () => {
    if (window.confirm("Bu sifarişi silmək istədiyinizə əminsiniz?")) {
      try {
        await axios.delete(
          `${API_BASE_URL}/order-from-warehouse/delete/${id}`
        );
        alert("Sifariş uğurla silindi!");
        navigate("/orders");
      } catch (error) {
        console.error("Silinmə zamanı xəta:", error);
        alert(
          "Silinmə zamanı xəta baş verdi: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="stockOrderFormWrapper__loading">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="stockOrderFormWrapper__spinner"
        />
        <span className="stockOrderFormWrapper__loadingText">
          Yüklənir...
        </span>
      </div>
    );
  }

  return (
    <div className="stockOrderFormWrapper">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="stockOrderFormWrapper__form"
      >
        <div className="stockOrderFormWrapper__row">
          <label
            htmlFor="orderDate"
            className="stockOrderFormWrapper__label"
          >
            Sifariş tarixi{" "}
            <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <input
              id="orderDate"
              type="date"
              {...register("orderDate", { required: true })}
              readOnly={mode === "view"}
              className="stockOrderFormWrapper__input"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label
            htmlFor="orderTime"
            className="stockOrderFormWrapper__label"
          >
            Saat{" "}
            <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <input
              id="orderTime"
              type="time"
              {...register("orderTime", { required: true })}
              readOnly={mode === "view"}
              className="stockOrderFormWrapper__input"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label htmlFor="room" className="stockOrderFormWrapper__label">
            Otaq{" "}
            <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <input
              id="room"
              type="text"
              {...register("room", { required: true })}
              readOnly={mode === "view"}
              className="stockOrderFormWrapper__input"
            />
          </div>
        </div>

        <div className="stockOrderFormWrapper__row">
          <label htmlFor="note" className="stockOrderFormWrapper__label">
            Qeyd{" "}
            <span className="stockOrderFormWrapper__required">*</span>
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <textarea
              id="note"
              {...register("note", { required: true })}
              readOnly={mode === "view"}
              className="stockOrderFormWrapper__textarea"
            />
          </div>
        </div>

        {mode !== "view" && (
          <div className="stockOrderFormWrapper__productsSection">
            <div className="stockOrderFormWrapper__row">
              <label className="stockOrderFormWrapper__label">
                Məhsullar
              </label>
              <div className="stockOrderFormWrapper__productsControls">
                <div
                  className="stockOrderFormWrapper__fieldGroup"
                  style={{ minWidth: "200px" }}
                >
                  <label className="stockOrderFormWrapper__labelSmall">
                    Anbar girişi{" "}
                    <span className="stockOrderFormWrapper__required">
                      *
                    </span>
                  </label>
                  <CustomDropdown
                    value={warehouseEntries.find(
                      (entry) =>
                        entry.value ===
                        currentProduct.warehouseEntryId
                    )}
                    onChange={handleWarehouseEntryChange}
                    options={warehouseEntries}
                    placeholder="Anbar girişi seçin"
                    className="stockOrderFormWrapper__dropdown"
                  />
                </div>

                {isLoadingEntryProducts ? (
                  <div className="stockOrderFormWrapper__fieldGroup">
                    <label className="stockOrderFormWrapper__labelSmall">
                      Anbar məhsulu
                    </label>
                    <div className="stockOrderFormWrapper__loadingSmall">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className="stockOrderFormWrapper__spinnerSmall"
                      />
                      <span className="stockOrderFormWrapper__loadingTextSmall">
                        Yüklənir...
                      </span>
                    </div>
                  </div>
                ) : warehouseEntryProducts.length > 0 ? (
                  <div className="stockOrderFormWrapper__fieldGroup">
                    <label className="stockOrderFormWrapper__labelSmall">
                      Anbar məhsulu{" "}
                      <span className="stockOrderFormWrapper__required">
                        *
                      </span>
                    </label>
                    <CustomDropdown
                      value={warehouseEntryProducts.find(
                        (product) =>
                          product.value ===
                          currentProduct.warehouseEntryProductId
                      )}
                      onChange={handleWarehouseEntryProductChange}
                      options={warehouseEntryProducts}
                      placeholder="Anbar məhsulu seçin"
                      className="stockOrderFormWrapper__dropdown"
                    />
                  </div>
                ) : currentProduct.warehouseEntryId ? (
                  <div className="stockOrderFormWrapper__fieldGroup">
                    <label className="stockOrderFormWrapper__labelSmall">
                      Anbar məhsulu
                    </label>
                    <div className="stockOrderFormWrapper__noProducts">
                      Bu anbar girişi üçün məhsul tapılmadı!
                    </div>
                  </div>
                ) : null}

                <div className="stockOrderFormWrapper__fieldGroup">
                  <label className="stockOrderFormWrapper__labelSmall">
                    Miqdar{" "}
                    <span className="stockOrderFormWrapper__required">
                      *
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={currentProduct.quantity}
                    onChange={(e) =>
                      handleProductChange(
                        "quantity",
                        e.target.value
                      )
                    }
                    className="stockOrderFormWrapper__inputSmall"
                  />
                </div>

                <div className="stockOrderFormWrapper__fieldGroup">
                  <label className="stockOrderFormWrapper__labelSmall">
                    &nbsp;
                  </label>
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    disabled={
                      !currentProduct.warehouseEntryId ||
                      !currentProduct.warehouseEntryProductId ||
                      !currentProduct.quantity
                    }
                    className="stockOrderFormWrapper__buttonAdd"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Məhsul əlavə et
                  </button>
                </div>
              </div>
            </div>

            <div className="stockOrderFormWrapper__row stockOrderFormWrapper__tableRow">
              <ListWithSubtotal
                columns={[
                  { key: "categoryName", label: "Kategoriya" },
                  { key: "productName", label: "Məhsul" },
                  { key: "quantity", label: "Miqdar" },
                  { key: "price", label: "Qiymət" },
                  {
                    key: "warehouseEntryProductName",
                    label: "Anbar məhsulu",
                  },
                ]}
                data={products}
                subtotalColumns={["price"]}
                enableEdit={mode !== "view"}
                enableDelete={mode !== "view"}
                handleEdit={handleEditProduct}
                handleDelete={handleDeleteProduct}
                className="stockOrderFormWrapper__list"
              />
            </div>
          </div>
        )}

        {apiResponse && (
          <div className="stockOrderFormWrapper__debug">
            <h3 className="stockOrderFormWrapper__debugTitle">
              API Cavabı:
            </h3>
            <pre className="stockOrderFormWrapper__debugPre">
              {apiResponse}
            </pre>
          </div>
        )}

        <div className="stockOrderFormWrapper__row">
          <label className="stockOrderFormWrapper__label">
            Sənədlər
          </label>
          <div className="stockOrderFormWrapper__inputContainer">
            <MultiFileForm mode={mode} />
          </div>
        </div>

        {mode !== "view" && (
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
        )}
      </form>
        </div>
    );
};

export default StockOrderEdit;
