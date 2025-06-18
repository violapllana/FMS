import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import ManageAdmins from "./ManageAdmins";
import ManageStudents from "./ManageStudents";
import ManageProfessors from "../../components/Admin/ManageProfesors";
import BooksPanel from "../../components/Book/Books";
import ContactList from "../../components/ContactUs/ContactList";
import ManageDepartment from "./ManageDepartment";
import ManageUsers from "./ManageUsers";
import AdminProfile from "../../components/Admin/AdminProfile";

const AdminFacultySidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("admin");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/logout");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white text-black shadow-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Menu Icon */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-black hover:text-blue-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">FMS Admin Panel</h1>
            </div>
            <nav className="flex items-center gap-4">
              {loggedInUser && (
                <span className="text-sm font-medium text-gray-700">
                  Welcome,{" "}
                  {loggedInUser.username ||
                    loggedInUser.name ||
                    loggedInUser.email}
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
          {/* Sidebar shown conditionally */}
          {isSidebarOpen && (
            <aside className="bg-gray-100 border-r-2 border-gray-300 p-4 w-64 overflow-y-auto">
              <ul className="space-y-2">
                {[
                  { key: "admin", label: "Dashboard" },
                  { key: "adminProfile", label: "My Profile" },
                  { key: "users", label: "Users" },
                  { key: "manageadmins", label: "Manage Admins" },
                  { key: "managestudents", label: "Manage Students" },
                  { key: "manageprofessors", label: "Manage Professors" },
                  { key: "book", label: "Books" },
                  { key: "contactlist", label: "Contacts List" },
                  { key: "department", label: "Department" },
                ].map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => {
                        setActiveTab(item.key);
                        setIsSidebarOpen(false); 
                      }}
                      className={`block p-2 font-bold rounded ${
                        activeTab === item.key
                          ? "bg-blue-600 text-white"
                          : "text-gray-800 hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === "admin" && <AdminDashboard />}
            {activeTab === "users" && <ManageUsers />}
            {activeTab === "manageadmins" && <ManageAdmins />}
            {activeTab === "managestudents" && <ManageStudents />}
            {activeTab === "manageprofessors" && <ManageProfessors />}
            {activeTab === "book" && <BooksPanel />}
            {activeTab === "contactlist" && <ContactList />}
            {activeTab === "department" && <ManageDepartment />}
            {activeTab === "adminProfile" && <AdminProfile />}
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full">
            <h2 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to logout?
            </h2>
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
