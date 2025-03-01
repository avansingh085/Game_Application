function ShowOptionPawns({ setShowOptionPawn, showOptionPawn, turn, setBoard, setTurn }) {

    const handlerPawn = (piece) => {
      let newBoard = showOptionPawn[4].map(row => [...row]);;
      let row = showOptionPawn[2];
      let col = showOptionPawn[3];
  
      const pieceMapping = {
        rook: turn !== 'b' ? "rb" : "Rw",
        bishop: turn !== 'b' ? "bb" : "Bw",
        knight: turn !== 'b' ? "nb" : "Nw",
        queen: turn !== 'b' ? "qb" : "Qw"
      };
  
      newBoard[row][col] = pieceMapping[piece];
  
      const nextTurn = turn === "w" ? "b" : "w";
     
  
      setBoard(newBoard);
      setShowOptionPawn([false, "", 0, 0]);
    };
  
    return (
      <>
        {showOptionPawn[0] ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-teal-400 to-purple-600 p-8 rounded-2xl shadow-2xl z-20">
            <div className="grid grid-cols-2 gap-6">
              <div
                className="flex justify-center items-center h-28 w-28 bg-orange-400 text-white border-4 border-orange-600 rounded-lg cursor-pointer transform transition-all hover:scale-110 hover:shadow-lg hover:bg-orange-500"
                onClick={() => handlerPawn("rook")}
                aria-label={`Select ${turn === "w" ? "White" : "Black"} Rook`}
                title={`Select ${turn === "w" ? "White" : "Black"} Rook`}
              >
                <span className="text-7xl">{turn === "w" ? "♖" : "♜"}</span>
              </div>
  
              <div
                className="flex justify-center items-center h-28 w-28 bg-green-400 text-white border-4 border-green-600 rounded-lg cursor-pointer transform transition-all hover:scale-110 hover:shadow-lg hover:bg-green-500"
                onClick={() => handlerPawn("bishop")}
                aria-label={`Select ${turn === "w" ? "White" : "Black"} Bishop`}
                title={`Select ${turn === "w" ? "White" : "Black"} Bishop`}
              >
                <span className="text-7xl">{turn === "w" ? "♗" : "♝"}</span>
              </div>
  
              <div
                className="flex justify-center items-center h-28 w-28 bg-blue-400 text-white border-4 border-blue-600 rounded-lg cursor-pointer transform transition-all hover:scale-110 hover:shadow-lg hover:bg-blue-500"
                onClick={() => handlerPawn("knight")}
                aria-label={`Select ${turn === "w" ? "White" : "Black"} Knight`}
                title={`Select ${turn === "w" ? "White" : "Black"} Knight`}
              >
                <span className="text-7xl">{turn === "w" ? "♘" : "♞"}</span>
              </div>
  
              <div
                className="flex justify-center items-center h-28 w-28 bg-purple-400 text-white border-4 border-purple-600 rounded-lg cursor-pointer transform transition-all hover:scale-110 hover:shadow-lg hover:bg-purple-500"
                onClick={() => handlerPawn("queen")}
                aria-label={`Select ${turn === "w" ? "White" : "Black"} Queen`}
                title={`Select ${turn === "w" ? "White" : "Black"} Queen`}
              >
                <span className="text-7xl">{turn === "w" ? "♕" : "♛"}</span>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
  
  export default ShowOptionPawns;
  