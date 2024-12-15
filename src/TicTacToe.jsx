import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TicTacToe = ({ isOffline }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isOnline, setIsOnline] = useState(!isOffline);
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [gameId, setGameId] = useState(null);
  const [socket, setSocket] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleMove = (index) => {
    if (board[index] || winner) return;

    if (isOnline && playerSymbol !== (isXTurn ? 'X' : 'O')) {
      toast.warning("It's not your turn!");
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    if (isOnline && socket) {
      socket.emit('move', { gameId, board: newBoard, symbol: isXTurn ? 'X' : 'O' });
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);

    if (isOnline && socket) {
      socket.emit('reset', { gameId });
    }
  };

  const makeOptimalComputerMove = () => {
    if (winner || board.every((cell) => cell !== null)) return;

    const bestMove = findBestMove(board);
    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
    }
  };

  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move = -1;

    board.forEach((cell, index) => {
      if (cell === null) {
        board[index] = 'O'; // Simulate the computer's move
        const score = minimax(board, 0, false);
        board[index] = null; // Undo the move

        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });

    return move;
  };

  const minimax = (board, depth, isMaximizing) => {
    const win = calculateWinner(board);
    if (win === 'O') return 10 - depth;
    if (win === 'X') return depth - 10;
    if (board.every((cell) => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;

      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = 'O'; // Simulate the computer's move
          const score = minimax(board, depth + 1, false);
          board[index] = null; // Undo the move

          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;

      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = 'X'; // Simulate the player's move
          const score = minimax(board, depth + 1, true);
          board[index] = null; // Undo the move

          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
    } else if (!isXTurn && !winner && !isOnline) {
      makeOptimalComputerMove();
    }
  }, [board, isXTurn, winner, isOnline]);

  useEffect(() => {
    if (isOnline) {
      const newSocket = io('https://beautiful-raindrop-5caa35.netlify.app');
      setSocket(newSocket);

      newSocket.emit('join');
      newSocket.on('waiting', (message) => toast.info(message));
      newSocket.on('startGame', ({ symbol, gameId }) => {
        setPlayerSymbol(symbol);
        setGameId(gameId);
        toast.success(`Game started! You are ${symbol}.`);
      });
      newSocket.on('move', ({ board: newBoard, symbol }) => {
        setBoard(newBoard);
        setIsXTurn(symbol !== 'X');
      });
      newSocket.on('reset', resetGame);
      newSocket.on('opponentDisconnected', (message) => {
        toast.error(message);
        resetGame();
        setIsOnline(false);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isOnline]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center py-8">
      <h1 className="text-5xl font-extrabold text-white mb-6 text-shadow-lg">Tic Tac Toe</h1>
      <div className="mb-4 text-lg text-white">
        {winner ? (
          <span className="text-green-400 font-semibold">Winner: {winner}</span>
        ) : (
          <span className="text-white font-medium">
            Turn: {isXTurn ? 'X' : 'O'} {isOnline && `(You are ${playerSymbol})`}
          </span>
        )}
      </div>

      <div className="flex space-x-6 mb-8">
        <button
          onClick={() => {
            setIsOnline(false);
            resetGame();
          }}
          className={`px-6 py-3 text-xl font-semibold rounded-full transition-transform transform hover:scale-105 bg-blue-500 text-white shadow-lg ${
            !isOnline ? 'bg-blue-700' : ''
          }`}
        >
          Play Against Computer
        </button>
        <button
          onClick={() => {
            setIsOnline(true);
            resetGame();
          }}
          className={`px-6 py-3 text-xl font-semibold rounded-full transition-transform transform hover:scale-105 bg-green-500 text-white shadow-lg ${
            isOnline ? 'bg-green-700' : ''
          }`}
        >
          Play Online
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-72 mb-8">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`w-20 h-20 flex items-center justify-center border-4 border-gray-200 rounded-xl cursor-pointer bg-white hover:bg-gray-100 transform transition-all duration-300 ease-in-out ${
              cell === 'X' ? 'text-blue-500' : 'text-red-500'
            } hover:scale-105`}
            onClick={() => handleMove(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      {!winner && board.every((cell) => cell !== null) && (
        <h2 className="text-2xl font-semibold text-white mt-4">It's a Draw!</h2>
      )}

      <button
        onClick={resetGame}
        className="mt-8 px-6 py-3 text-white bg-red-500 font-semibold rounded-full shadow-lg hover:bg-red-600 transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
