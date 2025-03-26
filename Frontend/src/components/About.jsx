import React from "react";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 mt-20">
      <div className="w-full max-w-screen-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-primary">About Us 📚</h1>
        <p className="mt-6 text-gray-600 text-lg text-center">
          Welcome to <span className="font-bold text-secondary">BookStoreApp</span>! We believe books have the power to inspire, educate, and entertain. Our mission is to make book shopping effortless and enjoyable for everyone.
        </p>

        <div className="mt-8 space-y-6">
          <div className="card bg-base-100 shadow-md p-6 w-full">
            <h2 className="text-2xl font-semibold">📌 What We Offer</h2>
            <ul className="list-disc pl-6 text-gray-500 text-lg">
              <li>Wide collection of books across various genres</li>
              <li>Secure online purchasing</li>
              <li>Personalized recommendations</li>
            </ul>
          </div>

          <div className="card bg-base-100 shadow-md p-6 w-full">
            <h2 className="text-2xl font-semibold">✨ Why Choose Us?</h2>
            <ul className="list-disc pl-6 text-gray-500 text-lg">
              <li>Vast collection from bestsellers to rare finds</li>
              <li>Hassle-free shopping experience</li>
              <li>Fast and secure delivery</li>
            </ul>
          </div>

          <div className="card bg-base-100 shadow-md p-6 w-full">
            <h2 className="text-2xl font-semibold">📞 Contact Us</h2>
            <p className="text-lg">
              Email: <a href="mailto:support@bookstoreapp.com" className="text-blue-500">support@bookstoreapp.com</a>
            </p>
            <p className="text-lg">📍 Location: Mangalore</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
