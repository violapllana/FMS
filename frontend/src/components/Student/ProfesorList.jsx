import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfesorList = () => {
  const [profesors, setProfesors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'http://localhost:5000/api/professors'; // ndrysho URL sipas API-së për profesoret

  const fetchProfesors = async () => {
    try {
      const res = await axios.get(apiUrl);
      setProfesors(res.data);
    } catch (error) {
      console.error('Error fetching profesors:', error);
    }
  };

  useEffect(() => {
    fetchProfesors();
  }, []);

  // Filtrimi i profesoreve për search
  const filteredProfesors = profesors.filter(profesor =>
    (profesor.username || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Profesors</h2>

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
          {filteredProfesors.length > 0 ? (
            filteredProfesors.map((profesor, index) => (
              <tr key={profesor._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{profesor.username}</td>
                <td className="px-6 py-4">{profesor.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-6">
                No profesors to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfesorList;
