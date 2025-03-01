import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header'; 
import Game from './pages/Game';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicTacToe from './pages/TicTacToe';
import GameHome from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import Profile from './pages/Profile';
import Chess from './pages/Chess';
import About from './pages/About';
import { setToken, getToken, getUserID } from './services/authService';
import { useDispatch } from 'react-redux';
import Login from "./pages/Login";
import { useEffect, useState } from 'react';
import apiClient from './utils/apiClient';
import { setUserId } from './services/redux/globalSlice';
import ProtectedRoute from './components/ProtectRoutes';
import Loader from './components/loader'; // Import a Loader Component

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state

  const verifyToken = async () => {
    try {
      const response = await apiClient.get("/verifyToken");
      console.log(response)
      if (response.data?.success) {
        dispatch(setUserId(getUserID()));
      }
    } catch (err) {
      console.log("Token verification failed:", err);
    } finally {
      setLoading(false); // Stop loading once verification is complete
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return <Loader />; // Show loader until the authentication check is done
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<GameHome />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Game/TicTacToe" element={<ProtectedRoute><TicTacToe isOffline={true} /></ProtectedRoute>} />
        <Route path="/Game/Chess" element={<ProtectedRoute><Chess /></ProtectedRoute>} />
        <Route path="/About" element={<About />} />
        <Route path="/LeaderBoard" element={<LeaderBoard />} />
        <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
