import React from 'react';

const Leaderboard = () => {
  // Fake leaderboard data
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Leaderboard</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-gray-800">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-xl font-semibold">Rank</th>
                <th className="py-3 px-4 text-xl font-semibold">Name</th>
                <th className="py-3 px-4 text-xl font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player) => (
                <tr key={player.rank} className="hover:bg-gray-100">
                  <td className="py-3 px-4">{player.rank}</td>
                  <td className="py-3 px-4">{player.name}</td>
                  <td className="py-3 px-4">{player.score}</td>
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
