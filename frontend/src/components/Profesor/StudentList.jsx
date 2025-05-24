import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filtrimi i studentëve për search
  const filteredStudents = students.filter(student =>
    (student.username || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Students</h2>

      {/* Search Input */}
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
            <th className="px-6 py-3 text-left">#</th>
            <th className="px-6 py-3 text-left">Username</th>
            <th className="px-6 py-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{student.username}</td>
                <td className="px-6 py-4">{student.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-6">
                No students to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
