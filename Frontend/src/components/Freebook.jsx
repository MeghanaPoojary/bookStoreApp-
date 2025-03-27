import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

function Freebook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let storedBooks = JSON.parse(localStorage.getItem("books"));

        if (!storedBooks) {
          // Fetch from API if localStorage is empty
          const res = await axios.get("http://localhost:4001/book");
          storedBooks = res.data;
          localStorage.setItem("books", JSON.stringify(storedBooks));
        }

        // Filter Free books
        const freeBooks = storedBooks.filter((book) => book.category === "Free");
        setBooks(freeBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
        <p>🎉 "Great Reads at Zero Cost! 🚀 Browse our free book collection and fuel your mind without spending a dime!"</p>
      </div>

      <div>
        {books.length > 0 ? (
          <Slider {...settings}>
            {books.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        ) : (
          <p className="text-gray-500 text-center mt-5">No free books available</p>
        )}
      </div>
    </div>
  );
}

export default Freebook;
