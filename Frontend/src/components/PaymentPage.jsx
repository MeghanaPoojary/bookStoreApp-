import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import toast, { Toaster } from "react-hot-toast"; // Importing toast

function PaymentPage() {
  const [user, setUser] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [selectedBook, setSelectedBook] = useState(null); // Store the selected book
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("Users"));
    if (userData) {
      setUser(userData);
    }

    // Fetch the selected book from localStorage
    const bookData = JSON.parse(localStorage.getItem("selectedBook")); // Book stored in localStorage
    if (bookData) {
      setSelectedBook(bookData); // Set the selected book if available
    }
  }, []); // Empty dependency array to run once on mount

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!selectedBook) {
      toast.error("Please select a book first.");
      return;
    }

    // Simulate payment success and show attractive toast notification
    toast.success("Payment Successful! 🎉", {
      position: "top-center",
      duration: 4000,
      style: {
        background: "#4CAF50", // Green color for success
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "16px",
        fontSize: "16px",
      },
    });

    // After payment, navigate to the course page or another page
    setTimeout(() => {
      navigate("/course"); // Or navigate to the next page after payment
    }, 1000); // Delay navigation to allow toast to show
  };

  if (!user || !selectedBook) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Payment Page
        </h1>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-medium text-gray-700">User Info</h2>
          <p className="text-lg text-gray-900">{user.fullname}</p>
          <p className="text-lg text-gray-900">{user.email}</p>
        </div>

        {/* Book Info - Display the selected book */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-medium text-gray-700">Selected Book</h2>
          {selectedBook && (
            <>
              <p className="text-lg text-gray-900">{selectedBook.title}</p>
              <p className="text-lg text-gray-900">${selectedBook.price}</p>
            </>
          )}
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Enter Payment Information</h3>

          {/* Card Number Input */}
          <div className="form-group">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
              }
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your card number"
            />
          </div>

          {/* Expiry Date Input */}
          <div className="form-group">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-600">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
              }
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="MM/YY"
            />
          </div>

          {/* CVV Input */}
          <div className="form-group">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-600">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={paymentInfo.cvv}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
              }
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="CVV"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>

      {/* Toaster to show the toast messages */}
      <Toaster />
    </div>
  );
}

export default PaymentPage;
