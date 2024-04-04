import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminlayout from "./Util/Admin/Adminlayout";
import Dashboard from "./pages/Admin/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Transactions from "./pages/Transactions/Transactions";
import UserDashboard from "../src/pages/UserDashboard/UserDashboard";
import TransactionsID from "./pages/TransactionsID/TransactionsID";
import RegisteredUsers from "./pages/RegisteredUsers/RegisteredUsers";
import UserInformation from "./pages/UserInformation/UserInformation";
import UserEdit from "./pages/UserEdit/UserEdit";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";

import SignIn from "./pages/Auth/SignIn/SignIn";

import NewPassword from "./pages/Auth/NewPassword/NewPassword";
import Protection from "./pages/Auth/Protection/Protection";
function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            path="/signin"
            element={<SignIn />}
          />

          <Route
            path="/forgotpassword"
            element={<ForgotPassword />}
          />

          <Route
            path="/newpassword"
            element={<NewPassword />}
          />
          <Route
            path="/newpassword/:id"
            element={<NewPassword />}
          />
          <Route
            element={
              !token ? (
                <SignIn />
              ) : (
            
                  <Adminlayout />
             
              )
            }>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/userdashboard"
              element={<UserDashboard />}
            />
            <Route
              path="/userinformation"
              element={<UserInformation />}
            />
            <Route
              path="/userinformation/:userId"
              element={<UserInformation />}
            />

            <Route
              path="/registeredusers"
              element={<RegisteredUsers />}
            />
            <Route
              path="/transactions"
              element={<Transactions />}
            />
         
            <Route
              path="/useredit/:id/:username/:name/:is_active/:is_staff/:phone_number/:email"
              element={<UserEdit />}
            />
            <Route
              path="/transactions/:transactionsId"
              element={<TransactionsID />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
