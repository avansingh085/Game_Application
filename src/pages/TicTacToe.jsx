import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicTacToe = ({ isOffline }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isOnline, setIsOnline] = useState(!isOffline);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState("");

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleMove = (index) => {
    if (board[index] || winner) return;

    if (isOnline && playerSymbol !== (isXTurn ? "X" : "O")) {
      toast.warning("It's not your turn!");
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    if (isOnline && socket) {
      socket.emit("move", { gameId, board: newBoard, symbol: isXTurn ? "X" : "O" });
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);

    if (isOnline && socket) {
      socket.emit("reset", { gameId });
    }
  };

  const makeOptimalComputerMove = () => {
    if (winner || board.every((cell) => cell !== null)) return;

    const bestMove = findBestMove(board);
    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      setIsXTurn(true);
    }
  };

  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move = -1;

    board.forEach((cell, index) => {
      if (cell === null) {
        board[index] = "O";
        const score = minimax(board, 0, false);
        board[index] = null;

        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });

    return move !== -1 ? move : board.findIndex((cell) => cell === null);
  };

  const minimax = (board, depth, isMaximizing) => {
    const win = calculateWinner(board);
    if (win === "O") return 10 - depth;
    if (win === "X") return depth - 10;
    if (board.every((cell) => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = "O";
          const score = minimax(board, depth + 1, false);
          board[index] = null;
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = "X";
          const score = minimax(board, depth + 1, true);
          board[index] = null;
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };

  useEffect(() => {
    if (!isOnline || !userName) return;

    const newSocket = io("http://localhost:3001", { query: { id: userName, gameType: "TIC" } });
    setSocket(newSocket);

    newSocket.emit("join", { board });

    newSocket.on("waiting", (message) => toast.info(message));
    newSocket.on("startGame", ({ gameId, players }) => {
      const assignedSymbol = players.X.socketId === newSocket.id ? "X" : "O";
      setPlayerSymbol(assignedSymbol);
      setGameId(gameId);
      toast.success(`Game started! You are ${assignedSymbol}`);
    });

    newSocket.on("move", ({ board: newBoard, symbol }) => {
      setBoard(newBoard);
      setIsXTurn(symbol !== "X");
    });

    newSocket.on("reset", resetGame);

    newSocket.on("opponentDisconnected", (message) => {
      toast.error(message);
      resetGame();
      setIsOnline(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isOnline, userName]);

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
    } else if (!isXTurn && !winner && !isOnline) {
      makeOptimalComputerMove();
    }
  }, [board, isXTurn, winner, isOnline]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center py-8">
      <h1 className="text-5xl font-extrabold text-white mb-6 text-shadow-lg">Tic Tac Toe</h1>
      <div className="mb-4 text-lg text-white">
        {winner ? (
          <span className="text-green-400 font-semibold">Winner: {winner}</span>
        ) : (
          <span className="text-white font-medium">
            Turn: {isXTurn ? "X" : "O"} {isOnline && `(You are ${playerSymbol})`}
          </span>
        )}
      </div>

      <div className="flex space-x-6 mb-8">
        <button
          onClick={() => {
            setIsOnline(false);
            resetGame();
          }}
          className="px-6 py-3 text-xl font-semibold rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700"
        >
          Play Against Computer
        </button>
        <button
          onClick={() => {
            if (!userName) {
              toast.error("Enter a username before playing online!");
              return;
            }
            setIsOnline(true);
            resetGame();
          }}
          className="px-6 py-3 text-xl font-semibold rounded-full bg-green-500 text-white shadow-lg hover:bg-green-700"
        >
          Play Online
        </button>
      </div>

      <input
        type="text"
        className="h-10 w-72 mb-10 p-2 rounded-lg text-center"
        placeholder="Enter username"
        onChange={(e) => setUserName(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4 w-72 mb-8">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`w-20 h-20 flex items-center justify-center border-4 border-gray-200 rounded-xl bg-white hover:bg-gray-100 ${
              cell === "X" ? "text-blue-500" : "text-red-500"
            }`}
            onClick={() => handleMove(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <button onClick={resetGame} className="mt-8 px-6 py-3 text-white bg-red-500 font-semibold rounded-full">
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
