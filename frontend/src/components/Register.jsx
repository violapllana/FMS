// import React, { useState } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'student', // mund të jetë 'admin' ose 'professor' sipas nevojës
//   });
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     const { username, email, password, role } = formData;

//     if (!username || !email || !password) {
//       setMessage('Të gjitha fushat janë të detyrueshme.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', {
//         ...formData,
//       });
//       setMessage(response.data.message || 'Regjistrimi ishte i suksesshëm!');
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Regjistrimi ka dështuar.');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-center text-blue-600">Register</h2>

//           {message && (
//             <div className="text-red-500 text-sm mt-2 text-center">{message}</div>
//           )}

//           <form onSubmit={handleSubmit} className="mt-6">
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 placeholder="Enter your username"
//                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-4 relative">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 placeholder="Create a password"
//                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                 value={formData.password}
//                 onChange={handleChange}
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
//               Register
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <a href="/login" className="text-sm text-cyan-600 hover:text-cyan-800">
//               Already have an account? Log in here
//             </a>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import FMSLogo from '../assets/images/FMS.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const { username, email, password, role } = formData;
    if (!username || !email || !password) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(response.data.message || 'Registration successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left Side Image */}
          <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <img src={FMSLogo} alt="FMS Preview" className="w-full" />
          </div>

          {/* Right Side Form */}
          <div className="w-1/2 p-10">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">
              Create <span className="italic font-medium">your</span> Account!
            </h2>

            {message && <div className="text-red-500 text-sm mb-2">{message}</div>}

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mt-4">
                <label className="block text-sm mb-1">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 pl-10 focus:outline-none"
                    placeholder="Your username"
                  />
                  <FaUser className="absolute top-2.5 left-3 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label className="block text-sm mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 pl-10 focus:outline-none"
                    placeholder="you@example.com"
                  />
                  <FaEnvelope className="absolute top-2.5 left-3 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div className="mt-4">
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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

              <button
                type="submit"
                className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-900"
              >
                Register
              </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-black underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
