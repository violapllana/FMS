import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000/api/admins';

const AdminProfile = () => {
  const storedAdmin = JSON.parse(localStorage.getItem('admin') || localStorage.getItem('user'));

  const [admin, setAdmin] = useState(storedAdmin || {});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!storedAdmin) {
    return <p>Please log in as admin to view your profile.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!admin._id && !admin.id) {
      setError('Admin ID is missing.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); 

      const bodyData = {
        username: admin.username,
        email: admin.email,
      };

      if (admin.password && admin.password.trim() !== '') {
        bodyData.password = admin.password;
      }

      const response = await fetch(`${API_BASE_URL}/${admin._id || admin.id}`, {
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

      const updatedAdmin = await response.json();

      localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      setAdmin(updatedAdmin);
      setIsEditing(false);
      alert('Admin data saved successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block font-medium">Username:</label>
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={admin.username || ''}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        ) : (
          <p>{admin.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={admin.email || ''}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        ) : (
          <p>{admin.email}</p>
        )}
      </div>

      {isEditing && (
        <div className="mb-4">
          <label className="block font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={admin.password || ''}
            onChange={handleChange}
            placeholder="Enter new password (or leave empty)"
            className="w-full border rounded px-2 py-1"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium">ID:</label>
        <p>{admin._id || admin.id || '-'}</p>
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

export default AdminProfile;
