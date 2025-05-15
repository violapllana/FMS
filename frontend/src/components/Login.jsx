// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// const Login = () => {
//   const navigate = useNavigate(); 
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
  
//     if (!email || !password) {
//       setErrorMessage('Të gjitha fushat janë të detyrueshme.');
//       return;
//     }
  
//     // Kontrollo formati i email-it
//     if (!email.includes('@') || !email.includes('.')) {
//       setErrorMessage('Email nuk është valid.');
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
//       if (response.status === 200) {
//         const data = response.data; // Fitoni të dhënat e kthyer nga backend
  
//         localStorage.setItem('user', JSON.stringify(data.user));
//         localStorage.setItem('token', data.token);
  
//         // Redirect me bazë të rolit
//         if (data.user.role === 'admin') {
//           navigate('/admin-dashboard');
//         } else if (data.user.role === 'student') {
//           navigate('/student-dashboard');
//         } else if( data.user.role === 'profesor') {
//           navigate('/professor-dashboard');
//         }
//           setErrorMessage('Roli i përdoruesit nuk u gjet.');
//       } else {
//         setErrorMessage(response.data.message || 'Login ka dështuar.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setErrorMessage('Ka ndodhur një gabim, provoni përsëri.');
//     }
//   };
  
//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-center text-blue-600">Login</h2>

//           {errorMessage && (
//             <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>
//           )}

//           <form onSubmit={handleLogin} className="mt-6">
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-4 relative">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <div className="absolute inset-y-0 right-3 top-8 flex items-center cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Log In
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <a href="/register" className="text-sm text-cyan-600 hover:text-cyan-800">
//               Don’t have an account? Register here
//             </a>
//           </div>
//           <div className="mt-4 text-center">
//   <a
//     href="http://localhost:5000/api/auth/google"
//     className="block w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
//   >
//     Login with Google
//   </a>
//   <a
//     href="http://localhost:5000/api/auth/facebook"
//     className="block w-full bg-blue-800 text-white py-2 px-4 mt-2 rounded hover:bg-blue-900"
//   >
//     Login with Facebook
//   </a>
// </div>

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;
// import { GoogleLogin } from '@react-oauth/google';
// // import FacebookLogin from 'react-facebook-login'; // ✅ CORRECT
// import { LoginSocialFacebook } from 'reactjs-social-login';

// const Login = () => {
//   const handleGoogleLogin = (response) => {
//     fetch('http://localhost:5000/auth/google', {
//       method: 'POST',
//       body: JSON.stringify({ token: response.credential }),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       // Menaxho session-in dhe redirekto
//     })
//     .catch((error) => console.error(error));
//   };

//   const handleFacebookLogin = (response) => {
//     fetch('http://localhost:5000/auth/facebook', {
//       method: 'POST',
//       body: JSON.stringify({ token: response.accessToken }),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       // Menaxho session-in dhe redirekto
//     })
//     .catch((error) => console.error(error));
//   };

//   return (
//     <div>
//       <GoogleLogin onSuccess={handleGoogleLogin} onError={(error) => console.log(error)} />
//       <LoginSocialFacebook onSuccess={handleFacebookLogin} onError={(error) => console.log(error)} />
//     </div>
//   );
// };

// export default Login;
// src/components/Login.jsx
// import React from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// const Login = () => {
//   const handleGoogleLogin = (response) => {
//     fetch('http://localhost:5000/auth/google', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: response.credential }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('Google login successful', data);
//         // Ruaj session-in dhe redirekto
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleFacebookLogin = () => {
//     // Kjo do të drejtojë përdoruesin në endpoint-in e backend-it për login me Facebook
//     window.location.href = 'http://localhost:5000/api/auth/facebook';
//   };

//   return (
//     <GoogleOAuthProvider clientId="739312351091-fvh0nbib14jsfpetg4ofsfbr1r7dkguo.apps.googleusercontent.com">
//       <div className="flex flex-col items-center justify-center h-screen gap-4">
//         <GoogleLogin
//           onSuccess={handleGoogleLogin}
//           onError={() => console.log('Google login failed')}
//         />

//         <button
//           onClick={handleFacebookLogin}
//           className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
//         >
//           <i className="fa fa-facebook mr-2"></i>
//           Login with Facebook
//         </button>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email || !password) {
//       setErrorMessage('All fields are required.');
//       return;
//     }

//     if (!email.includes('@') || !email.includes('.')) {
//       setErrorMessage('Please enter a valid email.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

//       if (response.status === 200) {
//         const data = response.data;

//         localStorage.setItem('user', JSON.stringify(data.user));
//         localStorage.setItem('token', data.token);

//         // Redirect by role
//         if (data.user.role === 'admin') {
//           navigate('/admin-dashboard');
//         } else if (data.user.role === 'student') {
//           navigate('/student-dashboard');
//         } else if (data.user.role === 'professor') {
//           navigate('/professor-dashboard');
//         } else {
//           setErrorMessage('User role not recognized.');
//         }
//       } else {
//         setErrorMessage(response.data.message || 'Login failed.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setErrorMessage('An error occurred. Please try again.');
//     }
//   };

//   const handleGoogleLogin = (response) => {
//     fetch('http://localhost:5000/auth/google', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: response.credential }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('Google login success:', data);
//         // Store session & redirect accordingly
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleFacebookLogin = () => {
//     window.location.href = 'http://localhost:5000/api/auth/facebook';
//   };

//   return (
//     <GoogleOAuthProvider clientId="739312351091-fvh0nbib14jsfpetg4ofsfbr1r7dkguo.apps.googleusercontent.com">
//       <Header />
//       <div className="min-h-screen bg-purple-50 flex items-center justify-center">
//         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
//           <h2 className="text-3xl font-bold text-center text-purple-400">Login</h2>

//           {errorMessage && (
//             <div className="text-red-500 text-sm mt-2 text-center">{errorMessage}</div>
//           )}

//           <form onSubmit={handleLogin} className="mt-6">
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-4 relative">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 pr-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <div
//                 className="absolute inset-y-0 right-3 top-8 flex items-center cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-purple-300 text-white font-semibold rounded-md hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
//             >
//               Log In
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <a href="/register" className="text-sm text-purple-400 hover:text-purple-500">
//               Don’t have an account? Register here
//             </a>
//           </div>

//           <div className="mt-6 space-y-2 text-center">
//             <GoogleLogin
//               onSuccess={handleGoogleLogin}
//               onError={() => console.log('Google login failed')}
//             />
//             <button
//               onClick={handleFacebookLogin}
//               className="w-full bg-blue-400 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-500"
//             >
//               <i className="fa fa-facebook mr-2"></i>
//               Log in with Facebook
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;
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

    // Replace with actual backend call
    try {
      const mockResponse = { status: 200, data: { user: { role: 'admin' }, token: 'token' } };
      const data = mockResponse.data;

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      switch (data.user.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'professor':
          navigate('/professor-dashboard');
          break;
        default:
          setErrorMessage('User role not recognized.');
      }
    } catch (err) {
      setErrorMessage('Login failed.');
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
