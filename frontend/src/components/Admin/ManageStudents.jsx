import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const apiUrl = 'http://localhost:5000/api/students'; 

  const fetchStudents = async () => {
    try {
      const res = await axios.get(apiUrl);
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setCurrentStudentId(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/`, { username, email, password });
      fetchStudents();
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = { username, email };
      if (password.trim() !== '') {
        updateData.password = password;
      }
      await axios.put(`${apiUrl}/${currentStudentId}`, updateData);
      fetchStudents();
      setShowFormModal(false);
      setIsEditMode(false);
      resetForm();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/${id}`);
      const student = res.data;
      setUsername(student.username);
      setEmail(student.email);
      setPassword(''); 
      setCurrentStudentId(id);
      setIsEditMode(true);
      setShowFormModal(true);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${studentToDelete}`);
      fetchStudents();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };


  const filteredStudents = students.filter(student =>
    (student.username || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4 flex justify-between items-center">
        Students

      
      <button
          onClick={() => {
            setIsEditMode(false);
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Add Student
        </button>
      </h2>

     

      <div className="mb-6 max-w-xs">
        <input
          type="text"
          placeholder="Search by Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>


      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Username</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{student.username}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(student._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setStudentToDelete(student._id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6">
                No students to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>


      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this student?</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {showFormModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Update Student' : 'Add New Student'}</h2>
            <form onSubmit={isEditMode ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {isEditMode ? 'New Password (leave empty to keep current)' : 'Password'}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  {...(!isEditMode && { required: true })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowFormModal(false);
                    resetForm();
                    setIsEditMode(false);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isEditMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
