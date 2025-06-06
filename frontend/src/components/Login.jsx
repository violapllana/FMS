import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Header from './Header';
import Footer from './Footer'; 
import FMSLogo from '../assets/images/FMS.png'; 
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
    setErrorMessage('All fields are required.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log('User data from backend:', data.user);

    if (!response.ok) {
      setErrorMessage(data.message || 'Login failed');
      return;
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    switch (data.user.role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'profesor':
        navigate('/professor-dashboard');
        break;
      default:
        setErrorMessage('User role not recognized.');
    }
  } catch (err) {
    console.error('Login error:', err);
    setErrorMessage('Login failed. Please try again.');
  }
};

  const handleGoogleLogin = (response) => {
    console.log('Google token:', response.credential);
  };

  const handleAppleLogin = () => {
    alert('Apple login not implemented');
  };

  return (
    <>
    <Header />
    <GoogleOAuthProvider clientId="your-client-id">
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left Side Image */}
          <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <img
              src={FMSLogo}
              alt="Card Preview"
              className="w-full max"
            />
          </div>

          {/* Right Side Form */}
          <div className="w-1/2 p-10">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">
              Welcome to <span className="italic font-medium">your</span> Account!
            </h2>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => alert('Google Login')}
                className="flex-1 bg-white border px-4 py-2 rounded-md shadow-sm flex items-center justify-center gap-2 text-sm"
              >
                <img src="https://img.icons8.com/color/16/google-logo.png" alt="google" />
                Sign in with Google
              </button>
              <button
                onClick={handleAppleLogin}
                className="flex-1 bg-white border px-4 py-2 rounded-md shadow-sm flex items-center justify-center gap-2 text-sm"
              >
          <img src="https://img.icons8.com/color/16/facebook-new.png" alt="facebook" />

                Sign in with Facebook
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mt-4">
                <label className="block text-sm mb-1">Email Adress</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-md px-4 py-2 pl-10 focus:outline-none"
                    placeholder="you@example.com"
                  />
                  <FaEnvelope className="absolute top-2.5 left-3 text-gray-400" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md px-4 py-2 pl-10 pr-10 focus:outline-none"
                    placeholder="••••••••"
                  />
                  <FaLock className="absolute top-2.5 left-3 text-gray-400" />
                  <span
                    className="absolute top-2.5 right-3 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="flex justify-end text-sm mt-2">
                <a href="#" className="text-gray-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-900"
              >
                Sign in
              </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-500">
              Don’t you have an account?{' '}
              <a href="/register" className="text-black underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
    <Footer />
    </>
  );
};

export default Login;
