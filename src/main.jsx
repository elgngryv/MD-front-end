import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, motion } from "framer-motion";

// Style
import "./assets/style/index.css";

// Layouts
import Layout from "./components/layout/Layout";
import PatientLayout from "./components/layout/PatientLayout";

// Auth Pages
import LogIn from "./pages/LogIn";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

// Patient Pages
import PatientsList from "./pages/Patients/PatientsList";
import PatientAdd from "./pages/Patients/PatientAdd";
import PatientEdit from "./pages/patient/PatientEdit";
import General from "./pages/patient/General";
import Examination from "./pages/patient/Examination";
import Plans from "./pages/patient/Plans";
import Treatment from "./pages/patient/Treatment";
import History from "./pages/patient/History";
import EditHistory from "./pages/patient/EditHistory";
import Prescription from "./pages/patient/Prescription";
import ViewPrescription from "./pages/patient/ViewPrescription";
import CreateInsurance from "./pages/patient/CreateInsurance";
import ViewInsurance from "./pages/patient/ViewInsurance";
import Insurance from "./pages/patient/Insurance";
import XRay from "./pages/patient/XRay";
import PlanCompare from "./pages/patient/PlanCompare";
import EditPlan from "./pages/patient/EditPlan";
import CreatePlan from "./pages/patient/CreatePlan";
import PatientReport from "./pages/patient/PatientReport";

// Employee Pages
import EmployeesList from "./pages/Employees/EmployeesList";
import EmployeeAdd from "./pages/Employees/EmployeeAdd";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
import EmployeeEdit from "./pages/Employees/EmployeeEdit";
import EmployeeSchedule from "./pages/Employees/EmployeeSchedule";
import EmployeeWorkScheduleList from "./pages/Employees/EmployeeWorkScheduleList";
import EmployeeWorkScheduleAdd from "./pages/Employees/EmployeeWorkScheduleAdd";
import EmployeeWorkScheduleEdit from "./pages/Employees/EmployeeWorkScheduleEdit";

// Appointment Pages
import Appointments from "./pages/Appointments";
import AddNewAppointment from "./pages/AddNewAppointment";
import RandevuCard from "./pages/RandevuCard";

// Stock Management Pages
import ClinicStock from "./pages/ClinicStock";
import CabinetStock from "./pages/CabinetStock";

// Stock Import Pages
import StockImportList from "./pages/stockImport/StockImportList";
import AddStockImport from "./pages/stockImport/AddStockImport";
import StockImportEdit from "./pages/stockImport/StockImportEdit";
import ImportDetail from "./pages/stockImport/ImportDetail";

// Stock Order Pages
import StockOrderList from "./pages/stockOrder/StockOrderList";
import AddStockOrder from "./pages/stockOrder/AddStockOrder";
import StockOrderEdit from "./pages/stockOrder/StockOrderEdit";
import StockOrderDetail from "./pages/stockOrder/StockOrderDetail";

// Stock Delete Pages
import StockDeleteList from "./pages/stockDelete/StockDeleteList";
import AddStockDelete from "./pages/stockDelete/AddStockDelete";
import StockDeleteDetail from "./pages/stockDelete/StockDeleteDetail";

// Stock Entry Pages
import StockEntryList from "./pages/stockEntry/StockEntryList";
import StockEntryDetail from "./pages/stockEntry/StockEntryDetail";

// Stock Export Pages
import StockExportList from "./pages/stockExport/StockExportList";
import StockExports from "./pages/stockExport/StockExports";
import AddExportStock from "./pages/stockExport/AddExportStock";
import InfoExportStock from "./pages/stockExport/InfoExportStock";
import EditExportStock from "./pages/stockExport/EditExportStock";

// Product Usage Pages
import ProductUsageList from "./pages/productUsage/ProductUsageList";
import ProductUsageDetail from "./pages/productUsage/ProductUsageDetail";

// Product Category Pages
import ProductCategory from "./pages/ProductCategory/ProductCategory";
import AddProductCategory from "./pages/ProductCategory/AddProductCategory";
import EditProductCategory from "./pages/ProductCategory/EditProductCategory";
import Products from "./pages/ProductCategory/Products";
import AddProduct from "./pages/ProductCategory/AddProduct";
import EditProduct from "./pages/ProductCategory/EditProduct";

