import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useAuth } from "../context/AuthProvider"; // Use your Auth context

function UserInformation() {
  const navigate = useNavigate(); // Initialize navigate function
  const [authUser] = useAuth(); // Access the user data from the context

  const handleProceedToPayment = () => {
    // Navigate to the payment page
    navigate("/payment");
  };

  if (!authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div> {/* Show loading if user data is not available */}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">User Information</h1>
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium text-gray-700">Full Name:</p>
            <p className="text-xl text-gray-900">{authUser.fullname}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Email:</p>
            <p className="text-xl text-gray-900">{authUser.email}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleProceedToPayment}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
