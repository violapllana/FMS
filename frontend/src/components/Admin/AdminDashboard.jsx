import React from 'react';
import { UserIcon, UsersIcon, BookOpenIcon, CalendarIcon } from '@heroicons/react/24/outline';


const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Welcome, Admin</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <UserIcon className="h-10 w-10 text-blue-500" />
          <div>
            <p className="text-xl font-bold">12</p>
            <p className="text-gray-600">Professors</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <UsersIcon className="h-10 w-10 text-green-500" />
          <div>
            <p className="text-xl font-bold">150</p>
            <p className="text-gray-600">Students</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <BookOpenIcon className="h-10 w-10 text-purple-500" />
          <div>
            <p className="text-xl font-bold">42</p>
            <p className="text-gray-600">Courses</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <CalendarIcon className="h-10 w-10 text-red-500" />
          <div>
            <p className="text-xl font-bold">6</p>
            <p className="text-gray-600">Upcoming Events</p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-semibold mb-4">System Overview</h3>
        <p className="text-gray-700">
          This dashboard provides a quick overview of the faculty system. You can manage professors, students, courses, and events. Future improvements might include analytics, messaging, and activity logs.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