// Laboratory Pages
import AddOrder from "./pages/AddOrder";
import ReceivedOrders from "./pages/Laboratory/ReceivedOrders";
import SentOrders from "./pages/Laboratory/SentOrders";
import TechnicalsReport from "./pages/Laboratory/TechnicalsReport";

// Settings Pages
import ExaminationList from "./pages/settings/examination/ExaminationList";
import AddExamination from "./pages/settings/examination/AddExamination";
import ExaminationDetail from "./pages/settings/examination/ExaminationDetail";
import ColorList from "./pages/settings/colors/ColorList";
import AddColor from "./pages/settings/colors/AddColor";
import ColorDetail from "./pages/settings/colors/ColorDetail";
import InsuranceList from "./pages/settings/insurance/InsuranceList";
import AddInsurance from "./pages/settings/insurance/AddInsurance";
import InsuranceDetail from "./pages/settings/insurance/InsuranceDetail";
import PriceCategoryList from "./pages/settings/priceCategories/PriceCategoryList";
import AddPriceCategory from "./pages/settings/priceCategories/AddPriceCategory";
import PriceCategoryDetail from "./pages/settings/priceCategories/PriceCategoryDetail";
import DentalSetList from "./pages/settings/dentalSet/DentalSetList";
import AddDentalSet from "./pages/settings/dentalSet/AddDentalSet";
import DentalSetDetail from "./pages/settings/dentalSet/DentalSetDetail";
import CabinetList from "./pages/settings/cabinets/CabinetList";
import AddCabinet from "./pages/settings/cabinets/AddCabinet";
import CabinetDetail from "./pages/settings/cabinets/CabinetDetail";

// Other Settings Pages
import Specialities from "./pages/SpecialitiesPage/Specialities";
import AddSpeciality from "./pages/SpecialitiesPage/AddSpeciality";
import EditSpeciality from "./pages/SpecialitiesPage/EditSpeciality";
import AcademicDegrees from "./pages/AcademicDegrees/AcademicDegrees";
import AddAcademicDegrees from "./pages/AcademicDegrees/AddAcademicDegrees";
import EditAcademicDegrees from "./pages/AcademicDegrees/EditAcademicDegrees";
import Metals from "./pages/Metals/Metals";
import AddMetal from "./pages/Metals/AddMetal";
import EditMetal from "./pages/Metals/EditMetal";
import Ceramics from "./pages/Ceramics/Ceramics";
import AddCeramic from "./pages/Ceramics/AddCeramic";
import EditCeramic from "./pages/Ceramics/EditCeramic";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import AddOrderStatus from "./pages/OrderStatus/AddOrderStatus";
import EditOrderStatus from "./pages/OrderStatus/EditOrderStatus";
import Permissions from "./pages/PermissionsPage/Permissions";
import AddPermission from "./pages/PermissionsPage/AddPermisssion";
import EditPermission from "./pages/PermissionsPage/EditPermission";
import Blacklist from "./pages/Blacklist/Blacklist";
import BlacklistReasons from "./pages/BlackListReasons/BlacklistReasons";
import AddReason from "./pages/BlackListReasons/AddReason";
import EditReason from "./pages/BlackListReasons/EditReason";
import Technicians from "./pages/Technicians/Technicians";
import TechniciansPrices from "./pages/Technicians/TechniciansPrices";
import AddTechnician from "./pages/Technicians/AddTechnician";
import EditTechnician from "./pages/Technicians/EditTechnician";
import InfoTechnician from "./pages/Technicians/InfoTechnician";
import AdminUser from "./pages/AdminUsers/AdminUser"
import EditAdmin from "./pages/AdminUsers/EditAdmin"
import AddAdmin from "./pages/AdminUsers/AddAdmin"
import  QueueList from "./pages/Queue/QueueList"
import  AddQueue from "./pages/Queue/AddQueue"
import  EditQueue from "./pages/Queue/EditQueue"
import ReportsPage from "./pages/Reports/ReportsPage"








// Constants
const roomOptions = [
  { value: "1", label: "Otaq 1" },
  { value: "2", label: "Otaq 2" },
  { value: "3", label: "Otaq 3" },
  { value: "4", label: "Otaq 4" },
  { value: "5", label: "Otaq 5" },
];

