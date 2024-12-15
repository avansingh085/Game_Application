import React, { useState } from 'react';
const AboutModal = ({ isOpen, onClose, selectedGame }) => {
  if (!isOpen) return null;

  const getGameInfo = (game) => {
    switch (game) {
      case 'Chess':
        return (
          <>
            <h3 className="text-lg font-semibold">Game Rules:</h3>
            <p className="text-sm">
              Chess is a two-player strategy board game played on an 8x8 grid. The game is won when one player checkmates the opponent's king.
              Each player controls 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns.
            </p>
            <h3 className="text-lg font-semibold">Game Features:</h3>
            <ul className="text-sm list-inside list-disc">
              <li>Play against other players online.</li>
              <li>Play offline with a friend.</li>
              <li>Play against the computer with adjustable difficulty levels.</li>
            </ul>
            <h3 className="text-lg font-semibold">Instructions:</h3>
            <p className="text-sm">Select and move pieces by clicking on them. Your goal is to checkmate the opponent's king.</p>
          </>
        );
      case 'TicTacToe':
        return (
          <>
            <h3 className="text-lg font-semibold">Game Rules:</h3>
            <p className="text-sm">
              Tic-Tac-Toe is a two-player game where each player takes turns marking spaces on a 3x3 grid with their respective symbol (X or O).
              The first player to get three of their marks in a row (vertically, horizontally, or diagonally) wins.
            </p>
            <h3 className="text-lg font-semibold">Game Features:</h3>
            <ul className="text-sm list-inside list-disc">
              <li>Quick and easy gameplay.</li>
              <li>Play against another player in offline mode.</li>
              <li>Fun and fast-paced.</li>
            </ul>
            <h3 className="text-lg font-semibold">Instructions:</h3>
            <p className="text-sm">Click on an empty square to place your symbol. The goal is to align three marks in a row before your opponent.</p>
          </>
        );
      case 'Multiplayer':
        return (
          <>
            <h3 className="text-lg font-semibold">Coming Soon: Multiplayer Mode</h3>
            <p className="text-sm">
              Soon, you'll be able to play against multiple players online! Create a room, invite your friends, and challenge others to a match.
              Stay tuned for updates!
            </p>
          </>
        );
      default:
        return <p className="text-sm">Select a game to learn more about it.</p>;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">About {selectedGame}</h2>
          <button onClick={onClose} className="text-lg font-semibold text-red-500">
            X
          </button>
        </div>
        <div className="mt-4">
          {getGameInfo(selectedGame)}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Credits:</h3>
          <p className="text-sm">Developed by Avan Singh. Special thanks to open-source contributions and community support.</p>
        </div>
      </div>
    </div>
  );
};


const GameSelector = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('Chess');

  const handleAboutClick = (game) => {
    setSelectedGame(game);
    setIsAboutModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAboutModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 min-h-screen text-white p-4">
      
      <h1 className="text-3xl font-bold mb-4">Multi-Game Platform</h1>
      
    
      <button
        onClick={() => handleAboutClick(selectedGame)}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        About {selectedGame}
      </button>

   
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedGame('Chess')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Chess
        </button>
        <button
          onClick={() => setSelectedGame('TicTacToe')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Tic-Tac-Toe
        </button>
        <button
          onClick={() => setSelectedGame('Multiplayer')}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Multiplayer (Coming Soon)
        </button>
      </div>

      
      <AboutModal isOpen={isAboutModalOpen} onClose={handleModalClose} selectedGame={selectedGame} />

      
      <div className="mt-4">
        <h2 className="text-2xl">Selected Game: {selectedGame}</h2>
        
      </div>
    </div>
  );
};

export default GameSelector;
