function GameEndTicTacToe({ isWin, score, onClose ,onRematch }) {
    const displayScore = isWin ? `+${(score + 100) / 100}` : `-${(score + 99) / 100}`;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-96 bg-white rounded-2xl shadow-2xl p-6 text-center space-y-4">
          {isWin==='X' ? (
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
  