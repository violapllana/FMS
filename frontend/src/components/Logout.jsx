import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Dërgo kërkesën për logout në backend
        await axios.post('http://localhost:5000/api/auth/logout', {}, {
          withCredentials: true, // Shumë e rëndësishme për të përfshirë cookies
        });

        // Fshi të dhënat e përdoruesit nga localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('doctorId');
        localStorage.removeItem('patientId');

        // Riprogramo përdoruesin në faqen kryesore (ose një faqe tjetër sipas dëshirës)
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/');
      }
    };

    logoutUser();
  }, [navigate]);

  return null; // Mund të ktheni një mesazh si "Logging out..." nëse dëshironi
}

export default Logout;
