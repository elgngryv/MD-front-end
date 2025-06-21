"use client";

import { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import ListWithSubtotal from "../components/list/ListwithSubtotal";
import EditIcon from "../assets/icons/Edit";
import DeleteIcon from "../assets/icons/delete";
import { useNavigate, useParams } from "react-router-dom";
import MultiFileForm from "./MultiFileForm";
import axios from "axios";
import useOrdersFromWarehouseStore from "../../stores/orderFromWarehouseStore";

const API_BASE_URL = "http://195.7.6.10:5555/api/v1/";

// Authenticated axios instance yaradın
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor - hər request-ə token əlavə edir
apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 xətası zamanı login səhifəsinə yönləndirmək üçün
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("token");
      sessionStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const StockOrderForm = ({
  initialData,
  mode = "create",
  onSubmit,
  onCancel,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: initialData,
  });

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

  // Fetch categories, products and warehouse entries from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // apiClient istifadə edin axios.get əvəzinə
        const categoriesResponse = await apiClient.get(
          "/product-category/read"
        );
        setCategories(
          categoriesResponse.data.map((cat) => ({
            value: cat.id,
            label: cat.name || cat.categoryName,
          }))
        );

        const productsResponse = await apiClient.get("/product/read");
        setProductsByCategory(
          productsResponse.data.map((prod) => ({
            value: prod.id,
            label: prod.name || prod.productName,
            categoryId: prod.categoryId || prod.productCategoryId,
            price: prod.price,
          }))
        );

        const warehouseEntriesResponse = await apiClient.get(
          "/warehouse-entry/read"
        );
        setWarehouseEntries(
          warehouseEntriesResponse.data.map((entry) => ({
            value: entry.id,
            label: `Anbar girişi #${entry.id} - ${entry.date || "Tarixsiz"}`,
          }))
        );

        // If in edit mode, fetch the specific order data
        if (mode === "edit" && id) {
          const orderResponse = await apiClient.get(
            `/order-from-warehouse/info/${id}`
          );

          const orderData = orderResponse.data;
          setValue("orderDate", orderData.date);
          setValue("orderTime", orderData.time);
          setValue("room", orderData.room);
          setValue("note", orderData.description);

          if (orderData.orderFromWarehouseProductRequests) {
            const formattedProducts =
              orderData.orderFromWarehouseProductRequests.map((item) => {
                const category = categories.find(
                  (c) => c.value === item.categoryId
                );
                const product = productsByCategory.find(
                  (p) => p.value === item.productId
                );

                return {
                  id: Date.now() + Math.random(),
                  category: item.categoryId,
                  name: item.productId,
                  quantity: item.quantity,
                  price: product?.price || 0,
                  warehouseEntryId: item.warehouseEntryId,
                  warehouseEntryProductId: item.warehouseEntryProductId,
                  categoryName: category?.label || "",
                  productName: product?.label || "",
                };
              });

            setProducts(formattedProducts);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response?.status === 401) {
          alert("Giriş icazəniz yoxdur. Zəhmət olmasa yenidən daxil olun.");
        } else {
          alert(
            "Məlumatları yükləyərkən xəta baş verdi: " +
              (error.response?.data?.message || error.message)
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, mode, setValue]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      if (initialData.products) {
        setProducts(initialData.products);
      }
    }
  }, [initialData, reset]);

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
      // apiClient istifadə edin
      const infoResponse = await apiClient.get(
        `/warehouse-entry/info/${warehouseEntryId}`
      );
      console.log("Warehouse entry info:", infoResponse.data);

      if (
        infoResponse.data &&
        Array.isArray(infoResponse.data.warehouseEntryProducts) &&
        infoResponse.data.warehouseEntryProducts.length > 0
      ) {
        console.log(
          "Found warehouse entry products in info response:",
          infoResponse.data.warehouseEntryProducts
        );
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

      console.log(
        "No warehouse entry products found in info, trying dedicated endpoint"
      );
      const productsResponse = await apiClient.get(
        `/warehouse-entry-product/read-by-warehouse-entry/${warehouseEntryId}`
      );
      console.log(
        "Warehouse entry products from dedicated endpoint:",
        productsResponse.data
      );

      if (
        Array.isArray(productsResponse.data) &&
        productsResponse.data.length > 0
      ) {
        return productsResponse.data.map((product) => ({
          id: product.id,
          value: product.id,
          label: `${product.productName || "Məhsul"} (ID: ${product.id})`,
          productId: product.productId,
          categoryId: product.categoryId,
          quantity: product.quantity,
          price: product.price,
        }));
      }

      console.log(
        "No warehouse entry products found, trying to get all warehouse entry products"
      );
      const allProductsResponse = await apiClient.get(
        "/warehouse-entry-product/read"
      );
      console.log("All warehouse entry products:", allProductsResponse.data);

      const filteredProducts = allProductsResponse.data.filter(
        (product) => product.warehouseEntryId === warehouseEntryId
      );
      console.log("Filtered warehouse entry products:", filteredProducts);

      if (filteredProducts.length > 0) {
        return filteredProducts.map((product) => ({
          id: product.id,
          value: product.id,
          label: `${product.productName || "Məhsul"} (ID: ${product.id})`,
          productId: product.productId,
          categoryId: product.categoryId,
          quantity: product.quantity,
          price: product.price,
        }));
      }

      console.log(
        "No warehouse entry products found, fetching products from API"
      );
      const productsApiResponse = await apiClient.get("/product/read");

      if (
        Array.isArray(productsApiResponse.data) &&
        productsApiResponse.data.length > 0
      ) {
        return productsApiResponse.data.map((product) => ({
          id: `${warehouseEntryId}-${product.id}`,
          value: `${warehouseEntryId}-${product.id}`,
          label: `${product.productName} (Anbar: ${warehouseEntryId})`,
          productId: product.id,
          categoryId: product.categoryId,
          quantity: 100,
          price: product.price || 10,
        }));
      }

      console.log("No products found in the API");
      return [];
    } catch (error) {
      console.error("Error fetching warehouse entry products:", error);

      if (error.response?.status === 401) {
        alert("Giriş icazəniz yoxdur. Zəhmət olmasa yenidən daxil olun.");
      }

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

      console.log("Selected warehouse entry ID:", warehouseEntryId);

      const entryProducts = await fetchWarehouseEntryProducts(warehouseEntryId);
      console.log("Fetched warehouse entry products:", entryProducts);

      setWarehouseEntryProducts(entryProducts);

      if (entryProducts.length === 0) {
        alert("Bu anbar girişi üçün məhsul tapılmadı!");
      }
    } catch (error) {
      console.error("Error handling warehouse entry change:", error);
      setWarehouseEntryProducts([]);

      if (error.response?.status === 401) {
        alert("Giriş icazəniz yoxdur. Zəhmət olmasa yenidən daxil olun.");
      } else {
        alert(
          "Anbar girişi məlumatlarını yükləyərkən xəta baş verdi: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const handleWarehouseEntryProductChange = (option) => {
    const entryProduct = warehouseEntryProducts.find(
      (p) => p.value === option.value
    );
    if (entryProduct) {
      console.log("Selected warehouse entry product:", entryProduct);
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
        (cat) => cat.value === categoryId
      );
      const selectedProduct = productsByCategory.find(
        (prod) => prod.value === productId
      );

      const newProduct = {
        id: Date.now(),
        category: categoryId,
        name: productId,
        quantity: currentProduct.quantity,
        price: currentProduct.price || selectedWarehouseEntryProduct.price || 0,
        categoryName: selectedCategory?.label || "Unknown Category",
        productName: selectedProduct?.label || "Unknown Product",
        warehouseEntryId: currentProduct.warehouseEntryId,
        warehouseEntryProductId: currentProduct.warehouseEntryProductId,
        warehouseEntryProductName:
          selectedWarehouseEntryProduct?.label ||
          `Anbar məhsulu (ID: ${currentProduct.warehouseEntryProductId})`,
      };

      console.log("Adding new product:", newProduct);
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
        timeString = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
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
          warehouseEntryId: Number.parseInt(p.warehouseEntryId),
          warehouseEntryProductId: Number.parseInt(p.warehouseEntryProductId),
          categoryId: Number.parseInt(p.category),
          productId: Number.parseInt(p.name),
          quantity: Number.parseInt(p.quantity),
        })),
        description: data.note,
      };

      console.log("Sending payload:", payload);
      setDebugInfo(JSON.stringify(payload, null, 2));

      // apiClient istifadə edin
      const response = await apiClient({
        method: mode === "create" ? "POST" : "PUT",
        url:
          mode === "create"
            ? "/order-from-warehouse/create"
            : `/order-from-warehouse/update/${id}`,
        data: payload,
      });

      console.log("Uğurlu cavab:", response.data);
      setApiResponse(JSON.stringify(response.data, null, 2));

      if (onSubmit) {
        onSubmit(response.data);
      }

      alert(
        mode === "create"
          ? "Sifariş uğurla yaradıldı!"
          : "Sifariş uğurla yeniləndi!"
      );

      if (mode === "create") {
        navigate("/stock/order");
      }
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      console.error("Error response:", error.response?.data);

      let errorMessage = "Xəta baş verdi: ";

      if (error.response?.status === 401) {
        errorMessage =
          "Giriş icazəniz yoxdur. Zəhmət olmasa yenidən daxil olun.";
      } else if (error.response?.data?.message) {
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

  const columns = [
    { key: "categoryName", label: "Kategoriya" },
    { key: "productName", label: "Məhsul" },
    { key: "quantity", label: "Miqdar" },
    { key: "price", label: "Qiymət" },
    { key: "warehouseEntryProductName", label: "Anbar məhsulu" },
  ];

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

  const getFilteredProducts = () => {
    if (!currentProduct.category) return productsByCategory;
    return productsByCategory.filter(
      (product) => product.categoryId === currentProduct.category
    );
  };

  const handleDelete = async () => {
    if (window.confirm("Bu sifarişi silmək istədiyinizə əminsiniz?")) {
      try {
        // apiClient istifadə edin
        await apiClient.delete(`/order-from-warehouse/delete/${id}`);
        alert("Sifariş uğurla silindi!");
        navigate("/orders");
      } catch (error) {
        console.error("Silinmə zamanı xəta:", error);

        if (error.response?.status === 401) {
          alert("Giriş icazəniz yoxdur. Zəhmət olmasa yenidən daxil olun.");
        } else {
          alert(
            "Silinmə zamanı xəta baş verdi: " +
              (error.response?.data?.message || error.message)
          );
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-3xl text-blue-500"
        />
        <span className="ml-2">Yüklənir...</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-2">
      {mode === "view" && (
        <div className="flex self-end gap-2">
          <button
            type="button"
            onClick={() => navigate("edit")}
            className="p-2 hover:bg-gray-100 rounded">
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 hover:bg-gray-100 rounded">
            <DeleteIcon />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center gap-2">
        <label htmlFor="orderDate">
          Sifariş tarixi <span className="text-red-500">*</span>
        </label>
        <div className="w-[950px]">
          <input
            id="orderDate"
            type="date"
            {...register("orderDate", { required: true })}
            readOnly={mode === "view"}
            className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
              mode === "view" ? "bg-gray-200" : ""
            }`}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <label htmlFor="orderTime">
          Saat <span className="text-red-500">*</span>
        </label>
        <div className="w-[950px]">
          <input
            id="orderTime"
            type="time"
            {...register("orderTime", { required: true })}
            readOnly={mode === "view"}
            className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
              mode === "view" ? "bg-gray-200" : ""
            }`}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <label htmlFor="room">
          Otaq <span className="text-red-500">*</span>
        </label>
        <div className="w-[950px]">
          <input
            id="room"
            type="text"
            {...register("room", { required: true })}
            readOnly={mode === "view"}
            className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
              mode === "view" ? "bg-gray-200" : ""
            }`}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <label htmlFor="note">
          Qeyd <span className="text-red-500">*</span>
        </label>
        <div className="w-[950px]">
          <textarea
            id="note"
            {...register("note", { required: true })}
            readOnly={mode === "view"}
            className={`w-[950px] h-25 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
              mode === "view" ? "bg-gray-200" : ""
            }`}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {mode !== "view" && (
          <div className="flex justify-between items-center gap-2">
            <label htmlFor="products">Məhsullar</label>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex flex-col gap-2">
                <label htmlFor="warehouseEntry">
                  Anbar girişi <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  value={warehouseEntries.find(
                    (entry) => entry.value === currentProduct.warehouseEntryId
                  )}
                  onChange={handleWarehouseEntryChange}
                  options={warehouseEntries}
                  placeholder="Anbar girişi seçin"
                  isDisabled={isLoading}
                />
              </div>

              {isLoadingEntryProducts ? (
                <div className="flex flex-col gap-2">
                  <label>Anbar məhsulu</label>
                  <div className="h-10 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      className="text-blue-500"
                    />
                    <span className="ml-2">Yüklənir...</span>
                  </div>
                </div>
              ) : warehouseEntryProducts.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <label htmlFor="warehouseEntryProduct">
                    Anbar məhsulu <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    value={warehouseEntryProducts.find(
                      (product) =>
                        product.value === currentProduct.warehouseEntryProductId
                    )}
                    onChange={handleWarehouseEntryProductChange}
                    options={warehouseEntryProducts}
                    placeholder="Anbar məhsulu seçin"
                    isDisabled={isLoading}
                  />
                </div>
              ) : currentProduct.warehouseEntryId ? (
                <div className="flex flex-col gap-2">
                  <label>Anbar məhsulu</label>
                  <div className="h-10 flex items-center justify-center text-red-500">
                    Bu anbar girişi üçün məhsul tapılmadı!
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <label htmlFor="quantity">
                  Miqdar <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="h-10 border border-[#D4DCE8] rounded-lg px-4 py-2"
                  value={currentProduct.quantity}
                  onChange={(e) =>
                    handleProductChange("quantity", e.target.value)
                  }
                  min="1"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col gap-2">
                <br />
                <button
                  type="button"
                  onClick={handleAddProduct}
                  disabled={
                    isLoading ||
                    !currentProduct.warehouseEntryId ||
                    !currentProduct.warehouseEntryProductId ||
                    !currentProduct.quantity
                  }
                  className="flex items-center justify-center px-4 py-2 border text-[#155EEF] bg-[#155EEF] text-white rounded-lg hover:bg-[#1046b8] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-[184px] h-[44px] gap-2">
                  <FontAwesomeIcon icon={faPlus} />
                  Məhsul əlavə et
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end items-center gap-2">
          <div className="w-[950px]">
            <ListWithSubtotal
              columns={columns}
              data={products}
              subtotalColumns={["price"]}
              enableEdit={mode !== "view"}
              enableDelete={mode !== "view"}
              handleEdit={handleEditProduct}
              handleDelete={handleDeleteProduct}
            />

            {products.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                Hələ heç bir məhsul əlavə edilməyib
              </div>
            )}
          </div>
        </div>
      </div>

      {apiResponse && (
        <div className="bg-gray-100 p-4 rounded-lg mt-4 mb-4">
          <h3 className="font-bold mb-2">API Cavabı:</h3>
          <pre className="text-xs overflow-auto max-h-40">{apiResponse}</pre>
        </div>
      )}

      <div className="flex justify-between items-center gap-2">
        <label htmlFor="documents">Sənədlər</label>
        <div className="w-[950px]">
          <MultiFileForm mode={mode} />
        </div>
      </div>

      {mode !== "view" && (
        <div className="self-end flex gap-4 m-4">
          <button
            type="button"
            onClick={onCancel || (() => navigate(-1))}
            disabled={isLoading}
            className="flex items-center justify-center px-4 py-2 border text-[#155EEF] border-[#155EEF] rounded-lg hover:bg-gray-100 w-[184px] h-[44px] gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <FontAwesomeIcon icon={faXmark} />
            Ləğv et
          </button>
          <button
            type="submit"
            disabled={isSubmitting || products.length === 0 || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-[#155EEF] text-white rounded-lg hover:bg-[#1046b8] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-[184px] h-[44px] gap-2">
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
  );
};

export default StockOrderForm;
