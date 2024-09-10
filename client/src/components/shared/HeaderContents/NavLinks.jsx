import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ onClick }) => {
  return (
    <div>
      <ul className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
        <li onClick={onClick}>
          <NavLink to="/skills">Skills</NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink to="/about">About</NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink to="/blog">Blog</NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink to="/projects">Projects</NavLink>
        </li>
        <li onClick={onClick}>
          <NavLink to="/resume">Resume</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;