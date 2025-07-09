import { StrictMode, useEffect } from "react";
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

// stores
import useAuthStore from "../stores/authStore";

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
import ColorList from "./pages/settings/colors/ColorList";
import ColorDetail from "./pages/settings/colors/ColorDetail";
import InsuranceDetail from "./pages/settings/insurance/InsuranceDetail";

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
import AdminUser from "./pages/AdminUsers/AdminUser";
import EditAdmin from "./pages/AdminUsers/EditAdmin";
import AddAdmin from "./pages/AdminUsers/AddAdmin";
import QueueList from "./pages/Queue/QueueList";
import AddQueue from "./pages/Queue/AddQueue";
import EditQueue from "./pages/Queue/EditQueue";
import ReportsPage from "./pages/Reports/ReportsPage";
import InfoAdmin from "./pages/AdminUsers/InfoAdmin";
import AppointmentTypes from "./pages/AppointmentTypes/AppointmentTypes";
import AddAppointmentType from "./pages/AppointmentTypes/AddAppointmentTypes";
import EditAppointmentType from "./pages/AppointmentTypes/EditAppointmentTypes";
import ChecklistPage from "./pages/ChecklistPage/ChecklistPage";
import AddCheckList from "./pages/ChecklistPage/AddChecklist";
import ColorsPage from "./pages/ColorsPage/ColorsPage";
import AddColor from "./pages/ColorsPage/AddColor";
import EditColor from "./pages/ColorsPage/EditColor";
import PriceCategory from "./pages/PriceCategory/PriceCategory";
import AddPriceCategory from "./pages/PriceCategory/AddPriceCategory";
import EditPriceCategory from "./pages/PriceCategory/EditPriceCategory";
import CabinetsPage from "./pages/CabinetsPage/CabinetsPage";
import AddCabinet from "./pages/CabinetsPage/AddCabinet";
import EditCabinet from "./pages/CabinetsPage/EditCabinet";

import OtherObjects from "./pages/OtherObjects/OtherObjects";
import AddObject from "./pages/OtherObjects/AddObject";
import EditObject from "./pages/OtherObjects/EditObject";

import RecommendationsPage from "./pages/RecommendationsPage/RecommendationsPage";
import AddRecommendation from "./pages/RecommendationsPage/AddRecommendation";
import EditRecommendation from "./pages/RecommendationsPage/EditRecommendation";

import GeneralSettings from "./pages/GeneralSettings/GeneralSettings";
import EditSettings from "./pages/GeneralSettings/EditSettings";

import AnamnesisCategoryList from "./pages/Anamnesis/AnamnesisCategoryList";
import AddAnamnesisCategory from "./pages/Anamnesis/AddAnamnesisCategory";
import EditAnamnesisCategory from "./pages/Anamnesis/EditAnamnesisCategory";

import AnamnesisList from "./pages/Anamnesis/AnamnesisList";
import AddAnamnesis from "./pages/Anamnesis/AddAnamnesis";
import EditAnamnesis from "./pages/Anamnesis/EditAnamnesisCategory";

import ReceptsList from "./pages/ReceptsPage/ReceptsList";
import AddRecept from "./pages/ReceptsPage/AddRecept";
import EditRecept from "./pages/ReceptsPage/EditRecept";
import MedicinesList from "./pages/ReceptsPage/MedicinesList";
import AddMedicine from "./pages/ReceptsPage/AddMedicine";

import InsuranceList from "./pages/Insurance/InsuranceList";
import AddInsurance from "./pages/Insurance/AddInsurance";
import EditInsurance from "./pages/Insurance/EditInsurance";

import DentalSetList from "./pages/DentalSet/DentalSetList";
import AddDentalSet from "./pages/DentalSet/AddDentalSet";
import EditDentalSet from "./pages/DentalSet/EditDentalSet";

import ImplantsList from "./pages/Implants/ImplantsList";
import EditImplant from "./pages/Implants/EditImplant";
import AddImplant from "./pages/Implants/AddImplant";
import SizesList from "./pages/Implants/SizesList";
import EditSize from "./pages/Implants/EditSize";
import AddSize from "./pages/Implants/AddSize";
import OperationCategoryList from "./pages/Operations/OperationCategoryList";
import AddOperationCategory from "./pages/Operations/AddOperationCategory";
import EditOperationCategory from "./pages/Operations/EditOperationCategory";