const employees = [
  {
    id: 1,
    name: "Rüstəm Məmmədov",
    position: "Diş həkimi",
    schedule: [
      { date: "2025-03-25", startTime: "09:00", endTime: "14:00", room: "1" },
      { date: "2025-03-26", startTime: "10:00", endTime: "17:00", room: "2" },
      { date: "2025-03-27", startTime: "09:00", endTime: "13:00", room: "3" },
      { date: "2025-03-28", startTime: "14:00", endTime: "18:00", room: "1" },
      { date: "2025-03-29", startTime: "09:00", endTime: "15:00", room: "2" },
    ],
  },
  {
    id: 2,
    name: "Aysel Hüseynova",
    position: "Ortodont",
    schedule: [
      { date: "2025-03-25", startTime: "11:00", endTime: "18:00", room: "2" },
      { date: "2025-03-26", startTime: "09:00", endTime: "14:00", room: "3" },
      { date: "2025-03-27", startTime: "13:00", endTime: "18:00", room: "1" },
      { date: "2025-03-28", startTime: "09:00", endTime: "13:00", room: "2" },
      { date: "2025-03-29", startTime: "14:00", endTime: "18:00", room: "3" },
    ],
  },
  {
    id: 3,
    name: "Fərid Qafarov",
    position: "Cərrah",
    schedule: [
      { date: "2025-03-25", startTime: "09:00", endTime: "13:00", room: "3" },
      { date: "2025-03-26", startTime: "14:00", endTime: "18:00", room: "1" },
      { date: "2025-03-27", startTime: "09:00", endTime: "15:00", room: "2" },
      { date: "2025-03-28", startTime: "10:00", endTime: "16:00", room: "3" },
      { date: "2025-03-29", startTime: "09:00", endTime: "12:00", room: "1" },
    ],
  },
];

const WORK_HOURS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
];

const WEEKDAYS_SHORT = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];

