import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ManageAdmins from './ManageAdmins';
import ManageStudents from './ManageStudents';
import ManageProfessors from '../../components/Admin/ManageProfesors';
import ReportList from '../../components/Report/ReportList';
import BooksPanel from '../../components/Book/Books';
import ContactList from '../../components/ContactUs/ContactList';




const AdminFacultySidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
          <header className="bg-white-100 text-gray-800 shadow-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl text-black font-bold">FMS Admin</h1>
            <nav className="space-x-6">
              <button onClick={() => setShowModal(true)} className="text-black hover:text-red-800">
                Logout
              </button>
            </nav>
          </div>
        </header>
        

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="bg-gray-100 border-r-2 border-gray-300 p-4 w-64 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('manageadmins')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Manage Admins
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('managestudents')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Manage Students
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('manageprofessors')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Manage Professors
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reportlist')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Reports
                </button>
              </li>
                <li>
                <button onClick={() => setActiveTab('book')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Books
                </button>
              </li>
            <li>
                <button onClick={() => setActiveTab('contactlist')} className="block p-2 font-bold text-gray-800 hover:bg-blue-500 hover:text-white rounded">
                  Contacts List
                </button>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'admin' && <AdminDashboard />}
            {activeTab === 'manageadmins' && <ManageAdmins />}
            {activeTab === 'managestudents' && <ManageStudents />}
            {activeTab === 'manageprofessors' && <ManageProfessors />}
            {activeTab === 'reportlist' && <ReportList />}
            {activeTab === 'book' && <BooksPanel />}
            {activeTab === 'contactlist' && <ContactList />}
         
          </main>
        </div>
      </div>

      {/* Modal */}
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

export default AdminFacultySidebar;
