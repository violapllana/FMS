import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    const token = params.get("token");
    const role = params.get("role"); 

    if (error === "access_denied") {
      alert("Access was denied. Please try again.");
      navigate("/login");
    } else if (token && role) {
  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);


      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (role === "student") { 
        navigate("/student-dashboard");
      } else {
        navigate("/dashboard"); 
      }
    } else {
  
      navigate("/login");
    }
  }, [location, navigate]);

  return <p>Processing login...</p>;
};

export default GoogleCallback;
