import { useNavigate } from 'react-router-dom';
import { removeToken } from '../services/authService';
import apiClient from '../utils/apiClient';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
   await apiClient.get('/api/logout');
    navigate('/login');
  };
  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;