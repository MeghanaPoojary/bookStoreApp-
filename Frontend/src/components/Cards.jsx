import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function Cards({ item }) {
  const navigate = useNavigate(); // Initialize the navigate function using useNavigate hook

  const handleBuyNow = () => {
    // Navigate to the user information page when the button is clicked
    navigate("/user-info");
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-80 h-[400px] bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border flex flex-col">
        
        {/* Full Image Display Without Cropping */}
        <figure className="h-[250px] flex items-center justify-center bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
        </figure>

        <div className="card-body flex-grow">
          <h2 className="card-title text-lg">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p className="text-sm min-h-[30px]">{item.title}</p>
          <div className="card-actions justify-between mt-auto">
            <div className="badge badge-outline">${item.price}</div>
            <div
              onClick={handleBuyNow} // Handle the click to navigate
              className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
            >
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
