import React from 'react';
import { FaBook, FaClipboardList, FaBell } from 'react-icons/fa';

const StudentDashboard = () => {
  const stats = [
    { label: 'Total Courses', value: 5, icon: <FaBook className="text-blue-500" size={30} /> },
    { label: 'Assignments', value: 12, icon: <FaClipboardList className="text-green-500" size={30} /> },
    { label: 'Notifications', value: 3, icon: <FaBell className="text-yellow-500" size={30} /> },
  ];

  const notifications = [
    { date: '2025-05-15', message: 'Assignment 3 is due this Friday.' },
    { date: '2025-05-14', message: 'New course material uploaded for Web Development.' },
    { date: '2025-05-13', message: 'Library will be closed this weekend.' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Welcome back, Student!</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-gray-100 rounded-xl p-4 shadow-sm"
          >
            <div>{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Notifications Table */}
      <h2 className="text-xl font-bold mb-3">Recent Notifications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Message</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((note, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-2 border">{note.date}</td>
                <td className="p-2 border">{note.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
