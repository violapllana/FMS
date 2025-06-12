import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ManageAdmins from './ManageAdmins';
import ManageStudents from './ManageStudents';
import ManageProfessors from '../../components/Admin/ManageProfesors';
import ReportList from '../../components/Report/ReportList';
import BooksPanel from '../../components/Book/Books';
import ContactList from '../../components/ContactUs/ContactList';
import ManageDepartment from './ManageDepartment';
import ManageUsers from './ManageUsers'; 
import AdminProfile from '../../components/Admin/AdminProfile';

const AdminFacultySidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');
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
        {/* Header */}
        <header className="bg-white text-black shadow-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">FMS Admin Panel</h1>
            <nav className="flex items-center gap-4">
              {loggedInUser && (
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {loggedInUser.username || loggedInUser.name || loggedInUser.email}
                </span>
              )}
              <button 
                onClick={() => setShowModal(true)} 
                className="text-black hover:text-red-600"
              >
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
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'admin' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('adminProfile')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'adminProfile' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('users')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Users
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('manageadmins')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'manageadmins' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Manage Admins
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('managestudents')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'managestudents' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Manage Students
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('manageprofessors')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'manageprofessors' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Manage Professors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('reportlist')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'reportlist' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('book')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'book' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Books
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('contactlist')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'contactlist' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Contacts List
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('department')} 
                  className={`block p-2 font-bold rounded ${activeTab === 'department' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-500 hover:text-white'}`}
                >
                  Department
                </button>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === 'admin' && <AdminDashboard />}
            {activeTab === 'users' && <ManageUsers />}
            {activeTab === 'manageadmins' && <ManageAdmins />}
            {activeTab === 'managestudents' && <ManageStudents />}
            {activeTab === 'manageprofessors' && <ManageProfessors />}
            {activeTab === 'reportlist' && <ReportList />}
            {activeTab === 'book' && <BooksPanel />}
            {activeTab === 'contactlist' && <ContactList />}
            {activeTab === 'department' && <ManageDepartment />}
            {activeTab === 'adminProfile' && <AdminProfile />}
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full">
            <h2 className="text-xl font-semibold text-center mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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

export default AdminFacultySidebar;
