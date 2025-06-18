import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import StudentDashboard from "../Student/StudentDashboard";
import ProfesorList from "../../components/Student/ProfesorList";
import Profile from "../../components/Student/Profile";
import BooksList from "../Book/BooksList";
import WishList from "../../components/Book/WishList";
import DepartmentList from "../../components/Admin/DepartmentList";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <header className="bg-white text-black shadow-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Butoni i menusë */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle Menu"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold">FMS Student Panel</h1>
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
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="bg-gray-100 border-r-2 border-gray-300 p-4 w-64 overflow-y-auto">
              <ul className="space-y-2">
                {[
                  { key: "student", label: "Dashboard" },
                  { key: "professorslist", label: "Professors" },
                  { key: "profile", label: "My Profile" },
                  { key: "bookslist", label: "Products" },
                  { key: "wishlist", label: "Favorites" },
                  { key: "departmentList", label: "DepartmentList" },
                ].map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => {
                        setActiveTab(item.key);
                        setSidebarOpen(false);
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

          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === "student" && <StudentDashboard />}
            {activeTab === "professorslist" && <ProfesorList />}
            {activeTab === "profile" && <Profile />}
            {activeTab === "bookslist" && <BooksList />}
            {activeTab === "wishlist" && <WishList />}
            {activeTab === "departmentList" && <DepartmentList />}
          </main>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center">
              Are you sure you want to logout?
            </h2>
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

export default StudentSidebar;
