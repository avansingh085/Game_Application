import React, { useEffect, useState } from "react";
import ShowOption from './showOptionChess';
const initializeBoard = () => {
  return [
    ["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"], 
    Array(8).fill("pb"),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill("Pw"),
    ["Rw", "Nw", "Bw", "Qw", "Kw", "Bw", "Nw", "Rw"], 
  ];
};

const getChessSymbol = (piece) => {
  const symbols  = {
    P: "♙", // White Pawn
    R: "♖", // White Rook
    N: "♘", // White Knight
    B: "♗", // White Bishop
    Q: "♕", // White Queen
    K: "♔", // White King
    p: "♙",  
    r: "♜", // Black Rook
    n: "♞", // Black Knight
    b: "♝", // Black Bishop
    q: "♛", // Black Queen
    k: "♚", // Black King
  };
  
  return symbols[piece] || "";
};

const ChessGame = () => {
  const [chessBoard, setBoard] = useState(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState("b");
  const [validMove, setValidMove] = useState([]);
  const [showOptionPawn,setShowOptionPawn]=useState([false,""]);
  useEffect(() => {
    if (selectedPiece) {
      getValidMove(selectedPiece.row, selectedPiece.col, false, chessBoard);
    } else {
      setValidMove([]);
    }
   
  }, [selectedPiece, chessBoard]);
  const GameDraw=async ()=>
  {
          
  }
  const GameWin=async ()=>{

  }
  const checkIsKingIsSafe = async (fromRow, fromCol, toRow, toCol) => {
    let kingRow = -1, kingCol = -1;
    
    const newBoard = chessBoard.map(row => [...row]);

   
    const movingPiece = chessBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = movingPiece;
    newBoard[fromRow][fromCol] = "";

   
    if (movingPiece[0] === "k" || movingPiece[0] === "K") {
        kingRow = toRow;
        kingCol = toCol;
    } else {
        
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (newBoard[i][j] !== "" && newBoard[i][j][1] === turn &&
                    (newBoard[i][j][0] === "k" || newBoard[i][j][0] === "K")) {
                    kingRow = i;
                    kingCol = j;
                }
            }
        }
    }

   
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (newBoard[i][j] !== "" && newBoard[i][j][1] !== turn) {
                const validMoves = await getValidMove(i, j, true, newBoard); 
                for (let move of validMoves) {
                    if (move[0] === kingRow && move[1] === kingCol) {
                        return false; 
                    }
                }
            }
        }
    }

    return true; 
};
const getValidMove = async (row, col, isOnlyMoveData, board) => {
    const Move = [];
    const piece = board[row][col];

    
    const addMove = (r, c) => {
        if (r >= 0 && c >= 0 && r < 8 && c < 8) {
            if (board[r][c] === "" || board[r][c][1] !== piece[1]) {
                Move.push([r, c]);
            }
        }
    };

   
    switch (piece[0].toLowerCase()) {
        case "q": 
        case "r": 
            for (let i = col + 1; i < 8; i++) {
                if (board[row][i] === "") addMove(row, i);
                else {
                    addMove(row, i);
                    break;
                }
            }
            for (let i = col - 1; i >= 0; i--) {
                if (board[row][i] === "") addMove(row, i);
                else {
                    addMove(row, i);
                    break;
                }
            }
            for (let i = row + 1; i < 8; i++) {
                if (board[i][col] === "") addMove(i, col);
                else {
                    addMove(i, col);
                    break;
                }
            }
            for (let i = row - 1; i >= 0; i--) {
                if (board[i][col] === "") addMove(i, col);
                else {
                    addMove(i, col);
                    break;
                }
            }
            if (piece[0].toLowerCase() === "r") break; 

        case "b": 
            for (let i = 1; row + i < 8 && col + i < 8; i++) {
                if (board[row + i][col + i] === "") addMove(row + i, col + i);
                else {
                    addMove(row + i, col + i);
                    break;
                }
            }
            for (let i = 1; row + i < 8 && col - i >= 0; i++) {
                if (board[row + i][col - i] === "") addMove(row + i, col - i);
                else {
                    addMove(row + i, col - i);
                    break;
                }
            }
            for (let i = 1; row - i >= 0 && col + i < 8; i++) {
                if (board[row - i][col + i] === "") addMove(row - i, col + i);
                else {
                    addMove(row - i, col + i);
                    break;
                }
            }
            for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
                if (board[row - i][col - i] === "") addMove(row - i, col - i);
                else {
                    addMove(row - i, col - i);
                    break;
                }
            }
            break;

        case "n": 
            const knightMoves = [
                [1, 2], [-1, 2], [2, 1], [-2, 1],
                [2, -1], [-2, -1], [1, -2], [-1, -2],
            ];
            knightMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc));
            break;

           
        

        case "k": 
            const kingMoves = [
                [1, 0], [0, 1], [-1, 0], [0, -1],
                [1, 1], [-1, -1], [1, -1], [-1, 1],
            ];
            kingMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc));
            break;

        default:
            break;
    }
    if (board[row][col][0] === "p") {
       
        if (row + 1 < 8 && board[row + 1][col] === "") {
            Move.push([row + 1, col]);
    
          
            if (row === 1 && board[row + 2][col] === "") {
                Move.push([row + 2, col]);
            }
        }
    
        if (row + 1 < 8 && col - 1 >= 0 && board[row + 1][col - 1] !== "" && board[row + 1][col - 1][1] !== board[row][col][1]) {
            Move.push([row + 1, col - 1]);
        }
    
        if (row + 1 < 8 && col + 1 < 8 && board[row + 1][col + 1] !== "" && board[row + 1][col + 1][1] !== board[row][col][1]) {
            Move.push([row + 1, col + 1]);
        }
    }
    if (board[row][col][0] === "P") {
        
        if (row - 1 >= 0 && board[row - 1][col] === "") {
            Move.push([row - 1, col]);
    
           
            if (row === 6 && board[row - 2][col] === "") {
                Move.push([row - 2, col]);
            }
        }
    
        if (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] !== "" && board[row - 1][col - 1][1] !== board[row][col][1]) {
            Move.push([row - 1, col - 1]);
        }
    
       
        if (row - 1 >= 0 && col + 1 < 8 && board[row - 1][col + 1] !== "" && board[row - 1][col + 1][1] !== board[row][col][1]) {
            Move.push([row - 1, col + 1]);
        }
    }
        
    if (isOnlyMoveData) return Move;
    const newMove = [];
    for (const [toRow, toCol] of Move) {
       
        const newBoard = board.map(r => [...r]);
        newBoard[toRow][toCol] = piece;
        newBoard[row][col] = "";

        if (await checkIsKingIsSafe(row, col, toRow, toCol)) {
            newMove.push([toRow, toCol]);
        }
    }

    setValidMove(newMove);
    return;
};

