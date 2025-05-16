import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Students List</h2>
      {students.length > 0 ? (
        <ul className="space-y-4 text-lg text-gray-700">
          {students.map(student => (
            <li key={student._id} className="border-b pb-2">
              {student.username} ({student.email})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No students to display.</p>
      )}
    </div>
  );
};

export default StudentsList;
