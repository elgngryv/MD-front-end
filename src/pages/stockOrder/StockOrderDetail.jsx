// StockOrderDetail.jsx

import { useState, useEffect } from "react";
import CustomDropdown from "../../components/CustomDropdown";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faPlus,
  faSpinner,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ListWithSubtotal from "../../components/list/ListwithSubtotal";
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/delete";
import InfoButton from "../../assets/icons/Info"; // Add this import
import { useNavigate, useParams, Link } from "react-router-dom";
import MultiFileForm from "../../components/MultiFileForm";
import axios from "axios";
import useOrdersFromWarehouseStore from "../../../stores/orderFromWarehouseStore";
import "../../assets/style/StockOrder/stockorderdetail.css";

const API_BASE_URL = "http://161.97.179.107:5555/api/v1";

const StockOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();
  // const { createOrder } = useOrdersFromWarehouseStore(); // This line seems unused for 'info' mode

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

  // Determine mode based on if an ID is present in the URL
  const mode = id ? "info" : "create"; // 'info' for view/edit, 'create' for new

  // Function to get the authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found in localStorage.");
      // Optionally, redirect to login page if token is missing
      // navigate('/login'); // Uncomment if you want immediate redirect
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
        // If no token and we are in info mode, it means user is unauthorized to fetch data
        if (Object.keys(authHeaders).length === 0 && mode === "info") {
          setIsLoading(false);
          alert("Giriş tokeni tapılmadı. Zəhmət olmasa yenidən daxil olun.");
          navigate("/login"); // Redirect to login page
          return;
        }

        // Fetch static data (categories, products, warehouse entries) first
        const [
          categoriesResponse,
          productsResponse,
          warehouseEntriesResponse,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/product-category/read`, authHeaders),
          axios.get(`${API_BASE_URL}/product/read`, authHeaders),
          axios.get(`${API_BASE_URL}/warehouse-entry/read`, authHeaders),
        ]);

        setCategories(
          categoriesResponse.data.map((cat) => ({
            value: cat.id,
            label: cat.name || cat.categoryName,
          }))
        );

        setProductsByCategory(
          productsResponse.data.map((prod) => ({
            value: prod.id,
            label: prod.name || prod.productName,
            categoryId: prod.categoryId || prod.productCategoryId,
            price: prod.price,
          }))
        );

        setWarehouseEntries(
          warehouseEntriesResponse.data.map((entry) => ({
            value: entry.id,
            label: `Anbar girişi #${entry.id} - ${entry.date || "Tarixsiz"}`,
          }))
        );

        // If in 'info' mode and 'id' is present, fetch specific order details
        if (mode === "info" && id) {
          const orderResponse = await axios.get(
            `${API_BASE_URL}/order-from-warehouse/info/${id}`,
            authHeaders
          );
          const orderData = orderResponse.data;

          // Populate main form fields
          setValue("orderDate", orderData.date);
          setValue("orderTime", orderData.time);
          setValue("room", orderData.room);
          setValue("note", orderData.description);
          const fetchedCategories = categoriesResponse.data.map((cat) => ({
            value: cat.id,
            label: cat.name || cat.categoryName,
          }));
          setCategories(fetchedCategories);
          const fetchedProducts = productsResponse.data.map((prod) => ({
            value: prod.id,
            label: prod.name || prod.productName,
            categoryId: prod.categoryId || prod.productCategoryId,
            price: prod.price,
          }));
          setProductsByCategory(fetchedProducts)

          // Populate the products list (important for "Məhsullar" section)
          if (orderData.orderFromWarehouseProductResponses?.length > 0) {
            const formattedProducts = await Promise.all(
              orderData.orderFromWarehouseProductResponses.map(async (item) => {
                // Try to find matching product and category
                const foundProduct = fetchedProducts.find(
                  (p) => p.label === item.productName || p.label === item.productTitle
                );
                const foundCategory = fetchedCategories.find(
                  (c) => c.label === item.categoryName
                );

                // Fetch warehouse entry product details if needed
                let warehouseEntryProduct = null;
                if (item.warehouseEntryProductId) {
                  try {
                    const productResponse = await axios.get(
                      `${API_BASE_URL}/warehouse-entry-product/info/${item.warehouseEntryProductId}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                      }
                    );
                    warehouseEntryProduct = productResponse.data;
                  } catch (error) {
                    console.error("Error fetching warehouse entry product:", error);
                  }
                }

                return {
                  id: Date.now() + Math.random(), // Unique ID for React list key
                  category: foundCategory?.value || "",
                  name: foundProduct?.value || "",
                  quantity: item.quantity,
                  price: foundProduct?.price || warehouseEntryProduct?.price || 0,
                  warehouseEntryId: item.warehouseEntryId,
                  warehouseEntryProductId: item.warehouseEntryProductId,
                  categoryName: item.categoryName,
                  productName: item.productName || item.productTitle,
                  warehouseEntryProductName: warehouseEntryProduct?.productName || item.productName || item.productTitle,
                };
              })
            );
            setProducts(formattedProducts);
          }

        }
      } catch (error) {
        console.error("Məlumatları gətirərkən xəta baş verdi:", error);
        let errorMessage = "Məlumatları yükləyərkən xəta baş verdi: ";
        if (error.response?.status === 401) {
          errorMessage +=
            "Giriş səlahiyyəti yoxdur. Zəhmət olmasa yenidən daxil olun.";
          navigate("/login"); // Redirect to login on 401
        } else {
          errorMessage += error.response?.data?.message || error.message;
        }
        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setValue, navigate]); // Dependencies for useEffect

  useEffect(() => {
    // Reset form and products only if in create mode or initial load (not on ID change for info mode)
    if (!id) {
      reset();
      setProducts([]);
    }
  }, [reset, id]);

  const handleProductChange = (field, value) => {
    setCurrentProduct((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "category" ? { name: "" } : {}), // Reset product name when category changes
    }));
  };

  const fetchWarehouseEntryProducts = async (warehouseEntryId) => {
    setIsLoadingEntryProducts(true);
    try {
      const authHeaders = getAuthHeaders();
      // Try fetching from the info endpoint first
      const infoResponse = await axios.get(
        `${API_BASE_URL}/warehouse-entry/info/${warehouseEntryId}`,
        authHeaders
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

      // Fallback to read-by-warehouse-entry if info endpoint doesn't contain product details
      const fallbackResponse = await axios.get(
        `${API_BASE_URL}/warehouse-entry-product/read-by-warehouse-entry/${warehouseEntryId}`,
        authHeaders
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

      // Final fallback if no specific entry products are found, try to map from all products
      const allProductsResponse = await axios.get(
        `${API_BASE_URL}/product/read`,
        authHeaders
      );
      if (
        Array.isArray(allProductsResponse.data) &&
        allProductsResponse.data.length > 0
      ) {
        // Filter products that belong to the current warehouse entry based on product IDs (if warehouse entry has associated products)
        // This part needs a bit more clarity on how a product from product/read relates to a specific warehouse entry.
        // For simplicity, here it just lists all products, assuming they *could* be in this warehouse entry.
        return allProductsResponse.data.map((prod) => ({
          id: `${warehouseEntryId}-${prod.id}`, // Unique ID for this context
          value: `${warehouseEntryId}-${prod.id}`,
          label: `${prod.name || prod.productName} (Anbar: ${warehouseEntryId})`,
          productId: prod.id,
          categoryId: prod.categoryId,
          quantity: 100, // Placeholder quantity if not from warehouse entry
          price: prod.price || 0,
        }));
      }

      return [];
    } catch (error) {
      console.error("Anbar giriş məhsullarını gətirərkən xəta:", error);
      let errorMessage = "Anbar girişi məlumatlarını yükləyərkən xəta baş verdi: ";
      if (error.response?.status === 401) {
        errorMessage += "Giriş səlahiyyəti yoxdur. Zəhmət olmasa yenidən daxil olun.";
        navigate("/login"); // Redirect to login on 401
      } else {
        errorMessage += error.response?.data?.message || error.message;
      }
      alert(errorMessage);
      return [];
    } finally {
      setIsLoadingEntryProducts(false);
    }
  };

  const handleWarehouseEntryChange = async (option) => {
    try {
      const warehouseEntryId = option.value;
      handleProductChange("warehouseEntryId", warehouseEntryId);
      handleProductChange("warehouseEntryProductId", ""); // Reset product when warehouse entry changes
      handleProductChange("category", ""); // Reset category
      handleProductChange("name", ""); // Reset product name
      handleProductChange("price", ""); // Reset price

      const entryProducts = await fetchWarehouseEntryProducts(warehouseEntryId);
      setWarehouseEntryProducts(entryProducts);

      if (entryProducts.length === 0) {
        alert("Bu anbar girişi üçün məhsul tapılmadı!");
      }
    } catch (error) {
      console.error("Anbar giriş dəyişikliyini idarə edərkən xəta:", error);
      setWarehouseEntryProducts([]);
    }
  };

  const handleWarehouseEntryProductChange = (option) => {
    const entryProduct = warehouseEntryProducts.find(
      (p) => p.value === option.value
    );
    if (entryProduct) {
      setCurrentProduct((prev) => ({
        ...prev,
        warehouseEntryProductId: option.value,
        category: entryProduct.categoryId,
        name: entryProduct.productId,
        price: entryProduct.price,
        warehouseEntryProductName: entryProduct.label,
      }));
    }
  };

  const handleAddProduct = () => {
    if (
      currentProduct.warehouseEntryId &&
      currentProduct.warehouseEntryProductId &&
      currentProduct.quantity &&
      currentProduct.category && // Ensure category is selected/derived
      currentProduct.name // Ensure product name is selected/derived
    ) {
      const selectedWarehouseEntryProduct = warehouseEntryProducts.find(
        (prod) => prod.value === currentProduct.warehouseEntryProductId
      );

      if (!selectedWarehouseEntryProduct) {
        alert("Seçilmiş anbar məhsulu tapılmadı. Zəhmət olmasa yenidən seçin.");
        return;
      }

      const categoryId = currentProduct.category;
      const productId = currentProduct.name;

      const selectedCategory = categories.find(
        (c) => c.value === categoryId
      );
      const selectedProduct = productsByCategory.find(
        (p) => p.value === productId
      );

      const newProduct = {
        id: Date.now(), // Unique ID for list rendering
        category: categoryId,
        name: productId,
        quantity: currentProduct.quantity,
        price: currentProduct.price, // Use currentProduct.price which is populated from selectedWarehouseEntryProduct
        categoryName: selectedCategory?.label || "Naməlum Kategoriya",
        productName: selectedProduct?.label || "Naməlum Məhsul",
        warehouseEntryId: currentProduct.warehouseEntryId,
        warehouseEntryProductId: currentProduct.warehouseEntryProductId,
        warehouseEntryProductName: selectedWarehouseEntryProduct?.label || `Anbar məhsulu (ID: ${currentProduct.warehouseEntryProductId})`,
      };

      setProducts((prev) => [...prev, newProduct]);
      // Reset current product fields after adding
      setCurrentProduct({
        category: "",
        name: "",
        quantity: "",
        price: "",
        warehouseEntryId: "",
        warehouseEntryProductId: "",
        warehouseEntryProductName: "",
      });
      setWarehouseEntryProducts([]); // Clear warehouse entry products after adding
    } else {
      alert(
        "Zəhmət olmasa anbar girişini, anbar məhsulunu, miqdarı, kateqoriyanı və məhsulu daxil edin."
      );
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const authHeaders = getAuthHeaders();

      if (Object.keys(authHeaders).length === 0) {
        alert("Giriş tokeni tapılmadı. Zəhmət olmasa yenidən daxil olun.");
        navigate("/login");
        return;
      }

      let timeString = "00:00:00";
      if (data.orderTime) {
        const [hour, minute] = data.orderTime.split(":");
        timeString = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
      }

      // Validate products list before submission
      if (products.length === 0) {
        alert("Zəhmət olmasa ən azı bir məhsul əlavə edin.");
        setIsSubmitting(false);
        return;
      }

      const invalidProducts = products.filter(
        (p) => !p.warehouseEntryProductId || !p.category || !p.name || !p.quantity
      );
      if (invalidProducts.length > 0) {
        alert(
          "Bəzi məhsulların anbar məhsulu, kateqoriyası, məhsul ID-si və ya miqdarı yoxdur. Zəhmət olmasa siyahını yoxlayın."
        );
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

      console.log("Göndərilən yük:", payload);
      setDebugInfo(JSON.stringify(payload, null, 2));

      const apiUrl = `${API_BASE_URL}/order-from-warehouse/update/${id}`;
      const response = await axios.put(apiUrl, payload, authHeaders);

      console.log("Uğurlu cavab:", response.data);
      setApiResponse(JSON.stringify(response.data, null, 2));
      alert("Sifariş uğurla yeniləndi!");
      navigate("/stock/order");
    } catch (error) {
      console.error("Xəta baş verdi:", error);
      let errorMessage = "Xəta baş verdi: ";
      if (error.response?.status === 401) {
        errorMessage +=
          "Giriş səlahiyyəti yoxdur. Zəhmət olmasa yenidən daxil olun.";
        navigate("/login"); // Redirect to login on 401
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

  const handleDeleteProduct = (idToRemove) => {
    setProducts((prev) => prev.filter((product) => product.id !== idToRemove));
  };

  const handleEditProduct = (productToEdit) => {
    // Set current product for editing
    setCurrentProduct({
      category: productToEdit.category,
      name: productToEdit.name,
      quantity: productToEdit.quantity,
      price: productToEdit.price,
      warehouseEntryId: productToEdit.warehouseEntryId,
      warehouseEntryProductId: productToEdit.warehouseEntryProductId,
      warehouseEntryProductName: productToEdit.warehouseEntryProductName,
    });

    // Fetch warehouse entry products for the selected warehouse entry
    if (productToEdit.warehouseEntryId) {
      fetchWarehouseEntryProducts(productToEdit.warehouseEntryId)
        .then((entryProducts) => {
          setWarehouseEntryProducts(entryProducts);
        })
        .catch((error) => {
          console.error("Anbar giriş məhsullarını gətirərkən xəta:", error);
        });
    }

    // Remove the product from the list so it can be re-added or modified
    setProducts((prev) => prev.filter((p) => p.id !== productToEdit.id));
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

        await axios.delete(
          `${API_BASE_URL}/order-from-warehouse/delete/${id}`,
          authHeaders
        );
        alert("Sifariş uğurla silindi!");
        navigate("/stock/order"); // Redirect to the main orders list
      } catch (error) {
        console.error("Silinmə zamanı xəta:", error);
        let errorMessage = "Silinmə zamanı xəta baş verdi: ";
        if (error.response?.status === 401) {
          errorMessage +=
            "Giriş səlahiyyəti yoxdur. Zəhmət olmasa yenidən daxil olun.";
          navigate("/login"); // Redirect to login on 401
        } else {
          errorMessage += error.response?.data?.message || error.message;
        }
        alert(errorMessage);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="stockOrderDetail__loading">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="stockOrderDetail__spinner"
        />
        <span className="stockOrderDetail__loadingText">Yüklənir...</span>
      </div>
    );
  }

  return (
    <div className="stockOrderDetailWrapper">
      <div className="stockOrderTopPartIcons">
        {/* Only show edit/delete icons if in 'info' mode and an ID exists */}
        {mode === "info" && id && (
          <>
            <Link to={`/stock/order/edit/${id}`}>
              <EditIcon className="stockOrderTopPartIcons__editIcon" />
            </Link>
            <Link to="#" onClick={handleDelete}>
              <DeleteIcon className="stockOrderTopPartIcons__deleteIcon" />
            </Link>
            {/* Add InfoButton here */}
          
          </>
        )}
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="stockOrderDetail__form"
      >
        <div className="stockOrderDetail__row">
          <label htmlFor="orderDate" className="stockOrderDetail__label">
            Sifariş tarixi{" "}
            <span className="stockOrderDetail__required">*</span>
          </label>
          <div className="stockOrderDetail__inputContainer">
            <input
              id="orderDate"
              type="date"
              {...register("orderDate", { required: true })}
              // readOnly={mode === "info"} // Allow editing in 'info' mode for this form
              className="stockOrderDetail__input"
            />
          </div>
        </div>

        <div className="stockOrderDetail__row">
          <label htmlFor="orderTime" className="stockOrderDetail__label">
            Saat <span className="stockOrderDetail__required">*</span>
          </label>
          <div className="stockOrderDetail__inputContainer">
            <input
              id="orderTime"
              type="time"
              {...register("orderTime", { required: true })}
              // readOnly={mode === "info"} // Allow editing in 'info' mode for this form
              className="stockOrderDetail__input"
            />
          </div>
        </div>

        <div className="stockOrderDetail__row">
          <label htmlFor="room" className="stockOrderDetail__label">
            Otaq <span className="stockOrderDetail__required">*</span>
          </label>
          <div className="stockOrderDetail__inputContainer">
            <input
              id="room"
              type="text"
              {...register("room", { required: true })}
              // readOnly={mode === "info"} // Allow editing in 'info' mode for this form
              className="stockOrderDetail__input"
            />
          </div>
        </div>

        <div className="stockOrderDetail__row">
          <label htmlFor="note" className="stockOrderDetail__label">
            Qeyd <span className="stockOrderDetail__required">*</span>
          </label>
          <div className="stockOrderDetail__inputContainer">
            <textarea
              id="note"
              {...register("note", { required: true })}
              // readOnly={mode === "info"} // Allow editing in 'info' mode for this form
              className="stockOrderDetail__textarea"
            />
          </div>
        </div>

        <div className="stockOrderDetail__productsSection">
          <div className="stockOrderDetail__row">
            <label className="stockOrderDetail__label">Məhsullar</label>
       
          </div>

          <div className="stockOrderFormWrapper__row stockOrderFormWrapper__tableRow">
            <ListWithSubtotal
              columns={[
                { key: "categoryName", label: "Kategoriya" },
                { key: "productName", label: "Məhsul" },
                { key: "quantity", label: "Miqdar" },
                { key: "price", label: "Qiymət" },
                { key: "warehouseEntryProductName", label: "Anbar məhsulu" },
              ]}
              data={products}
              subtotalColumns={["price"]}
              enableEdit={true}
              enableDelete={true}
              handleEdit={handleEditProduct}
              handleDelete={handleDeleteProduct}
              className="stockOrderFormWrapper__list"
            />
          </div>
        </div>

        {apiResponse && (
          <div className="stockOrderDetail__debug">
            <h3 className="stockOrderDetail__debugTitle">API Cavabı:</h3>
            <pre className="stockOrderDetail__debugPre">{apiResponse}</pre>
          </div>
        )}

        <div className="stockOrderDetail__row">
          <label className="stockOrderDetail__label">Sənədlər</label>
          <div className="stockOrderDetail__inputContainer">
            <MultiFileForm mode={mode} />
          </div>
        </div>

        <div className="stockOrderDetail__actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="stockOrderDetail__buttonCancel"
          >
            <FontAwesomeIcon icon={faXmark} />
            Ləğv et
          </button>
          <button
            type="submit"
            disabled={isSubmitting || products.length === 0}
            className="stockOrderDetail__buttonSave"
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

export default StockOrderDetail;