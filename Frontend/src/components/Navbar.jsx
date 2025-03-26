import React, { useEffect } from "react";
import { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/course">Course</a>
      </li>
      <li>
        <a>Contact</a>
      </li>
      <li>
        <a>About</a>
      </li>
    </>
  );
  return (
    <>
      <div
        className={` max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 ${
          sticky
            ? "sticky-navbar shadow-md bg-base-200 dark:bg-slate-700 dark:text-white duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a className=" text-2xl font-bold cursor-pointer">bookStore</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="hidden md:block">
              <label className=" px-3 py-2 border rounded-md flex items-center gap-2">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <label className="swap swap-rotate">
  {/* This hidden checkbox controls the state */}
  <input
    type="checkbox"
    checked={theme === "dark"}
    onChange={() => setTheme(theme === "light" ? "dark" : "light")}
  />

  {/* Sun Icon (Light Mode) */}
  <svg
    className="swap-off fill-current w-7 h-7"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 18a1 1 0 0 1-.71-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71A1 1 0 0 1 12 18ZM12 6a1 1 0 0 1-.71-.29l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71A1 1 0 0 1 12 6ZM18 12a1 1 0 0 1-.29-.71l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71A1 1 0 0 1 18 12ZM6 12a1 1 0 0 1-.71-.29l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71A1 1 0 0 1 6 12ZM16.24 7.76a1 1 0 0 1-.71-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71A1 1 0 0 1 16.24 7.76ZM7.76 16.24a1 1 0 0 1-.71-.29l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71A1 1 0 0 1 7.76 16.24ZM16.24 16.24a1 1 0 0 1-.71-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71A1 1 0 0 1 16.24 16.24ZM7.76 7.76a1 1 0 0 1-.71-.29l-.71-.71a1 1 0 1 1 1.41-1.41l.71.71A1 1 0 0 1 7.76 7.76Z"
    />
  </svg>

  {/* Moon Icon (Dark Mode) */}
  <svg
    className="swap-on fill-current w-7 h-7"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M21.64 13a1 1 0 0 0-1.05-.14A8.05 8.05 0 0 1 17.22 15.63 8.15 8.15 0 0 1 9.08 5.49a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 13.64 10.64A1 1 0 0 0 21.64 13Z"
    />
  </svg>
</label>

            {authUser ? (
              <Logout />
            ) : (
              <div className="">
                <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
