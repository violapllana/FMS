import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000/api/professors'; // professor backend URL

const ProfessorProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(storedUser || {});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!storedUser) {
    return <p>Please log in to view your profile.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user._id && !user.id) {
      setError('User ID is missing.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const bodyData = {
        username: user.username,
        email: user.email,
      };

      if (user.password && user.password.trim() !== '') {
        bodyData.password = user.password;
      }

      const response = await fetch(`${API_BASE_URL}/${user._id || user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error saving data');
      }

      const updatedUser = await response.json();

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      alert('Data saved successfully on the server!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Professor Profile</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block font-medium">Username:</label>
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={user.username || ''}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        ) : (
          <p>{user.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        ) : (
          <p>{user.email}</p>
        )}
      </div>

      {isEditing && (
        <div className="mb-4">
          <label className="block font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password || ''}
            onChange={handleChange}
            placeholder="Enter new password (or leave empty)"
            className="w-full border rounded px-2 py-1"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium">ID:</label>
        <p>{user._id || user.id || '-'}</p>
      </div>

      {isEditing ? (
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfessorProfile;
