import { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); 
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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

  const openDetails = (department) => {
    setSelectedDepartment(department);
    setShowDetailsModal(true);
  };

  const closeDetails = () => {
    setSelectedDepartment(null);
    setShowDetailsModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Departments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {departments.length > 0 ? (
          departments.map((dept) => (
            <div
              key={dept._id}
              onClick={() => openDetails(dept)}
              className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
              <p className="text-gray-700 mb-1"><strong>Director:</strong> {dept.director}</p>
              <p className="text-gray-700 mb-1"><strong>Location:</strong> {dept.location}</p>
              <p className="text-gray-600 truncate">{dept.email}</p>
            </div>
          ))
        ) : (
          <p>No departments to display.</p>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedDepartment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeDetails}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedDepartment.name}</h2>
            <p><strong>Director:</strong> {selectedDepartment.director}</p>
            <p><strong>Location:</strong> {selectedDepartment.location}</p>
            <p><strong>Email:</strong> {selectedDepartment.email}</p>
            <p><strong>Phone:</strong> {selectedDepartment.phoneNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