const winnerConditionCheck=async()=>{

}
  const handleSelect =async(row, col) => {
  
    let isRightMove = false;
    let newValidMove=validMove.map(row => [...row]);;
   

    for (let i = 0; i < validMove.length; i++) {
      if (validMove[i][0] === row && validMove[i][1] === col) {
        isRightMove = true;
        break;
      }
    }
console.log(chessBoard)
    if (isRightMove && selectedPiece) {
      
      const newBoard = chessBoard.map(row => [...row]);;
      newBoard[row][col] = selectedPiece.piece;
      if(newBoard[row][col][0]==="p"&&row===7||newBoard[row][col][0]==="P"&&row===0)
      {
             setShowOptionPawn([true,"",row,col,newBoard]);
      }
      else{
        const nextTurn = turn === "w" ? "b" : "w";
        setTurn(nextTurn);
      }
      newBoard[selectedPiece.row][selectedPiece.col] = "";
      setBoard(newBoard);
      setSelectedPiece(null);
      setValidMove([]);
    } else {
      if (chessBoard[row][col] !== "" && chessBoard[row][col][1] === turn) {
       setSelectedPiece({ piece: chessBoard[row][col], row, col });
       await getValidMove(row,col,false,chessBoard);
       console.log(validMove,"AVAN SINGH")
      }
      else
      {
      setSelectedPiece(null);
       setValidMove([]);
      }
      
    }
  };
  return (
    <div className="flex flex-col items-center bg-gray-800 min-h-screen text-white p-4">
   
    <h1 className="text-3xl font-bold mb-4">Chess Game</h1>
    <div className="flex justify-center space-x-4 mb-6">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play Online
      </button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Play Offline
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Play vs Computer
      </button>
    </div>
  
   
    <div className="grid grid-cols-8 w-full min-w-[300px] max-w-[600px] min-h-[300px] max-h-[600px] mx-auto gap-1">
  {chessBoard.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;
      const bgColor = isWhiteSquare ? "bg-pink-200" : "bg-purple-600";
      const pieceSymbol = cell ? getChessSymbol(cell[0]) : "";
      const isValidMove = validMove.some(
        ([validRow, validCol]) => validRow === rowIndex && validCol === colIndex
      );
      const highlight = isValidMove ? "bg-yellow-400" : "";

      const isPlayerPiece = cell && cell[1] === turn;  
      const isOpponentPiece = cell && cell[1] !== turn; 

      const pieceColor = cell[1]==="w" ? "text-white" :  "text-black" ;

      // Dynamic font size based on cell size
      const pieceSize = 'text-4xl sm:text-5xl md:text-6xl';

      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`w-full aspect-square flex items-center justify-center shadow-md border-2 border-gray-900 transition-all duration-300 ease-in-out transform 
            ${isWhiteSquare ? "bg-gradient-to-br from-yellow-500 to-yellow-700" : "bg-gradient-to-br from-yellow-700 to-yellow-800"} 
            ${isValidMove ? "hover:scale-110 hover:shadow-xl hover:from-green-400 hover:to-green-600" : ""}`}
          onClick={async () => await handleSelect(rowIndex, colIndex)}
          style={{
            boxShadow: isValidMove ? "0 0 12px 4px rgba(34, 197, 94, 0.8)" : "",
            cursor: "pointer",
          }}
        >
          <span
            className={`${pieceColor} font-bold ${pieceSize}`}
            style={{
              textShadow: "0 0 6px rgba(0, 0, 0, 0.5), 0 0 8px rgba(255, 255, 255, 0.8)",
              fontFamily: "ChessFont, sans-serif", // You can use a specific chess font if you like
            }}
          >
            {pieceSymbol}
          </span>
        </div>
      );
    })
  )}
</div>

    <div className="mt-6 flex justify-center">
  <button
    className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 hover:scale-105 transition-transform transform duration-300 ease-in-out"
    onClick={async () => await setBoard(initializeBoard())}
  >
    🔄 Restart Game
  </button>
</div>

     {showOptionPawn[0] ? <ShowOption  setShowOptionPawn={setShowOptionPawn} showOptionPawn={showOptionPawn} turn={turn} setBoard={setBoard} setTurn={setTurn}/> : null}
  </div>
  
  );
};

export default ChessGame;
