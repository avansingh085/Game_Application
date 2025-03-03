import React from 'react';

const Leaderboard = () => {
  // Leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'John Doe', score: 1500 },
    { rank: 2, name: 'Jane Smith', score: 1450 },
    { rank: 3, name: 'Sam Wilson', score: 1400 },
    { rank: 4, name: 'Charlie Brown', score: 1300 },
    { rank: 5, name: 'Alice Cooper', score: 1200 },
    { rank: 6, name: 'Bob Marley', score: 1100 },
    { rank: 7, name: 'Zoe Stark', score: 1000 },
    { rank: 8, name: 'Steve Rogers', score: 950 },
    { rank: 9, name: 'Tony Stark', score: 900 },
    { rank: 10, name: 'Bruce Banner', score: 850 },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          Leaderboard
        </h1>

        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-5 px-6 text-left font-bold text-purple-400">Rank</th>
                <th className="py-5 px-6 text-left font-bold">Name</th>
                <th className="py-5 px-6 text-right font-bold text-purple-400">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player) => (
                <tr 
                  key={player.rank} 
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 px-6 font-mono text-purple-300">#{player.rank}</td>
                  <td className="py-4 px-6 font-medium">{player.name}</td>
                  <td className="py-4 px-6 text-right font-bold text-pink-400">
                    {player.score.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;