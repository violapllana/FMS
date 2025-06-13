import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {

        await axios.post('http://localhost:5000/api/auth/logout', {}, {
          withCredentials: true, 
        });

    
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('doctorId');
        localStorage.removeItem('patientId');


        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/');
      }
    };

    logoutUser();
  }, [navigate]);

  return null; 
}

export default Logout;
