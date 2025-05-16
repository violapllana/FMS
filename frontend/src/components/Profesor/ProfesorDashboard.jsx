import React from 'react';
import { FaUsers, FaClipboardCheck, FaBookOpen } from 'react-icons/fa';

const ProfessorDashboard = () => {
  const stats = [
    { label: 'Courses Taught', value: 4, icon: <FaBookOpen className="text-purple-500" size={30} /> },
    { label: 'Students', value: 120, icon: <FaUsers className="text-green-500" size={30} /> },
    { label: 'Pending Reviews', value: 8, icon: <FaClipboardCheck className="text-red-500" size={30} /> },
  ];

  const tasks = [
    { date: '2025-05-15', message: 'Review submissions for Assignment 2.' },
    { date: '2025-05-14', message: 'Upload lecture slides for next week.' },
    { date: '2025-05-13', message: 'Schedule midterm exam.' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Welcome, Professor!</h1>

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

      {/* Tasks or Announcements */}
      <h2 className="text-xl font-bold mb-3">Upcoming Tasks</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-2 border">{task.date}</td>
                <td className="p-2 border">{task.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
