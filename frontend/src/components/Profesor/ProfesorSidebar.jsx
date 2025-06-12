import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentList from '../Appoinment/AppoinmentList';
import ReportList from '../Report/ReportList';
import ProfessorDashboard from '../Profesor/ProfesorDashboard';
import StudentList from './StudentList';
import ProfessorProfile from '../Profesor/ProfessorProfile';

const ProfesorSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('professor');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/logout');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-white text-black shadow-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">FMS Professor Panel</h1>
            <nav className="flex items-center gap-4">
              {loggedInUser && (
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {loggedInUser.username || loggedInUser.name || loggedInUser.email}
                </span>
              )}
              <button onClick={() => setShowModal(true)} className="text-black hover:text-red-600">
                Logout
              </button>
            </nav>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <aside className="bg-gray-100 border-r-2 border-gray-300 p-4 w-64 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('professor')}
                  className={`block p-2 font-bold rounded ${
                    activeTab === 'professor' ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('professorProfile')}
                  className={`block p-2 font-bold rounded ${
                    activeTab === 'professorProfile' ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('appointmentlist')}
                  className={`block p-2 font-bold rounded ${
                    activeTab === 'appointmentlist' ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  My Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('reportlist')}
                  className={`block p-2 font-bold rounded ${
                    activeTab === 'reportlist' ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('studentslist')}
                  className={`block p-2 font-bold rounded ${
                    activeTab === 'studentslist' ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Students
                </button>
              </li>
            </ul>
          </aside>

          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'professor' && <ProfessorDashboard />}
            {activeTab === 'appointmentlist' && <AppointmentList />}
            {activeTab === 'reportlist' && <ReportList />}
            {activeTab === 'studentslist' && <StudentList />}
            {activeTab === 'professorProfile' && <ProfessorProfile />}
          </main>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center">Are you sure you want to logout?</h2>
            <div className="mt-4 flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfesorSidebar;
