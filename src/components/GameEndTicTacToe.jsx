import { useEffect } from "react";
import apiClient from "../utils/apiClient";
import { useSelector } from 'react-redux';
import { setOnline, setUser } from "../services/redux/userSlice";
function GameEndTicTacToe({ isWin, score, onClose, onRematch, playerSymbol ,setOnline}) {
   const User = useSelector((state) => state.user.User);
   const Opponent=useSelector((state)=>state.user.isOnlinePlay);
   let displayScore
   if(Opponent?.name)
   {
       displayScore= isWin===playerSymbol ? parseInt(`+${(parseInt(Opponent.score) + 105) / 105}`) : parseInt(`-${(parseInt(Opponent.score)+99) / 100}`);
   }
   else
   {
   displayScore= isWin===playerSymbol ? parseInt(`+${(parseInt(User.score) + 100) / 100}`) : parseInt(`-${(parseInt(User.score)+99) / 100}`);
   }
 
  useEffect(() => {

    const addScore = async () => {
      try {
        console.log( {  displayScore,User })
        let res = await apiClient.post("/api/user/updateScore", { score: displayScore, id: User._id });
       
        if (res.data.success) {
           dispatch(setUser(res.data.User));
           setOnline(false);
        }
        else {
          console.log(res.data, "api add score fetch fail");
        }
      }
      catch (err) {
        console.log("error during fetch add score", err);
      }
    }
    addScore();
    setOnline(false);
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 bg-white rounded-2xl shadow-2xl p-6 text-center space-y-4">
        {isWin === playerSymbol ? (
          <>
            <h2 className="text-2xl font-bold text-green-600">You Win! 🏆</h2>
            <div className="flex justify-between items-center px-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={onRematch}>Rematch</button>
              <span className="text-green-500 font-semibold">Score: {displayScore}</span>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600">You Lost 😢</h2>
            <div className="flex justify-between items-center px-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={onRematch}>Rematch</button>
              <span className="text-red-500 font-semibold">Score: {displayScore}</span>
            </div>
          </>
        )}
        <button
          onClick={onRematch}
          className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default GameEndTicTacToe;
