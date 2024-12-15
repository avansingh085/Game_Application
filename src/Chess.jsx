import React, { useEffect, useState } from "react";
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
    p: "♟", // Black Pawn
    r: "♜", // Black Rook
    n: "♞", // Black Knight
    b: "♝", // Black Bishop
    q: "♛", // Black Queen
    k: "♚", // Black King
  };
  
  return symbols[piece] || "";
};

const ChessGame = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState("b");
  const [validMove, setValidMove] = useState([]);

  const getValidMove = (row, col) => {
    const Move = []; 
    console.log(board[row][col], 'pppp');

    if (board[row][col][0] === 'q' || board[row][col][0] === 'Q') {
        // Share row
        for (let i = col + 1; i < 8; i++) {
            if (board[row][i] === "") {
                Move.push([row, i]);
            } else {
                if (board[row][i][1] !== board[row][col][1]) {
                    Move.push([row, i]);
                }
                break;
            }
        }
        for (let i = col - 1; i >= 0; i--) {
            if (board[row][i] === "") {
                Move.push([row, i]);
            } else {
                if (board[row][i][1] !== board[row][col][1]) {
                    Move.push([row, i]);
                }
                break;
            }
        }
        for (let i = row + 1; i < 8; i++) {
            if (board[i][col] === "") {
                Move.push([i, col]);
            } else {
                if (board[i][col][1] !== board[row][col][1]) {
                    Move.push([i, col]);
                }
                break;
            }
        }
        for (let i = row - 1; i >= 0; i--) {
            if (board[i][col] === "") {
                Move.push([i, col]);
            } else {
                if (board[i][col][1] !== board[row][col][1]) {
                    Move.push([i, col]);
                }
                break;
            }
        }
        for (let j = col + 1, i = row + 1; i < 8 && j < 8; i++, j++) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
        for (let j = col - 1, i = row + 1; i < 8 && j >= 0; i++, j--) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
        for (let j = col - 1, i = row - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
        for (let j = col + 1, i = row - 1; i >= 0 && j < 8; i--, j++) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
    } else {
        if (board[row][col][0] === 'R' || board[row][col][0] === 'r') {
            for (let i = col + 1; i < 8; i++) {
                if (board[row][i] === "") {
                    Move.push([row, i]);
                } else {
                    if (board[row][i][1] !== board[row][col][1]) {
                        Move.push([row, i]);
                    }
                    break;
                }
            }
            for (let i = col - 1; i >= 0; i--) {
                if (board[row][i] === "") {
                    Move.push([row, i]);
                } else {
                    if (board[row][i][1] !== board[row][col][1]) {
                        Move.push([row, i]);
                    }
                    break;
                }
            }
            for (let i = row + 1; i < 8; i++) {
                if (board[i][col] === "") {
                    Move.push([i, col]);
                } else {
                    if (board[i][col][1] !== board[row][col][1]) {
                        Move.push([i, col]);
                    }
                    break;
                }
            }
            for (let i = row - 1; i >= 0; i--) {
                if (board[i][col] === "") {
                    Move.push([i, col]);
                } else {
                    if (board[i][col][1] !== board[row][col][1]) {
                        Move.push([i, col]);
                    }
                    break;
                }
            }
        } else if (board[row][col][0] === 'b' || board[row][col][0] === 'B') {
            for (let j = col + 1, i = row + 1; i < 8 && j < 8; i++, j++) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
            for (let j = col - 1, i = row + 1; i < 8 && j >= 0; i++, j--) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
            for (let j = col - 1, i = row - 1; i >= 0 && j >= 0; i--, j--) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
            for (let j = col + 1, i = row - 1; i >= 0 && j < 8; i--, j++) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
        } else if (board[row][col][0] === 'n' || board[row][col][0] === 'N') {
            const knightMoves = [
                [1, 2], [-1, 2], [2, 1], [-2, 1],
                [2, -1], [-2, -1], [1, -2], [-1, -2]
            ];
            for (let i = 0; i < knightMoves.length; i++) {
                const r = row + knightMoves[i][0];
                const c = col + knightMoves[i][1];
                if (r >= 0 && c >= 0 && r < 8 && c < 8 && board[row][col][1] !== board[r][c][1]) {
                    Move.push([r, c]);
                }
            }
        } else if (board[row][col][0] === 'p') {
            if (row + 1 < 8) {
                if (col - 1 >= 0 && board[row + 1][col - 1][1] !== board[row][col][1]) {
                    Move.push([row + 1, col - 1]);
                }
                if (col + 1 < 8 && board[row + 1][col + 1][1] !== board[row][col][1]) {
                    Move.push([row + 1, col + 1]);
                }
                if (board[row + 1][col] === "") {
                    Move.push([row + 1, col]);
                }
            }
        } else if (board[row][col][0] === 'P') {
            if (row - 1 >= 0) {
                if (col - 1 >= 0 && board[row - 1][col - 1][1] !== board[row][col][1]) {
                    Move.push([row - 1, col - 1]);
                }
                if (col + 1 < 8 && board[row - 1][col + 1][1] !== board[row][col][1]) {
                    Move.push([row - 1, col + 1]);
                }
                if (board[row - 1][col] === "") {
                    Move.push([row - 1, col]);
                }
            }
        }
    }
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", Move);
    setValidMove(Move);
    return;
};


  const handleSelect = (row, col) => {
    let isRightMove = false;

    
    for (let i = 0; i < validMove.length; i++) {
      if (validMove[i][0] === row && validMove[i][1] === col) {
        isRightMove = true;
        break;
      }
    }

    if (isRightMove && selectedPiece) {
      
      const newBoard = [...board];
      newBoard[row][col] = selectedPiece.piece;
      newBoard[selectedPiece.row][selectedPiece.col] = "";
      setBoard(newBoard);

    
      const nextTurn = turn === "w" ? "b" : "w";
      setTurn(nextTurn);
      setSelectedPiece(null);
      setValidMove([]);
    } else {
      if (board[row][col] !== "" && board[row][col][1] === turn) {
        setSelectedPiece({ piece: board[row][col], row, col });
        getValidMove(row, col);
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
  
   
    <div className="grid grid-cols-8 w-96 mx-auto rounded-lg shadow-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;
          const bgColor = isWhiteSquare ? "bg-gray-200" : "bg-green-700";
          const pieceSymbol = cell ? getChessSymbol(cell[0]) : "";
          const isValidMove = validMove.some(
            ([validRow, validCol]) => validRow === rowIndex && validCol === colIndex
          );
          const highlight = isValidMove ? "bg-yellow-300" : "";
  
          
          const isPlayerPiece = cell && cell[1] === turn;  
          const isOpponentPiece = cell && cell[1] !== turn; 
  
          
          const pieceColor = isPlayerPiece ? "text-white" : isOpponentPiece ? "text-black" : "";
  
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-12 w-12 flex text-4xl items-center justify-center ${bgColor} ${highlight} border-gray-900`}
              onClick={() => handleSelect(rowIndex, colIndex)}
              style={{
                transition: "all 0.3s ease",
                boxShadow: isValidMove ? "0 0 10px 2px rgba(255, 255, 0, 0.7)" : "",
                cursor: "pointer",
              }}
            >
              <span className={pieceColor}>{pieceSymbol}</span>
            </div>
          );
        })
      )}
    </div>
  
    {/* Footer Section */}
    <div className="mt-6">
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setBoard(initializeBoard())}
      >
        Restart Game
      </button>
    </div>
  </div>
  
  );
};

export default ChessGame;
