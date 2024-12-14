import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './header'; // Ensure the file name matches the casing here
import Game from './Game';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicTacToe from './TicTacToe';
import GameHome from './Home'
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Chess from './Chess';
function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        
        <Route path="/" element={<GameHome/>} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Game/TicTacToe" element={<TicTacToe  isOffline={true}/>} />
        <Route path="/Game/Chess" element={<Chess/>}/>
        <Route path="/LeaderBoard" element={<LeaderBoard/>} />
        <Route path="/Profile" element={<Profile/>}/>
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
