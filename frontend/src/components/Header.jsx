
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white text-gray-800 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">FMS</h1>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 text-sm md:text-base">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/contactform" className="hover:text-blue-500">Contact Us</Link>
          <Link to="/aboutus" className="hover:text-blue-500">About Us</Link>
          <Link to="/Library" className="hover:text-blue-500">Library</Link>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          <Link to="/register" className="hover:text-blue-500">Register</Link>
        </nav>

        {/* Mobile menu icon */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile sidebar menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header në menunë anash */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <span className="font-semibold text-lg">Kyçu apo regjistrohu</span>
          <button
            onClick={toggleMobileMenu}
            aria-label="Close menu"
            className="focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista e linkeve */}
        <nav className="flex flex-col px-6 py-4 space-y-4 text-black text-base">
          <Link to="/" onClick={toggleMobileMenu} className="flex items-center space-x-3 hover:text-blue-600 cursor-pointer">
            {/* Ikona mund ta shtosh këtu */}
            <span>Home</span>
          </Link>
          <Link to="/contactform" onClick={toggleMobileMenu} className="hover:text-blue-600 cursor-pointer">Contact Us</Link>
          <Link to="/aboutus" onClick={toggleMobileMenu} className="hover:text-blue-600 cursor-pointer">About Us</Link>
          <Link to="/Library" onClick={toggleMobileMenu} className="hover:text-blue-600 cursor-pointer">Library</Link>
          <Link to="/bookslist" onClick={toggleMobileMenu} className="hover:text-blue-600 cursor-pointer">Products</Link>
          <Link to="/login" onClick={toggleMobileMenu} className="hover:text-blue-600 cursor-pointer">Login</Link>
          <Link to="/register" onClick={toggleMobileMenu} className="hover:text-blue-600 cursor-pointer">Register</Link>
        </nav>
      </div>

      {/* Overlay për të mbyllur menunë kur klikohen jashtë */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleMobileMenu}
        />
      )}
    </header>
  );
}

export default Header;

