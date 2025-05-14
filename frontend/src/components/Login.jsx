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


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
        } else if (data.user.role === 'profesor') {
          navigate('/professor-dashboard');
        } else {
          setErrorMessage('Roli i përdoruesit nuk u gjet.');
        }
      } else {
        setErrorMessage(response.data.message || 'Login ka dështuar.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Ka ndodhur një gabim, provoni përsëri.');
    }
  };

  const handleGoogleLogin = (response) => {
    fetch('http://localhost:5000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Google login successful', data);
        // Ruaj session-in dhe redirekto
      })
      .catch((error) => console.error(error));
  };

  const handleFacebookLogin = () => {
    // Kjo do të drejtojë përdoruesin në endpoint-in e backend-it për login me Facebook
    window.location.href = 'http://localhost:5000/api/auth/facebook';
  };

  return (
    <GoogleOAuthProvider clientId="739312351091-fvh0nbib14jsfpetg4ofsfbr1r7dkguo.apps.googleusercontent.com">
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

          <div className="mt-4 text-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log('Google login failed')}
            />
            <button
              onClick={handleFacebookLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center mt-2"
            >
              <i className="fa fa-facebook mr-2"></i>
              Login with Facebook
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </GoogleOAuthProvider>
  );
};

export default Login;
