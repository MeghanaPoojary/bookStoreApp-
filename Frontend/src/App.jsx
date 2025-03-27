import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Contacts from "./contacts/Contacts";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Abouts from "./abouts/Abouts";
import UserInformation from "./components/UserInformation";
import PaymentPage from "./components/PaymentPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    setToken(localStorage.getItem("adminToken")); // Update token state if it changes
  }, []);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route
            path="/contact"
            element={authUser ? <Contacts /> : <Navigate to="/signup" />}
          />
          <Route
            path="/about"
            element={authUser ? <Abouts /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-info" element={<UserInformation />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin setToken={setToken} />} />
          <Route
            path="/admin/dashboard"
            element={token ? <AdminDashboard /> : <Navigate to="/admin" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
