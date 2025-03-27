import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        // Fetch book list from the public directory
        const res = await axios.get("/list.json");  // Access from public folder
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const handleBookSelect = (selectedBook) => {
    // Store the selected book in localStorage when the book card is clicked
    localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12">
          Discover a wide variety of books at your fingertips. Whether you're looking for bestsellers, 
            classics, or niche topics, we have a selection that caters to every reader's preference. 
            Our online bookstore makes it easy to explore, choose, and purchase books. We strive to offer 
            an exceptional shopping experience, from browsing to delivery, so you can enjoy your new book in no time!
          
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleBookSelect(item)} // On card click, store book in localStorage
            >
              <Cards item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
