import React, { useState } from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useUser } from "../../../context/UserContext";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-6 bg-blue-800 text-white relative">
      <div className="flex items-center w-1/4">
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <AiOutlineClose size={30} /> : <FiMenu size={30} />}
        </button>
        <Link to="/" className="text-3xl font-bold">
          <h2 className="max-sm:hidden">DM</h2>
        </Link>
      </div>
      <div className="flex-grow flex justify-center hidden md:flex">
        <NavLinks />
      </div>
      <div className="flex items-center w-1/4 justify-end space-x-2">
        <span className="font-semibold">
          {user ? user?.user?.nickname : "Guest"}
        </span>
        <Link to={user ? "/account" : "/signin"} className="flex items-center">
          <VscAccount size={30} />
        </Link>

      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-[100vh] bg-blue-800 z-10 flex flex-col items-start p-6 transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-wrap justify-between w-full align-center">
            <Link
              to="/"
              className="text-3xl font-bold mb-6"
              onClick={toggleMenu}
            >
              DM
            </Link>
            <AiOutlineClose size={20} onClick={toggleMenu} />
          </div>
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
