import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    const token = params.get("token");
    const role = params.get("role"); // Assuming the role is passed back in the query parameters

    if (error === "access_denied") {
      alert("Access was denied. Please try again.");
      navigate("/login");
    } else if (token && role) {
      // Save token and role in localStorage or cookies
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (role === "student") { // If "student" is the role
        navigate("/student-dashboard");
      } else {
        navigate("/dashboard"); // Default route if no specific role found
      }
    } else {
      // If the token or role is not found, navigate to login
      navigate("/login");
    }
  }, [location, navigate]);

  return <p>Processing login...</p>;
};

export default GoogleCallback;
