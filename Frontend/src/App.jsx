import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Contacts from "./contacts/Contacts";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Abouts from "./abouts/Abouts";
import UserInformation from "./components/UserInformation";
import PaymentPage from "./components/PaymentPage";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
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
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
