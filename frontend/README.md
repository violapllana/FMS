# 🎓 FMS – Faculty Management System

A **React-based web application** for user management with different roles (student, professor, admin) and Google login.

This project is a modern web application built using **React.js** for the frontend and includes an advanced user management system based on **role-based access control (RBAC)**. It uses **Google OAuth 2.0** for secure and simplified user authentication.

---

## 🎯 Project Goal

The main goal is to build a flexible and secure platform for managing access and features based on user roles. This system aims to:

- Simplify the authentication process using Google Sign-In.
- Classify users based on their role and grant personalized access.
- Provide an administration panel for managing users and permissions.
- Restrict access to specific features based on each role’s privileges.

---

## 🧩 Key Features

### 🔐 Google Authentication

- Full integration with Google OAuth 2.0 for fast and secure login.
- User verification and storage of user data in the database.

### 🧑‍🎓 Role-Based Access Control (RBAC)

- Each registered user is assigned a role: **Student**, **Professor**, or **Admin**.
- Users only see pages and features relevant to their role.

### 🛠️ Admin Panel

Admins have access to a powerful dashboard for:

- Viewing the list of users.
- Changing user roles.
- Suspending or deleting accounts.
- Managing application content.

### 🧭 Role-Specific Dashboards

- **Students:** View personal information and assigned course materials.
- **Professors:** Manage learning content and track student activity.
- **Admins:** Full control over system management and user data.

### 🔒 Security & Data Protection

- Secure authentication using **JSON Web Tokens (JWT)**.
- Role-based route protection with middleware.
- Prevention of unauthorized actions or access.

---

## ⚙️ Technologies Used

- **Frontend:** React.js, React Router, Axios, Tailwind CSS / Bootstrap  
- **Authentication:** Google OAuth 2.0, JWT  
- **Backend (if applied):** Node.js + Express / .NET Core  
- **Database:** MongoDB / MySQL (with Sequelize or Mongoose)  


---

## 🧠 Learning Outcomes

- Real-world experience with external authentication (Google Sign-In).
- Practical application of Role-Based Access Control (RBAC).
- In-depth understanding of SPA (Single Page Application) architecture with React.
- Implementation of best practices for secure and scalable web applications.

---

## 🚀 Live Demo

🔗 [https://v0-fms-clone.vercel.app/](https://v0-fms-clone.vercel.app/)

---

## 📸 Images

### 🖥️ Login Page  
`Login_FMS.png` – Displays the Google Sign-In authentication flow.

### 🖥️ Register Page  
`Register_FMS.png` – Allows new users to register and choose their role.

### 🖥️ Contact Us Page  
`ContactUs_FMS.png` – Users can send messages or feedback to the system admins.

### 🖥️ Home Page  
`Home_FMS.png` – Public landing page with general information and navigation.

### 🖥️ About Us Page  
`AboutUs_FMS.png` – Information about the system, its purpose, and the team.

### 🖥️ Admin Panel Page  
`AdminPanel_FMS.png` – Management interface where admins can oversee the entire system.

### 🖥️ Professor Page  
`Professor_FMS.png` – Interface for professors to interact with student content and materials.

### 🖥️ Student Page  
`Student_FMS.png` – Main interface for students to view their materials and tasks.

### 🖥️ Library Page  
`Library_FMS.png` – Digital library interface accessible by students and professors.

### 🖥️ Admin Dashboard Page  
`AdminDashboard_FMS.png` – Detailed dashboard with user statistics and system management options.

### 🖥️ Professor Dashboard Page  
`ProfessorDashboard_FMS.png` – Professor-specific dashboard with tools for managing classes and students.

### 🖥️ Student Dashboard Page  
`StudentDashboard_FMS.png` – Personalized student dashboard showing classes, progress, and materials.


---

## ⚙️ Installation Guide

```bash
git clone https://github.com/violapllana/FMS.git
cd projekti-fms
npm install
npm start
