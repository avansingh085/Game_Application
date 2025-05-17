import React from 'react';
import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import Loader from '../components/loader';
const Leaderboard = () => {

  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(false);
  console.log(leaderboardData)
  const fetchData = async () => {
    setLoading(true);
    try {

      const response = await apiClient.get("/api/user/getLeaderboard");
      // console.log(response.data,"AVANISH")
      if (response.data?.success) {
        setLeaderboardData(response.data.leaderboard);
      }
    } catch (err) {
      console.log("Leaderboard fetch error:", err);
    }
    setLoading(false);
  };
  useEffect(() => {

    fetchData();
  }, [])


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
              {!loading&&leaderboardData.map((
                player,
                index

              ) => (
                <tr
                  key={
                    player._id
                  }
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 px-6 font-mono text-purple-300">#{
                    index + 1}</td>
                  <td className="py-4 px-6 font-medium">{player.name}</td>
                  <td className="py-4 px-6 text-right font-bold text-pink-400">
                    {player.score}
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
        { loading&&<div className='h-64 w-full grid justify-center items-center '>Loading...</div>}
      </div>
    </div>
  );
};

export default Leaderboard;