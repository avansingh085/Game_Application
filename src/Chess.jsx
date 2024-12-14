import React, { useState } from "react";

// Initialize the chessboard with basic piece setup
const initializeBoard = () => {
  const emptyRow = Array(8).fill(null);
  return [
    ["r", "n", "b", "q", "k", "b", "n", "r"], // Black pieces
    Array(8).fill("p"), // Black pawns
    ...Array(4).fill(emptyRow), // Empty rows
    Array(8).fill("P"), // White pawns
    ["R", "N", "B", "Q", "K", "B", "N", "R"], // White pieces
  ];
};

// Map pieces to Unicode symbols
const getChessSymbol = (piece) => {
  const symbols = {
    P: "♙",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔",
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  };
  return symbols[piece] || "";
};

// Determine valid moves for all pieces
const getValidMoves = (board, from, turn) => {
    const [row, col] = from;
    const piece = board[row][col];
    const validMoves = [];
    if (!piece) return validMoves; // No piece to move
  
    const isWhite = piece === piece.toUpperCase();
    const direction = isWhite ? -1 : 1; // White moves up, Black moves down
  
    // Define movement for each piece
    switch (piece.toLowerCase()) {
      case "p":
        // Pawn movement logic
        const nextRow = row + direction;
        if (board[nextRow]?.[col] === null) {
          validMoves.push([nextRow, col]); // Forward move
        }
  
        // Diagonal captures
        if (col - 1 >= 0 && board[nextRow]?.[col - 1] && board[nextRow][col - 1]?.toLowerCase() !== piece.toLowerCase()) {
          validMoves.push([nextRow, col - 1]); // Capture left diagonal
        }
        if (col + 1 < 8 && board[nextRow]?.[col + 1] && board[nextRow][col + 1]?.toLowerCase() !== piece.toLowerCase()) {
          validMoves.push([nextRow, col + 1]); // Capture right diagonal
        }
  
        // Pawn double move from starting position
        if ((isWhite && row === 6 || !isWhite && row === 1) && board[nextRow]?.[col] === null && board[nextRow + direction]?.[col] === null) {
          validMoves.push([nextRow + direction, col]); // Double move
        }
        break;
  
      case "r":
        // Rook movement (straight lines horizontally and vertically)
        for (let i = 1; i < 8; i++) {
          if (row + i < 8 && board[row + i][col] === null) validMoves.push([row + i, col]); // Down
          else if (row + i < 8 && board[row + i][col]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row + i, col]); // Capture
          if (row - i >= 0 && board[row - i][col] === null) validMoves.push([row - i, col]); // Up
          else if (row - i >= 0 && board[row - i][col]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row - i, col]); // Capture
          if (col + i < 8 && board[row][col + i] === null) validMoves.push([row, col + i]); // Right
          else if (col + i < 8 && board[row][col + i]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row, col + i]); // Capture
          if (col - i >= 0 && board[row][col - i] === null) validMoves.push([row, col - i]); // Left
          else if (col - i >= 0 && board[row][col - i]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row, col - i]); // Capture
        }
        break;
  
      case "n":
        // Knight movement (L-shaped)
        const knightMoves = [
          [-2, -1], [-2, 1], [2, -1], [2, 1],
          [-1, -2], [-1, 2], [1, -2], [1, 2]
        ];
        knightMoves.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && (!board[newRow][newCol] || board[newRow][newCol]?.toLowerCase() !== piece.toLowerCase())) {
            validMoves.push([newRow, newCol]);
          }
        });
        break;
  
      case "b":
        // Bishop movement (diagonals)
        for (let i = 1; i < 8; i++) {
          if (row + i < 8 && col + i < 8 && board[row + i][col + i] === null) validMoves.push([row + i, col + i]); // Down-right
          else if (row + i < 8 && col + i < 8 && board[row + i][col + i]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row + i, col + i]); // Capture
          if (row - i >= 0 && col - i >= 0 && board[row - i][col - i] === null) validMoves.push([row - i, col - i]); // Up-left
          else if (row - i >= 0 && col - i >= 0 && board[row - i][col - i]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row - i, col - i]); // Capture
          if (row + i < 8 && col - i >= 0 && board[row + i][col - i] === null) validMoves.push([row + i, col - i]); // Down-left
          else if (row + i < 8 && col - i >= 0 && board[row + i][col - i]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row + i, col - i]); // Capture
          if (row - i >= 0 && col + i < 8 && board[row - i][col + i] === null) validMoves.push([row - i, col + i]); // Up-right
          else if (row - i >= 0 && col + i < 8 && board[row - i][col + i]?.toLowerCase() !== piece.toLowerCase()) validMoves.push([row - i, col + i]); // Capture
        }
        break;
  
      case "q":
        // Queen movement (combination of rook and bishop)
        validMoves.push(...getValidMoves(board, from, turn).filter(([r, c]) => r !== row || c !== col));
        break;
  
      case "k":
        // King movement (1 square in any direction)
        const kingMoves = [
          [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]
        ];
        kingMoves.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && (!board[newRow][newCol] || board[newRow][newCol]?.toLowerCase() !== piece.toLowerCase())) {
            validMoves.push([newRow, newCol]);
          }
        });
        break;
  
      default:
        break;
    }
  
    return validMoves;
  };
  

