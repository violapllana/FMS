import React, { useState } from 'react';
import Header from '../Header'; 
import Footer from '../Footer';

const ContactUs = ({ onMessageAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // "success" or "error"

  const addMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    setMessageType('');

    // Basic validation
    if (!firstName || !messageContent) {
      setResponseMessage('First Name and Message cannot be empty.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    // Basic email check
    if (!email.includes('@') || !email.includes('.')) {
      setResponseMessage('Email format is invalid.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const newMessage = { firstName, lastName, email, phoneNumber, reason, messageContent };

    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });
      const data = await res.json();

      if (res.ok && data.message) {
        setResponseMessage(data.message);
        setMessageType('success');
        onMessageAdded?.();
        // Clear form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setReason('');
        setMessageContent('');
      } else {
        setResponseMessage(data.error || 'There was an error sending your message.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('API error:', error);
      setResponseMessage('There was an error sending your message.');
      setMessageType('error');
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className=" bg-gray-50 flex items-center justify-center py-12">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600">Contact Us</h2>

          {responseMessage && (
            <div
              className={`text-sm mt-2 text-center ${
                messageType === 'error' ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {responseMessage}
            </div>
          )}

          <form onSubmit={addMessage} className="mt-6">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Contact
              </label>
              <select
                id="reason"
                className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select a reason</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="messageContent"
                placeholder="Enter your message"
                className="w-full px-6 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
