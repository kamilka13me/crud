import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/reg" className="text-white hover:underline">
            Register
          </Link>
          <Link to="/create" className="text-white hover:underline">
            Create Movie
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
