import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
  if (!useSelector((state)=>state.auth.isLogin)) {
    return <Navigate to="/Login" replace />;
  }
  return children;
};

export default ProtectedRoute;