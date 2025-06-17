import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminFacultySidebar from "./components/Admin/AdminSidebar";
import StudentSidebar from "./components/Student/StudentSidebar";
import ProfesorSidebar from "./components/Profesor/ProfesorSidebar";
import StudentDashboard from "./components/Student/StudentDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProfessorDashboard from "./components/Profesor/ProfesorDashboard";
import ManageAdmins from "./components/Admin/ManageAdmins";
import ManageStudents from "./components/Admin/ManageStudents";
import ManageProfesors from "./components/Admin/ManageProfesors";
import ReportList from "./components/Report/ReportList";
import AppointmentList from "./components/Appoinment/AppoinmentList";
import GoogleCallback from "./components/GoogleCallback";
import ContactForm from "./components/ContactUs/ContactForm";
import ContactList from "./components/ContactUs/ContactList";
import AboutUs from "./components/AboutUs/AboutUs";
import Programs from "./components/Programs";
import Library from "./components/Library/Index";
import Book from "./components/Book/Books";
import BooksList from "./components/Book/BooksList";
import ManageDepartment from "./components/Admin/ManageDepartment";
import DepartmentList from "./components/Admin/DepartmentList";
import ManageUsers from "./components/Admin/ManageUsers";
import StudentList from "./components/Profesor/StudentList";
import ProfesorList from "./components/Student/ProfesorList";
import Profile from "./components/Student/Profile";
import AdminProfile from "./components/Admin/AdminProfile";
import ProfessorProfile from "./components/Profesor/ProfessorProfile";
import WishList from "./components/Book/WishList";
import PrivacyPolicy from "./components/PrivacyPolicy";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/library" element={<Library />} />
        <Route path="/bookslist" element={<BooksList />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
       
        

        {/* ✅ Admin Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminFacultySidebar />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        

        <Route path="/manageadmins" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageAdmins />
          </ProtectedRoute>
        } />

        <Route path="/managestudents" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageStudents />
          </ProtectedRoute>
        } />

        <Route path="/manageprofessors" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageProfesors />
          </ProtectedRoute>
        } />

        <Route path="/department" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageDepartment />
          </ProtectedRoute>
        } />

        <Route path="/departmentList" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DepartmentList />
          </ProtectedRoute>
        } />

        <Route path="/users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        } />

        <Route path="/adminProfile" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminProfile />
          </ProtectedRoute>
        } />
         
                   <Route path="/book" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Book />
          </ProtectedRoute>
        } />

        {/* ✅ Student Routes */}
        <Route path="/student-dashboard" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentSidebar />
          </ProtectedRoute>
        } />

        <Route path="/student" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/professorslist" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ProfesorList />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/wishlist" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <WishList />
          </ProtectedRoute>
        } />

        {/* ✅ Professor Routes */}
        <Route path="/professor-dashboard" element={
          <ProtectedRoute allowedRoles={["profesor"]}>
            <ProfesorSidebar />
          </ProtectedRoute>
        } />

        <Route path="/profesor" element={
          <ProtectedRoute allowedRoles={["profesor"]}>
            <ProfessorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/studentslist" element={
          <ProtectedRoute allowedRoles={["profesor"]}>
            <StudentList />
          </ProtectedRoute>
        } />

        <Route path="/professorProfile" element={
          <ProtectedRoute allowedRoles={["profesor"]}>
            <ProfessorProfile />
          </ProtectedRoute>
        } />

        {/* ✅ Shared Private Routes (admin, student, professor) */}
        <Route path="/reportlist" element={
          <ProtectedRoute allowedRoles={["admin", "student", "profesor"]}>
            <ReportList />
          </ProtectedRoute>
        } />

        <Route path="/appointmentlist" element={
          <ProtectedRoute allowedRoles={["admin", "student", "profesor"]}>
            <AppointmentList />
          </ProtectedRoute>
        } />

        <Route path="/contactlist" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ContactList />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