import OperationList from "./pages/Operations/OperationList";
import EditOperation from "./pages/Operations/EditOperation";
import AddOperation from "./pages/Operations/AddOperation";
import TeethList from "./pages/Teeth/TeethList";
import OperationPictures from "./pages/Teeth/OperationPictures";
import ExaminationPictures from "./pages/Teeth/ExaminationPictures";
import AddTeeth from "./pages/Teeth/AddTeeth";
import EditTeeth from "./pages/Teeth/EditTeeth";
import AddOperationPicture from "./pages/Teeth/AddOperationPicture";
import AddExaminationPicture from "./pages/Teeth/AddExaminationPicture";

import InfoPermission from "./pages/PermissionsPage/InfoPermission";
import EditMedicine from "./pages/ReceptsPage/EditMedicine";
import EditCheckList from "./pages/ChecklistPage/EditChecklist";
import Home from "./pages/Home/HomePhoto";

import Redirecter from "./components/Redirecter";
import AddPrescription from "./pages/patient/AddPrescription";

import InfoXray from "./pages/patient/InfoXray";
import EditXray from "./pages/patient/EditXray";
import AddXRay from "./pages/patient/AddXray";

import InfoInsurancePatient from "./pages/patient/InfoInsurancePatient.jsx";


// Constants
const roomOptions = [
  { value: "1", label: "Otaq 1" },
  { value: "2", label: "Otaq 2" },
  { value: "3", label: "Otaq 3" },
  { value: "4", label: "Otaq 4" },
  { value: "5", label: "Otaq 5" },
];

import AddInsurancePatient from "./pages/patient/AddInsurancePatient.jsx";
import EditInsurancePatient from "./pages/patient/EditInsurancePatient.jsx";
import PatientInsuranceBalance from "./pages/patient/PatientInsuranceBalance.JSX";
import PatientInsuranceBalanceAdd from "./pages/patient/PatientInsuranceBalanceAdd.jsx";
import PatientInsuranceBalanceEdit from "./pages/patient/PatientInsuranceBalanceEdit.jsx";
import PatientInsuranceBalanceInfo from "./pages/patient/PatientInsuranceBalanceInfo.jsx";
import EditPrescription from "./pages/patient/EditPrescription.jsx";

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
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
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