// Create a client
const queryClient = new QueryClient();

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ width: "100%", height: "100%" }}>
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div className="app-wrapper">
        <Routes location={location} key={location.pathname}>
          {/* Auth Routes */}
          <Route path="/" element={<LogIn />} />
          
          <Route element={<Layout />}>
            <Route path="/product-categories" element={<ProductCategory />} />
            <Route
              path="/product-categories/add-new"
              element={<AddProductCategory />}
            />
            <Route path="/patients" element={<PatientsList/>}/>
            <Route
              path="/product-categories/edit-category/:id"
              element={<EditProductCategory />}
            />
            <Route path="product-categories/:name" element={<Products />} />
            <Route
              path="product-categories/:name/add-new"
              element={<AddProduct />}
            />
            <Route
              path="product-categories/:name/edit-product/:id"
              element={<EditProduct />}
            />
            <Route path="stock/export/:date" element={<StockExports/>}/>
            <Route path="stock/export/:date/add" element={<AddExportStock/>}/>
            <Route path="stock/export/:date/detail" element={<InfoExportStock/>}/>
            <Route path="stock/export/:date/detail/edit" element={<EditExportStock/>}/>
            <Route path="stock/export/:date/edit" element={<EditExportStock/>}/>
            <Route path="/patients/add-patient" element={<PatientAdd />} />
            
            <Route path="patients/patient/:id" element={<PatientLayout />}>
              <Route path="general" element={<General />} />
              <Route path="edit" element={<PatientEdit />} />
              <Route path="report" element={<PatientReport />} />
              <Route path="examination" element={<Examination />} />
              <Route path="plans" element={<Plans />} />
              <Route path="plan/edit" element={<EditPlan />} />
              <Route path="plan/create" element={<CreatePlan />} />
              <Route path="compare-plans" element={<PlanCompare />} />
              <Route path="history" element={<History />} />
              <Route path="history/edit" element={<EditHistory />} />
              <Route path="insurance" element={<Insurance />} />
              <Route path="insurance/:id" element={<ViewInsurance mode="view" />} />
              <Route path="insurance/:id/edit" element={<ViewInsurance mode="edit" />} />
              <Route path="insurance/create" element={<CreateInsurance />} />
              <Route path="treatment" element={<Treatment />} />
              <Route path="xray" element={<XRay />} />
              <Route path="prescription" element={<Prescription />} />
              <Route path="prescription/:id" element={<ViewPrescription mode="view" />} />
              <Route path="prescription/:id/edit" element={<ViewPrescription mode="edit" />} />
            </Route>

            {/* Employee Routes */}
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/employees/employee-add" element={<EmployeeAdd />} />
            <Route path="/employees/employee/:id" element={<EmployeeDetails />} />
            <Route path="/employees/edit-employee/:id" element={<EmployeeEdit />} />
            <Route path="/employees/employee-schedule" element={<EmployeeSchedule />} />
            <Route path="employees/work-schedule/:id" element={<EmployeeWorkScheduleList />} />
            <Route path="employees/work-schedule/:id/add" element={<EmployeeWorkScheduleAdd />} />
            <Route path="employees/work-schedule/:id/edit" element={<EmployeeWorkScheduleEdit />} />

            {/* Appointment Routes */}
            <Route path="/appointments" element={<Appointments roomOptions={roomOptions} employees={employees} WORK_HOURS={WORK_HOURS} WEEKDAYS_SHORT={WEEKDAYS_SHORT} />} />
            <Route path="/appointments/add" element={<AddNewAppointment roomOptions={roomOptions} employees={employees} WORK_HOURS={WORK_HOURS} WEEKDAYS_SHORT={WEEKDAYS_SHORT} />} />
            <Route path="/appointment/card" element={<RandevuCard roomOptions={roomOptions} employees={employees} WORK_HOURS={WORK_HOURS} WEEKDAYS_SHORT={WEEKDAYS_SHORT} />} />

            {/* Stock Management Routes */}
            <Route path="/stock/clinic" element={<ClinicStock />} />
            <Route path="/stock/cabinet" element={<CabinetStock />} />
            <Route path="/stock/export" element={<StockExportList/>}/>

            {/* Stock Import Routes */}
            <Route path="/stock/import" element={<StockImportList />} />
            <Route path="/stock/import/add" element={<AddStockImport />} />
            <Route path="/stock/import/edit/:id" element={<StockImportEdit />} />
            <Route path="/stock/import/:id" element={<ImportDetail mode="view" />} />

            {/* Stock Order Routes */}
            <Route path="/stock/order" element={<StockOrderList />} />
            <Route
              path="/stock/order/detail/:id"
              element={<StockOrderDetail mode="view" />}
            />
            <Route path="/stock/order/add" element={<AddStockOrder />} />
            <Route path="/stock/order/edit/:id" element={<StockOrderEdit />} />

            {/* Stock Delete Routes */}
            <Route path="/stock/delete" element={<StockDeleteList />} />
            <Route path="/stock/delete/:id" element={<StockDeleteDetail />} />
            <Route path="/stock/delete/add" element={<AddStockDelete />} />
            <Route path="/stock/delete/:id/edit" element={<StockDeleteDetail mode="edit" />} />

            {/* Stock Entry Routes */}
            <Route path="/stock/entry" element={<StockEntryList />} />
            <Route path="/stock/entry/:id" element={<StockEntryDetail />} />

            {/* Stock Export Routes */}
            <Route path="/stock/export" element={<StockExportList />} />
            <Route path="/stock/export/:date" element={<StockExports />} />
            <Route path="/stock/export/:date/add" element={<AddExportStock />} />
            <Route path="/stock/export/:date/detail" element={<InfoExportStock />} />
            <Route path="/stock/export/:date/detail/edit" element={<EditExportStock />} />
            <Route path="/stock/export/:date/edit" element={<EditExportStock />} />

            {/* Product Usage Routes */}
            <Route path="/stock/usage" element={<ProductUsageList />} />
            <Route path="/stock/usage/:id" element={<ProductUsageDetail />} />

            {/* Product Category Routes */}
            <Route path="/product-categories" element={<ProductCategory />} />
            <Route path="/product-categories/add-new" element={<AddProductCategory />} />
            <Route path="/product-categories/edit-category/:id" element={<EditProductCategory />} />
            <Route path="product-categories/:name" element={<Products />} />
            <Route path="product-categories/:name/add-new" element={<AddProduct />} />
            <Route path="product-categories/:name/edit-product/:id" element={<EditProduct />} />

            {/* Laboratory Routes */}
            <Route path="/lab/order/add" element={<AddOrder />} />
            <Route path="/sent-orders" element={<SentOrders />} />
            <Route path="/received-orders" element={<ReceivedOrders />} />
            <Route path="/technicals-report" element={<TechnicalsReport />} />

            {/* Settings Routes */}
            <Route path="/settings/examination" element={<ExaminationList />} />
            <Route path="/settings/examination/add" element={<AddExamination />} />
            <Route path="/settings/examination/:id" element={<ExaminationDetail />} />

            <Route path="/settings/color" element={<ColorList />} />
            <Route path="/settings/color/add" element={<AddColor />} />
            <Route path="/settings/color/:id" element={<ColorDetail />} />

            <Route path="/settings/insurance" element={<InsuranceList />} />
            <Route path="/settings/insurance/add" element={<AddInsurance />} />
            <Route path="/settings/insurance/:id" element={<InsuranceDetail />} />

            <Route path="/settings/price-category" element={<PriceCategoryList />} />
            <Route path="/settings/price-category/add" element={<AddPriceCategory />} />
            <Route path="/settings/price-category/:id" element={<PriceCategoryDetail />} />
            <Route path="/settings/price-category/:id/edit" element={<PriceCategoryDetail mode="edit" />} />

            <Route path="/settings/dental-set" element={<DentalSetList />} />
            <Route path="/settings/dental-set/add" element={<AddDentalSet />} />
            <Route path="/settings/dental-set/:id" element={<DentalSetDetail />} />

            <Route path="/settings/cabinet" element={<CabinetList />} />
            <Route path="/settings/cabinet/add" element={<AddCabinet />} />
            <Route path="/settings/cabinet/:id" element={<CabinetDetail />} />


            {/* Other Settings Routes */}
            <Route path="/admin-users" element={<AdminUser />} />
            <Route path="/admin-users/add" element={<AddAdmin />} />
            <Route path="/admin-users/edit" element={<EditAdmin />} />


            <Route path="/specialities" element={<Specialities />} />
            <Route path="/edit-speciality/:id" element={<EditSpeciality />} />
            <Route path="/add-speciality" element={<AddSpeciality />} />

            <Route path="/academic-degrees" element={<AcademicDegrees />} />
            <Route path="/edit-degree/:id" element={<EditAcademicDegrees />} />
            <Route path="/add-degree" element={<AddAcademicDegrees />} />

            <Route path="/metals" element={<Metals />} />
            <Route path="/edit-metal/:id" element={<EditMetal />} />
            <Route path="/add-metal" element={<AddMetal />} />

            <Route path="/ceramics" element={<Ceramics />} />
            <Route path="/edit-ceramic/:id" element={<EditCeramic />} />
            <Route path="/add-ceramic" element={<AddCeramic />} />

            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/add-order-status" element={<AddOrderStatus />} />
            <Route path="/edit-order-status" element={<EditOrderStatus />} />

            <Route path="/permissions" element={<Permissions />} />
            <Route path="/add-permission" element={<AddPermission />} />
            <Route path="/edit-permission" element={<EditPermission />} />

            <Route path="/blacklist" element={<Blacklist />} />
            <Route path="/blacklist-reasons" element={<BlacklistReasons />} />
            <Route path="/add-reason" element={<AddReason />} />
            <Route path="/edit-reason" element={<EditReason />} />

            <Route path="/technicians" element={<Technicians />} />
            <Route path="/technicians/prices/:id" element={<TechniciansPrices />} />
            <Route path="/technicians/add" element={<AddTechnician />} />
            <Route path="technicians/edit/:id" element={<EditTechnician />} />
            <Route path="technicians/:id" element={<InfoTechnician />} />

            {/* Queue Management Routes */}
            <Route path="/queue" element={<QueueList />} />
            <Route path="/queue/add-new" element={<AddQueue />} />
            <Route path="/queue/edit-queue/:id" element={<EditQueue />} />

            {/* Other Routes */}
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </div>
    </AnimatePresence>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
