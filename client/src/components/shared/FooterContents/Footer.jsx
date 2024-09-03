import React from "react";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-3 mt-16">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
          <p className="text-xs text-gray-400 md:text-sm">
            Copyright 2024 &copy; All Rights Reserved
          </p>
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
