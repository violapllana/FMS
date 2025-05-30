import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import StudentsList from "./components/Student/StudentsList";
import ManageDepartment from "./components/Admin/ManageDepartment";
import DepartmentList from "./components/Admin/DepartmentList";
import ManageUsers from "./components/Admin/ManageUsers";
import StudentList from "./components/Profesor/StudentList";
import ProfesorList from "./components/Student/ProfesorList";
import Profile from "./components/Student/Profile";





import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin-dashboard" element={<AdminFacultySidebar />} />
        <Route path="/student-dashboard" element={<StudentSidebar />} />
        <Route path="/professor-dashboard" element={<ProfesorSidebar />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/professor" element={<ProfessorDashboard />} />
        <Route path="/manageadmins" element={<ManageAdmins />} />
        <Route path="/managestudents" element={<ManageStudents />} />
        <Route path="/manageprofessors" element={<ManageProfesors />} />
        <Route path="/reportlist" element={<ReportList />} />
        <Route path="/appointmentlist" element={<AppointmentList />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/contactlist" element={<ContactList />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/library" element={<Library />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/book" element={<Book />} />
        <Route path="/bookslist" element={<BooksList />} />
        <Route path="/department" element={<ManageDepartment />} />
         <Route path="/departmentList" element={<DepartmentList />} />
         <Route path="/users" element={<ManageUsers />} />
        <Route path="/studentslist" element={<StudentList />} />
        <Route path="/professorslist" element={<ProfesorList />} />
        <Route path="/profile" element={<Profile />} />


        
        
        








      </Routes>
    </Router>
  );
}

export default App;
