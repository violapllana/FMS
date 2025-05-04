import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">FSM</h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          {/* <Link to="/contactus" className="hover:underline">Contact Us</Link> */}
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;