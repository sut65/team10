import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AppBarPrivate from "./components/AppBarPrivate";
import AppBarPublic from "./components/AppBarPublic";

import Delivery from "./components/delivery/DeliveryUI";
import Confirmation from "./components/confirmation/ConfirmationUI";
import Promotion from "./components/promotion/PromotionUI";
import Home from "./components/Home";
import Vehicle from "./components/Vehicle/VehiclrUI";
import ReceiveCreate from "./components/Receive/ReceiveCreate";
import Bill from "./components/bill/BillUI";
import CompleteCreate from "./components/complete/CompleteCreate";
import SignIn from "./components/SignIn_UI";
import CustomerCreate from "./components/customer/CustomerCreate";

export default function App() {
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  // if (!token) {
  //   return (
  //     <div>
  //       <SignIn/>
  //       <Routes>
  //         <Route path=":id" element={<UserProfile />} />
  //         <Route path="me" element={<OwnUserProfile />} />
  //       </Routes>
  //     </div>
  //   );
  // }

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
          <AppBarPrivate />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/promotion/create" element={<Promotion/>} />
            <Route path="/confirmation/create" element={<Confirmation/>} />
            <Route path="/delivery/create" element={<Delivery/>} />
            <Route path="/bill/create" element={<Bill/>} />
            <Route path="/receive/create" element={<ReceiveCreate/>} />
            <Route path="/vehicle/create" element={<Vehicle/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
