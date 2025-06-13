import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer'; 
import FMSLogo from '../assets/images/FMS.png'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFbLoggingIn, setIsFbLoggingIn] = useState(false); // shtuar

  useEffect(() => {

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '4017319421915522',
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);


  const isFacebookLoginAllowed = () => {
    return (
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  };

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

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const response = await axios.post(
        'http://localhost:5000/api/auth/google-login',
        {},
        {
          headers: { Authorization: `Bearer ${idToken}` }
        }
      );

      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

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
    } catch (error) {
      console.error('Google login error:', error);
      setErrorMessage('Google login failed');
    }
  };


  const handleFacebookLogin = () => {
    setErrorMessage('');
    if (!isFacebookLoginAllowed()) {
      setErrorMessage('Facebook login requires HTTPS or localhost.');
      return;
    }
    if (isFbLoggingIn) return;
    setIsFbLoggingIn(true);

    window.FB.login(
      (response) => {
        setIsFbLoggingIn(false);
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          facebookLoginBackend(accessToken);
        } else {
          setErrorMessage('Facebook login cancelled or failed');
        }
      },
      { scope: 'email' }
    );
  };

  const facebookLoginBackend = async (accessToken) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/facebook-login',
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

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
    } catch (error) {
      console.error('Facebook login error:', error);
      setErrorMessage('Facebook login failed');
    }
  };

  return (
    <>
      <Header />
      <GoogleOAuthProvider clientId="173061548428-2bvb3f3g52589nn0c8n2uq3prm2ofgd6.apps.googleusercontent.com">
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
                <div className="flex-1 flex items-center justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>

                <button
                  onClick={handleFacebookLogin}
                  disabled={!isFacebookLoginAllowed() || isFbLoggingIn}
                  className={`flex-1 bg-white border px-4 py-2 rounded-md shadow-sm flex items-center justify-center gap-2 text-sm
                    ${(!isFacebookLoginAllowed() || isFbLoggingIn) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                      autoComplete="current-password"
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
