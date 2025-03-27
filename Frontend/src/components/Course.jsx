import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const storedBooks = JSON.parse(localStorage.getItem("books"));

      if (storedBooks) {
        setBooks(storedBooks); // Load from localStorage if available
      } else {
        try {
          const res = await axios.get("/list.json"); // Fetch from public folder
          setBooks(res.data);
          localStorage.setItem("books", JSON.stringify(res.data)); // Save to localStorage
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
    };

    loadBooks();
  }, []);

  const handleBookSelect = (selectedBook) => {
    localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          We're delighted to have you{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-12">
          Discover a wide variety of books at your fingertips. Whether you're looking for bestsellers,
          classics, or niche topics, we have a selection that caters to every reader's preference.
          Our online bookstore makes it easy to explore, choose, and purchase books.
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {books.length > 0 ? (
          books.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleBookSelect(item)}
            >
              <Cards item={item} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No books available</p>
        )}
      </div>
    </div>
  );
}

export default Course;
