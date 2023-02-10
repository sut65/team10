import * as React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AppBarPrivate from "./components/AppBarPrivate";
import AppBarPublic from "./components/AppBarPublic";
import Delivery from "./components/delivery/DeliveryUI";
import Confirmation from "./components/confirmation/ConfirmationUI";
import Promotion from "./components/promotion/PromotionUI";
import Home from "./components/Home";
import Vehicle from "./components/Vehicle/VehicleUI";
import ReceiveCreate from "./components/Receive/ReceiveCreate";
import Bill from "./components/bill/BillUI";
import CompleteCreate from "./components/complete/CompleteCreate";
import SignIn from "./components/SignIn_UI";
import CustomerCreate from "./components/customer/CustomerCreate";
import UpdateCustomer from "./components/customer/UpdateCustomer";
import NotFound from "./components/NotFound";
import EmployeeTable from "./components/employee/EmployeeTable";
import EmployeeUpdate_UI from "./components/employee/EmployeeUpdate_UI";
import Stock_UI from "./components/stock/Stock_UI";
import StockTable_UI from "./components/stock/StockTable";
import StockUpdate_UI from "./components/stock/StockUpdat";
import FormTable from "./components/form/TableForm";
import ServiceTable from "./components/service/TableService";
import ServiceCreate from "./components/service/ServiceCreate";
import ServiceUpdate from "./components/service/UpdateService";
import FormCreate from "./components/form/FormCreate";
import CompleteTable from "./components/complete/TabelComplete";
import UpdateComplete from "./components/complete/UpdateCompplete";
import FormUpdate from "./components/form/UpdateForm";
import PromotionTable_UI from "./components/promotion/PromotiontableUI";
import UpdatePromotion from "./components/promotion/UpdatePromotion";
import BillTable_UI from "./components/bill/BillTable";
import BillUpdate from "./components/bill/UpdateBill";
import UpdateReceive from "./components/Receive/UpdateReceive";
import ReceiveTableUI from "./components/Receive/ReceiveTableUI";
import UpdateVehicle from "./components/Vehicle/UpdateVehicle";
import VehicleTableUI from "./components/Vehicle/VehicleTableUI";
import { Routes } from "react-router-dom/";
export default function App() {
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return (
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255,201,60,1) 0%, rgba(134,229,255,1) 80%, rgba(0,129,201,1) 100%)",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/customer/create" element={<CustomerCreate />} />
            {/* if try to locate other path than this it will auto redirect to signin */}
            <Route path="*" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  if (localStorage.getItem("usertype") == "customer") {
    return (
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255,201,60,1) 0%, rgba(134,229,255,1) 80%, rgba(0,129,201,1) 100%)",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <BrowserRouter>
          <div>
            <AppBarPublic />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/confirmation/create" element={<Confirmation />} />
              <Route path="/bill" element={<BillTable_UI />} />
              <Route path="/bill/create" element={<Bill />} />
              <Route path="/bills/update/:id" element={<BillUpdate />} />
              <Route path="/customer/update" element={<UpdateCustomer />} />
              {/* <Route path="/form" element={<FormTable />} /> */}
              <Route path="/service" element={<ServiceCreate />} />
              <Route path="/serviceinfo" element={<ServiceTable />} />
              <Route path="/form" element={<FormCreate />} />
              <Route path="/forminfo" element={<FormTable />} />
              <Route path="/formsupdate/:id" element={<FormUpdate />} />
              <Route path="/serviceupdate/:id" element={<ServiceUpdate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  if (localStorage.getItem("usertype") == "employee") {
    return (
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255,201,60,1) 0%, rgba(134,229,255,1) 80%, rgba(0,129,201,1) 100%)",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <BrowserRouter>
          <div>
            <AppBarPrivate />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/promotion/" element={<PromotionTable_UI />} />
              <Route path="/promotion/create" element={<Promotion />} />
              <Route path="/promotion/update/:id" element={<UpdatePromotion />} />
              <Route path="/delivery/create" element={<Delivery />} />
              <Route path="/receive/create" element={<ReceiveCreate />} />
              <Route path="/receive/" element={<ReceiveTableUI />} />
              <Route path="/receive/update/:id" element={<UpdateReceive />} />
              <Route path="/vehicle/create" element={<Vehicle />} />
              <Route path="/vehicle/" element={<VehicleTableUI />} />
              <Route path="/vehicle/update/:id" element={<UpdateVehicle />} />
              <Route path="/create" element={<CompleteCreate />} />
              <Route path="/complete/info" element={<CompleteTable />} />
              <Route path="/employee" element={<EmployeeTable />} />
              <Route path="/complete/info/complete/update/:id" element={<UpdateComplete />} />
              {/* <Route path="/employee/create" element={<EmployeeCreate_UI />} /> */}
              <Route path="/employee/update" element={<EmployeeUpdate_UI />} />
              <Route path="/stock" element={<StockTable_UI />} />
              <Route path="/stock/create" element={<Stock_UI />} />
              <Route path="/stock/update" element={<StockUpdate_UI />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  } else {
    return <div></div>;
  }
}
