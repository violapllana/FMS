import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import Footer from './Footer';
import FMSLogo from '../assets/images/FMS.png';

const Register = () => {
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    role: 'student', 
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', values);
      setMessage(response.data.message || 'Registration successful!');
      resetForm();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header />
   <div className="min-h-screen flex items-center justify-center bg-white px-4">
  <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
    {/* Foto mbi */}
    <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
      <img src={FMSLogo} alt="FMS Preview" className="w-full" />
    </div>

          {/* Right Side Form */}
    <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">
              Create <span className="italic font-medium">your</span> Account!
            </h2>

            {message && (
              <div
                className={`mb-2 text-sm ${
                  message.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {message}
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Username */}
                  <div className="mt-4">
                    <label className="block text-sm mb-1" htmlFor="username">
                      Username
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="w-full border rounded-md px-4 py-2 pl-10 focus:outline-none"
                        placeholder="Your username"
                      />
                      <FaUser className="absolute top-2.5 left-3 text-gray-400" />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Email */}
                  <div className="mt-4">
                    <label className="block text-sm mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="w-full border rounded-md px-4 py-2 pl-10 focus:outline-none"
                        placeholder="you@example.com"
                      />
                      <FaEnvelope className="absolute top-2.5 left-3 text-gray-400" />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="mt-4">
                    <label className="block text-sm mb-1" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
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
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </button>
                </Form>
              )}
            </Formik>

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
