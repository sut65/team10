import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBarPrivate from "./components/AppBarPrivate";
import AppBarPublic from "./components/AppBarPublic";

import Delivery from "./components/delivery/DeliveryUI";
import Confirmation from "./components/confirmation/ConfirmationUI";
import Promotion from "./components/promotion/PromotionUI";
import Home from "./components/Home";
import Vehicle from "./components/Vehicle/VehiclrUI";
import ReceiveCreate from "./components/Receive/ReceiveUI";
import Bill from "./components/bill/BillUI";
import CompleteCreate from "./components/complete/CompleteCreate";
import SignIn from "./components/SignIn_UI";

export default function App() {
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  // if (!token) {
  //   return <SignIn />;
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
      <Router>
        <div>
          <AppBarPublic />
          <AppBarPrivate />
          <Route exact path="/" component={Home} />
          <Route exact path="/promotion/create" component={Promotion} />
          <Route exact path="/confirmation/create" component={Confirmation} />
          <Route exact path="/delivery/create" component={Delivery} />
          <Route exact path="/bill/create" component={Bill} />
          <Route exact path="/receive/create" component={ReceiveCreate} />
          <Route exact path="/vehicle/create" component={Vehicle} />
          <Route exact path="/complete/create" component={CompleteCreate} />
        </div>
      </Router>
    </div>
  );
}
