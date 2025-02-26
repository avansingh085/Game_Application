import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GameHome = ({ setIsOnline, resetGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-6xl font-extrabold text-white mb-6 text-shadow-lg text-center">
        Game Hub
      </h1>
      <p className="text-xl text-white mb-8 text-center font-medium">
        Choose your game and start playing!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105">
          <div className="p-6 text-center">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Tic Tac Toe</h2>
            <p className="text-lg text-gray-700 mb-4">Play the classic Tic Tac Toe game with friends or against the computer!</p>
            <button
              onClick={() => {
                setIsOnline(false);
                resetGame();
              }}
              className="px-6 py-3 text-xl font-semibold rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:from-green-500 hover:to-blue-600 focus:outline-none"
            >
              Play Now
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105">
          <div className="p-6 text-center">
            <h2 className="text-3xl font-semibold text-green-600 mb-4">Snake Game</h2>
            <p className="text-lg text-gray-700 mb-4">Try to grow your snake without hitting the walls or yourself!</p>
            <button
              onClick={() => toast.info("Snake Game Coming Soon!")}
              className="px-6 py-3 text-xl font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:from-yellow-500 hover:to-red-600 focus:outline-none"
            >
              Play Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105">
          <div className="p-6 text-center">
            <h2 className="text-3xl font-semibold text-yellow-600 mb-4">Connect Four</h2>
            <p className="text-lg text-gray-700 mb-4">Play Connect Four and compete with friends to get four in a row!</p>
            <button
              onClick={() => toast.info("Connect Four Game Coming Soon!")}
              className="px-6 py-3 text-xl font-semibold rounded-lg bg-gradient-to-r from-red-400 to-yellow-500 text-white shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:from-red-500 hover:to-yellow-600 focus:outline-none"
            >
              Play Now
            </button>
          </div>
        </div>

       
      </div>

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
