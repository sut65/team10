import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBarPrivate from "./components/AppBarPrivate";

// import SignIn from "./components/SignIn_UI";
// import Employee_entry from "./components/EmployeeData_UI";
// import EmployeeTable_UI from "./components/EmployeeTable_UI";
// import Patient_UI from './components/Patient_UI';
// import Diagnostic_Table from "./components/Diagnostic";
// import Diagnostic_Entry from "./components/DiagnosticCreate";
// import Dispensation from './components/Dispensation_UI';
// import Appointment_UI from "./components/AppointmentCreate_UI";
// import Bill_UI from './components/Bill_UI';
import Home from "./components/Home";

export default function App() {
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    //return <SignIn />;
  }

  return (
  <Router>
    <div>
      <AppBarPrivate />
        <Route path="/" component={Home} />
        {/* <Route path="/employee/create" element={<Employee_entry />} />
        <Route path="/employee" element={<EmployeeTable_UI />} />
        <Route path="/patient" element={<Patient_UI />} />
        <Route path="/diagnostic" element={<Diagnostic_Table />} />
        <Route path="/dispensation" element={<Dispensation />} />
        <Route path="/appointment" element={<Appointment_UI />} />
        <Route path="/Bill" element={<Bill_UI />} />
        <Route path="/diagnostic/create" element={<Diagnostic_Entry />} /> */}
    </div>
  </Router>
  );
}