// Move a piece on the board
const movePiece = (board, from, to) => {
  const newBoard = board.map((row) => [...row]); // Clone the board
  newBoard[to[0]][to[1]] = newBoard[from[0]][from[1]]; // Move piece
  newBoard[from[0]][from[1]] = null; // Clear the original square
  return newBoard;
};
const ChessGame = () => {
    const [board, setBoard] = useState(initializeBoard());
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [validMoves, setValidMoves] = useState([]);
    const [turn, setTurn] = useState("white");
    const [recommendedMove, setRecommendedMove] = useState(null);
  
    const handleSquareClick = (row, col) => {
      if (selectedSquare) {
        // Try to move the piece
        const isMoveValid = validMoves.some(([r, c]) => r === row && c === col);
        if (isMoveValid) {
          const piece = board[selectedSquare[0]][selectedSquare[1]];
          const targetPiece = board[row][col];
          
          // Ensure no own pieces are attacked
          const pieceColor = piece === piece.toUpperCase() ? "white" : "black";
          const targetColor = targetPiece ? (targetPiece === targetPiece.toUpperCase() ? "white" : "black") : null;
  
          if (pieceColor === targetColor) {
            // If the target piece is of the same color, do not allow the move
            console.log("Cannot attack your own piece");
            return;
          }
  
          const newBoard = movePiece(board, selectedSquare, [row, col]);
          setBoard(newBoard);
          setTurn(turn === "white" ? "black" : "white"); // Switch turn
          setSelectedSquare(null);
          setValidMoves([]);
          setRecommendedMove(null); // Clear recommendation after move
        } else {
          setSelectedSquare(null);
          setValidMoves([]);
          setRecommendedMove(null); // Clear recommendation on invalid move
        }
      } else if (board[row][col]) {
        // Select a piece
        const pieceColor = board[row][col] === board[row][col].toUpperCase() ? "white" : "black";
        if (pieceColor === turn) {
          setSelectedSquare([row, col]);
          const validMovesList = getValidMoves(board, [row, col], turn);
          setValidMoves(validMovesList);
          
          // Set recommended move (for simplicity, the first valid move)
          if (validMovesList.length > 0) {
            setRecommendedMove(validMovesList[0]); // You can enhance this later for better recommendations
          } else {
            setRecommendedMove(null); // No valid moves
          }
        }
      }
    };
  
    const resetGame = () => {
      setBoard(initializeBoard());
      setSelectedSquare(null);
      setValidMoves([]);
      setTurn("white");
      setRecommendedMove(null);
    };
  
    const renderBoard = () => {
      const rows = [];
      for (let row = 0; row < 8; row++) {
        const cells = [];
        for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          const isDark = (row + col) % 2 === 1;
          const isSelected =
            selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
          const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
          const isRecommended = recommendedMove && recommendedMove[0] === row && recommendedMove[1] === col;
  
          // Determine piece color (white or black)
          const pieceColor = piece ? (piece === piece.toUpperCase() ? "white" : "black") : null;
          const isUserPiece = pieceColor === turn;
          const isOpponentPiece = pieceColor && pieceColor !== turn;
  
          cells.push(
            <div
              key={`${row}-${col}`}
              className={`w-20 h-20 flex items-center justify-center ${isDark ? "bg-[#6c4f37]" : "bg-[#f1d6b8]"} 
              ${isSelected ? "outline outline-4 outline-[#ff6347]" : ""} 
              ${isValidMove ? "bg-[#76d7c4]" : ""}
              ${isRecommended ? "bg-[#f39c12]" : ""}
              ${!piece && !isValidMove && !isRecommended ? "cursor-pointer" : ""}
              `}
              onClick={() => handleSquareClick(row, col)}
            >
              {piece && (
                <span className={`text-4xl ${piece === piece.toUpperCase() ? "text-white" : "text-black"}`}>
                  {getChessSymbol(piece)}
                </span>
              )}
            </div>
          );
        }
        rows.push(
          <div key={row} className="flex">
            {cells}
          </div>
        );
      }
      return rows;
    };
  
    const renderMoveRecommendations = () => {
      return validMoves.length > 0 ? (
        <div className="mt-4 p-4 bg-[#ecf0f1] rounded-lg shadow-lg border border-[#bdc3c7]">
          <h3 className="font-bold mb-2 text-xl text-center">Possible Moves:</h3>
          <ul className="list-none p-0">
            {validMoves.map(([r, c], index) => (
              <li
                key={index}
                className={`cursor-pointer py-1 px-3 rounded-lg ${recommendedMove && recommendedMove[0] === r && recommendedMove[1] === c ? "bg-[#f39c12]" : ""}`}
                onClick={() => handleSquareClick(r, c)}
              >
                Move to ({r + 1}, {c + 1})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-[#e74c3c]">No valid moves for this piece.</p>
      );
    };
  
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-4">
          <div className="border-4 border-[#2c3e50]">{renderBoard()}</div>
        </div>
        <div className="text-center mb-4">
          <p className="text-lg">It's {turn === "white" ? "White's" : "Black's"} turn</p>
        </div>
        {renderMoveRecommendations()}
        <button className="mt-4 px-6 py-2 bg-[#3498db] text-white rounded-lg shadow-md hover:bg-[#2980b9]" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    );
  };
  
  export default ChessGame;
  