// Test
const AnimatedRoutes = () => {
  const loadTokenFromStorage = useAuthStore(
    (state) => state.loadTokenFromStorage
  );
  const location = useLocation();

  useEffect(() => {
    loadTokenFromStorage();
  }, [loadTokenFromStorage]);
  return (
    <AnimatePresence mode="wait">

      <div className="app-wrapper">
        <Redirecter/>
        <Routes location={location} key={location.pathname}>
          {/* Auth Routes */}
          {/* <Route path="/" element={<LogIn />} /> */}
          <Route path="/login" element={<LogIn />} />

          <Route element={<Layout />}>
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/product-categories" element={<ProductCategory />} />
            <Route
              path="/product-categories/add-new"
              element={<AddProductCategory />}
            />
            <Route path="/patients" element={<PatientsList />} />
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
            <Route path="stock/export/:date" element={<StockExports />} />
            <Route path="stock/export/:date/add" element={<AddExportStock />} />
            <Route
              path="stock/export/:date/detail"
              element={<InfoExportStock />}
            />
            <Route
              path="stock/export/:date/detail/edit"
              element={<EditExportStock />}
            />

            <Route
              path="stock/export/:date/edit"
              element={<EditExportStock />}
            />
            <Route path="/patients/add-patient" element={<PatientAdd />} />

            <Route path="patients/patient/:id" element={<PatientLayout />}>
              <Route path="general" element={<General />} />
              <Route path="edit" element={<PatientEdit />} />
              <Route path="report" element={<PatientReport />} />
              <Route path="plans" element={<Plans />} />
              <Route path="plan/edit" element={<EditPlan />} />
              <Route path="plan/create" element={<CreatePlan />} />
              <Route path="compare-plans" element={<PlanCompare />} />
              <Route path="history" element={<History />} />
              <Route path="history/edit" element={<EditHistory />} />
              <Route path="insurance" element={<Insurance />} />
              <Route path="insurance/add" element={<AddInsurancePatient />} />
              <Route path="insurance/info/:id" element={<InfoInsurancePatient />} />
              <Route path="insurance/edit/:insuranceId" element={<EditInsurancePatient />} />
              <Route path="insurance/insurance-balance/:id" element={<PatientInsuranceBalance />} />
              <Route path="insurance/insurance-balance/:id/add" element={<PatientInsuranceBalanceAdd />} />
              <Route path="insurance/insurance-balance/:id/edit/:id" element={<PatientInsuranceBalanceEdit />} />
              <Route path="insurance/insurance-balance/:id/info/:id" element={<PatientInsuranceBalanceInfo />} />
              {/* <Route
                path="insurance/:id"
                element={<ViewInsurance mode="view" />}
              /> */}
              {/* <Route
                path="insurance/:id/edit"
                element={<ViewInsurance mode="edit" />}
              /> */}
              <Route path="insurance/create" element={<CreateInsurance />} />
              <Route path="treatment" element={<Treatment />} />
              <Route path="xray" element={<XRay />} />
              <Route path="xray/info/:id" element={<InfoXray />} />
              <Route path="xray/edit/:id" element={<EditXray />} />
              <Route path="xray/add" element={<AddXRay />} />
              <Route path="prescription" element={<Prescription />} />
              <Route
                path="prescription/:prescriptionId"
                element={<ViewPrescription mode="view" />}
              />
              <Route
                path="prescription/add"
                element={<AddPrescription mode="view" />}
              />
              <Route
                path="prescription/:id/edit"
                element={<EditPrescription mode="edit" />}
              />
            </Route>

            <Route path="/" element={<Home />} />

            {/* Employee Routes */}
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/employees/employee-add" element={<EmployeeAdd />} />
            <Route
              path="/employees/employee/:id"
              element={<EmployeeDetails />}
            />
            <Route
              path="/employees/edit-employee/:id"
              element={<EmployeeEdit />}
            />
            <Route
              path="/employees/employee-schedule"
              element={<EmployeeSchedule />}
            />
            <Route
              path="employees/work-schedule/:id"
              element={<EmployeeWorkScheduleList />}
            />
            <Route
              path="employees/work-schedule/:id/add"
              element={<EmployeeWorkScheduleAdd />}
            />
            <Route
              path="employees/work-schedule/:id/edit"
              element={<EmployeeWorkScheduleEdit />}
            />

            {/* Appointment Routes */}
            <Route
              path="/appointments"
              element={
                <Appointments
                  roomOptions={roomOptions}
                  employees={employees}
                  WORK_HOURS={WORK_HOURS}
                  WEEKDAYS_SHORT={WEEKDAYS_SHORT}
                />
              }
            />
            <Route
              path="/appointments/add"
              element={
                <AddNewAppointment
                  roomOptions={roomOptions}
                  employees={employees}
                  WORK_HOURS={WORK_HOURS}
                  WEEKDAYS_SHORT={WEEKDAYS_SHORT}
                />
              }
            />
            <Route
              path="/appointment/card"
              element={
                <RandevuCard
                  roomOptions={roomOptions}
                  employees={employees}
                  WORK_HOURS={WORK_HOURS}
                  WEEKDAYS_SHORT={WEEKDAYS_SHORT}
                />
              }
            />

            {/* Stock Management Routes */}
            <Route path="/stock/clinic" element={<ClinicStock />} />
            <Route path="/stock/cabinet" element={<CabinetStock />} />
            <Route path="/stock/export" element={<StockExportList />} />

            {/* Stock Import Routes */}
            <Route path="/stock/import" element={<StockImportList />} />
            <Route path="/stock/import/add" element={<AddStockImport />} />
            <Route
              path="/stock/import/edit/:id"
              element={<StockImportEdit />}
            />
            <Route
              path="/stock/import/:id"
              element={<ImportDetail mode="view" />}
            />

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
            <Route
              path="/stock/delete/:id/edit"
              element={<StockDeleteDetail mode="edit" />}
            />

            {/* Stock Entry Routes */}
            <Route path="/stock/entry" element={<StockEntryList />} />
            <Route path="/stock/entry/:id" element={<StockEntryDetail />} />

            {/* Stock Export Routes */}
            <Route path="/stock/export" element={<StockExportList />} />
            <Route path="/stock/export/:date" element={<StockExports />} />
            <Route
              path="/stock/export/:date/add"
              element={<AddExportStock />}
            />
            <Route
              path="/stock/export/:date/detail"
              element={<InfoExportStock />}
            />
            <Route
              path="/stock/export/:date/detail/edit"
              element={<EditExportStock />}
            />
            <Route
              path="/stock/export/:date/edit"
              element={<EditExportStock />}
            />

            {/* Product Usage Routes */}
            <Route path="/stock/usage" element={<ProductUsageList />} />
            <Route path="/stock/usage/:id" element={<ProductUsageDetail />} />

            {/* Product Category Routes */}
            <Route path="/product-categories" element={<ProductCategory />} />
            <Route
              path="/product-categories/add-new"
              element={<AddProductCategory />}
            />
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

            {/* Laboratory Routes */}
            <Route path="/lab/order/add" element={<AddOrder />} />
            <Route path="/sent-orders" element={<SentOrders />} />
            <Route path="/received-orders" element={<ReceivedOrders />} />
            <Route path="/technicals-report" element={<TechnicalsReport />} />

            {/* Settings Routes */}

            <Route path="/settings/color" element={<ColorList />} />
            <Route path="/settings/color/add" element={<AddColor />} />
            <Route path="/settings/color/:id" element={<ColorDetail />} />

            {/*<Route path="/settings/insurance" element={<InsuranceList />} />*/}
            {/*<Route path="/settings/insurance/add" element={<AddInsurance />} />*/}
            {/*<Route*/}
            {/*  path="/settings/insurance/:id"*/}
            {/*  element={<InsuranceDetail />}*/}
            {/*/>*/}

            {/* Other Settings Routes */}
            <Route path="/admin-users" element={<AdminUser />} />
            <Route path="/admin-users/add" element={<AddAdmin />} />
            <Route path="/admin-users/:id/edit" element={<EditAdmin />} />
            <Route path="/admin-users/:id/info" element={<InfoAdmin />} />

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
            <Route path="/edit-permission/:id" element={<EditPermission />} />
            <Route path="/permission-info/:id" element={<InfoPermission />} />

            <Route path="/blacklist" element={<Blacklist />} />
            <Route path="/blacklist-reasons" element={<BlacklistReasons />} />
            <Route path="/add-reason" element={<AddReason />} />
            <Route path="/edit-reason/:id" element={<EditReason />} />

            <Route path="/technicians" element={<Technicians />} />
            <Route
              path="/technicians/prices/:id"
              element={<TechniciansPrices />}
            />
            <Route path="/technicians/add" element={<AddTechnician />} />
            <Route path="technicians/edit/:id" element={<EditTechnician />} />
            <Route path="technicians/:id" element={<InfoTechnician />} />

            {/* Queue Management Routes */}
            <Route path="/queue" element={<QueueList />} />
            <Route path="/queue/add-new" element={<AddQueue />} />
            <Route path="/queue/edit-queue/:id" element={<EditQueue />} />

            {/*Appointment Types Routes  */}
            <Route path="/appointment-types" element={<AppointmentTypes />} />
            <Route
              path="/appointment-types/add"
              element={<AddAppointmentType />}
            />
            <Route
              path="/appointment-types/:id/edit"
              element={<EditAppointmentType />}
            />

            {/* AnamnesisList Page Routes */}
            <Route path="/anamnesis" element={<AnamnesisCategoryList />} />
            <Route
              path="/anamnesis/add-category"
              element={<AddAnamnesisCategory />}
            />
            <Route
              path="/anamnesis/edit-category/:id"
              element={<EditAnamnesisCategory />}
            />
            <Route
              path="/anamnesis/anamnesis-details/:categoryId"
              element={<AnamnesisList />}
            />
            <Route
              path="/anamnesis/anamnesis-details/:categoryId/add"
              element={<AddAnamnesis />}
            />
            <Route
              path="/anamnesis/anamnesis-details/:categoryId/edit/:id"
              element={<EditAnamnesis />}
            />
            {/* Checklist Page Routes */}
            <Route path="checklist" element={<ChecklistPage />} />
            <Route path="checklist/add" element={<AddCheckList />} />
            <Route path="checklist/:id/edit" element={<EditCheckList />} />

            {/* Colors Page Routes */}
            <Route path="/colors" element={<ColorsPage />} />
            <Route path="/colors/add" element={<AddColor />} />
            <Route path="/colors/:id/edit" element={<EditColor />} />

            {/* Price Category Page Routes */}
            <Route path="/price-category" element={<PriceCategory />} />
            <Route path="price-category/add" element={<AddPriceCategory />} />
            <Route
              path="price-category/:id/edit"
              element={<EditPriceCategory />}
            />

            {/* Cabinets Page Routes */}
            <Route path="/cabinets" element={<CabinetsPage />} />
            <Route path="/cabinets/add" element={<AddCabinet />} />
            <Route path="/cabinets/:id/edit" element={<EditCabinet />} />

            {/* Recepts Page Routes */}
            <Route path="/recepts" element={<ReceptsList />} />
            <Route path="/recepts/add" element={<AddRecept />} />
            <Route path="/recepts/edit/:id" element={<EditRecept />} />
            <Route path="/recepts/:id" element={<MedicinesList />} />
            <Route path="/recepts/:id/add" element={<AddMedicine />} />
            <Route path="/recepts/:id/edit/:id" element={<EditMedicine />} />
            {/* Insurance Page Routes */}
            <Route path="/insurance" element={<InsuranceList />} />
            <Route path="/insurance/add" element={<AddInsurance />} />
            <Route path="/insurance/edit/:id" element={<EditInsurance />} />

            {/* Dental Set Routes */}
            <Route path="/dental-set" element={<DentalSetList />} />
            <Route path="dental-set/add" element={<AddDentalSet />} />
            <Route path="dental-set/edit/:id" element={<EditDentalSet />} />

            {/* Reccomendations Page Routes */}
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route
              path="/recommendations/add"
              element={<AddRecommendation />}
            />
            <Route
              path="/recommendations/:id/edit"
              element={<EditRecommendation />}
            />

            {/* Implants Page Routes */}
            <Route path="/implants" element={<ImplantsList />} />
            <Route path="/implants/edit/:id" element={<EditImplant />} />
            <Route path="/implants/add" element={<AddImplant />} />
            <Route path="/implants/sizes/:name" element={<SizesList />} />
            <Route
              path="/implants/sizes/:name/edit/:id"
              element={<EditSize />}
            />
            <Route path="/implants/sizes/:name/add" element={<AddSize />} />

            {/* Operations Page Routes */}
            <Route path="/operations" element={<OperationCategoryList />} />
            <Route path="/operations/add" element={<AddOperationCategory />} />
            <Route
              path="/operations/edit/:id"
              element={<EditOperationCategory />}
            />
            <Route path="/operations/:id" element={<OperationList />} />
            <Route
              path="/operations/:name/edit/:id"
              element={<EditOperation />}
            />
            <Route path="/operations/:id/add" element={<AddOperation />} />

            {/* Teeth Pages Routes */}
            <Route path="/teeth" element={<TeethList />} />
            <Route path="/teeth/add" element={<AddTeeth />} />
            <Route path="/teeth/edit/:id" element={<EditTeeth />} />
            <Route
              path="/teeth/:id/operation-pictures"
              element={<OperationPictures />}
            />
            <Route
              path="/teeth/:id/operation-pictures/add"
              element={<AddOperationPicture />}
            />
            <Route
              path="/teeth/:id/examination-pictures"
              element={<ExaminationPictures />}
            />
            <Route
              path="/teeth/:id/examination-pictures/add"
              element={<AddExaminationPicture />}
            />

            {/* General Settings Routes */}
            <Route path="/general-settings" element={<GeneralSettings />} />
            <Route path="/general-settings/edit" element={<EditSettings />} />

            {/* Other Objects Routes */}
            <Route path="other-objects" element={<OtherObjects />} />
            <Route path="other-objects/add" element={<AddObject />} />
            <Route path="other-objects/:id/edit" element={<EditObject />} />

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
