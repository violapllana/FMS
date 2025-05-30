import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from '../Student/StudentDashboard';
import AppointmentList from "../../components/Appoinment/AppoinmentList";
import ReportList from '../../components/Report/ReportList';
import ProfesorList from '../../components/Student/ProfesorList';
import Profile from '../../components/Student/Profile';

const StudentSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('student');

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-white-600 text-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl text-black font-bold">FMS Student Panel</h1>
            <nav className="space-x-6">
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
                <button onClick={() => setActiveTab('student')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('appointmentlist')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  My Appointments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reportlist')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Reports
                </button>
              </li>
                <li>
                <button onClick={() => setActiveTab('professorslist')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Professors
                </button>
              </li>
                    <li>
                <button onClick={() => setActiveTab('profile')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  My Profile
                </button>
              </li>
            </ul>
          </aside>

          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'student' && <StudentDashboard />}
            {activeTab === 'appointmentlist' && <AppointmentList />}
            {activeTab === 'reportlist' && <ReportList />}
            {activeTab === 'professorslist' && <ProfesorList />}
             {activeTab === 'profile' && <Profile />}
          </main>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center">Are you sure you want to logout?</h2>
            <div className="mt-4 flex justify-around">
              <button onClick={handleLogout} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700">
                Logout
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSidebar;
