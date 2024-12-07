import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Addstock from "./pages/Addstock";
import SearchStock from "./pages/SearchStock";
import StockDetails from "./pages/StockDetails";
import UserManagement from "./pages/UserManagement";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logs from "./pages/Logs";
import { UIThemeProvider } from "./context/ThemeContext";

const App = () => {
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token !== null) {
      setLoading(false); // Set loading to false once the token is available
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state until token is checked
  }

  return (
    <UIThemeProvider>
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000} // Close after 5 seconds
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <DashboardProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={token ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/addstock"
                element={token ? <Addstock /> : <Navigate to="/login" />}
              />
              <Route
                path="/stocks"
                element={token ? <SearchStock /> : <Navigate to="/login" />}
              />
              <Route
                path="/stocks/:stockId"
                element={token ? <StockDetails /> : <Navigate to="/login" />}
              />
              <Route
                path="/logs"
                element={token ? <Logs /> : <Navigate to="/login" />}
              />
              <Route
                path="/user-management"
                element={token ? <UserManagement /> : <Navigate to="/login" />}
              />
            </Routes>
          </BrowserRouter>
        </DashboardProvider>
      </AuthProvider>
    </UIThemeProvider>
  );
};

export default App;
