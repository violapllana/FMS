import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import ProfessorDashboard from "../Profesor/ProfesorDashboard";
import StudentList from "./StudentList";
import ProfessorProfile from "../Profesor/ProfessorProfile";
import DepartmentList from "../Admin/DepartmentList";



const ProfesorSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("professor");
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
              {/* Ikona Menu */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-black hover:text-blue-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">FMS Professor Panel</h1>
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
          {/* Sidebar (shfaqet kushtimisht) */}
          {isSidebarOpen && (
            <aside className="bg-gray-100 border-r-2 border-gray-300 p-4 w-64 overflow-y-auto">
              <ul className="space-y-2">
                {[
                  { key: "professor", label: "Dashboard" },
                  { key: "professorProfile", label: "My Profile" },
                  { key: "studentslist", label: "Students" },
                  { key: "departmentList", label: "DepartmentList" },

                  
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

          {/* Përmbajtja Kryesore */}
          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === "professor" && <ProfessorDashboard />}
            {activeTab === "studentslist" && <StudentList />}
            {activeTab === "professorProfile" && <ProfessorProfile />}
            {activeTab === "departmentList" && <DepartmentList />}

            
          </main>
        </div>
      </div>

      {/* Modal për konfirmimin e Logout */}
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

export default ProfesorSidebar;
