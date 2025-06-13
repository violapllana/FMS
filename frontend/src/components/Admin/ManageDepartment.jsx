import { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentsPanel = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [director, setDirector] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  const apiUrl = 'http://localhost:5000/api/departments';


  const fetchDepartments = async () => {
    try {
      const res = await axios.get(apiUrl);
      setDepartments(res.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const resetForm = () => {
    setName('');
    setDirector('');
    setLocation('');
    setEmail('');
    setPhoneNumber('');
    setCurrentDepartmentId(null);
  };

 
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };


  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      const newDepartment = { name, director, location, email, phoneNumber };
      await axios.post(`${apiUrl}/add`, newDepartment);
      fetchDepartments();
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      const updatedDepartment = { name, director, location, email, phoneNumber };
      await axios.put(`${apiUrl}/update/${currentDepartmentId}`, updatedDepartment);
      fetchDepartments();
      setIsEditMode(false);
      setShowFormModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };


  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/${id}`);
      const dept = res.data;
      setName(dept.name);
      setDirector(dept.director);
      setLocation(dept.location);
      setEmail(dept.email);
      setPhoneNumber(dept.phoneNumber);
      setCurrentDepartmentId(id);
      setIsEditMode(true);
      setShowFormModal(true);
    } catch (error) {
      console.error('Error fetching department:', error);
    }
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/delete/${departmentToDelete}`);
      fetchDepartments();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4 flex justify-between items-center">
        Departments
        <button
          onClick={() => {
            setIsEditMode(false);
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Add Department
        </button>
      </h2>

      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Director</th>
            <th>Location</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <tr key={dept._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{dept.name}</td>
                <td className="px-6 py-4">{dept.director}</td>
                <td className="px-6 py-4">{dept.location}</td>
                <td className="px-6 py-4">{dept.email}</td>
                <td className="px-6 py-4">{dept.phoneNumber}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(dept._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDepartmentToDelete(dept._id);
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
              <td colSpan="7" className="text-center py-6">
                No departments to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold">
              Are you sure you want to delete this department?
            </h3>
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

      {/* Create/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Update Department' : 'Add New Department'}
            </h2>
            <form onSubmit={isEditMode ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Director</label>
                <input
                  type="text"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
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

export default DepartmentsPanel;
