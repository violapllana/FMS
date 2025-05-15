import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white-100 text-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">FSM</h1>
        <nav className="space-x-6 text-sm md:text-base">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/contactform" className="hover:text-blue-500">Contact Us</Link>
          <Link to="/aboutus" className="hover:text-blue-500">About Us</Link>
          <Link to="/Library" className="hover:text-blue-500">Library</Link>
          <Link to="/productpage" className="hover:text-blue-500">Products</Link>
          {/* <Link to="/programs" className="hover:text-blue-500">Programs</Link> */}
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          <Link to="/register" className="hover:text-blue-500">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
