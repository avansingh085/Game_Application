import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
  console.log(useSelector((state)=>state.user))
  if (!useSelector((state)=>state.user.isLogin)) {
    return <Navigate to="/Login" replace />;
  }
  return children;
};

export default ProtectedRoute;