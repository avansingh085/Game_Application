import React from 'react';
import { Link } from 'react-router-dom';

const GameSelection = () => {
  const games = [
    {
      name: "Tic-Tac-Toe",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT62ex834FtkqOm4FYieJd62fq4V8K8QdHf9A&s",
      link: "/Game/TicTacToe",
    },
    {
      name: "Coming Soon",
      image: "https://via.placeholder.com/150?text=Coming+Soon",
      link: "/futuregame",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Choose Your Game</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <Link
            to={game.link}
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img src={game.image} alt={game.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{game.name}</h2>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                {game.name === "Coming Soon" ? "Learn More" : "Play Now"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
