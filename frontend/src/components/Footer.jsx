import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 bg-gray-800 text-gray-300 py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        &copy; 2024 - FacultySystemManagment -{" "}
        <Link to="/privacy" className="text-blue-400 hover:underline">
          Privacy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
