import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  const handleLogOut = () => {
    localStorage.clear();
  };

  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <Link className="text-white text-lg font-bold" to="/">
          DevSync
        </Link>

        <button
          type="button"
          className="text-white focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setNavOpen(!navOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`${
          navOpen ? "block" : "hidden"
        } flex flex-col md:flex-row justify-end mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row">
          <li className="md:ml-4 mt-2 md:mt-0">
            <Link className="text-white text-lg" to="/community">
              Community
            </Link>
          </li>
          <li className="md:ml-4 mt-2 md:mt-0">
            <Link className="text-white text-lg" to="/collaboration">
              Collaboration Workspace
            </Link>
          </li>
          <li className="md:ml-4 mt-2 md:mt-0">
            <Link
              className="text-red-500 text-lg"
              to="/login"
              onClick={handleLogOut}
            >
              Log-out
            </Link>
          </li>
        </ul>
          
      </div>
    </nav>
  );
};

export default Navbar;
