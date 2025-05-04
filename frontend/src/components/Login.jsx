import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (!email || !password) {
      setErrorMessage('Të gjitha fushat janë të detyrueshme.');
      return;
    }
  
    // Kontrollo formati i email-it
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Email nuk është valid.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
      if (response.status === 200) {
        const data = response.data; // Fitoni të dhënat e kthyer nga backend
  
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
  
        // Redirect me bazë të rolit
        if (data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (data.user.role === 'student') {
          navigate('/student-dashboard');
        } else if( data.user.role === 'profesor') {
          navigate('/professor-dashboard');
        }
          setErrorMessage('Roli i përdoruesit nuk u gjet.');
      } else {
        setErrorMessage(response.data.message || 'Login ka dështuar.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Ka ndodhur një gabim, provoni përsëri.');
    }
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600">Login</h2>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-3 top-8 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="/register" className="text-sm text-cyan-600 hover:text-cyan-800">
              Don’t have an account? Register here
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
