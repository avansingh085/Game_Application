import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GameHome = ({ setIsOnline, resetGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-6xl font-extrabold text-white mb-6 text-shadow-lg text-center">
        Game Hub
      </h1>
    

      <div className="text-center text-white font-medium text-lg">
        <p className="mb-4">Select a game to play or check back later for more games!</p>
        <p className="italic text-sm">Stay tuned for more fun additions!</p>
      </div>

      <footer className="mt-8 text-white font-semibold text-sm text-center">
        <p>Powered by React & Game Development Enthusiasts</p>
      </footer>
    </div>
  );
};

export default GameHome;
